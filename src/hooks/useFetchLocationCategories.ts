import { useState, useEffect, useMemo } from 'react';
import type { ListItem } from '../types/list-components';

export const useCategories = (csvPath: string) => {
    const [categories, setCategories] = useState<ListItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(csvPath);
                if (!response.ok) {
                    const err = new Error(`Failed to load CSV: ${response.statusText} (${response.status})`);
                    setError(err);
                    setLoading(false);
                    return;
                }

                const text = await response.text();

                const [headerLine, ...lines] = text.trim().split(/\r?\n/);

                const headers = headerLine
                    .split(',')
                    .map(h => h.trim().replace(/^"|"$/g, ''));

                const idxId = headers.indexOf('id');
                const idxName = headers.indexOf('name');
                const idxLabel = headers.indexOf('label');

                if (idxId < 0 || idxName < 0 || idxLabel < 0) {
                    const msg = `Invalid CSV header. Expected columns "Category ID", "Category Name", "Category Label".`;
                    const err = new Error(msg);
                    setError(err);
                    setLoading(false);
                    return;
                }

                const validLines = lines.filter(line => line.trim() !== '');

                const parsedCategories = validLines.map(line =>
                    line
                        .split(',')
                        .map(c => c.trim().replace(/^"|"$/g, ''))
                );

                const categories = parsedCategories.map(cols => ({
                    id: cols[idxId],
                    name: cols[idxName],
                    data: {
                        label: cols[idxLabel],
                        categoryId: cols[idxId],
                        categoryName: cols[idxName]
                    }
                }));

                setCategories(categories);
                setLoading(false);

            } catch (err) {
                setError(err as Error);
                setLoading(false);
            }
        };

        void fetchCategories();
    }, [csvPath]);

    // Memoize the categories to prevent unnecessary recalculations
    const memoizedCategories = useMemo(() => categories, [categories]);

    return { categories: memoizedCategories, loading, error };
};
