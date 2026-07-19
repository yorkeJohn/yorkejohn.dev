import createMDX from '@next/mdx'
import type {NextConfig} from 'next'
import {createCssVariablesTheme} from 'shiki'

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {unoptimized: true},
  env: {VERSION: process.env.VERSION ?? 'development'},
  output: 'export',
  trailingSlash: true
}

const theme = createCssVariablesTheme({
  name: 'css-variables',
  variablePrefix: '--shiki-',
  variableDefaults: {}
})

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: ['remark-gfm', 'remark-frontmatter', ['remark-mdx-frontmatter', {name: 'metadata'}]],
    rehypePlugins: [['rehype-pretty-code', {theme}]]
  }
})

export default withMDX(nextConfig)
