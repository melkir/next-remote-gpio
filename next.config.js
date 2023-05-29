/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => [
    {
      source: '/gpio/:path((?!another-page$).*)',
      has: [{ type: 'header', key: 'cf-access-client-id' }],
      destination: 'http://127.0.0.1:5002/:path*',
    },
  ],
}

module.exports = nextConfig
