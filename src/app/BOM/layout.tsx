'use client';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { withBasePath } from '@/lib/base-path-manager';
import { useUserStore } from '@/stores/user-store';
import { useEffect } from 'react';
import { BOMSidebar } from './BOMSidebar';
import BOMHeader from './BOMHeader';

export default function BOMLayout({ children }: { children: React.ReactNode }) {
  const isLoading = useUserStore((s) => s.isLoading);
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      globalThis.location.href = withBasePath('/login');
    }
  }, [isLoading, isLoggedIn]);

  if (!isLoggedIn) {
    return null;
  }
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider>
        <BOMSidebar />
        <SidebarInset>
          <main>
            <BOMHeader />
            <div className="min-h-[calc(100dvh-var(--header-height))]">
              {children}
            </div>
            {/* <AppFooter /> */}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
