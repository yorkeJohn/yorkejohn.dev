'use client'

import dynamic from 'next/dynamic'
import {Anchor, Avatar, ShieldBadge} from '@/components'

const Starry = dynamic(() => import('@/components/starry').then(mod => mod.Starry), {ssr: false})

export function HomePage() {
  return (
    <main className="relative z-0">
      <div className="w-full h-full fixed -z-10 bg-[#030014]">
        <Starry />
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Avatar />
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
      </div>
    </main>
  )
}
