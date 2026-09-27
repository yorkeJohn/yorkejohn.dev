'use client'

import {useFetch} from '@mantine/hooks'

type ModData = {
  total_downloads: number
}

const dataUrl = 'https://raw.githubusercontent.com/yorkeJohn/yorkejohn.dev/refs/heads/site-data/data/modpack-index.json'

export function ModDownloads() {
  const {data, loading} = useFetch<ModData>(dataUrl)

  if (loading || !data) return '0.0M+'

  const formatted = Intl.NumberFormat('en', {notation: 'compact'}).format(data.total_downloads)
  return `${formatted}+`
}
