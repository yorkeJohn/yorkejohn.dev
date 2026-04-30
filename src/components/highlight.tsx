import hljs from 'highlight.js'

import 'highlight.js/styles/base16/gruvbox-dark-hard.css'

import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'

const languages = {json, javascript} as const

Object.entries(languages).forEach(([key, value]) => {
  hljs.registerLanguage(key, value)
})

type SupportedLanguage = keyof typeof languages

type HighlightProps = {
  language: SupportedLanguage
  children: string
}

export function Highlight({children, language}: HighlightProps) {
  const highlighted = hljs.highlight(children, {language})
  return (
    <pre
      style={{whiteSpace: 'pre-wrap', wordWrap: 'break-word'}}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: required here
      dangerouslySetInnerHTML={{__html: highlighted.value}}
    />
  )
}
