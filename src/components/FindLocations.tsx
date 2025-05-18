import MapView from '../components/MapView';
import {useState} from "react";


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
    related_places?: object,
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
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const categories = [
        "Hospital",
        "Bank",
        "College",
        "University",
        "Shopping Mall",
        "Junctions",
        "Bus Stands",
        "Mosjids",
        "CRM Machine",
        "ATM",
        "School"
    ];

    return (
        <div>

            <div className="mb-4">
                <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                    Search Category
                </label>
                <div className="relative">
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ex. Restaurant"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setIsOpen(true)}
                        onBlur={() => setTimeout(() => setIsOpen(false), 200)} // Small delay to allow click on options
                    />

                    {isOpen && (
                        <ul className="absolute z-10 w-full mt-1 max-h-40 overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg">
                            {categories
                                .filter(category =>
                                    category.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .map((category) => (
                                    <li
                                        key={category}
                                        onClick={() => {
                                            setSearchTerm(category);
                                            setIsOpen(false);
                                        }}
                                        className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                                    >
                                        {category}
                                    </li>
                                ))}
                        </ul>
                    )}

                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <div className="flex gap-4">
                    <div style={{width: '25%', maxWidth: 150}}>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                            Radius
                        </label>
                        <div className="flex items-center">
                            <input
                                type="number"
                                id="time"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                defaultValue={1}
                            />
                            <span className="ml-2 text-sm text-gray-600">km</span>
                        </div>
                    </div>
                    <div className="flex-grow">
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                            Your Location
                        </label>
                        <input
                            type="text"
                            id="date"
                            placeholder="your current location"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                        Place you are looking for
                    </label>
                    <input
                        type="text"
                        id="location"
                        placeholder="Ex. Dhaka Bank"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-30 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Search
                </button>
            </div>

            <div className="mt-4">
                <MapView props={defaultLocation} search={true}/>
            </div>

        </div>
    );
}
