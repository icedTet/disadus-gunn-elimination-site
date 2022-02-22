/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    ELIM_KEY: process.env.ELIM_KEY,
  },
};

module.exports = nextConfig;
