import {Noto_Sans, Playfair_Display} from 'next/font/google'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading'
})

const notoSans = Noto_Sans({subsets: ['latin'], variable: '--font-sans'})

export const fonts = [playfairDisplay.variable, notoSans.variable] as const
