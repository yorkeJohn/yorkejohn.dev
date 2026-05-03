import type React from 'react'
import {use} from 'react'
import {highlighter, SHIKI_THEME, type SupportedLang} from '@/lib/shiki'

export type HighlightProps = {
  lang: SupportedLang
  children: React.ReactNode
}

export function Highlight({children, lang}: HighlightProps) {
  const html = use(highlighter).codeToHtml(String(children), {lang, theme: SHIKI_THEME})
  // biome-ignore lint/security/noDangerouslySetInnerHtml: required here
  return <div dangerouslySetInnerHTML={{__html: html}} />
}
