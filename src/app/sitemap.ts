import type {MetadataRoute} from 'next'
import {SITE_URL} from '@/lib/constants'
import {getPosts} from '@/posts'

export const dynamic = 'force-static'

const toSitemapEntry = (path: string): MetadataRoute.Sitemap[number] => ({
  url: `${SITE_URL}${path}`,
  lastModified: new Date()
})

const staticPaths = ['/', '/projects/', '/privacy/', '/blog/'] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts()
  const blogPaths = posts.map(post => `/blog/${post.slug}/`)

  return [...staticPaths, ...blogPaths].map(toSitemapEntry)
}
