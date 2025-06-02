import { useState, useEffect, useMemo } from 'react';
import type { ListItem } from '../types/list-components';

export const useDistricts = (csvPath: string) => {
    const [districts, setDistricts] = useState<ListItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDistricts = async () => {
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
                const idxDistrict = headers.indexOf('district');
                const idxLatitude = headers.indexOf('latitude');
                const idxLongitude = headers.indexOf('longitude');

                if (idxId < 0 || idxDistrict < 0 || idxLatitude < 0 || idxLongitude < 0) {
                    const msg = `Invalid CSV header. Expected columns "id", "district", "latitude", "longitude".`;
                    const err = new Error(msg);
                    setError(err);
                    setLoading(false);
                    return;
                }

                const validLines = lines.filter(line => line.trim() !== '');

                const parsedDistricts = validLines.map(line =>
                    line
                        .split(',')
                        .map(c => c.trim().replace(/^"|"$/g, ''))
                );

                const districts = parsedDistricts.map(cols => ({
                    id: cols[idxId],
                    name: cols[idxDistrict],
                    data: {
                        latitude: parseFloat(cols[idxLatitude]),
                        longitude: parseFloat(cols[idxLongitude])
                    }
                }));

                setDistricts(districts);
                setLoading(false);

            } catch (err) {
                setError(err as Error);
                setLoading(false);
            }
        };

        void fetchDistricts();
    }, [csvPath]);

    // Memoize the districts to prevent unnecessary recalculations
    const memoizedDistricts = useMemo(() => districts, [districts]);

    return { districts: memoizedDistricts, loading, error };
};
