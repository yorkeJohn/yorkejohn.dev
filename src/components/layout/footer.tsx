import {GithubLogoIcon, ShieldCheckIcon} from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import {Anchor, Badge, Cta} from '@/components'
import {REPO_URL} from '@/lib/constants'

export function Footer() {
  return (
    <footer className="container mx-auto px-4">
      <div className="grid border-t py-12 md:grid-cols-2 md:py-16">
        <div className="mb-4 w-80">
          <div className="mb-2 text-primary-foreground md:text-lg lg:text-xl">
            Self-hosted on Raspberry Pi 4B with Ubuntu & Docker.
          </div>
          <Cta className="w-full" asChild>
            <Anchor href={REPO_URL}>
              <GithubLogoIcon />
              Source code
            </Anchor>
          </Cta>
        </div>
        <Badge
          asChild
          className="[a]:interact:highlight mb-4 font-mono md:not-first:justify-self-end"
          variant="outline"
        >
          <Link href="/privacy">
            <ShieldCheckIcon />
            Privacy Policy
          </Link>
        </Badge>
        <div className="font-mono text-muted text-sm">
          &copy; {new Date().getFullYear()} JOHN YORKE / {process.env.VERSION}
        </div>
      </div>
    </footer>
  )
}
