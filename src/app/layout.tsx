import type {Metadata} from 'next'
import {fonts} from '@/lib/fonts'
import type {LayoutProps} from '@/lib/types'
import {cn} from '@/lib/utils'

import './globals.css'
import './typography.css'
import {SITE_NAME, SITE_URL} from '@/lib/constants'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s :: ${SITE_NAME}`,
    default: `${SITE_NAME} :: John's Personal Website`
  },
  description: 'Portfolio and developer tools website.',
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    url: SITE_URL,
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
