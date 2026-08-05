import {PageSection} from '@/components'
import {ActivityFeed} from './activity-feed'
import {Background} from './background'
import {Featured} from './featured'
import {StatsMarquee} from './stats-marquee'
import {TopArtists} from './top-artists'

export function HomePage() {
  return (
    <section>
      <Background />
      <div className="my-12 font-heading text-[55pt] leading-[0.8] tracking-tight md:my-20 md:text-[72pt] lg:text-[96pt]">
        <div className="text-muted">
          John&nbsp;
          <br className="sm:hidden" />
          Yorke
        </div>
        <div className="text-right text-accent-foreground sm:text-left">
          yorke
          <br className="sm:hidden" />
          john.dev
        </div>
      </div>

      <div className="mb-16 text-balance text-muted text-xl tracking-tight md:max-w-3/4 md:text-2xl lg:text-3xl">
        <p>Welcome to my personal corner of the internet where I share my projects and what I'm learning.</p>
      </div>

      <div className="flex flex-col gap-16">
        <PageSection label="Stats">
          <StatsMarquee />
        </PageSection>

        <Featured />

        <PageSection label="Recent Activity">
          <ActivityFeed />
        </PageSection>

        <PageSection label="Listening To">
          <TopArtists />
        </PageSection>
      </div>
    </section>
  )
}
