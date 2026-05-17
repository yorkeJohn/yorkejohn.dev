import {ArrowUpLeftIcon} from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import {PageSection} from '@/components'

export default function NotFound() {
  return (
    <main>
      <div className="text-[72pt] font-semibold leading-[0.8] tracking-tight font-heading text-muted-foreground my-20">
        404: Page Not Found
      </div>
      <PageSection label="Error">
        <div className="py-4 text-xl text-amber-200">
          The page that you have requested does not exist. Please verify the URL and try again.
        </div>
        <Link href="/" className="hover:bg-lime-300 hover:text-black">
          <ArrowUpLeftIcon className="inline" />
          Back to safety
        </Link>
      </PageSection>
    </main>
  )
}
