'use client'

import {DesktopNav} from './desktop-nav'
import {MobileNav} from './mobile-nav'

type NavLinkProps = {type: 'link'; label: string; href: string}

type NavDropdownProps = {
  type: 'dropdown'
  label: string
  content: React.ReactNode
}

type NavItem = NavLinkProps | NavDropdownProps

export type NavProps = {data: Array<NavItem>}

// navigation definition - shared between desktop and mobile nav components
const data: Array<NavItem> = [
  {type: 'link', label: 'Homepage', href: '/'},
  {type: 'link', label: 'Projects', href: '/projects'},
  {
    type: 'dropdown',
    label: 'Developer Tools',
    content: <div className="w-96">All of my dev tools here!</div>
  }
]

export function Nav() {
  return (
    <header>
      <div className="sm:hidden">
        <MobileNav data={data} />
      </div>
      <div className="hidden sm:block">
        <DesktopNav data={data} />
      </div>
    </header>
  )
}
