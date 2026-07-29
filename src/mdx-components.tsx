import type {MDXComponents} from 'mdx/types'
import {Anchor} from './components'

const components = {
  a: props => <Anchor {...props} />
} satisfies MDXComponents

export function useMDXComponents(): MDXComponents {
  return components
}
