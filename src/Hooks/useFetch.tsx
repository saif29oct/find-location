import { useEffect, useState } from 'react';

export interface IUseFetchProps {
    url: string,
    options: {
        method: string,
        headers: {
            Accept: string,
            Authorization?: string
        }
    }
}

export default function UseFetch ({url, options}: IUseFetchProps) {

    const [dataContainer, setDataContainer] = useState([]);

    useEffect(() => {
        (async () => {
            const fetchPromiseData = await fetch(url, options);
            const fetchJsonData = await fetchPromiseData.json();
            setDataContainer(fetchJsonData['results']);
        })();
    }, [url, options]); // Add 'options' to the dependency array

    return dataContainer;
}
