'use client';
import { NavigationMenuDemo } from '@/components/AppHeader';
import { BreadcrumbWithCustomSeparator } from '@/components/Breadcrumb';
import { Cardarticle } from '@/components/Card';
import { FooterBar } from '@/components/Footer';
import PaginationControls from '@/components/PaginationControls';
import { useGetAPI } from '@/hooks/use-api';
import { Articleblog } from '@/interfaces/Aricleblog';
import { Articlecategories } from '@/interfaces/Articlecategories';
import { ApiPaginatedResponse } from '@/interfaces/ResponseList';
import { usePagination } from '@/utils/use-pagination';
import { useEffect, useState } from 'react';

export default function Article() {
  const [totalItems, setTotalItems] = useState(1);
  const {
    pageIndex,
    setPageIndex,
    pageSize,
    setPageSize,
    totalPages,
    startItem,
    endItem,
    pageButtons,
  } = usePagination({
    totalItems,
    pageSize: 10,
    initialPage: 0,
    maxButtons: 5,
  });
  const [response, loading, fetchData] = useGetAPI<
    ApiPaginatedResponse<Articlecategories>
  >('articlecategories/', { page: 1, limit: 10 });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [article, loadingac, fetchDataarticle] = useGetAPI<
    ApiPaginatedResponse<Articleblog>
  >('articleblog/', {
    page: pageIndex + 1,
    limit: pageSize,
    is_active: true,
    categories_id: selectedCategory,
  });

  useEffect(() => {
    fetchData();
    // fetchDataarticle();
  }, [fetchData, pageSize]);

  useEffect(() => {
    fetchDataarticle();
  }, [fetchDataarticle,selectedCategory,pageSize]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="p-5">
        <BreadcrumbWithCustomSeparator
          response={response?.data || []}
          onCategorySelect={(id) => {
            setSelectedCategory(id);
          }}
        ></BreadcrumbWithCustomSeparator>
        <Cardarticle response={article?.data || []}></Cardarticle>
        <PaginationControls
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalItems={totalItems}
          startItem={startItem}
          endItem={endItem}
          totalPages={totalPages}
          pageButtons={pageButtons}
          loading={loading}
        />
      </div>

      
    </>
  );
}
