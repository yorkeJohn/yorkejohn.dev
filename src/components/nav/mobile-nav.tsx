'use client'

import {CaretUpDownIcon, DotsThreeIcon} from '@phosphor-icons/react'
import Link from 'next/link'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger
} from '../ui'
import type {NavProps} from './nav'

export function MobileNav({data}: NavProps) {
  const items = data.map((item, index) => {
    // normal links
    if (item.type === 'link') {
      const {href, label} = item
      return (
        <Link key={index} href={href}>
          {label}
        </Link>
      )
    }

    // dropdowns
    if (item.type === 'dropdown') {
      const {label, content} = item
      return (
        <Collapsible key={index}>
          <CollapsibleTrigger className="cursor-pointer flex justify-between items-center w-full">
            <span>{label}</span>
            <CaretUpDownIcon size={16} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">{content}</CollapsibleContent>
        </Collapsible>
      )
    }

    return null
  })

  return (
    <nav>
      <Drawer direction="right">
        <DrawerTrigger className="fixed top-4 right-4 bg-card border z-10 w-8 h-8 flex items-center justify-center cursor-pointer">
          <DotsThreeIcon size={24} />
        </DrawerTrigger>
        <DrawerContent className="p-8">
          <div className="hidden">
            <DrawerTitle>Navigation</DrawerTitle>
            <DrawerDescription>Mobile navigation menu</DrawerDescription>
          </div>
          <div className="flex flex-col gap-4">{items}</div>
        </DrawerContent>
      </Drawer>
    </nav>
  )
}
