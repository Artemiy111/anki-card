// place files you want to import through the `$lib` alias in this folder.
import frontText from '../assets/front.html?raw'
import backText from '../assets/back.html?raw'
import styleText from '../assets/style.css?raw'

import { createHighlighter } from 'shiki'

export const getCode = async () => {
  const highlighter = await createHighlighter({
    themes: ['github-light'],
    langs: ['html', 'css'],
  })

  const frontHtml = highlighter.codeToHtml(frontText, { lang: 'html', theme: 'github-light' })
  const backHtml = highlighter.codeToHtml(backText, { lang: 'html', theme: 'github-light' })
  const styleHtml = highlighter.codeToHtml(styleText, { lang: 'css', theme: 'github-light' })

  return { frontHtml, backHtml, styleHtml }
}
