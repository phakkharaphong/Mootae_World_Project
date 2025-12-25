import { Button } from '@/components/ui/button';
import { PaginationContextProps } from '../DataTablePaginationOptions';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function DefaultPaginationUI<TData>({
    pageIndex,
    pageSize,
    pageCount,
    canNextPage,
    canPreviousPage,
    nextPage,
    previousPage,
    setPageIndex,
    setPageSize,
}: Readonly<PaginationContextProps<TData>>) {
    function handlePageSizeChange(size: string) {
        const newSize = Number(size);
        setPageSize(newSize);
        setPageIndex(0);
    }

    return (
        <div className="flex flex-wrap items-center justify-between gap-4">
            <Select
                defaultValue={pageSize.toString()}
                onValueChange={handlePageSizeChange}
                aria-label="Rows per page"
            >
                <SelectTrigger>
                    <SelectValue placeholder="เลือกจำนวนแถวต่อหน้า" />
                </SelectTrigger>
                <SelectContent>
                    {[20, 50, 100, 200].map((size) => (
                        <SelectItem key={size} value={size.toString()}>
                            แสดง {size} แถวต่อหน้า
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <div className="text-muted-foreground text-sm">
                หน้า {pageIndex + 1} จาก {pageCount}
            </div>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={previousPage}
                    disabled={!canPreviousPage}
                    aria-label="Previous page"
                >
                    ก่อนหน้า
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={nextPage}
                    disabled={!canNextPage}
                    aria-label="Next page"
                >
                    ถัดไป
                </Button>
            </div>
        </div>
    );
}
