import MapView from '../components/MapView';
import {useState} from "react";
import type {IMapData} from "../types/map";
import MavViewForm from "./MapViewForm.tsx";



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

    // const currentLocation: IMapState = {
    //     latitude: 23.78159,
    //     longitude: 90.40050,
    //     radius: 3000,
    //     categories: 13000,
    //     zoom: 14
    // }

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

            <MavViewForm/>

            <div className="mt-4">
                <MapView props={defaultLocation} search={true}/>
            </div>

        </div>
    );
}
