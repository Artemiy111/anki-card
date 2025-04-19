import { createHighlighter } from 'shiki'

import frontText from '~/shared/assets/front.html?raw'
import backText from '~/shared/assets/back.html?raw'
import styleText from '~/shared/assets/style.css?raw'

const highlighter = await createHighlighter({
  themes: ['github-light', 'github-dark'],
  langs: ['html', 'css'],
})

export const getCode = async (isDark: boolean) => {
  const theme = isDark ? 'github-dark' : 'github-light'
  const frontHtml = highlighter.codeToHtml(frontText, { lang: 'html', theme })
  const backHtml = highlighter.codeToHtml(backText, { lang: 'html', theme })
  const styleHtml = highlighter.codeToHtml(styleText, { lang: 'css', theme })

  return { frontHtml, backHtml, styleHtml }
}
