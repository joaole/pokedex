import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // The new, preferred way to whitelist external sources
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        // Allow all PokeAPI sprite paths under this host
        pathname: '/PokeAPI/**',
      },
    ],
    // If you still need domains (for very old Next.js versions):
    domains: ['raw.githubusercontent.com'],
  },
};

export default nextConfig;
