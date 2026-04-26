'use client'

import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import type {NavProps} from './nav'

export function DesktopNav({data}: NavProps) {
  const items = data.map((item, index) => {
    // normal links
    if (item.type === 'link') {
      const {href, label} = item
      return (
        <NavigationMenuItem key={index}>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={href}>{label}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      )
    }
    // dropdowns
    if (item.type === 'dropdown') {
      const {label, content} = item
      return (
        <NavigationMenuItem key={index}>
          <NavigationMenuTrigger>{label}</NavigationMenuTrigger>
          <NavigationMenuContent>{content}</NavigationMenuContent>
        </NavigationMenuItem>
      )
    }
    return null
  })

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 bg-card border z-10">
      <NavigationMenu>
        <NavigationMenuList>{items}</NavigationMenuList>
      </NavigationMenu>
    </nav>
  )
}
