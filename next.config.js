/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig