import type {Metadata} from 'next'
import {Footer, Header, Sounds} from '@/components/layout'
import {cn} from '@/lib/cn'
import {SITE_NAME, SITE_URL} from '@/lib/constants'
import {fonts} from '@/lib/fonts'
import type {LayoutProps} from '@/lib/types'

import './globals.css'
import './typography.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME} | John's Personal Website`
  },
  description: "My personal corner of the internet where I share my projects and what I'm learning.",
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    url: SITE_URL,
    images: [{url: '/og_image.jpg', alt: 'OG Image'}]
  }
}

const htmlClasses = cn('h-full', 'antialiased', 'font-sans', ...fonts, 'dark')

export default function RootLayout({children}: LayoutProps) {
  return (
    <html lang="en" className={htmlClasses}>
      <Sounds />
      <body className="min-h-screen flex flex-col">
        <div className="flex-1 px-4 container mx-auto">
          <Header />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
