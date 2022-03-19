// import { useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import styles from './index.module.scss';

const Map = ({ markersData }) => {
  const geojsBrazilAm = require('../../../data/geojs-brazil-am.json');
  const geojsBrazilAp = require('../../../data/geojs-brazil-ap.json');
  const geojsBrazilMa = require('../../../data/geojs-brazil-ma.json');
  const geojsBrazilMs = require('../../../data/geojs-brazil-ms.json');
  const geojsBrazilSc = require('../../../data/geojs-brazil-sc.json');
  const geojsBrazilTo = require('../../../data/geojs-brazil-to.json');
  const geojsBrazilGoDf = require('../../../data/geojs-brazil-go-df.json');

  return (
    <MapContainer
      className={styles.Map}
      center={[5.745327760058189, -28.28148209924439]}
      zoom={4}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
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