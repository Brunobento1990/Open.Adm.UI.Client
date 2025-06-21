import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storageiscaslune.blob.core.windows.net',
        port: '',
        pathname: '/iscaslune/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
