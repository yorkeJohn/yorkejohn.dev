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
      const {label, data, href, cta} = item
      const items = data.map((item, index) => {
        const {href, label, Icon} = item
        return (
          <NavigationMenuItem key={index}>
            <NavigationMenuLink asChild>
              <Link href={href} className="flex flex-col items-start">
                <div className="flex gap-2 items-center">
                  {Icon && <Icon size={12} />}
                  <span>{label}</span>
                </div>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )
      })

      return (
        <NavigationMenuItem key={index}>
          <NavigationMenuTrigger>{label}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-96">
              <ul className="grid grid-cols-2 gap-2">{items}</ul>
              <div className="flex justify-end mt-4 p-2">
                <Link href={href} className="text-sm text-blue-500">
                  {cta} &rarr;
                </Link>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      )
    }
    return null
  })

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <div className="px-4 text-sm font-bold text-muted-foreground">yorkejohn.dev</div>
        </NavigationMenuItem>
        {items}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
