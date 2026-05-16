'use client'

import {ArrowUpRightIcon} from '@phosphor-icons/react'
import Image from 'next/image'
import type React from 'react'
import {Anchor} from '@/components'
import {Badge} from '@/components/ui'
import {cn} from '@/lib/utils'
import type {Project} from './registry'

type ProjectCardProps = {
  project: Project
} & React.ComponentProps<'div'>

export function ProjectCard({project, children, className, ...rest}: ProjectCardProps) {
  const {title, description, image, links = [], badges = [], startYear, type} = project
  const imageFile = title.toLowerCase().replace(/[^a-z0-9]+/g, '')

  const linkElements = links.map(link => (
    <Anchor key={link.url} href={link.url} className=" hover:bg-lime-300 hover:text-black">
      {link.label}
      <ArrowUpRightIcon className="inline" />
    </Anchor>
  ))

  const badgeElements = badges.map(badge => (
    <Badge key={badge} variant="outline">
      {badge}
    </Badge>
  ))

  return (
    <div className={cn('flex gap-4', className)} {...rest}>
      <div className="bg-muted-foreground text-black w-fit px-1 pb-1">
        <div className="font-mono text-center text-[8pt] uppercase">[ {imageFile}.png ]</div>
        <Image src={image} alt={title} width={400} className="border" />
      </div>
      <div className="flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-start gap-2 mb-2">
            <div className="font-heading tracking-tight text-4xl font-semibold">{title}</div>
            <span className="text-amber-200">({startYear})</span>
          </div>
          <div className="flex gap-2">{linkElements}</div>
        </div>
        <div>
          <div className="flex gap-1 mb-2">
            <Badge className="text-amber-100">{type}</Badge>
            {badgeElements}
          </div>
          <div className="text-xl text-muted-foreground max-w-[60ch]">{description}</div>
          {children}
        </div>
      </div>
    </div>
  )
}
