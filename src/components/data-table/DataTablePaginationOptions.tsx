'use client';

import { Table } from '@tanstack/react-table';
import { DefaultPaginationUI } from './default-ui';
import type { ComponentType } from 'react';

export interface PaginationContextProps<TData> {
    table: Table<TData>;
    pageIndex: number;
    pageSize: number;
    pageCount: number;
    canNextPage: boolean;
    canPreviousPage: boolean;
    nextPage: () => void;
    previousPage: () => void;
    setPageIndex: (index: number) => void;
    setPageSize: (size: number) => void;
}

interface DataTablePaginationOptionsProps<TData> {
    table: Table<TData>;
    pageIndex?: number;
    pageSize?: number;
    pageCount?: number;
    PaginationUI?: ComponentType<PaginationContextProps<TData>>;
}

export default function DataTablePaginationOptions<TData>({
    table,
    pageIndex = table.getState().pagination.pageIndex,
    pageSize = table.getState().pagination.pageSize,
    PaginationUI = DefaultPaginationUI,
}: Readonly<DataTablePaginationOptionsProps<TData>>) {
    const ctx: PaginationContextProps<TData> = {
        table,
        pageIndex,
        pageSize,
        pageCount: table.getPageCount(),
        canNextPage: table.getCanNextPage(),
        canPreviousPage: table.getCanPreviousPage(),
        nextPage: table.nextPage,
        previousPage: table.previousPage,
        setPageIndex: table.setPageIndex,
        setPageSize: table.setPageSize,
    };

    return <PaginationUI {...ctx} />;
}
