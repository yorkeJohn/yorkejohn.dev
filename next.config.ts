import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    qualities: [100],
    remotePatterns: [{hostname: 'avatars.githubusercontent.com'}]
  }
}

export default nextConfig
