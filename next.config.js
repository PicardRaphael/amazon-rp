/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['fakestoreapi.com'],
  },
  i18n,
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  },
}

module.exports = nextConfig
