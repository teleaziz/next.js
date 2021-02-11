const { createHash } = require('crypto')

module.exports = {
  images: {
    domains: ['cdn.builder.io'],
  },
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here, important for preview mode to work in production
    return createHash('sha256').update('build-id').digest('hex')
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              'frame-ancestors https://*.builder.io https://builder.io http://localhost:1234',
          },
        ],
      },
    ]
  },
  env: {
    // expose env to the browser
    BUILDER_PUBLIC_KEY: process.env.BUILDER_PUBLIC_KEY,
  },
}
