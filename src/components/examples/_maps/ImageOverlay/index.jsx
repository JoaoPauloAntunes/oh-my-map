import {
  MapContainer,
  TileLayer,
  ImageOverlay,
} from 'react-leaflet'
import {
  LatLngBounds,
} from 'leaflet'

import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

import styles from './index.module.scss'


const Map = () => {
  const bounds = new LatLngBounds([40.712216, -74.22655], [40.773941, -74.12544])

  return (
    <MapContainer className={styles.Map} center={[40.75, -74.18]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ImageOverlay
        url="http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg"
        bounds={bounds}
        opacity={0.5}
        zIndex={10}
      />
    </MapContainer>
  )
}

export default Map