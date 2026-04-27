'use client'

import {BracketsCurlyIcon, type Icon, PaletteIcon, TextTIcon} from '@phosphor-icons/react'
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

// navigation definition - shared between desktop and mobile nav components
const data: NavData = [
  {type: 'link', label: 'Homepage', href: '/'},
  {type: 'link', label: 'Projects', href: '/projects'},
  {
    type: 'dropdown',
    label: 'Developer Tools',
    href: '/devtools',
    cta: 'View all developer tools',
    data: [
      {
        label: 'JSON Formatter',
        href: '/devtools/json-formatter',
        description: 'Format and visualize JSON data',
        Icon: BracketsCurlyIcon
      },
      {
        label: 'Regex Tester',
        href: '/devtools/regex-tester',
        description: 'Test and debug regular expressions',
        Icon: TextTIcon
      },
      {
        label: 'Color Picker',
        href: '/devtools/color-picker',
        description: 'Pick and convert colors in various formats',
        Icon: PaletteIcon
      }
    ]
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
