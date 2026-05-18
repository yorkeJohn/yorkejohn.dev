import type {MetadataRoute} from 'next'
import {SITE_URL} from '@/lib/constants'

export const dynamic = 'force-static'

const toSitemapEntry = (path: string): MetadataRoute.Sitemap[number] => ({
  url: `${SITE_URL}${path}`,
  lastModified: new Date()
})

const staticPaths = ['/', '/projects/'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...staticPaths]
  return paths.map(toSitemapEntry)
}
