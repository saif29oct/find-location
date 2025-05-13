import React from 'react'
import type { IUseFetchProps } from '../Hooks/useFetch'
import { IMapData } from './FindLocations';
import UseFetch from '../Hooks/useFetch';
import LocationFilter from './LocationFilter';
export interface ISearchLocationProps{
    props: IUseFetchProps,
    setPlace(arg: IMapData[]): void
}

const SearchLocation = ({props: requestUrl, setPlace}: ISearchLocationProps)=>{
    let mapData: IMapData[] | [] = UseFetch(requestUrl)
    return(
        <>
            {
                mapData.length === 0 ? "No Location Found" : <LocationFilter props={mapData} setPosition={setPlace} />
            }
            
        </>
    )
}

export default SearchLocation
