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

  test('front handles both filled and empty optional audio without changing its content', () => {
    expect(frontPreviewSource).toContain("{#if card['expression-audio']}")
    expect(renderAnkiTemplate(frontTemplate, card)).toContain(card['expression-audio'])

    const withoutAudio = { ...card, 'expression-audio': '' }
    const rendered = renderAnkiTemplate(frontTemplate, withoutAudio)
    expect(rendered).not.toContain('lucide-play')
    expect(rendered).toContain(card.expression)
  })
})
