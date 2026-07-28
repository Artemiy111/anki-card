export const ARTMINER_MODEL_NAME = 'ArtMiner'

export type ReadonlyAnkiClient = {
  getModelNames: () => Promise<string[]>
  getModelFieldNames: (modelName: string) => Promise<string[]>
  findNoteIds: (query: string) => Promise<number[]>
}

export const createAnkiInspectorHandler =
  (client: ReadonlyAnkiClient) => async (): Promise<Response> => {
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

      const [fields, noteIds] = await Promise.all([
        client.getModelFieldNames(ARTMINER_MODEL_NAME),
        client.findNoteIds(`note:${ARTMINER_MODEL_NAME}`),
      ])

      return Response.json({
        available: true,
        modelName: ARTMINER_MODEL_NAME,
        fields,
        noteCount: noteIds.length,
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
