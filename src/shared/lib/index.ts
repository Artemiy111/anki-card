import { createHighlighter } from 'shiki'

import frontText from '~/shared/assets/front.html?raw'
import backText from '~/shared/assets/back.html?raw'
import styleText from '~/shared/assets/style.css?raw'

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
