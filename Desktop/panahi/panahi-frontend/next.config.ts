import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/**",
      },
      // Localtunnel URL for Vercel deployment
      {
        protocol: "https",
        hostname: "cyan-readers-laugh.loca.lt",
        port: "",
        pathname: "/**",
      },
      // Allow all local IPs for development
      {
        protocol: "http",
        hostname: "172.20.10.6",
        port: "4000",
        pathname: "/**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://cyan-readers-laugh.loca.lt/api',
  },
  output: 'standalone',
};

export default nextConfig;
