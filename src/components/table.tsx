// components/TablePagination.tsx
'use client';
import React from 'react';
import { Button } from './ui/button';

export interface Column<T> {
  key: keyof T;
  title: string;
  render?: (item: T) => React.ReactNode;
}

interface TablePaginationProps<T> {
  data: T[];
  columns: Column<T>[];
  totalItems: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export function TablePagination<T>({
  data,
  columns,
  totalItems,
  page,
  limit,
  onPageChange,
}: TablePaginationProps<T>) {
  const totalPages = Math.ceil(totalItems / limit);

  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full table-auto border-collapse text-left rounded-lg shadow-sm">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key as string}
                className="border-b px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
              >
                ไม่พบข้อมูล
              </td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr
                key={idx}
                className={`transition-colors ${
                  idx % 2 === 0
                    ? 'bg-white dark:bg-gray-800'
                    : 'bg-gray-50 dark:bg-gray-700'
                } hover:bg-amber-50 dark:hover:bg-amber-900`}
              >
                {columns.map((col) => (
                  <td
                    key={col.key as string}
                    className="border-b px-4 py-3 text-gray-800 dark:text-gray-200 text-sm"
                  >
                    {col.render ? col.render(item) : String(item[col.key])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
        <Button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-3 py-1 rounded-md bg-gray-600 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition disabled:opacity-50"
        >
          Prev
        </Button>

        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            className={`px-3 py-1 rounded-md transition ${
              page === i + 1
                ? 'bg-amber-800 text-white dark:bg-amber-600'
                : 'bg-gray-600 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500'
            }`}
          >
            {i + 1}
          </Button>
        ))}

        <Button
          onClick={handleNext}
          disabled={page === totalPages}
          className="px-3 py-1 rounded-md bg-gray-600 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition disabled:opacity-50"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
