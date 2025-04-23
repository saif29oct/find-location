import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { IMapData } from '../Layouts/FindResturant';
import { useSelector } from 'react-redux';
import { ReduxState } from '../store';

export interface IMapViewProps {
  props: IMapData[],
  search: boolean
}

export default function MapView ({props: mapData, search}: IMapViewProps) {

  let {latitude, longitude, zoom} = useSelector((state:ReduxState)=>state.map)

  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!

  const mapContainer = useRef(null);

  if(search){
    ({latitude, longitude} = mapData[0].geocodes.main)
  }

  useEffect(() => {
    if (!mapboxgl.supported()){
      alert("This browser does not support Mapbox GL.")
      return
    }

    const mapClone = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude],
      zoom: zoom
    });

    mapData.forEach((item: IMapData)=>{
      const {latitude, longitude} = item.geocodes.main
      new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(mapClone);

      const title = item.name
      const address = item.location.formatted_address
      new mapboxgl.Popup({ closeOnClick: false }).setLngLat([longitude, latitude]).setHTML('<div>'+title+'</div><div>'+address+'</div>').addTo(mapClone);
    })

  },[mapData, latitude, longitude, zoom])
  
  return (
    <div>
      <div ref={mapContainer} className="map-container">
      </div>
    </div>
  );
}
