import {
  MapContainer,
  TileLayer,
} from 'react-leaflet'

import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

import styles from './index.module.scss'

import { createControlComponent } from '@react-leaflet/core'
import { Control } from 'leaflet'

export const ZoomControl = createControlComponent(
  (props) => new Control.Zoom(props),
)

const Map = () => {
  return (
    <MapContainer className={styles.Map} center={[50.5, 30.5]} zoom={13} zoomControl={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="topright" />
    </MapContainer>
  )
}

export default Map