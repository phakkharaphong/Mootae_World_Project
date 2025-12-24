import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    PaginationState,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table';
import { Spinner } from '../ui/spinner';
import { Dispatch, SetStateAction } from 'react';
import { Table as TanstackTable } from '@tanstack/react-table';
import { VisibilityState } from '@tanstack/react-table';
import DataTableSearchOptions from './DataTableSearchOptions';
import DataTableViewOptions from './DataTableViewOptions';
import DataTablePaginationOptions from './DataTablePaginationOptions';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface DataTableProps<TData, TValue> {
    data: TData[];
    columns: ColumnDef<TData, TValue>[];
    isLoading?: boolean;
    isRefreshing?: boolean;

    pagination?: PaginationState;
    onPaginationChange?: Dispatch<SetStateAction<PaginationState>>;
    pageCount?: number;

    searchText?: string;
    onSearch?: (query: string) => void;
    onSearchTextChange?: Dispatch<SetStateAction<string>>;

    columnVisibility?: VisibilityState;
    onColumnVisibilityChange?: Dispatch<SetStateAction<VisibilityState>>;

    sorting?: SortingState;
    onSortingChange?: Dispatch<SetStateAction<SortingState>>;

    renderTopOptions?: (ctx: {
        table: TanstackTable<TData>;
        columnVisibility?: VisibilityState;
        setColumnVisibility?: Dispatch<SetStateAction<VisibilityState>>;
        pagination?: PaginationState;
        setPagination?: Dispatch<SetStateAction<PaginationState>>;
        searchText?: string;
        onSearch?: (query: string) => void;
        onSearchTextChange?: Dispatch<SetStateAction<string>>;
    }) => React.ReactNode;

    renderBottomOptions?: (ctx: {
        table: TanstackTable<TData>;
        columnVisibility?: VisibilityState;
        setColumnVisibility?: Dispatch<SetStateAction<VisibilityState>>;
        pagination?: PaginationState;
        setPagination?: Dispatch<SetStateAction<PaginationState>>;
    }) => React.ReactNode;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    isLoading,
    isRefreshing,
    pagination,
    pageCount,
    onPaginationChange,
    searchText,
    onSearch,
    onSearchTextChange,
    columnVisibility,
    onColumnVisibilityChange,
    sorting,
    onSortingChange,
    renderTopOptions,
    renderBottomOptions,
}: DataTableProps<TData, TValue>) {
    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel<TData>(),
        onColumnVisibilityChange,
        onPaginationChange,
        onSortingChange,
        state: {
            columnVisibility,
            pagination,
            sorting,
        },
        manualPagination: true,
        manualSorting: true,
        enableMultiSort: false,
        pageCount,
    });

    const optionsCtx = {
        table,
        columnVisibility,
        setColumnVisibility: onColumnVisibilityChange,
        pagination,
        setPagination: onPaginationChange,
        searchText,
        onSearch,
        onSearchTextChange,
        sorting,
        setSorting: onSortingChange,
    };

    const defaultTopOptions = (
        <div className="flex w-full items-center justify-between gap-3">
            <div className="flex items-center gap-2">
                {searchText !== undefined && onSearchTextChange && (
                    <DataTableSearchOptions
                        searchPlaceholder="ค้นหา..."
                        onSearch={onSearch}
                        {...(searchText !== undefined && onSearchTextChange
                            ? {
                                  searchQuery: searchText,
                                  onSearchQueryChange: onSearchTextChange,
                              }
                            : {})}
                    />
                )}
            </div>
            {columnVisibility !== undefined && onColumnVisibilityChange && (
                <DataTableViewOptions
                    table={table}
                    visibilityState={columnVisibility || {}}
                />
            )}
        </div>
    );

    const defaultBottomOptions = (
        <div className="py-2">
            <DataTablePaginationOptions table={table} />
        </div>
    );

    return (
        <>
            <div className="mb-2 flex items-center justify-between">
                {renderTopOptions
                    ? renderTopOptions(optionsCtx)
                    : defaultTopOptions}
            </div>
            <div className="relative overflow-hidden rounded-md border @container">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    const canSort = header.column.getCanSort();
                                    const isSorted =
                                        header.column.getIsSorted();
                                    const sortingHandler = canSort
                                        ? header.column.getToggleSortingHandler()
                                        : undefined;

                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="bg-primary text-primary-foreground font-bold whitespace-nowrap"
                                        >
                                            {header.isPlaceholder ? null : (
                                                <div
                                                    role={
                                                        canSort && !isLoading
                                                            ? 'button'
                                                            : undefined
                                                    }
                                                    tabIndex={
                                                        canSort && !isLoading
                                                            ? 0
                                                            : undefined
                                                    }
                                                    aria-sort={
                                                        isSorted === 'asc'
                                                            ? 'ascending'
                                                            : isSorted ===
                                                                'desc'
                                                              ? 'descending'
                                                              : 'none'
                                                    }
                                                    onClick={
                                                        isLoading
                                                            ? undefined
                                                            : sortingHandler
                                                    }
                                                    onKeyDown={(e) => {
                                                        if (
                                                            !canSort ||
                                                            isLoading
                                                        )
                                                            return;
                                                        if (
                                                            e.key === 'Enter' ||
                                                            e.key === ' '
                                                        ) {
                                                            e.preventDefault();
                                                            header.column.toggleSorting();
                                                        }
                                                    }}
                                                    className={cn(
                                                        'flex items-center gap-1',
                                                        canSort &&
                                                            !isLoading &&
                                                            'cursor-pointer select-none',
                                                    )}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext(),
                                                    )}
                                                    {canSort && (
                                                        <span className="inline-flex h-4 w-4 items-center justify-center">
                                                            {isSorted ===
                                                            'asc' ? (
                                                                <ArrowUp className="h-3.5 w-3.5" />
                                                            ) : isSorted ===
                                                              'desc' ? (
                                                                <ArrowDown className="h-3.5 w-3.5" />
                                                            ) : (
                                                                <></>
                                                            )}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <Spinner className="size-5" />
                                        Loading...
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="whitespace-nowrap"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                {isRefreshing && !isLoading && (
                    <div className="bg-background/50 pointer-events-none absolute inset-0 flex items-center justify-center">
                        <Spinner className="size-4" />
                    </div>
                )}
            </div>
            <div className="mt-2">
                {renderBottomOptions
                    ? renderBottomOptions(optionsCtx)
                    : defaultBottomOptions}
            </div>
        </>
    );
}
