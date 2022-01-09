const withTM = require('next-transpile-modules')(['@vime/core', '@vime/react'])

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    styledComponents: true,
  },
  i18n: {
    locales: ['en', 'es', 'fr', 'pt'],
    defaultLocale: 'en',
  },
  async redirects() {
    return [
      {
        source: '/deletedclips',
        destination: 'https://old.pogu.live/deletedclips',
        permanent: true,
      },
      {
        source: '/deletedvods',
        destination: 'https://old.pogu.live/deletedvods',
        permanent: true,
      },
      {
        source: '/downloadclip',
        destination: 'https://old.pogu.live/downloadclip',
        permanent: false,
      },
    ]
  },
})
