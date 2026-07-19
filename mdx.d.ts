declare module '*.md' {
  import type {MDXProps} from 'mdx/types'
  const MDXComponent: React.ComponentType<MDXProps>
  export default MDXComponent
  export const metadata: Record<string, unknown>
}
