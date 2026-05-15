'use client'

import {useInterval} from '@mantine/hooks'
import {ArrowRightIcon, ClockIcon, CloudIcon, MapPinIcon} from '@phosphor-icons/react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import type React from 'react'
import {useState} from 'react'
import {Footer, Nav} from '@/components'
import {Marquee} from '../marquee'
import {Badge, Button} from '../ui'
import taintedMagic from './projects/images/tainted-magic.png'

const Starry = dynamic(() => import('@/components/starry').then(mod => mod.Starry), {ssr: false})

type Stat = {
  label: React.ReactNode
  stat: React.ReactNode
}

function HfxTime() {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Halifax',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
  const [time, setTime] = useState<string>(formatter.format(new Date()))
  useInterval(() => setTime(formatter.format(new Date())), 1000, {autoInvoke: true})
  return <span>{time} AST</span>
}

const stats: Stat[] = [
  {label: 'Building things since', stat: '2015'},
  {label: '3 languages spoken', stat: 'English - Français (French) - 日本語 (Japanese)'},
  {label: 'Minecraft mod downloads', stat: '2.5M+'},
  {label: 'Hobbies', stat: 'Gaming - Bodybuilding - Hiking - Food'},
  {label: 'Listening to', stat: 'Green Day'},
  {label: 'Unfinished side projects', stat: 'Infinite'}
]

export function HomePage() {
  const marqueeItems = stats.map((item, index) => {
    const {label, stat} = item
    return (
      <Badge key={index} variant="outline" className="mx-1 font-mono">
        {label}:<span className="ms-1 text-lime-300">{stat}</span>
      </Badge>
    )
  })

  return (
    <body>
      <main className="relative z-0">
        <div className="w-full h-full fixed -z-10 bg-[#000a14]">
          <Starry />
        </div>
        <div className="min-h-screen flex flex-col px-4">
          <div className="container mx-auto flex-1">
            <div className="mt-4 mb-20 sticky top-4">
              <div className="flex justify-between">
                <Nav />
                <div className="flex gap-1">
                  <Badge variant="outline" className="font-mono text-amber-200">
                    <MapPinIcon data-icon="inline-start" />
                    Halifax, NS
                  </Badge>
                  <Badge variant="outline" className="font-mono text-amber-200">
                    <ClockIcon data-icon="inline-start" />
                    <HfxTime />
                  </Badge>
                  <Badge variant="outline" className="font-mono text-amber-200">
                    10&deg;C
                    <CloudIcon data-icon="inline-end" />
                  </Badge>
                </div>
              </div>
            </div>

            <div className="text-[96pt] font-semibold leading-[0.8] mb-20 tracking-tight font-heading">
              <span className="text-muted-foreground">Welcome to</span>
              <br />
              <span className="text-lime-300">yorkejohn.dev</span>
            </div>

            <div className="flex gap-12 items-start">
              <div className="border border-lime-600 p-1">
                <Image width={200} height={200} loading="eager" src="/avatar.jpg" alt="John's Avatar" />
              </div>
              <div className="text-muted-foreground text-2xl tracking-tighter max-w-[45ch] -mt-1">
                <p className="mb-4">
                  Hey there! My name is John. I'm a software & data engineer based in Halifax, Nova Scotia, Canada.
                </p>
                <p>This is my personal corner of the internet where I share my projects and what I'm learning.</p>
              </div>
            </div>
            <div className="my-8">
              <div className="font-mono text-lime-600 mb-1">/ STATS</div>
              <hr className="border-lime-600" />
              <Marquee items={marqueeItems} className="py-2" />
            </div>
            <div className="my-8">
              <div className="font-mono text-lime-600 mb-1">/ FEATURED PROJECT</div>
              <hr className="border-lime-600 mb-4" />

              <div className="flex gap-4">
                <div className="bg-muted-foreground text-black w-fit px-1 pb-1">
                  <div className="font-mono text-center text-[8pt] uppercase">[ taintedmagic.png ]</div>
                  <Image src={taintedMagic} alt="" height={300} className="border" />
                </div>
                <div className="flex flex-col justify-between flex-1 group cursor-pointer">
                  <div className="flex items-start gap-2">
                    <div className="font-heading tracking-tight text-4xl font-semibold group-hover:bg-lime-300 group-hover:text-black">
                      Tainted Magic
                    </div>
                    <span className="text-amber-200">(2015)</span>
                  </div>
                  <div>
                    <div className="flex gap-1 mb-2">
                      <Badge
                        variant="outline"
                        className="group-hover:bg-lime-300 group-hover:text-black transition-none"
                      >
                        Personal
                      </Badge>
                      <Badge variant="outline">Java</Badge>
                      <Badge variant="outline">Minecraft Mod</Badge>
                    </div>
                    <div className="text-xl text-muted-foreground mb-4 max-w-[60ch] group-hover:bg-lime-300 group-hover:text-black">
                      Tainted Magic is a Minecraft mod and addon to Thaumcraft 4, with over 1.5 million downloads. The
                      mod adds many useful items and gear for both early and endgame Thaumaturges.
                    </div>
                    {/* <Badge asChild variant="ghost">
                      <Anchor>
                        GitHub
                        <ArrowUpRightIcon data-icon="inline-end" />
                      </Anchor>
                    </Badge> */}
                    <Button asChild variant="default" className="w-full">
                      <Link href="/projects">
                        All Projects
                        <ArrowRightIcon data-icon="inline-end" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </main>
    </body>
  )
}
