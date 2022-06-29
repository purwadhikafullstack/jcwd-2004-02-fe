/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_API_URL: "http://localhost:5000",
  },
  images: {
    domains: ["localhost"],
  },
};

module.exports = nextConfig;
