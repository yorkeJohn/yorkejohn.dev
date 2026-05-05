import type {MDXComponents} from 'mdx/types'
import {ShieldBadge} from './components'

const components = {
  ShieldBadge
} satisfies MDXComponents

export function useMDXComponents(): MDXComponents {
  return components
}
