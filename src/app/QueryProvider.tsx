'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

declare global {
    interface Window {
        __TANSTACK_QUERY_CLIENT__: import('@tanstack/react-query').QueryClient;
    }
}
if (globalThis.window) {
    globalThis.window.__TANSTACK_QUERY_CLIENT__ = queryClient;
}

export default function QueryProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
