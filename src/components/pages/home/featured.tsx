import {ArrowRightIcon} from '@phosphor-icons/react/dist/ssr'
import {formatInTimeZone} from 'date-fns-tz'
import Link from 'next/link'
import {use} from 'react'
import {Badge, Cta, PageSection} from '@/components'
import {ProjectCard} from '@/components/pages/projects/project-card'
import {projects} from '@/components/pages/projects/registry'
import {cn} from '@/lib/cn'
import {getPost, type PostMetadata} from '@/posts'

export function Featured() {
  const featuredPost = getPost('self-hosting-with-cloudflare-zero-trust')

  return (
    <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-8">
      <PageSection label="Featured Blog Post">
        <BlogPostCard featuredPost={featuredPost} className="h-full pt-4" />
      </PageSection>
      <PageSection label="Featured Project">
        <ProjectCard project={projects[9]} withCta hideImage className="h-full pt-4" />
      </PageSection>
    </div>
  )
}

type BlogPostCardProps = React.ComponentProps<'div'> & {
  featuredPost: Promise<PostMetadata | null>
}

function BlogPostCard({featuredPost, className, ...props}: BlogPostCardProps) {
  const post = use(featuredPost)
  if (!post) return null

  const {title, summary, date, readTime, topics, slug} = post
  const topicBadges = topics.map(topic => <Badge key={topic}>{topic}</Badge>)

  return (
    <div className={cn('flex flex-col justify-between', className)} {...props}>
      <div className="mb-8">
        <div className="mb-2 flex flex-col">
          <span className="text-accent-foreground text-xs">{formatInTimeZone(date, 'UTC', 'y.M.dd')}</span>
          <div className="font-semibold text-xl tracking-tight md:text-2xl lg:text-3xl">{title}</div>
        </div>
        <Link href={`/blog/${slug}`} className="interact:highlight">
          Read on <ArrowRightIcon className="inline" />
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <div className="max-w-[60ch] text-balance text-muted lg:text-lg">{summary}</div>
        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
          <div className="text-primary-foreground text-sm">Read Time:</div>
          <div className="text-muted text-sm">{readTime} min read</div>
          <div className="text-primary-foreground text-sm">Topics:</div>
          <div className="flex flex-wrap gap-0.5">{topicBadges}</div>
        </div>
        <Cta className="w-full md:max-w-100" asChild>
          <Link href="/blog">
            All blog posts
            <ArrowRightIcon />
          </Link>
        </Cta>
      </div>
    </div>
  )
}
