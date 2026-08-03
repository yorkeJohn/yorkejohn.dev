import {OG_SIZE} from '@/lib/constants'
import {og} from '@/lib/og'

export const size = OG_SIZE
export const contentType = 'image/png'
export const dynamic = 'force-static'

export default async function Image() {
  return og({
    imageTitle: 'OG IMAGE',
    content: (
      <div tw="flex flex-col">
        <div tw="flex flex-col" style={{fontSize: 140, fontFamily: 'Syne', lineHeight: 0.8}}>
          <div tw="text-gray-400">John Yorke</div>
          <div tw="text-lime-300">yorkejohn.dev</div>
        </div>
        <div tw="mt-16 flex flex-col" style={{fontSize: 32}}>
          Welcome to my personal corner of the internet
          <br />
          where I share my projects and what I'm learning.
        </div>
      </div>
    )
  })
}
