'use client'

import {ArrowRightIcon, ArrowUpRightIcon, ImageIcon} from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'
import type React from 'react'
import {Anchor, Badge, Cta, DraggableWindow} from '@/components'
import {cn} from '@/lib/cn'
import type {Project} from './registry'

type ProjectCardProps = {
  project: Project
  withCta?: boolean
} & React.ComponentProps<'div'>

export function ProjectCard({project, withCta, className, ...rest}: ProjectCardProps) {
  const {title, description, image, links = [], badges = [], startYear, type} = project
  const imageTitle = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '')}.png`

  const linkElements = links.map(link => (
    <Anchor key={link.url} href={link.url} className="interact:highlight">
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
    <div className={cn('flex gap-4 flex-col md:flex-row', className)} {...rest}>
      <DraggableWindow type="snap" title={imageTitle} iconLeft={ImageIcon}>
        <Image src={image} alt={title} width={400} className="pointer-events-none" />
      </DraggableWindow>

      <div className="flex flex-col justify-between flex-1">
        <div className="mb-8">
          <div className="flex flex-col mb-2">
            <span className="text-primary-foreground">({startYear})</span>
            <div className="font-heading tracking-tight text-3xl lg:text-4xl font-semibold">{title}</div>
          </div>
          <div className="flex gap-2">{linkElements}</div>
        </div>
        <div>
          <div className="flex gap-1 mb-2 flex-wrap">
            <Badge>{type}</Badge>
            {badgeElements}
          </div>
          <div className="text-lg lg:text-xl text-muted max-w-[60ch]">{description}</div>
          {withCta && (
            <Cta className="md:max-w-100 w-full mt-2" asChild>
              <Link href="/projects">
                All projects
                <ArrowRightIcon />
              </Link>
            </Cta>
          )}
        </div>
      </div>
    </div>
  )
}
