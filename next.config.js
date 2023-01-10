/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/posts",
        destination: "/",
      },
      {
        source: "/work",
        destination: "/",
      },
    ];
  },
};

module.exports = nextConfig;
