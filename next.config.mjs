/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
