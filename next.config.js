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
})
