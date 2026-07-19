'use client'

import {useHotkeys} from '@mantine/hooks'
import Image from 'next/image'
import Link from 'next/link'
import {usePathname, useRouter} from 'next/navigation'
import icon from '@/app/icon.svg'
import {Anchor, Badge} from '@/components'
import {cn} from '@/lib/cn'

type NavItem = {label: string; href: string; keybind: string}

const data: NavItem[] = [
  {label: 'Projects', href: '/projects', keybind: 'P'},
  {label: 'Blog', href: '/blog', keybind: 'B'},
  {label: 'GitHub', href: 'https://github.com/yorkeJohn', keybind: 'G'},
  {label: 'LinkedIn', href: 'https://linkedin.com/in/yorkejohn/', keybind: 'L'},
  {label: 'Discord', href: 'https://discord.com/users/128378400803913728', keybind: 'D'}
]

export function Nav() {
  const router = useRouter()
  const navigate = (href: string) => {
    href.startsWith('http') ? window.open(href, '_blank') : router.push(href)
  }

  useHotkeys(data.map(item => [item.keybind, () => navigate(item.href)]))

  const pathname = usePathname()

  const navLinks = data.map((item, index) => {
    const {href, label, keybind} = item
    const text = (
      <span>
        <span className="hidden sm:inline">[{keybind}]&nbsp;</span>
        {label}
      </span>
    )

    return (
      <Badge
        key={index}
        asChild
        className={cn(
          'font-mono [a]:interact:highlight',
          pathname.startsWith(href) && 'bg-accent-foreground text-background'
        )}
      >
        {href.startsWith('http') ? <Anchor href={href}>{text}</Anchor> : <Link href={href}>{text}</Link>}
      </Badge>
    )
  })

  return (
    <nav className="flex gap-1">
      <Badge asChild className="[a]:interact:bg-accent-foreground cursor-pointer">
        <Link href="/">
          <Image width={12} height={12} loading="eager" src={icon} alt="Home" />
        </Link>
      </Badge>
      {navLinks}
    </nav>
  )
}
