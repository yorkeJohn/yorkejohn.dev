'use client'

import {useIntersection} from '@mantine/hooks'
import {FileMdIcon, SparkleIcon} from '@phosphor-icons/react'
import {formatInTimeZone} from 'date-fns-tz'
import Link from 'next/link'
import {Badge, Cta, MegaHeading} from '@/components'
import {PageSection} from '@/components/page-section'
import type {PostMetadata} from '@/posts'

type ArticlePageProps = {
  post: PostMetadata
  children: React.ReactNode
}

export function ArticlePage({post, children}: ArticlePageProps) {
  const {title, date, readTime, topics, ai} = post
  const topicBadges = topics.map(topic => <Badge key={topic}>{topic}</Badge>)
  const {ref, entry} = useIntersection()

  const showSidebarTitle = entry !== null && !entry.isIntersecting

  return (
    <section>
      <MegaHeading margin ref={ref}>
        {title}
      </MegaHeading>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="lg:sticky lg:top-13 lg:w-80 lg:self-start">
          {showSidebarTitle && (
            <div className="mt-4 mb-8 hidden font-heading font-semibold text-3xl text-muted tracking-tight lg:block">
              {title}
            </div>
          )}
          <PageSection label="Metadata">
            <div className="divide-y divide-dashed divide-accent pt-2">
              <div className="grid grid-cols-2 py-2 text-sm">
                <div className="text-accent">Date:</div>
                <div className="text-muted">{formatInTimeZone(date, 'UTC', 'y.M.dd')}</div>
              </div>

              <div className="grid grid-cols-2 py-2 text-sm">
                <div className="text-accent">Read Time:</div>
                <div className="text-muted">{readTime} min read</div>
              </div>

              <div className="grid grid-cols-2 py-2">
                <div className="text-accent text-sm">Topics:</div>
                <div className="flex flex-wrap gap-0.5">{topicBadges}</div>
              </div>

              {ai && (
                <div className="py-2">
                  <Badge className="w-full" variant="outline">
                    <SparkleIcon /> Contains AI-Generated Content
                  </Badge>
                </div>
              )}

              <Cta asChild className="mt-4 w-full">
                <Link href={`/blog/${post.slug}.md`}>
                  <FileMdIcon />
                  View as markdown
                </Link>
              </Cta>
            </div>
          </PageSection>
        </div>

        <PageSection label="Article" className="flex-1">
          <article className="typography pt-8">{children}</article>
        </PageSection>
      </div>
    </section>
  )
}
