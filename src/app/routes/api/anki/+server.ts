import { YankiConnect } from 'yanki-connect'

import { createAnkiInspectorHandler, type ReadonlyAnkiClient } from './inspector'

const yanki = new YankiConnect()

const readonlyAnkiClient: ReadonlyAnkiClient = {
  getModelNames: () => yanki.model.modelNames(),
  getModelFieldNames: (modelName) => yanki.model.modelFieldNames({ modelName }),
  findNoteIds: (query) => yanki.note.findNotes({ query }),
}

export const GET = createAnkiInspectorHandler(readonlyAnkiClient)
