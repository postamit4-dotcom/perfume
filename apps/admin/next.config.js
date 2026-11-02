/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@lamaia/ui', '@lamaia/contracts', '@lamaia/utils', '@lamaia/config'],
};

module.exports = nextConfig;

