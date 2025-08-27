/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Exclude Redis and Node.js modules from client-side bundling
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        redis: false,
        crypto: false,
        events: false,
        net: false,
        tls: false,
        timers: false,
        fs: false,
        path: false,
      }
    }
    return config
  },
  serverExternalPackages: ['redis']
}

export default nextConfig
