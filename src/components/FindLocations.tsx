import MapView from '../components/MapView';
import MavViewForm from "./MapViewForm.tsx";
import type {IMapData} from "../types/map";

export function FindLocations() {

    // const currentLocation: IMapState = {
    //     latitude: 23.78159,
    //     longitude: 90.40050,
    //     radius: 3000,
    //     categories: 13000,
    //     zoom: 14
    // }

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
        <div>
            <MavViewForm/>
            <div className="mt-4">
                <MapView props={defaultLocation} search={true}/>
            </div>

        </div>
    );
}
