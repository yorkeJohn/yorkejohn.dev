import type {Metadata} from 'next'
import {ProjectsPage} from '@/components/pages'

export const metadata: Metadata = {
  title: 'Projects & Selected Works'
}

export default function Page() {
  return <ProjectsPage />
}
