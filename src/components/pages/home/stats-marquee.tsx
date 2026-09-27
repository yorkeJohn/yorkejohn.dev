'use client'

import {Badge} from '@/components'
import {ModDownloads} from './mod-downloads'

type Stat = {
  label: React.ReactNode
  stat: React.ReactNode
}

const stats: Stat[] = [
  {label: 'Building things since', stat: '2015'},
  {label: '3 languages', stat: 'English - Français (French) - 日本語 (Japanese)'},
  {label: 'Years of professional experience', stat: `${new Date().getFullYear() - 2021}+`},
  {label: 'Minecraft mod downloads', stat: <ModDownloads />},
  {label: 'Hobbies', stat: 'Gaming - Bodybuilding - Hiking - Food'},
  {label: 'Unfinished side projects', stat: 'Infinite'},
  {label: 'Current role', stat: 'Senior Engineer @ RBCCM'}
]

const DURATION = 30

export function StatsMarquee() {
  const items = [...stats, ...stats].map((item, index) => {
    const {label, stat} = item
    return (
      <div key={index} className="shrink-0">
        <Badge variant="outline">
          {label}:<span className="ms-1 text-accent-foreground">{stat}</span>
        </Badge>
      </div>
    )
  })

  return (
    <div className="relative overflow-hidden whitespace-nowrap pt-2">
      <div className="hover:paused flex w-max animate-marquee gap-2" style={{animationDuration: `${DURATION}s`}}>
        {items}
      </div>
    </div>
  )
}
