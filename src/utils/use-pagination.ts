import { useMemo, useState } from 'react';

export function usePagination({
  totalItems,
  pageSize,
  initialPage = 0,
  maxButtons = 5,
}: {
  totalItems: number;
  pageSize: number;
  initialPage?: number;
  maxButtons?: number;
}) {
  const [pageIndex, setPageIndex] = useState(initialPage);
  const [size, setPageSize] = useState(pageSize);
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil((totalItems || 0) / (size || 1))),
    [totalItems, size],
  );
  const startItem = useMemo(
    () => (totalItems === 0 ? 0 : pageIndex * size + 1),
    [pageIndex, size, totalItems],
  );
  const endItem = useMemo(
    () => Math.min(totalItems || 0, (pageIndex + 1) * size),
    [pageIndex, size, totalItems],
  );
  const pageButtons = useMemo(() => {
    const curr = pageIndex + 1; // 1-based
    let start = Math.max(1, curr - Math.floor(maxButtons / 2));
    let end = start + maxButtons - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxButtons + 1);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [pageIndex, totalPages, maxButtons]);

  return {
    pageIndex,
    setPageIndex,
    pageSize: size,
    setPageSize,
    totalPages,
    startItem,
    endItem,
    pageButtons,
  };
}
