import {Noto_Sans, Syne, Ubuntu_Mono} from 'next/font/google'
import localFont from 'next/font/local'

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

const mono = Ubuntu_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: '400'
})

const accent = localFont({
  src: '../public/fonts/DepartureMono-Regular.woff2',
  variable: '--font-pixel'
})

export const fonts = [heading.variable, sans.variable, mono.variable, accent.variable] as const
