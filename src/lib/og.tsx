import {readFile} from 'node:fs/promises'
import {join} from 'node:path'
import {ImageResponse} from 'next/og'

type OgProps = {
  imageTitle: string
  content: React.ReactNode
  footerText?: string
}

export async function og({imageTitle, content, footerText}: OgProps) {
  const syne = await readFile(join(process.cwd(), 'src/fonts/ttf/Syne-SemiBold.ttf'))
  const notoSans = await readFile(join(process.cwd(), 'src/fonts/ttf/NotoSans-Regular.ttf'))
  const firaCode = await readFile(join(process.cwd(), 'src/fonts/ttf/FiraCode-Regular.ttf'))

  const element = (
    <div tw="w-full h-full bg-gray-900 p-12 text-gray-50 flex flex-col">
      <div tw="flex flex-col flex-1">
        <div tw="flex items-center mb-8">
          <div tw="rounded-full w-2 h-2 bg-amber-800 mr-4" />
          <div tw="text-gray-400 flex" style={{fontFamily: 'Fira Code'}}>
            YORKEJOHN.DEV / {imageTitle}
          </div>
        </div>
        {content}
      </div>
      <div tw="flex justify-between">
        <div tw="text-lime-300">{footerText}</div>
        <div tw="text-gray-400" style={{fontFamily: 'Fira Code'}}>
          &copy; JOHN YORKE
        </div>
      </div>
    </div>
  )

  return new ImageResponse(element, {
    fonts: [
      {name: 'Noto Sans', data: notoSans, style: 'normal'},
      {name: 'Syne', data: syne, style: 'normal', weight: 600},
      {name: 'Fira Code', data: firaCode, style: 'normal'}
    ]
  })
}
