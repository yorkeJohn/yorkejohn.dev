'use client'

import type {Icon} from '@phosphor-icons/react'
import {devtools} from '../pages/devtools'
import {DesktopNav} from './desktop-nav'
import {MobileNav} from './mobile-nav'

type NavLink = {type: 'link'; label: string; href: string}

type DropdownData = {
  label: string
  href: string
  description: string
  Icon?: Icon
}

type NavDropdown = {
  type: 'dropdown'
  label: string
  href: string
  cta: string
  data: Array<DropdownData>
}

type NavData = Array<NavLink | NavDropdown>

export type NavProps = {data: NavData}

export const devtoolsData: Array<DropdownData> = devtools.slice(0, 9).map(dt => {
  const {label, description, slug, Icon} = dt
  return {label, description, href: `/devtools/${slug}`, Icon}
})

// navigation definition - shared between desktop and mobile nav components
const data: NavData = [
  {type: 'link', label: 'Projects', href: '/projects'},
  {
    type: 'dropdown',
    label: 'Developer Tools',
    href: '/devtools',
    cta: 'View all developer tools',
    data: devtoolsData
  }
]

export function Nav() {
  return (
    <nav>
      <div className="sm:hidden">
        <MobileNav data={data} />
      </div>
      <div className="hidden sm:block">
        <DesktopNav data={data} />
      </div>
    </nav>
  )
}
