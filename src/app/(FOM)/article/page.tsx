'use client';
import { NavigationMenuDemo } from '@/components/AppHeader';
import { BreadcrumbWithCustomSeparator } from '@/components/Breadcrumb';
import { Cardarticle } from '@/components/Card';
import { FooterBar } from '@/components/Footer';
import PaginationControls from '@/components/PaginationControls';
import { useGetAPI } from '@/hooks/use-api';
import { articleService } from '@/hooks/use-api-articleService';
import { articleCatService } from '@/hooks/use-api-catearticleservice';
import { Articleblog } from '@/interfaces/Aricleblog';
import { article_categories, Articlecategories } from '@/interfaces/Articlecategories';
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
    initialPage: 1,
    maxButtons: 5,
  });
  const [response, loading, fetchData] = useGetAPI<
    ApiPaginatedResponse<Articlecategories>
  >('category/', { page: 1, limit: 10 });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [article, loadingac, fetchDataarticle] = useGetAPI<
    ApiPaginatedResponse<Articleblog>
  >('blog/', {
    page: pageIndex + 1,
    limit: pageSize,
    is_active: true,
    categories_id: selectedCategory,
  });

  const [articles, setArticles] = useState<
    Articleblog[] | null
  >(null);

  const [blogCat, setCate] = useState<Articlecategories[]| null>();

  useEffect(() => {
     const fetcharticleCate = async () => {
      const datacate = await articleCatService.getAll(pageIndex, pageSize);
      setCate(datacate);
    }
    const fetcharticle = async () => {
      const dataa = await articleService.getAll(pageIndex, pageSize);
      setArticles(dataa);
    }
    fetcharticle();
    fetcharticleCate();
    // fetchDataarticle();
  }, [pageIndex, pageSize]);

  useEffect(() => {
    fetchDataarticle();
  }, [fetchDataarticle, selectedCategory, pageSize]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="p-5">
        <BreadcrumbWithCustomSeparator
          response={blogCat || []}
          onCategorySelect={(id) => {
            setSelectedCategory(id);
          }}
        ></BreadcrumbWithCustomSeparator>
        <Cardarticle response={articles || []}></Cardarticle>
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
