import createMDX from '@next/mdx'
import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    qualities: [100],
    remotePatterns: [{hostname: 'avatars.githubusercontent.com'}]
  }
}

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: [['rehype-pretty-code', {theme: 'gruvbox-dark-hard'}]]
  }
})

export default withMDX(nextConfig)
