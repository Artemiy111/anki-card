import { describe, expect, test } from 'bun:test'

import { createAnkiInspectorHandler, type ReadonlyAnkiClient } from './inspector'

const clientWith = (overrides: Partial<ReadonlyAnkiClient> = {}): ReadonlyAnkiClient => ({
  getModelNames: async () => ['ArtMiner'],
  getModelFieldNames: async () => ['expression', 'meaning', 'sentence'],
  findNoteIds: async () => [101, 102, 103],
  ...overrides,
})

describe('GET /api/anki', () => {
  test('returns ArtMiner metadata without note contents', async () => {
    const response = await createAnkiInspectorHandler(clientWith())()

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({
      available: true,
      modelName: 'ArtMiner',
      fields: ['expression', 'meaning', 'sentence'],
      noteCount: 3,
    })
  })

  test('explains that ArtMiner is missing while AnkiConnect is available', async () => {
    const response = await createAnkiInspectorHandler(
      clientWith({ getModelNames: async () => ['Basic', 'Cloze'] }),
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
