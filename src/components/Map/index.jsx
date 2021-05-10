// import { useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import styles from './index.module.scss';
import LocationMarker from "../LocationMarker";

const Map = ({ markersData }) => {
  const geojsBrazilAm = require('../../data/geojs-brazil-am.json');
  const geojsBrazilAp = require('../../data/geojs-brazil-ap.json');
  const geojsBrazilMa = require('../../data/geojs-brazil-ma.json');
  const geojsBrazilMs = require('../../data/geojs-brazil-ms.json');
  const geojsBrazilSc = require('../../data/geojs-brazil-sc.json');
  const geojsBrazilTo = require('../../data/geojs-brazil-to.json');
  const geojsBrazilGoDf = require('../../data/geojs-brazil-go-df.json');

  return (
    <MapContainer
      className={styles.Map}
      center={[5.745327760058189, -28.28148209924439]}
      zoom={4}
      scrollWheelZoom={true}
      timeDimension={true}
    >
      <TileLayer
        url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
        attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
      />
      <LocationMarker />
      <GeoJSON data={markersData} />
      <GeoJSON data={geojsBrazilAm} />
      <GeoJSON data={geojsBrazilAp} />
      <GeoJSON data={geojsBrazilMa} />
      <GeoJSON data={geojsBrazilMs} />
      <GeoJSON data={geojsBrazilSc} />
      <GeoJSON data={geojsBrazilTo} />
      <GeoJSON data={geojsBrazilGoDf} />
    </MapContainer>
  )
}

export default Map;