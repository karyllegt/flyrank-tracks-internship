/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.VERCEL ? {} : { output: "export", trailingSlash: true }),
  images: {
    unoptimized: true
  },
  basePath: process.env.VERCEL ? "" : process.env.NEXT_PUBLIC_BASE_PATH || ""
};

export default nextConfig;
