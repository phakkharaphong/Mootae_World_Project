import { Input } from '@/components/ui/input';
import { SearchContextProps } from '../DataTableSearchOptions';
import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';

export default function DefaultSearchUI({
    searchPlaceholder,
    searchQuery,
    setSearchQuery,
    doSearch,
}: Readonly<SearchContextProps>) {
    return (
        <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
                e.preventDefault();
                doSearch();
            }}
        >
            <Input
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
            />
            <Button type="submit">
                <SearchIcon />
            </Button>
        </form>
    );
}
