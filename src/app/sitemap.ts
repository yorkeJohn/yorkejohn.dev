import type {MetadataRoute} from 'next'
import {devtools} from '@/components/pages'
import {SITE_URL} from '@/lib/constants'

const toSitemapEntry = (path: string): MetadataRoute.Sitemap[number] => ({
  url: `${SITE_URL}${path}`,
  lastModified: new Date()
})

const staticPaths = ['/', '/projects', '/devtools'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...staticPaths, ...devtools.map(dt => `/devtools/${dt.slug}`)]
  return paths.map(toSitemapEntry)
}
