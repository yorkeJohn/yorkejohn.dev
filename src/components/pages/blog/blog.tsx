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

      <div className="flex flex-col gap-4 lg:flex-row">
        <PageSection label="Filters" className="lg:sticky lg:top-13 lg:w-50 lg:self-start">
          <div className="pt-2">
            <FilterGroup label="Topic" field="topics" value={selected.topics} data={options.topics} onChange={toggle} />
          </div>
        </PageSection>

        <PageSection label="Articles" className="flex-1">
          {filtered.length === 0 && (
            <div className="pt-16 text-center text-primary-foreground text-sm">
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
      <CollapsibleTrigger className="group interact:highlight grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center py-2">
        <div className="pe-8 text-accent-foreground text-xs group-interact:text-inherit">
          {formatInTimeZone(date, 'UTC', 'y.M.dd')}
        </div>
        <div className="text-left text-lg md:truncate md:text-xl lg:text-2xl">{title}</div>
        <div className="px-1">
          <PlusIcon className="group-data-[state=open]:hidden" />
          <MinusIcon className="group-data-[state=closed]:hidden" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="py-2">
        <div className="mb-2 text-muted">{summary}</div>
        <div className="flex flex-wrap gap-0.5">
          <div className="pr-1 text-primary-foreground text-sm">Topic:</div>
          {topicBadges}
        </div>
        <Cta className="mt-4 w-full md:max-w-100" asChild>
          <Link href={`/blog/${slug}`}>
            Read on
            <ArrowRightIcon />
          </Link>
        </Cta>
      </CollapsibleContent>
    </Collapsible>
  )
}
