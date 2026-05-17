import createMDX from '@next/mdx'
import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {unoptimized: true},
  env: {VERSION: process.env.VERSION ?? 'development'},
  output: 'export',
  trailingSlash: true
}

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-gfm', 'remark-frontmatter', ['remark-mdx-frontmatter', {name: 'metadata'}]],
    rehypePlugins: [['rehype-pretty-code', {theme: 'gruvbox-dark-hard'}]]
  }
})

export default withMDX(nextConfig)
