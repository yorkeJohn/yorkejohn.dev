import type {Metadata} from 'next'
import {fonts} from '@/lib/fonts'
import type {LayoutProps} from '@/lib/types'
import {cn} from '@/lib/utils'

import './globals.css'
import './typography.css'

export const metadata: Metadata = {
  metadataBase: 'https://yorkejohn.dev',
  title: {
    template: '%s :: yorkejohn.dev',
    default: "yorkejohn.dev :: John's Personal Website"
  },
  description: 'Portfolio and developer tools website.',
  openGraph: {
    type: 'website',
    siteName: 'yorkejohn.dev',
    url: 'https://yorkejohn.dev',
    images: [{url: '/avatar.jpg', alt: 'OG Image'}]
  }
}

const htmlClasses = cn('h-full', 'antialiased', 'font-sans', ...fonts, 'dark')

export default function RootLayout({children}: LayoutProps) {
  return (
    <html lang="en" className={htmlClasses}>
      {children}
    </html>
  )
}
