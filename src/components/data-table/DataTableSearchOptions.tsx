import { useMemo, useState } from 'react';
import { DefaultSearchUI } from './default-ui';

export interface SearchContextProps {
    searchPlaceholder?: string;
    onSearch?: (query: string) => void;
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    doSearch: () => void;
}

export interface DataTableSearchOptionsProps {
    searchPlaceholder?: string;
    onSearch?: (query: string) => void;
    SearchUI?: (props: SearchContextProps) => React.ReactNode;
    /** Optional controlled search query */
    searchQuery?: string;
    /** Change handler for controlled search query */
    onSearchQueryChange?: (value: string) => void;
}

export default function DataTableSearchOptions({
    searchPlaceholder,
    onSearch,
    SearchUI = DefaultSearchUI,
    searchQuery: controlledQuery,
    onSearchQueryChange,
}: Readonly<DataTableSearchOptionsProps>) {
    const [uncontrolledQuery, setUncontrolledQuery] = useState('');

    const isControlled = typeof controlledQuery === 'string';
    const searchQuery = isControlled ? controlledQuery! : uncontrolledQuery;
    const setSearchQuery = useMemo<(value: string) => void>(
        () =>
            isControlled && onSearchQueryChange
                ? onSearchQueryChange
                : setUncontrolledQuery,
        [isControlled, onSearchQueryChange],
    );

    function doSearch() {
        onSearch?.(searchQuery);
    }

    const ctx: SearchContextProps = {
        searchPlaceholder,
        onSearch,
        searchQuery,
        setSearchQuery,
        doSearch,
    };

    return <>{SearchUI(ctx)}</>;
}
