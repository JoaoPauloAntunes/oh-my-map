/*
    Demo: https://smeijer.github.io/leaflet-geosearch/
*/
import { useEffect, useState } from "react"
import {
    MapContainer,
    TileLayer,
    useMap,
} from 'react-leaflet'
import L from 'leaflet'

import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

import '/node_modules/leaflet-geosearch/dist/geosearch.css'

import { GeoSearchControl, MapBoxProvider } from 'leaflet-geosearch';

import styles from './index.module.scss'
import 'https://cdn.rawgit.com/mapshakers/mapkeyicons/master/dist/MapkeyIcons.css'

const icon = L.icon({
  // iconSize: [50, 50],
  // popupAnchor: [2, -20],
  iconUrl: "/images/airplane.png"
});

const SearchField = ({apiKey}) => {
    const provider = new MapBoxProvider({
        params: {
            access_token: apiKey,
        },
    });

    const searchControl = new GeoSearchControl({
        provider: provider,
        style: 'bar', // optional: bar|button  - default button
        // autoComplete: true, // optional: true|false  - default true
        // autoCompleteDelay: 250, // optional: number      - default 250
        showMarker: true, // optional: true|false  - default true
        // showPopup: false, // optional: true|false  - default false
        marker: {
          // optional: L.Marker    - default L.Icon.Default
          icon: L.icon.glyph({ prefix: 'octicon', glyph: 'alert' }),
          // icon: icon,
          draggable: false,
        },
        // popupFormat: ({ query, result }) => result.label, // optional: function    - default returns result label,
        // resultFormat: ({ result }) => result.label, // optional: function    - default returns result label
        // maxMarkers: 1, // optional: number      - default 1
        // retainZoomLevel: false, // optional: true|false  - default false
        // animateZoom: true, // optional: true|false  - default true
        // autoClose: false, // optional: true|false  - default false
        // searchLabel: 'Enter address', // optional: string      - default 'Enter address'
        // keepResult: false, // optional: true|false  - default false
        // updateMap: true, // optional: true|false  - default true
    });

    const map = useMap();
    useEffect(() => {
        map.addControl(searchControl);
        return () => map.removeControl(searchControl);
    }, []);

    return null;
};

const Map = () => {
  return (
    <MapContainer className={styles.Map} center={[50.5, 30.5]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SearchField apiKey={process.env.NEXT_PUBLIC_MAPBOX_KEY} />
    </MapContainer>
  )
}

export default Map