'use client'

import type React from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'

type NavLinkProps = {type: 'link'; label: string; href: string}
type NavDropdownProps = {
  type: 'dropdown'
  label: string
  content: React.ReactNode
}
type NavItem = NavLinkProps | NavDropdownProps

const DATA: NavItem[] = [
  {type: 'link', label: 'Homepage', href: '/'},
  {type: 'link', label: 'Projects', href: '/projects'},
  {
    type: 'dropdown',
    label: 'Developer Tools',
    content: <div className="w-96">All of my dev tools here!</div>
  }
]

export function Nav() {
  const items = DATA.map((item, index) => {
    if (item.type === 'link') {
      return <NavLinkProps key={index} {...item} />
    }
    if (item.type === 'dropdown') {
      return <NavDropdownProps key={index} {...item} />
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

function NavLinkProps({href, label}: NavLinkProps) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink href={href} className={navigationMenuTriggerStyle()}>
        {label}
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

function NavDropdownProps({label, content}: NavDropdownProps) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{label}</NavigationMenuTrigger>
      <NavigationMenuContent>{content}</NavigationMenuContent>
    </NavigationMenuItem>
  )
}
