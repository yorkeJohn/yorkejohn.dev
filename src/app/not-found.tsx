import {ArrowUpLeftIcon} from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import {PageSection} from '@/components'

export default function NotFound() {
  return (
    <main>
      <div className="text-[48pt] md:text-[60pt] lg:text-[72pt] font-semibold leading-[0.8] tracking-tight font-heading text-muted my-8 md:my-12 lg:my-20">
        404: Page Not Found
      </div>
      <PageSection label="Error">
        <div className="py-4 text-xl text-primary-foreground">
          The page that you have requested does not exist. Please verify the URL and try again.
        </div>
        <Link href="/" className="hover:bg-accent-foreground hover:text-background">
          <ArrowUpLeftIcon className="inline" />
          Back to safety
        </Link>
      </PageSection>
    </main>
  )
}
