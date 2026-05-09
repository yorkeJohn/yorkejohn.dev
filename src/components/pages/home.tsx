'use client'

import {CaretDownIcon} from '@phosphor-icons/react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import {useEffect, useRef, useState} from 'react'
import {Anchor, Footer, Nav, ShieldBadge} from '@/components'
import About from '@/content/about.mdx'
import avatar from './avatar.jpg'

const Starry = dynamic(() => import('@/components/starry').then(mod => mod.Starry), {ssr: false})

export function HomePage() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const [entry] = entries
      setVisible(!entry.isIntersecting)
    })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const scroll = () => {
    if (ref.current) {
      ref.current.scrollIntoView({behavior: 'smooth'})
    }
  }

  return (
    <body>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 bg-card border z-10 w-[calc(100%-2rem)] sm:w-auto">
        <Nav />
      </header>
      <main className="relative z-0">
        <div className="w-full h-full fixed -z-10 bg-[#000a14]">
          <Starry />
        </div>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <Image width={128} height={128} className="rounded-full" src={avatar} alt="John's Avatar" />
          <h1 className="font-heading font-bold text-[36pt] sm:text-[48pt]">John Yorke</h1>
          <p className="text-xs sm:text-base">Software & Data Engineer | Halifax, NS, Canada</p>

          <div className="flex gap-2">
            <Anchor href="https://github.com/yorkeJohn/">
              <ShieldBadge options={{text: 'GitHub', color: '8534F3', logo: 'github', logoColor: 'white'}} />
            </Anchor>
            <Anchor href="https://www.linkedin.com/in/yorkejohn/">
              <ShieldBadge options={{text: 'LinkedIn', color: '0077B5'}} />
            </Anchor>
            <Anchor href="https://discord.com/users/128378400803913728">
              <ShieldBadge options={{text: 'Discord', color: '5865F2', logo: 'discord', logoColor: 'white'}} />
            </Anchor>
          </div>
          {visible && (
            <button type="button" onClick={scroll} className="fixed bottom-0 left-1/2 -translate-1/2">
              <CaretDownIcon size={32} className="animate-bounce" />
            </button>
          )}
        </div>
        <div className="min-h-[calc(100vh-4.5rem)] mt-1 scroll-mt-18 px-4 flex flex-col" ref={ref}>
          <article className="typography mx-auto mb-8 flex-1">
            <About />
          </article>
          <Footer />
        </div>
      </main>
    </body>
  )
}
