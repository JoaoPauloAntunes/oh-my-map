import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import styles from './index.module.scss';
import LocationMarker from "../LocationMarker";
import GeoJSONCluster from '../GeoJSONCluster';

const Map = ({ markersData }) => {
  return (
    <MapContainer
      className={styles.Map}
      center={[-27.0, -55.30]}
      zoom={6}
      scrollWheelZoom={true}
      timeDimension={true}
    >
      <TileLayer
        url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
        attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
      />
      {/* <LocationMarker /> */}
      <GeoJSONCluster data={markersData} />
    </MapContainer>
  )
}

export default Map;