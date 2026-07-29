import {GithubLogoIcon, ShieldCheckIcon} from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import {Anchor, Badge, Cta} from '@/components'
import {REPO_URL} from '@/lib/constants'

export function Footer() {
  return (
    <footer className="px-4 container mx-auto">
      <div className="py-8 border-t grid md:grid-cols-2">
        <div className="w-80">
          <div className="text-xl text-primary-foreground mb-2">
            Self-hosted on Raspberry Pi 4B with Ubuntu & Docker.
          </div>
          <Cta className="w-full mb-4" asChild>
            <Anchor href={REPO_URL}>
              <GithubLogoIcon />
              Source code
            </Anchor>
          </Cta>
        </div>
        <Badge asChild className="font-mono [a]:interact:highlight mb-4 md:not-first:justify-self-end">
          <Link href="/privacy">
            <ShieldCheckIcon />
            Privacy Policy
          </Link>
        </Badge>
        <div className="font-mono text-sm text-muted">
          &copy; {new Date().getFullYear()} JOHN YORKE / {process.env.VERSION}
        </div>
      </div>
    </footer>
  )
}
