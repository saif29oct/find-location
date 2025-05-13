
import MapView from '../components/MapView';


export interface IMapData {
    categories?: [],
    chains?: [],
    distance: number,
    fsq_id: string,
    geocodes: {
        main: {
            latitude: number
            longitude: number
        }
    },
    link?: string,
    location: {
        description: string,
        formatted_address: string
    },
    name: string,
    related_places?: {},
    timezone?: string
}

export function FindLocations() {


    const defaultLocation: IMapData[] = [
        {
            name: "Dhaka Medical College Hospital",
            fsq_id: "1234567890",
            distance: 0,
            geocodes: {
                main: {
                    latitude: 23.725, // Valid coordinates for Dhaka Medical College Hospital
                    longitude: 90.4075
                }
            },
            location: {
                description: "A major hospital in Dhaka",
                formatted_address: "Kazipara, Dhaka, Bangladesh"
            },
            categories: [],
            chains: [],
            related_places: {}
        }
    ];


    return (
        <>
            <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Place you are looking for
                </label>
                <input
                    type="text"
                    id="location"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                            Your Location
                        </label>
                        <input
                            type="text"
                            id="date"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button>Search</button>
                    </div>

                    <div>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                            Radius
                        </label>
                        <input
                            type="number"
                            id="time"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            defaultValue={1}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                        Search Category
                    </label>
                    <input
                        type="dr"
                        id="guests"
                        placeholder="Number of guests"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            <div className="mt-4">
                <MapView props={defaultLocation} search={true}/>
            </div>

        </>
    );
}
