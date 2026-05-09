import {Devtool} from '@/components/pages'

const slugs = ['json-formatter', 'uuid-generator', 'jwt-decoder', 'color-picker'] as const

export function generateStaticParams() {
  return slugs.map(slug => ({slug}))
}

type PageProps = {
  params: Promise<{slug: string}>
}

export default async function Page({params}: PageProps) {
  const {slug} = await params
  return <Devtool slug={slug} />
}
