'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { useQuery } from '@tanstack/react-query';

import LogoImage from '../../public/images/logo.png';
import { Spinner } from '../components/ui/spinner';
import { User } from '../models/user.model';
import { useUserStore } from '../stores/user-store';

export default function UserBootstrap({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const initFromToken = useUserStore((s) => s.initFromToken);
  const isLoading = useUserStore((s) => s.isLoading);
  const setUser = useUserStore((s) => s.setUser);
  const [isLoadingUI, setIsLoadingUI] = useState(true);

  const { data: user } = useQuery({
    queryKey: ['user'],
    // queryFn: () => api.get('api/auth/me').json<User>(),
    queryFn: () => null as unknown as Promise<User>,
  });

  useEffect(() => {
    if (user) setUser(user);
  }, [setUser, user]);

  useEffect(() => {
    initFromToken();
  }, [initFromToken]);

  useEffect(() => {
    if (!isLoading) setTimeout(() => setIsLoadingUI(false), 1000);
  });

  if (isLoading || isLoadingUI) {
    return (
      <div className="bg-primary flex h-dvh flex-col items-center justify-center gap-8 text-white">
        <Image src={LogoImage} alt="Logo" className="w-40" />
        <Spinner className="size-8" />
      </div>
    );
  }

  return <>{children}</>;
}
