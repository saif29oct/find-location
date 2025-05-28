export interface IPlaceMatchRequest {
    city: string,
    state?: string,
    postal_code?: string
}

export interface IPlaceMatchResponse{
    name: string,
    city: string,
    state?: string,
    postal_code?: string,
    latitude: number,
    longitude: number
}