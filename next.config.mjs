/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Exclude Redis from client-side bundling
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        redis: false,
      }
    }
    return config
  },
  experimental: {
    serverComponentsExternalPackages: ['redis']
  }
}

export default nextConfig
