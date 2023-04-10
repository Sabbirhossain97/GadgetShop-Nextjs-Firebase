/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};

module.exports = nextConfig
