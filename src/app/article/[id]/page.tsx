'use client';

import { NavigationMenuDemo } from '@/components/AppHeader';
import { useGetAPI } from '@/hooks/use-api';
import { Articleblog } from '@/interfaces/Aricleblog';
import { ApiPaginatedResponse } from '@/interfaces/ResponseList';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Articleblogdetail() {
  const { id } = useParams<{ id: string }>();
  const [response, loadingac, fetchData] = useGetAPI<
    ApiPaginatedResponse<Articleblog>
  >(`/articleblog/${id}`);

  useEffect(() => {
    fetchData();
  }, []);
  if (loadingac) return <div>Loading...</div>;
  return (
    <>
      {' '}
      <NavigationMenuDemo></NavigationMenuDemo>
    </>
  );
}
