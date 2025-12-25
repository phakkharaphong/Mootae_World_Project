import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? process.env.NEXT_PUBLIC_BASE_PATH || '' : '';

const nextConfig: NextConfig = {
  reactCompiler: true,
  basePath,
};

export default nextConfig;
