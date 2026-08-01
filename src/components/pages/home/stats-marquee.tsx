'use client'

import {Badge, Marquee} from '@/components'

type Stat = {
  label: React.ReactNode
  stat: React.ReactNode
}

const stats: Stat[] = [
  {label: 'Building things since', stat: '2015'},
  {label: '3 languages', stat: 'English - Français (French) - 日本語 (Japanese)'},
  {label: 'Years of professional experience', stat: `${new Date().getFullYear() - 2021}+`},
  {label: 'Minecraft mod downloads', stat: '2.7M+'},
  {label: 'Hobbies', stat: 'Gaming - Bodybuilding - Hiking - Food'},
  {label: 'Unfinished side projects', stat: 'Infinite'},
  {label: 'Current role', stat: 'Senior Engineer @ RBCCM'}
]

export function StatsMarquee() {
  const items = stats.map((item, index) => {
    const {label, stat} = item
    return (
      <Badge key={index} variant="outline" className="mx-0.5">
        {label}:<span className="ms-1 text-accent-foreground">{stat}</span>
      </Badge>
    )
  })
  return <Marquee items={items} className="pt-2" />
}
