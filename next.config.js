/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "time.bonbox.id", 
      "yqvigqfbgidjindzgfyo.supabase.co", // tambahkan domain Supabase
    ],
  },
  experimental: {
    serverActions: {},
  },
};

module.exports = nextConfig;
