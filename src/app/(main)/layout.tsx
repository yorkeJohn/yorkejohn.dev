import {Footer, Nav} from '@/components'
import {Toaster} from '@/components/ui/sonner'
import type {LayoutProps} from '@/lib/types'

export default function Layout({children}: LayoutProps) {
  return (
    <body className="min-h-screen flex flex-col">
      <Toaster />
      <header className="m-4 sm:mx-auto sm:w-fit bg-card border z-10">
        <Nav />
      </header>
      <main className="flex-1 px-4 container mx-auto">{children}</main>
      <Footer />
    </body>
  )
}
