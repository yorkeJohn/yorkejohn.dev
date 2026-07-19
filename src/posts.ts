import 'server-only'

import fs from 'node:fs/promises'
import path from 'node:path'
import {glob} from 'glob'
import {ZodError, z} from 'zod'

const PostMetadataSchema = z.object({
  title: z.string(),
  summary: z.string(),
  date: z.coerce.date(),
  topics: z.array(z.string()).min(1),
  ai: z.boolean().default(false)
})

export type PostMetadata = z.infer<typeof PostMetadataSchema> & {
  slug: string
  readTime: number
}

async function getReadTime(file: string): Promise<number> {
  const content = await fs.readFile(file, 'utf8')
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200)) // assume 200 wpm reading speed
}

export async function getPosts(): Promise<PostMetadata[]> {
  const files = await glob('public/blog/*.md')
  const promises = files.map(file => getPost(path.basename(file, '.md')))
  const posts = await Promise.all(promises)
  return posts.filter(post => post !== null)
}

export async function getPost(slug: string): Promise<PostMetadata | null> {
  try {
    const mod = await import(`../public/blog/${slug}.md`)
    const metadata = PostMetadataSchema.parse(mod.metadata)
    const readTime = await getReadTime(path.join(process.cwd(), `public/blog/${slug}.md`))

    return {...metadata, slug, readTime}
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(`Invalid metadata for post ${slug}:`, z.prettifyError(error))
    }
    return null
  }
}
