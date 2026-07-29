import {FileMdIcon} from '@phosphor-icons/react/dist/ssr'
import {formatInTimeZone} from 'date-fns-tz'
import Link from 'next/link'
import {z} from 'zod'
import {Cta, MegaHeading, PageSection} from '@/components'
import {default as Content, metadata} from '~/privacy.md'

const PrivacyMetadataSchema = z.object({
  lastUpdated: z.coerce.date()
})

export function PrivacyPage() {
  const {lastUpdated} = PrivacyMetadataSchema.parse(metadata)

  return (
    <section>
      <MegaHeading margin>Privacy Policy</MegaHeading>

      <div className="flex flex-col lg:flex-row gap-8">
        <PageSection label="Metadata" className="lg:w-80 lg:sticky lg:top-13 lg:self-start">
          <div className="pt-2 divide-y divide-dashed divide-accent">
            <div className="grid grid-cols-2 py-2 text-sm">
              <div className="text-accent">Last Updated:</div>
              <div className="text-muted">{formatInTimeZone(lastUpdated, 'UTC', 'y.M.dd')}</div>
            </div>

            <Cta asChild className="w-full mt-4">
              <Link href="/privacy.md">
                <FileMdIcon />
                View as markdown
              </Link>
            </Cta>
          </div>
        </PageSection>

        <PageSection label="Legal Information" className="flex-1">
          <article className="pt-8 typography">
            <Content />
          </article>
        </PageSection>
      </div>
    </section>
  )
}
