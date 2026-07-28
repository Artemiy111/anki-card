import { describe, expect, test } from 'bun:test'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { ARTMINER_FIELDS, card, type Card } from './card'

const assetsDirectory = join(import.meta.dir, '..', 'assets')
const routesDirectory = join(import.meta.dir, '..', '..', 'app', 'routes')
const frontTemplate = readFileSync(join(assetsDirectory, 'front.html'), 'utf8')
const backTemplate = readFileSync(join(assetsDirectory, 'back.html'), 'utf8')
const frontPreviewSource = readFileSync(join(routesDirectory, '+page.svelte'), 'utf8')
const backPreviewSource = readFileSync(join(routesDirectory, 'back', '+page.svelte'), 'utf8')
const appStyles = readFileSync(join(routesDirectory, '..', 'app.css'), 'utf8')
const previewSources = [frontPreviewSource, backPreviewSource].join('\n')

const optionalBackFields = [
  'sentence-translation',
  'notes',
  'image',
  'url',
  'conjugation',
  'frequencies',
] as const

const renderAnkiTemplate = (template: string, fields: Card) => {
  let rendered = template

  for (const field of ARTMINER_FIELDS) {
    const value = fields[field]
    const escapedField = field.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regularSection = new RegExp(`{{#${escapedField}}}([\\s\\S]*?){{/${escapedField}}}`, 'g')
    const invertedSection = new RegExp(
      `{{\\^${escapedField}}}([\\s\\S]*?){{/${escapedField}}}`,
      'g',
    )

    rendered = rendered.replace(regularSection, value ? '$1' : '')
    rendered = rendered.replace(invertedSection, value ? '' : '$1')
    rendered = rendered.replaceAll(`{{${field}}}`, value)
  }

  return rendered
}

describe('ArtMiner fields', () => {
  test('the local model, fixture, templates and preview cover all 14 fields', () => {
    expect(ARTMINER_FIELDS).toHaveLength(14)
    expect(Object.keys(card).sort()).toEqual([...ARTMINER_FIELDS].sort())

    for (const field of ARTMINER_FIELDS) {
      expect(`${frontTemplate}\n${backTemplate}`).toContain(`{{${field}}}`)
      expect(previewSources).toContain(field)
    }
  })

  test('filled optional fields render on the back', () => {
    const rendered = renderAnkiTemplate(backTemplate, card)

    expect(rendered).not.toMatch(/{{[#^/]/)
    for (const field of optionalBackFields) {
      expect(rendered).toContain(`data-field="${field}"`)
      expect(rendered).toContain(card[field])
    }
  })

  test('empty optional fields leave no back-side containers', () => {
    const emptyOptionalFields = { ...card }
    for (const field of optionalBackFields) emptyOptionalFields[field] = ''

    const rendered = renderAnkiTemplate(backTemplate, emptyOptionalFields)

    expect(rendered).not.toMatch(/{{[#^/]/)
    for (const field of optionalBackFields) {
      expect(rendered).not.toContain(`data-field="${field}"`)
    }

    expect(rendered).toContain(card.meaning)

    const previewConditions = [
      "{#if card['sentence-translation']}",
      '{#if card.notes}',
      '{#if card.image}',
      '{#if card.url}',
      '{#if card.conjugation}',
      '{#if card.frequencies}',
    ]
    for (const condition of previewConditions) expect(backPreviewSource).toContain(condition)
  })

  test('front renders standard Anki audio only when expression audio is filled', () => {
    expect(frontPreviewSource).toContain("{#if card['expression-audio']}")
    const renderedWithAudio = renderAnkiTemplate(frontTemplate, card)
    expect(renderedWithAudio).toContain('data-audio-control="expression-audio"')
    expect(renderedWithAudio).toContain('aria-labelledby="expression-audio-label"')
    expect(renderedWithAudio).toContain('Воспроизвести произношение слова')
    expect(renderedWithAudio).toContain(card['expression-audio'])

    const withoutAudio = { ...card, 'expression-audio': '' }
    const rendered = renderAnkiTemplate(frontTemplate, withoutAudio)
    expect(rendered).not.toContain('data-audio-control="expression-audio"')
    expect(rendered).toContain(card.expression)
  })

  test('back renders standard Anki audio only when sentence audio is filled', () => {
    expect(backPreviewSource).toContain("{#if card['sentence-audio']}")
    const renderedWithAudio = renderAnkiTemplate(backTemplate, card)
    expect(renderedWithAudio).toContain('data-audio-control="sentence-audio"')
    expect(renderedWithAudio).toContain('aria-labelledby="sentence-audio-label"')
    expect(renderedWithAudio).toContain('Воспроизвести аудио предложения')
    expect(renderedWithAudio).toContain(card['sentence-audio'])

    const withoutAudio = { ...card, 'sentence-audio': '' }
    expect(renderAnkiTemplate(backTemplate, withoutAudio)).not.toContain(
      'data-audio-control="sentence-audio"',
    )
  })

  test('audio fields rely on native Anki replay buttons and label the generated controls', () => {
    for (const template of [frontTemplate, backTemplate]) {
      expect(template).toContain('role="group"')
      expect(template).toContain('class="sr-only"')
      expect(template).toContain('.replay-button')
      expect(template).toContain(".setAttribute('aria-label'")
    }

    expect(frontTemplate).not.toContain('<div class="hidden">{{expression-audio}}</div>')
    expect(backTemplate).not.toContain('<div class="hidden">{{sentence-audio}}</div>')
    expect(appStyles).toContain('.anki-audio-control .replay-button')
    expect(appStyles).toContain('.anki-audio-control .replay-button:focus-visible')
    expect(frontPreviewSource).toContain('type="button"')
    expect(frontPreviewSource).toContain('aria-label="Воспроизвести произношение слова"')
    expect(backPreviewSource).toContain('type="button"')
    expect(backPreviewSource).toContain('aria-label="Воспроизвести аудио предложения"')
  })

  test('the existing source anchor is the accessible icon link', () => {
    const rendered = renderAnkiTemplate(backTemplate, card)
    const sourceMarkup = rendered.match(
      /<div data-field="url" class="anki-source-link">([\s\S]*?)<\/div>/,
    )?.[0]

    expect(sourceMarkup).toBeDefined()
    expect(sourceMarkup).toContain(card.url)
    expect(sourceMarkup?.match(/<a\b/g)).toHaveLength(1)
    expect(sourceMarkup).not.toContain('<svg')
    expect(sourceMarkup).not.toContain('<span')
    expect(sourceMarkup).not.toContain('absolute')
    expect(backPreviewSource).toContain('{#if card.url}')
    expect(backPreviewSource).toContain('data-field="url" class="anki-source-link"')
    expect(backPreviewSource).toContain('{@html card.url}')
    expect(appStyles).toContain('.anki-source-link a::before')
    expect(appStyles).toContain('.anki-source-link a:focus-visible')
  })
})
