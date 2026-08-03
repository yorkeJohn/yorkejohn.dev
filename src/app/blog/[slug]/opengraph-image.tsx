import {formatInTimeZone} from 'date-fns-tz'
import {OG_SIZE} from '@/lib/constants'
import {og} from '@/lib/og'
import {getPost, getPosts} from '@/posts'

export const size = OG_SIZE
export const contentType = 'image/png'
export const dynamic = 'force-static'

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map(post => ({slug: post.slug}))
}

export default async function Image({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const post = await getPost(slug)

  if (!post) return null

  return og({
    imageTitle: 'BLOG',
    footerText: formatInTimeZone(post.date, 'UTC', 'y.M.dd'),
    content: (
      <div tw="flex flex-col">
        <div tw="text-gray-400" style={{fontSize: 100, fontFamily: 'Syne', lineHeight: 1}}>
          {post.title}
        </div>
        <div tw="mt-8" style={{fontSize: 28}}>
          {post.summary}
        </div>
      </div>
    )
  })
}
