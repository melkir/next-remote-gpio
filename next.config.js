const withSerwist = require('@serwist/next').default({
  cacheOnFrontEndNav: true,
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
  disable: process.env.NODE_ENV === 'development',
})

/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = withSerwist(nextConfig)
