import {Nav} from '@/components/nav/nav'
import {HomePage} from '@/components/pages'

export default function Page() {
  return (
    <body>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 bg-card border z-10 w-[calc(100%-2rem)] sm:w-auto">
        <Nav />
      </header>
      <HomePage />
    </body>
  )
}
