export const ARTMINER_MODEL_NAME = 'ArtMiner'

export type ReadonlyAnkiClient = {
  getModelNames: () => Promise<string[]>
  getModelFieldNames: (modelName: string) => Promise<string[]>
  findNoteIds: (query: string) => Promise<number[]>
  getModelTemplates: (modelName: string) => Promise<Record<string, { Front: string; Back: string }>>
  getModelStyling: (modelName: string) => Promise<{ css: string }>
}

export type LocalCard = {
  front: string
  back: string
  css: string
}

const normalizeTemplate = (value: string) => value.replace(/\r\n?/g, '\n').replace(/\n+$/g, '')

const getReferencedFields = ({ front, back }: LocalCard) => {
  const references = `${front}\n${back}`.matchAll(/\{\{\s*[#^/]?\s*([^{}]+?)\s*\}\}/g)
  return [...new Set([...references].map((match) => match[1]))].sort()
}

export const createAnkiInspectorHandler =
  (client: ReadonlyAnkiClient, localCard: LocalCard) => async (): Promise<Response> => {
    try {
      const modelNames = await client.getModelNames()

      if (!modelNames.includes(ARTMINER_MODEL_NAME)) {
        return Response.json(
          {
            available: true,
            error: {
              code: 'MODEL_NOT_FOUND',
              message: 'Тип заметки ArtMiner не найден в Anki.',
            },
          },
          { status: 404 },
        )
      }

      const [fields, noteIds, templates, styling] = await Promise.all([
        client.getModelFieldNames(ARTMINER_MODEL_NAME),
        client.findNoteIds(`note:${ARTMINER_MODEL_NAME}`),
        client.getModelTemplates(ARTMINER_MODEL_NAME),
        client.getModelStyling(ARTMINER_MODEL_NAME),
      ])

      const localFields = getReferencedFields(localCard)
      const liveFields = new Set(fields)
      const referencedFields = new Set(localFields)
      const templateEntries = Object.entries(templates)
      const selectedTemplate = templateEntries.length === 1 ? templateEntries[0] : null

      const cardTemplate = selectedTemplate
        ? {
            name: selectedTemplate[0],
            issue: null,
            front:
              normalizeTemplate(selectedTemplate[1].Front) === normalizeTemplate(localCard.front)
                ? 'match'
                : 'different',
            back:
              normalizeTemplate(selectedTemplate[1].Back) === normalizeTemplate(localCard.back)
                ? 'match'
                : 'different',
            css:
              normalizeTemplate(styling.css) === normalizeTemplate(localCard.css)
                ? 'match'
                : 'different',
          }
        : {
            name: null,
            issue: {
              code: templateEntries.length === 0 ? 'NO_CARD_TEMPLATE' : 'MULTIPLE_CARD_TEMPLATES',
              message:
                templateEntries.length === 0
                  ? 'У ArtMiner нет шаблона карточки для сравнения.'
                  : `У ArtMiner несколько шаблонов карточек (${templateEntries.length}); невозможно выбрать один автоматически.`,
            },
            front: 'unavailable',
            back: 'unavailable',
            css:
              normalizeTemplate(styling.css) === normalizeTemplate(localCard.css)
                ? 'match'
                : 'different',
          }

      return Response.json({
        available: true,
        modelName: ARTMINER_MODEL_NAME,
        fields,
        noteCount: noteIds.length,
        comparison: {
          fields: {
            liveOnly: fields.filter((field) => !referencedFields.has(field)),
            localOnly: localFields.filter((field) => !liveFields.has(field)),
          },
          cardTemplate,
        },
      })
    } catch {
      return Response.json(
        {
          available: false,
          error: {
            code: 'ANKI_UNAVAILABLE',
            message: 'Не удалось подключиться к AnkiConnect. Убедитесь, что Anki запущен.',
          },
        },
        { status: 503 },
      )
    }
  }
