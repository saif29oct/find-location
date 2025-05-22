import { useState, useEffect, useMemo } from 'react';

interface Category {
    id: string;
    name: string;
    label: string;
}

export const useCategories = (csvPath: string) => {
    const [categories, setCategories] = useState<Category[]>([]);
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
//                 const text = `"Category ID","Category Name","Category Label"
// "4d4b7104d754a06370d81259","Arts and Entertainment","Arts and Entertainment"
// "4bf58dd8d48988d182941735","Amusement Park","Arts and Entertainment > Amusement Park"
// "5109983191d435c0d71c2bb1","Attraction","Arts and Entertainment > Amusement Park > Attraction"
// "4fceea171983d5d06c3e9823","Aquarium","Arts and Entertainment > Aquarium"
// "4bf58dd8d48988d1e1931735","Arcade","Arts and Entertainment > Arcade"`;


                const [headerLine, ...lines] = text.trim().split(/\r?\n/);

                const headers = headerLine
                    .split(',')
                    .map(h => h.trim().replace(/^"|"$/g, ''));

                const idxId = headers.indexOf('Category ID');
                const idxName = headers.indexOf('Category Name');
                const idxLabel = headers.indexOf('Category Label');

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
                        .map(c => c.trim().replace(/^"|"$/g, '')) // ✅ 移除字段两端的双引号
                );


                const categories = parsedCategories.map(cols => ({
                    id: cols[idxId],
                    name: cols[idxName],
                    label: cols[idxLabel],
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
