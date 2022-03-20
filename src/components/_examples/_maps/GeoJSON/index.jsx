import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

import styles from './index.module.scss'

const Map = ({ markersData }) => {
  const geojsBrazilAm = require('../../../../assets/geojs-brazil-am.json');
  const geojsBrazilAp = require('../../../../assets/geojs-brazil-ap.json');
  const geojsBrazilMa = require('../../../../assets/geojs-brazil-ma.json');
  const geojsBrazilMs = require('../../../../assets/geojs-brazil-ms.json');
  const geojsBrazilSc = require('../../../../assets/geojs-brazil-sc.json');
  const geojsBrazilTo = require('../../../../assets/geojs-brazil-to.json');
  const geojsBrazilGoDf = require('../../../../assets/geojs-brazil-go-df.json');

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