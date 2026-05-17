import {Noto_Sans, Source_Sans_3, Ubuntu_Mono} from 'next/font/google'

const heading = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-heading'
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
