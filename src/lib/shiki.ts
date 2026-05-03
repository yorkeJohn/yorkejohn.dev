import {createHighlighter} from 'shiki'

export const SHIKI_THEME = 'gruvbox-dark-hard'

const langs = ['json', 'ts'] as const
export type SupportedLang = (typeof langs)[number]

export const highlighter = createHighlighter({
  langs: [...langs],
  themes: [SHIKI_THEME]
})
