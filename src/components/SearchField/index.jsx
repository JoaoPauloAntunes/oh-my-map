/*
    Demo: https://smeijer.github.io/leaflet-geosearch/
*/
import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import { GeoSearchControl, MapBoxProvider } from 'leaflet-geosearch'

import '/node_modules/leaflet-geosearch/dist/geosearch.css'

import { api } from '../../services/api';


export const SearchField = ({ apiKey }) => {
    // console.log('SearchField', apiKey)
    const provider = new MapBoxProvider({
        params: {
            access_token: apiKey,
        },
    });

    const searchControl = new GeoSearchControl({
        provider: provider,
        style: 'bar', // optional: bar|button  - default button
        autoComplete: true, // optional: true|false  - default true
        autoCompleteDelay: 250, // optional: number      - default 250
        showMarker: true, // optional: true|false  - default true
        showPopup: false, // optional: true|false  - default false
        marker: {
            // optional: L.Marker    - default L.Icon.Default
            icon: new L.Icon.Default(),
            draggable: false,
        },
        popupFormat: ({ query, result }) => result.label, // optional: function    - default returns result label,
        resultFormat: ({ result }) => {
            return result.label
        }, // optional: function    - default returns result label
        maxMarkers: 1, // optional: number      - default 1
        retainZoomLevel: false, // optional: true|false  - default false
        animateZoom: true, // optional: true|false  - default true
        autoClose: false, // optional: true|false  - default false
        searchLabel: 'Enter address', // optional: string      - default 'Enter address'
        keepResult: false, // optional: true|false  - default false
        updateMap: true, // optional: true|false  - default true
    });

    const map = useMap();
    useEffect(() => {
        map.addControl(searchControl);
        return () => map.removeControl(searchControl);
    }, []);
    
    map.on('geosearch/showlocation', async () => {
        async function updateMapCenter(mapCenter) {
            console.log('geosearch/showlocation mapCenter', mapCenter)
            const { data } = await api.patch("/map_config", {"center": mapCenter})
            console.log('data', data)
            return data
        }

        const mapCenter = map.getCenter()
        await updateMapCenter([mapCenter.lat, mapCenter.lng])
    });

    return null;
}