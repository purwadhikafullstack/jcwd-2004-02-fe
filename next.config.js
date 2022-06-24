/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_API_URL: "http://172.105.119.73:5002",
  },
};

module.exports = nextConfig;
