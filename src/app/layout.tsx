import type {Metadata} from 'next'
import {ThemeProvider} from 'next-themes'
import {Cursor, Footer, Header, Nav, Sounds} from '@/components/layout'
import {cn} from '@/lib/cn'
import {SITE_NAME, SITE_URL} from '@/lib/constants'
import {fonts} from '@/lib/fonts'
import {themes} from '@/lib/themes'

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
    images: [{url: '/og-image.png', alt: 'OG Image'}]
  },
  other: {'google-site-verification': 'TwPlurVt4Z3Q15zY5V0ss2_kP6manPGCPycEKNGIhPA'}
}

const htmlClasses = cn('h-full', 'antialiased', 'font-sans', ...fonts)

export default function RootLayout({children}: React.PropsWithChildren) {
  return (
    <html lang="en" className={htmlClasses} suppressHydrationWarning>
      <Sounds />
      <body>
        <ThemeProvider defaultTheme="space" enableSystem={false} themes={themes}>
          <Cursor />
          <main className="min-h-dvh px-4 container mx-auto pb-12 md:pb-16">
            <Header />
            <Nav />
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
