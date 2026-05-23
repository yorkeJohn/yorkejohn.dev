import type {Metadata} from 'next'
import {Cursor, Footer, Header, Sounds} from '@/components/layout'
import {cn} from '@/lib/cn'
import {SITE_NAME, SITE_URL} from '@/lib/constants'
import {fonts} from '@/lib/fonts'

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
    images: [{url: '/og-image.jpg', alt: 'OG Image'}]
  },
  other: {'google-site-verification': 'TwPlurVt4Z3Q15zY5V0ss2_kP6manPGCPycEKNGIhPA'}
}

const htmlClasses = cn('h-full', 'antialiased', 'font-sans', ...fonts, 'dark')

type LayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function RootLayout({children}: LayoutProps) {
  return (
    <html lang="en" className={htmlClasses}>
      <Sounds />
      <body className="min-h-screen flex flex-col">
        <Cursor />
        <div className="flex-1 px-4 container mx-auto">
          <Header />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
