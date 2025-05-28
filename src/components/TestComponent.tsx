import {usePlaceMatch} from '../hooks/useMapData';
export const TestComponent = () => {
    // const mapState = {
    //     latitude: 23.78159,
    //     longitude: 90.40050,
    //     radius: 3000,
    //     categories: 13000,
    //     zoom: 14,
    //     name: "Dhaka"
    // };
    // const places = useMapData(mapState);

    const places = usePlaceMatch();

    return (
        <div>
            <h2>Places Data:</h2>
            {places ? (
                <pre>{JSON.stringify(places, null, 2)}</pre>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
