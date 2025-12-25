export interface PaginationQuery {
    page: number;
    pageSize: number;
}

export type ParamSelectOptions = {
    // When true, omit keys with undefined or null values
    excludeNulls?: boolean;
    // Only include these keys (before PascalCase transform). If omitted, include all.
    include?: string[];
    // Exclude these keys (before PascalCase transform)
    exclude?: string[];
};

export function toPascalCaseParams(
    input: Record<string, unknown>,
    options: ParamSelectOptions = { excludeNulls: true },
): Record<string, unknown> {
    const { excludeNulls = true, include, exclude } = options;
    const result: Record<string, unknown> = {};

    for (const key of Object.keys(input)) {
        // include/exclude filtering (based on original/camelCase keys)
        if (include && !include.includes(key)) continue;
        if (exclude && exclude.includes(key)) continue;

        const value = (input as Record<string, unknown>)[key];
        if (!excludeNulls || (value !== undefined && value !== null)) {
            const pascal = key.charAt(0).toUpperCase() + key.slice(1);
            result[pascal] = value;
        }
    }
    return result;
}
