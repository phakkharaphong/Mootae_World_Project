import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ViewOptionsContextProps } from '../DataTableViewOptions';
import { Button } from '@/components/ui/button';
import { Settings2 } from 'lucide-react';

export default function DefaultViewOptionsUI<TData>({
    table,
    visibilityState,
}: Readonly<ViewOptionsContextProps<TData>>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="hidden h-8 lg:flex"
                >
                    <Settings2 />
                    แสดงคอลัมน์
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>เลือกคอลัมน์</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {visibilityState &&
                    table
                        .getAllLeafColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={column.toggleVisibility}
                            >
                                {column.id}
                            </DropdownMenuCheckboxItem>
                        ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
