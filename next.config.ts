import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? process.env.NEXT_PUBLIC_BASE_PATH || '' : '';
const remoteImageUrls = process.env.NEXT_PUBLIC_REMOTE_IMAGE_URLS
  ? process.env.NEXT_PUBLIC_REMOTE_IMAGE_URLS.split(',')
  : [];

const nextConfig: NextConfig = {
  reactCompiler: true,
  basePath,
  images: {
    remotePatterns: [...remoteImageUrls.map((url) => new URL(url))],
  },
};

export default nextConfig;
