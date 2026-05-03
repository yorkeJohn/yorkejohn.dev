import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import type React from 'react'
import {useMemo} from 'react'

import 'highlight.js/styles/base16/gruvbox-dark-hard.css'

const languages = {json, javascript} as const

Object.entries(languages).forEach(([key, value]) => {
  hljs.registerLanguage(key, value)
})

type SupportedLanguage = keyof typeof languages

export type HighlightProps = {
  language: SupportedLanguage
  children: React.ReactNode
}

export function Highlight({children, language}: HighlightProps) {
  const highlighted = useMemo(() => {
    const input = String(children)
    return hljs.highlight(input, {language}).value
  }, [children, language])
  return (
    <pre>
      <code
        // biome-ignore lint/security/noDangerouslySetInnerHtml: required here
        dangerouslySetInnerHTML={{__html: highlighted}}
      />
    </pre>
  )
}
