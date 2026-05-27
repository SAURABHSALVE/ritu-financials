import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Full SSG — every page is pre-rendered at build time and can be served
  // from an Edge CDN, handling millions of concurrent users with zero origin load.
  output: "export",

  // CDN-friendly trailing slash URLs
  trailingSlash: true,

  // Required for static export; use a CDN image service (Cloudflare/Imgix) in production
  images: {
    unoptimized: true,
  },

  reactStrictMode: true,

  // Fix: Turbopack was detecting C:\Users\HP\package-lock.json as the workspace
  // root, which broke Tailwind CSS resolution. Pin it to this directory.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
