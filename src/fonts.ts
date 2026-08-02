import {Fira_Code, Noto_Sans, Syne} from 'next/font/google'

const heading = Syne({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: '600',
  fallback: ['Noto Sans']
})

const sans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-sans'
})

const mono = Fira_Code({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: '400'
})

export const fonts = [heading.variable, sans.variable, mono.variable] as const
