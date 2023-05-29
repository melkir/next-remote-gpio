/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => [
    {
      source: '/gpio/:path((?!another-page$).*)',
      has: [
        { type: 'header', key: 'cf-access-client-id' },
        { type: 'header', key: 'cf-access-client-secret' },
      ],
      destination: `${process.env.REMOTE_GPIO_URL}/:path*`,
    },
  ],
}

module.exports = nextConfig
