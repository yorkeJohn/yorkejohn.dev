'use client'

import {CaretUpDownIcon, DotsThreeIcon, XIcon} from '@phosphor-icons/react'
import Link from 'next/link'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Drawer,
  DrawerClose,
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
        <DrawerClose asChild key={index}>
          <Link href={href}>{label}</Link>
        </DrawerClose>
      )
    }

    // dropdowns
    if (item.type === 'dropdown') {
      const {label, data, href, cta} = item
      const items = data.map((item, index) => {
        const {href, label, Icon} = item
        return (
          <DrawerClose asChild key={index}>
            <Link href={href} className="flex flex-col items-start">
              <div className="flex gap-2 items-center">
                {Icon && <Icon size={12} />}
                <span>{label}</span>
              </div>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </Link>
          </DrawerClose>
        )
      })

      return (
        <Collapsible key={index}>
          <CollapsibleTrigger className="cursor-pointer flex justify-between items-center w-full">
            <span>{label}</span>
            <CaretUpDownIcon size={16} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 ps-4 overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up ease-in-out">
            <div className="flex flex-col gap-6">
              {items}
              <DrawerClose asChild>
                <Link href={href} className="text-sm text-blue-200">
                  {cta} &rarr;
                </Link>
              </DrawerClose>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )
    }

    return null
  })

  return (
    <div className="flex justify-between h-9 px-4 items-center">
      <Link href="/" className="text-sm text-muted-foreground font-bold cursor-pointer">
        yorkejohn.dev
      </Link>
      <Drawer direction="right">
        <DrawerTrigger className=" cursor-pointer">
          <DotsThreeIcon size={24} />
        </DrawerTrigger>
        <DrawerContent className="p-8">
          <div className="hidden">
            <DrawerTitle>Navigation</DrawerTitle>
            <DrawerDescription>Mobile navigation menu</DrawerDescription>
          </div>
          <div className="flex justify-between mb-12">
            <Link href="/" className="text-muted-foreground font-bold cursor-pointer">
              yorkejohn.dev
            </Link>
            <DrawerClose className="cursor-pointer">
              <XIcon size={24} />
            </DrawerClose>
          </div>
          <div className="flex flex-col gap-8">{items}</div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
