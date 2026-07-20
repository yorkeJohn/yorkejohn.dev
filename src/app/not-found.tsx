import {ArrowUpLeftIcon} from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import {MegaHeading, PageSection} from '@/components'

export default function NotFound() {
  return (
    <main>
      <MegaHeading margin>404: Page Not Found</MegaHeading>
      <PageSection label="Error">
        <div className="py-4 text-xl text-primary-foreground">
          The page that you have requested does not exist. Please verify the URL and try again.
        </div>
        <Link href="/" className="interact:highlight">
          <ArrowUpLeftIcon className="inline" />
          Back to safety
        </Link>
      </PageSection>
    </main>
  )
}
