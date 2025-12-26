'use client';

import { useEffect } from 'react';

import { useUserStore } from '@/stores/user-store';

import { withBasePath } from '@/lib/base-path-manager';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoading = useUserStore((s) => s.isLoading);
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);
  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      globalThis.location.href = withBasePath('/BOM');
    }
  }, [isLoading, isLoggedIn]);
  if (isLoggedIn) {
    return null;
  }
  return <>{children}</>;
}
