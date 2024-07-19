/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    PUBLIC_JOURNAL_API: process.env.PUBLIC_JOURNAL_API
  }
};

export default nextConfig;
