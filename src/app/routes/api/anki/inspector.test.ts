import { describe, expect, test } from 'bun:test'

import { createAnkiInspectorHandler, type ReadonlyAnkiClient } from './inspector'

const localCard = {
  front: '{{expression}}\n',
  back: '{{meaning}}\n{{sentence}}\n',
  css: '.card { color: black; }\n',
}

const clientWith = (overrides: Partial<ReadonlyAnkiClient> = {}): ReadonlyAnkiClient => ({
  getModelNames: async () => ['ArtMiner'],
  getModelFieldNames: async () => ['expression', 'meaning', 'sentence'],
  findNoteIds: async () => [101, 102, 103],
  getModelTemplates: async () => ({
    Card: {
      Front: '{{expression}}\r\n\r\n',
      Back: '{{meaning}}\r\n{{sentence}}\r\n',
    },
  }),
  getModelStyling: async () => ({ css: '.card { color: black; }\r\n' }),
  ...overrides,
})

describe('GET /api/anki', () => {
  test('returns ArtMiner metadata without note contents', async () => {
    const response = await createAnkiInspectorHandler(clientWith(), localCard)()

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({
      available: true,
      modelName: 'ArtMiner',
      fields: ['expression', 'meaning', 'sentence'],
      noteCount: 3,
      comparison: {
        fields: {
          liveOnly: [],
          localOnly: [],
        },
        cardTemplate: {
          name: 'Card',
          issue: null,
          front: 'match',
          back: 'match',
          css: 'match',
        },
      },
    })
  })

  test('reports fields present only in Anki and only in local templates', async () => {
    const response = await createAnkiInspectorHandler(
      clientWith({ getModelFieldNames: async () => ['expression', 'live-extra'] }),
      {
        front: '{{expression}}',
        back: '{{#local-extra}}{{local-extra}}{{/local-extra}}',
        css: localCard.css,
      },
    )()
    const data = await response.json()

    expect(data.comparison.fields).toEqual({
      liveOnly: ['live-extra'],
      localOnly: ['local-extra'],
    })
  })

  test('reports Front, Back and CSS drift independently', async () => {
    const response = await createAnkiInspectorHandler(
      clientWith({
        getModelTemplates: async () => ({
          Card: {
            Front: '<main>old front</main>',
            Back: '<main>old back</main>',
          },
        }),
        getModelStyling: async () => ({ css: '.card { color: red; }' }),
      }),
      localCard,
    )()
    const data = await response.json()

    expect(data.comparison.cardTemplate).toEqual({
      name: 'Card',
      issue: null,
      front: 'different',
      back: 'different',
      css: 'different',
    })
    expect(JSON.stringify(data)).not.toContain('old front')
    expect(JSON.stringify(data)).not.toContain('old back')
    expect(JSON.stringify(data)).not.toContain('color: red')
  })

  test('explains when ArtMiner has no card template to compare', async () => {
    const response = await createAnkiInspectorHandler(
      clientWith({ getModelTemplates: async () => ({}) }),
      localCard,
    )()
    const data = await response.json()

    expect(data.comparison.cardTemplate).toEqual({
      name: null,
      issue: {
        code: 'NO_CARD_TEMPLATE',
        message: 'У ArtMiner нет шаблона карточки для сравнения.',
      },
      front: 'unavailable',
      back: 'unavailable',
      css: 'match',
    })
  })

  test('refuses to guess when ArtMiner has multiple card templates', async () => {
    const response = await createAnkiInspectorHandler(
      clientWith({
        getModelTemplates: async () => ({
          Card: { Front: 'one', Back: 'one' },
          Reverse: { Front: 'two', Back: 'two' },
        }),
      }),
      localCard,
    )()
    const data = await response.json()

    expect(data.comparison.cardTemplate).toEqual({
      name: null,
      issue: {
        code: 'MULTIPLE_CARD_TEMPLATES',
        message:
          'У ArtMiner несколько шаблонов карточек (2); невозможно выбрать один автоматически.',
      },
      front: 'unavailable',
      back: 'unavailable',
      css: 'match',
    })
  })

  test('explains that ArtMiner is missing while AnkiConnect is available', async () => {
    const response = await createAnkiInspectorHandler(
      clientWith({ getModelNames: async () => ['Basic', 'Cloze'] }),
      localCard,
    )()

    expect(response.status).toBe(404)
    expect(await response.json()).toEqual({
      available: true,
      error: {
        code: 'MODEL_NOT_FOUND',
        message: 'Тип заметки ArtMiner не найден в Anki.',
      },
    })
  })

  test('returns a safe error when AnkiConnect is unavailable', async () => {
    const response = await createAnkiInspectorHandler(
      clientWith({
        getModelNames: async () => {
          throw new Error('fetch failed: private connection details')
        },
      }),
      localCard,
    )()

    expect(response.status).toBe(503)
    expect(await response.json()).toEqual({
      available: false,
      error: {
        code: 'ANKI_UNAVAILABLE',
        message: 'Не удалось подключиться к AnkiConnect. Убедитесь, что Anki запущен.',
      },
    })
  })
})
