import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {ArticlePage} from '@/components/pages'
import {getPost, getPosts} from '@/posts'

type PageParams = {
  params: Promise<{slug: string}>
}

export async function generateMetadata({params}: PageParams): Promise<Metadata | null> {
  const {slug} = await params
  const post = await getPost(slug)
  if (!post) return null
  return {title: post.title}
}

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map(post => ({slug: post.slug}))
}

export default async function Page({params}: PageParams) {
  const {slug} = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const Content = await import(`@/../public/blog/${slug}.md`).then(mod => mod.default)

  return (
    <ArticlePage post={post}>
      <Content />
    </ArticlePage>
  )
}
