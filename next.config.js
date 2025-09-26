
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["time.bonbox.id"], // supaya upload image/photo bisa diakses
  },
  experimental: {
    serverActions: {},
  },
};

module.exports = nextConfig;
