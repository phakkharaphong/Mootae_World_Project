'use client';

import { Table, VisibilityState } from '@tanstack/react-table';
import { DefaultViewOptionsUI } from './default-ui';

export interface ViewOptionsContextProps<TData> {
    table: Table<TData>;
    visibilityState: VisibilityState;
}

interface DataTableViewOptionsProps<TData> {
    table: Table<TData>;
    visibilityState: VisibilityState;
    ViewOptionsUI?: (props: ViewOptionsContextProps<TData>) => React.ReactNode;
}

export default function DataTableViewOptions<TData>({
    table,
    visibilityState,
    ViewOptionsUI = DefaultViewOptionsUI,
}: Readonly<DataTableViewOptionsProps<TData>>) {
    const ctx: ViewOptionsContextProps<TData> = {
        table,
        visibilityState,
    };

    return <>{ViewOptionsUI(ctx)}</>;
}
