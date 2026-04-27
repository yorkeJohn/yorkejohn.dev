import {Nav} from '@/components'
import type {LayoutProps} from '@/lib/types'

export default function Layout({children}: LayoutProps) {
  return (
    <body>
      <header className="m-4 sm:mx-auto sm:w-fit bg-card border z-10">
        <Nav />
      </header>
      {children}
    </body>
  )
}
