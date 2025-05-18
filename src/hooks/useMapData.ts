import UseFetch, {type IUseFetchProps} from './useFetch.ts';
import {useMemo} from "react";
import type {IMapData} from "../types/map";

export interface IMapState {
    name?: string
    longitude: number
    latitude: number
    radius?: number
    categories?: number
    zoom?: number
}

// const initialState: IMapState = {
//     latitude: 23.78159,
//     longitude: 90.40050,
//     radius: 3000,
//     categories: 13000,
//     zoom: 14
// }

export const useMapData = (mapState: IMapState): IMapData[] | [] => {
    if (!mapState || !mapState.latitude || !mapState.longitude) {
        throw new Error("Define initial location");
    }

    const makeGetRequestUrl = (mapState: IMapState): IUseFetchProps => {
        const { latitude, longitude, name, radius, categories } = mapState;
        const ll = "ll=" + latitude + "%2C" + longitude;
        const radiusStr = radius ? "radius=" + radius + "&" : "";
        const categoriesStr = categories ? "categories=" + categories + "&" : "";
        const nameStr = name ? "query=" + name + "&" : "";

        const urlStr =
            "https://api.foursquare.com/v3/places/search?" +
            nameStr +
            radiusStr +
            categoriesStr +
            ll;

        return {
            url: urlStr,
            options: {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: import.meta.env.VITE_FOURSQUARE_API_KEY
                }
            }
        };
    };

    const fetchProps = useMemo(() => makeGetRequestUrl(mapState), [mapState]);

    return UseFetch(fetchProps);
};
