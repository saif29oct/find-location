// src/types/map.d.ts
export interface IMapData {
    categories?: [],
    chains?: [],
    distance: number,
    fsq_id: string,
    geocodes: {
        main: {
            latitude: number;
            longitude: number;
        };
    };
    link?: string;
    location: {
        description: string;
        formatted_address: string;
    };
    name: string;
    related_places?: object;
    timezone?: string;
}

export interface IMapState {
    name?: string
    longitude: number
    latitude: number
    radius?: number
    categories?: number
    zoom?: number
}