'use client'

import {useMounted} from '@mantine/hooks'
import dynamic from 'next/dynamic'
import {useTheme} from 'next-themes'
import {PageSection} from '@/components'
import {ProjectCard} from '@/components/pages'
import {projects} from '@/components/pages/projects/registry'
import {ActivityFeed} from './activity-feed'
import {StatsMarquee} from './stats-marquee'
import {TopArtists} from './top-artists'

// background for space theme
const SpaceBackground = dynamic(() => import('./space-background'), {ssr: false})

export function HomePage() {
  const {theme} = useTheme()
  const mounted = useMounted()

  return (
    <section>
      {mounted && theme === 'space' && <SpaceBackground />}
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

      <div className="flex flex-col gap-8">
        <PageSection label="Stats">
          <StatsMarquee />
        </PageSection>

        <PageSection label="Featured Project">
          <ProjectCard project={projects[9]} withCta className="pt-4" />
        </PageSection>

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
