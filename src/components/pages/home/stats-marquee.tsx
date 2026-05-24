'use client'

import {Badge, Marquee} from '@/components'

type Stat = {
  label: React.ReactNode
  stat: React.ReactNode
}

const stats: Stat[] = [
  {label: 'Building things since', stat: '2015'},
  {label: '3 languages', stat: 'English - Français (French) - 日本語 (Japanese)'},
  {label: 'Years of professional experience', stat: '5+'},
  {label: 'Minecraft mod downloads', stat: '2.5M+'},
  {label: 'Hobbies', stat: 'Gaming - Bodybuilding - Hiking - Food'},
  {label: 'Unfinished side projects', stat: 'Infinite'},
  {label: 'Currently focused on', stat: 'Data engineering'}
]

export function StatsMarquee() {
  const items = stats.map((item, index) => {
    const {label, stat} = item
    return (
      <Badge key={index} variant="outline" className="mx-1">
        {label}:<span className="ms-1 text-lime-300">{stat}</span>
      </Badge>
    )
  })
  return <Marquee items={items} className="pt-2" />
}
