import type { NextConfig } from 'next';
import type { RemotePattern } from 'next/dist/shared/lib/image-config';

const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? process.env.NEXT_PUBLIC_BASE_PATH || '' : '';
const remoteImageUrls = process.env.NEXT_PUBLIC_REMOTE_IMAGE_URLS
  ? process.env.NEXT_PUBLIC_REMOTE_IMAGE_URLS.split(',')
  : [];

const nextConfig: NextConfig = {
  reactCompiler: true,
  basePath,
  images: {
    remotePatterns: remoteImageUrls
      .filter((u) => !!u)
      .map((u): RemotePattern => {
        const parsed = new URL(u.trim());
        const protocol: 'http' | 'https' =
          parsed.protocol === 'https:' ? 'https' : 'http';
        const hostname = parsed.hostname;
        const port = parsed.port ? parsed.port : undefined;
        const basePath =
          parsed.pathname && parsed.pathname !== '/' ? parsed.pathname : '/';
        const pathname = basePath.endsWith('/')
          ? `${basePath}**`
          : `${basePath}/**`;
        return { protocol, hostname, port, pathname };
      }),
  },
};

export default nextConfig;
