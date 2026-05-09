import type {Metadata} from 'next'
import {DevtoolsPage} from '@/components/pages'

export const metadata: Metadata = {
  title: 'Developer Tools'
}

export default function Page() {
  return <DevtoolsPage />
}
