'use client'

import {ArrowRightIcon, MinusIcon, PlusIcon} from '@phosphor-icons/react'
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from '@radix-ui/react-collapsible'
import {formatInTimeZone} from 'date-fns-tz'
import Link from 'next/link'
import {Badge, Cta, FilterGroup, MegaHeading, PageSection} from '@/components'
import {useFilteredData} from '@/hooks'
import type {PostMetadata} from '@/posts'

const sortPostsByDateDesc = (a: PostMetadata, b: PostMetadata) => b.date.getTime() - a.date.getTime()

type BlogPageProps = {
  posts: PostMetadata[]
}

export function BlogPage({posts}: BlogPageProps) {
  const {filtered, options, selected, toggle} = useFilteredData({
    data: posts,
    selectors: {
      topics: p => p.topics
    }
  })

  const rows = filtered.sort(sortPostsByDateDesc).map(post => <PostRow key={post.slug} post={post} />)

  return (
    <section>
      <MegaHeading superText={filtered.length} margin>
        Blog
      </MegaHeading>

      <div className="flex flex-col lg:flex-row gap-4">
        <PageSection label="Filters" className="lg:w-50 lg:sticky lg:top-13 lg:self-start">
          <div className="pt-2">
            <FilterGroup label="Topic" field="topics" value={selected.topics} data={options.topics} onChange={toggle} />
          </div>
        </PageSection>

        <PageSection label="Articles" className="flex-1">
          {filtered.length === 0 && (
            <div className="text-center text-primary-foreground pt-16 text-sm">
              No posts found matching the selected filters
            </div>
          )}
          <div className="flex flex-col divide-y divide-dashed divide-accent">{rows}</div>
        </PageSection>
      </div>
    </section>
  )
}

function PostRow({post}: {post: PostMetadata}) {
  const {title, date, topics, slug, summary} = post

  const topicBadges = topics.map(topic => <Badge key={topic}>{topic}</Badge>)
  return (
    <Collapsible key={slug}>
      <CollapsibleTrigger className="w-full py-2 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center group interact:highlight">
        <div className="text-xs text-accent group-interact:text-inherit pe-8">
          {formatInTimeZone(date, 'UTC', 'y.M.dd')}
        </div>
        <div className="md:truncate text-lg md:text-xl lg:text-2xl text-left">{title}</div>
        <div className="px-1">
          <PlusIcon className="group-data-[state=open]:hidden" />
          <MinusIcon className="group-data-[state=closed]:hidden" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="py-2">
        <div className="text-muted mb-2">{summary}</div>
        <div className="flex gap-1 flex-wrap">
          <div className="text-primary-foreground text-sm pr-1">Topic:</div>
          {topicBadges}
        </div>
        <Cta className="md:max-w-100 w-full mt-4" asChild>
          <Link href={`/blog/${slug}`}>
            Read on
            <ArrowRightIcon />
          </Link>
        </Cta>
      </CollapsibleContent>
    </Collapsible>
  )
}
