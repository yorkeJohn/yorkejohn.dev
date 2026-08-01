import {Noto_Sans, Syne, Ubuntu_Mono} from 'next/font/google'

const heading = Syne({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: '700',
  fallback: ['Noto Sans']
})

const sans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-sans'
})

const mono = Ubuntu_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: '400'
})

export const fonts = [heading.variable, sans.variable, mono.variable] as const
