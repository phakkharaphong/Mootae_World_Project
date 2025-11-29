"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PaginationControlsProps {
  pageIndex: number;
  setPageIndex: (index: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  totalItems: number;
  startItem: number;
  endItem: number;
  totalPages: number;
  pageButtons: number[];
  loading?: boolean;
}

export default function PaginationControls({
  pageIndex,
  setPageIndex,
  pageSize,
  setPageSize,
  totalItems,
  startItem,
  endItem,
  totalPages,
  pageButtons,
  loading = false,
}: PaginationControlsProps) {
  return (
    <div className="mt-3 flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
      {/* Left: rows per page + range */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">จำนวนต่อหน้า</span>
          <select
            className="rounded-md border bg-transparent px-2 py-1 text-sm"
            value={pageSize}
            onChange={(e) => {
              const size = Number(e.target.value);
              setPageIndex(0);
              setPageSize(size);
            }}
          >
            {[10, 20, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="text-muted-foreground text-sm">
          {totalItems > 0
            ? `แสดง ${startItem}–${endItem} จาก ${totalItems} รายการ`
            : 'ไม่มีรายการข้อมูล'}
        </div>
      </div>

      {/* Right: Pagination controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full p-0"
          onClick={() => setPageIndex(Math.max(0, pageIndex - 1))}
          disabled={pageIndex <= 0 || loading}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {pageButtons.map((n) => {
          const active = n === pageIndex + 1;
          return (
            <Button
              key={n}
              variant="ghost"
              size="icon"
              className={
                'h-8 w-8 rounded-full p-0 text-sm ' +
                (active
                  ? 'bg-primary hover:bg-primary/90'
                  : 'bg-neutral-200 hover:bg-neutral-300')
              }
              onClick={() => setPageIndex(n - 1)}
              aria-current={active ? 'page' : undefined}
            >
              {n}
            </Button>
          );
        })}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full p-0"
          onClick={() => setPageIndex(Math.min(totalPages - 1, pageIndex + 1))}
          disabled={loading || pageIndex >= totalPages - 1}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
