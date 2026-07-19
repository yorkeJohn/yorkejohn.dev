'use client'

import {useIntersection} from '@mantine/hooks'
import {FileMdIcon, SparkleIcon} from '@phosphor-icons/react'
import {formatInTimeZone} from 'date-fns-tz'
import Link from 'next/link'
import {Badge, Cta} from '@/components'
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
    <main>
      <div
        className="my-8 md:my-12 lg:my-20 text-[48pt] md:text-[60pt] lg:text-[72pt] font-semibold leading-[0.8] tracking-tight font-heading text-muted"
        ref={ref}
      >
        {title}
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        <div className="lg:w-80 lg:sticky lg:top-13 lg:self-start ">
          {showSidebarTitle && (
            <div className="text-3xl font-heading text-muted tracking-tight font-semibold mb-8 mt-4">{title}</div>
          )}
          <PageSection label="Metadata" className="">
            <div className="pt-2 divide-y divide-dashed divide-accent">
              <div className="grid grid-cols-2 py-2 text-sm">
                <div className="text-accent">Date:</div>
                <div className="text-muted">{formatInTimeZone(date, 'UTC', 'y.M.dd')}</div>
              </div>

              <div className="grid grid-cols-2 py-2 text-sm">
                <div className="text-accent">Read Time:</div>
                <div className="text-muted">{readTime} min read</div>
              </div>

              <div className="grid grid-cols-2 py-2">
                <div className="text-sm text-accent">Topics:</div>
                <div className="flex flex-wrap gap-1">{topicBadges}</div>
              </div>

              {ai && (
                <div className="py-2">
                  <Badge className="w-full" variant="outline">
                    <SparkleIcon /> Contains AI-Generated Content
                  </Badge>
                </div>
              )}

              <Cta asChild className="w-full mt-4">
                <Link href={`/blog/${post.slug}.md`}>
                  <FileMdIcon />
                  View as markdown
                </Link>
              </Cta>
            </div>
          </PageSection>
        </div>

        <PageSection label="Article" className="flex-1">
          <div className="pt-8 typography">{children}</div>
        </PageSection>
      </div>
    </main>
  )
}
