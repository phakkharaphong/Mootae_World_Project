'use client';
import { NavigationMenuDemo } from '@/components/AppHeader';
import { BreadcrumbWithCustomSeparator } from '@/components/Breadcrumb';
import { Cardarticle } from '@/components/Card';
import { FooterBar } from '@/components/Footer';
import { useGetAPI } from '@/hooks/use-api';
import { Articleblog } from '@/interfaces/Aricleblog';
import { Articlecategories } from '@/interfaces/Articlecategories';
import { ApiPaginatedResponse } from '@/interfaces/ResponseList';
import { useEffect, useState } from 'react';

export default function Article() {
  const [response, loading, fetchData] = useGetAPI<
    ApiPaginatedResponse<Articlecategories>
  >('articlecategories/', { page: 1, limit: 10 });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [article, loadingac, fetchDataarticle] = useGetAPI<
    ApiPaginatedResponse<Articleblog>
  >('articleblog/', {
    page: 1,
    limit: 10,
    is_active: true,
    categories_id: selectedCategory,
  });

  useEffect(() => {
    fetchData();
    // fetchDataarticle();
  }, []);

  useEffect(() => {
    fetchDataarticle();
  }, [selectedCategory]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <NavigationMenuDemo></NavigationMenuDemo>
      <div className="p-5">
        <BreadcrumbWithCustomSeparator
          response={response?.data || []}
          onCategorySelect={(id) => {
            setSelectedCategory(id);
          }}
        ></BreadcrumbWithCustomSeparator>
        <Cardarticle response={article?.data || []}></Cardarticle>
      </div>
      <FooterBar></FooterBar>
    </>
  );
}
