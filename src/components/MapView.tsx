import {useRef, useEffect} from 'react';
import L from 'leaflet';
import type {IMapData} from './FindLocations';
import {useSelector} from 'react-redux';
import type {ReduxState} from '../store';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

// Import marker icon from leaflet package
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Override default icon
const DefaultIcon = L.icon({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export interface IMapViewProps {
    props: IMapData[],
    search: boolean
}

export default function MapView({props: mapData, search}: IMapViewProps) {

    let {latitude, longitude, zoom} = useSelector((state: ReduxState) => state.map);

    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<L.Map | null>(null);

    if (search && mapData.length > 0) {
        ({latitude, longitude} = mapData[0].geocodes.main);
    }

    useEffect(() => {
        if (mapContainer.current) {
            if (!mapRef.current) {
                mapRef.current = L.map(mapContainer.current).setView([latitude, longitude], zoom);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '© OpenStreetMap'
                }).addTo(mapRef.current);
            } else {
                mapRef.current.setView([latitude, longitude], zoom);
            }

            mapRef.current.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    mapRef.current?.removeLayer(layer);
                }
            });

            mapData.forEach((item: IMapData) => {
                const {latitude, longitude} = item.geocodes.main;
                const marker = L.marker([latitude, longitude]);

                if (mapRef.current) {
                    marker.addTo(mapRef.current);
                }

                const title = item.name;
                const address = item.location.formatted_address;
                marker.bindPopup(`<div>${title}</div><div>${address}</div>`);
            });
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [mapData, latitude, longitude, zoom]);

    return (
        <div ref={mapContainer} className="h-full aspect-square z-30"></div>
    );
}
