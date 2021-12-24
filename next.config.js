/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    styledComponents: true,
  },
  i18n: {
    locales: ['en', 'fr', 'pt'],
    defaultLocale: 'en',
  },
}
