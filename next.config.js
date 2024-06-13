/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // api: {
  //   bodyParser: {
  //     sizeLimit: "1mb",
  //   },
  // },
};

module.exports = nextConfig
