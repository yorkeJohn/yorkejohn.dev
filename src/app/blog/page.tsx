import type {Metadata} from 'next'
import {BlogPage} from '@/components/pages'
import {getPosts} from '@/posts'

export const metadata: Metadata = {
  title: 'Dev Blog'
}

export default async function Page() {
  const posts = await getPosts()
  return <BlogPage posts={posts} />
}
