import React, { useRef, useEffect } from 'react';
import L from 'leaflet';
import { IMapData } from '../Layouts/FindResturant';
import { useSelector } from 'react-redux';
import { ReduxState } from '../store';

// // Import Leaflet CSS
// import 'leaflet/dist/leaflet.css';

export interface IMapViewProps {
  props: IMapData[],
  search: boolean
}

export default function MapView ({props: mapData, search}: IMapViewProps) {

  let {latitude, longitude, zoom} = useSelector((state: ReduxState) => state.map);

  const mapContainer = useRef<HTMLDivElement | null>(null);
  let map: L.Map | null = null;

  if (search && mapData.length > 0) {
    ({ latitude, longitude } = mapData[0].geocodes.main);
  }

  useEffect(() => {
    if (mapContainer.current) {
      if (map) {
        map.remove();
      }

      map = L.map(mapContainer.current).setView([latitude, longitude], zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(map);

      mapData.forEach((item: IMapData) => {
        const { latitude, longitude } = item.geocodes.main;
        const marker = L.marker([latitude, longitude]);

        if (map) {
          marker.addTo(map);
        }

        const title = item.name;
        const address = item.location.formatted_address;
        marker.bindPopup(`<div>${title}</div><div>${address}</div>`);
      });
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [mapData, latitude, longitude, zoom]);

  return (
      <div>
        <div ref={mapContainer} className="map-container" style={{ height: '100vh', width: '100%' }}></div>
      </div>
  );
}
