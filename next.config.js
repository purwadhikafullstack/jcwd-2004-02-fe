/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_API_URL: "http://localhost:5000",
    // NEXT_PUBLIC_API_URL: "https://jcwd200402api.purwadhikabootcamp.com",
  },
  images: {
    domains: ["localhost", "jcwd200402api.purwadhikabootcamp.com"],

  },
};

module.exports = nextConfig;
