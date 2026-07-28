import { YankiConnect } from 'yanki-connect'

import back from '~/shared/assets/back.html?raw'
import front from '~/shared/assets/front.html?raw'
import css from '~/shared/assets/style.css?raw'

import { createAnkiInspectorHandler, type ReadonlyAnkiClient } from './inspector'

const yanki = new YankiConnect()

const readonlyAnkiClient: ReadonlyAnkiClient = {
  getModelNames: () => yanki.model.modelNames(),
  getModelFieldNames: (modelName) => yanki.model.modelFieldNames({ modelName }),
  findNoteIds: (query) => yanki.note.findNotes({ query }),
  getModelTemplates: (modelName) => yanki.model.modelTemplates({ modelName }),
  getModelStyling: (modelName) => yanki.model.modelStyling({ modelName }),
}

export const GET = createAnkiInspectorHandler(readonlyAnkiClient, { front, back, css })
