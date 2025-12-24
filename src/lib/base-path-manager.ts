export function withBasePath(path: string) {
  const isProd = process.env.NODE_ENV === 'production';
  const bp = isProd ? process.env.NEXT_PUBLIC_BASE_PATH || '' : '';
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const joined = bp ? `${bp.replace(/\/$/, '')}${normalized}` : normalized;
  return joined;
}
