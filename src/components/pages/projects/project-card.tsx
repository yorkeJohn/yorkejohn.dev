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
  hideImage?: boolean
} & React.ComponentProps<'div'>

export function ProjectCard({project, withCta, hideImage, className, ...rest}: ProjectCardProps) {
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
    <div className={cn('flex flex-col gap-4 md:flex-row', className)} {...rest}>
      {!hideImage && (
        <DraggableWindow type="snap" title={imageTitle} iconLeft={ImageIcon}>
          <Image src={image} alt={title} width={400} className="pointer-events-none" />
        </DraggableWindow>
      )}

      <div className="flex flex-1 flex-col justify-between">
        <div className="mb-8">
          <div className="mb-2 flex flex-col">
            <span className="text-accent-foreground text-xs">{startYear}</span>
            <div className="font-semibold text-xl tracking-tight md:text-2xl lg:text-3xl">{title}</div>
          </div>
          <div className="flex gap-2">{linkElements}</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="max-w-[60ch] text-balance text-muted lg:text-lg">{description}</div>
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
            <div className="text-primary-foreground text-sm">Project Type:</div>
            <Badge>{type}</Badge>
            <div className="text-primary-foreground text-sm">Tags:</div>
            <div className="flex flex-wrap gap-0.5">{badgeElements}</div>
          </div>
          {withCta && (
            <Cta className="w-full md:max-w-100" asChild>
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
