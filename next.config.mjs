/** @type {import('next').NextConfig} */
const nextConfig = {
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
