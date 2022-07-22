/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_API_URL: "http://jcwd200402api.purwadhikabootcamp.com",
  },
  images: {
    domains: ["localhost"],
  },
};

module.exports = nextConfig;
