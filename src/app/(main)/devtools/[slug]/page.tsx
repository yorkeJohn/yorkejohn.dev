import {DevtoolPage, devtools, getDevtoolBySlug} from '@/components/pages'

type PageProps = {
  params: Promise<{slug: string}>
}
export function generateStaticParams() {
  return devtools.map(dt => ({slug: dt.slug}))
}

export async function generateMetadata({params}: PageProps) {
  const {slug} = await params
  const devtool = getDevtoolBySlug(slug)
  return {title: devtool?.label}
}

export default async function Page({params}: PageProps) {
  const {slug} = await params
  return <DevtoolPage slug={slug} />
}
