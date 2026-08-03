import font from 'next/font/local'

const heading = font({
  src: './woff2/Syne-SemiBold.woff2',
  variable: '--font-heading',
  weight: '600'
})

const sans = font({
  src: './woff2/NotoSans-Variable.woff2',
  variable: '--font-sans'
})

const mono = font({
  src: './woff2/FiraCode-Regular.woff2',
  variable: '--font-mono',
  weight: '400'
})

export const fonts = [heading.variable, sans.variable, mono.variable] as const
