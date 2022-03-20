import {
  MapContainer,
  TileLayer,
  Popup,
} from 'react-leaflet'
import { createPathComponent } from '@react-leaflet/core'
import L from 'leaflet'

import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

import styles from './index.module.scss'


function getBounds(props) {
  return L.latLng(props.center).toBounds(props.size)
}

function createSquare(props, context) {
  const instance = new L.Rectangle(getBounds(props))
  return { instance, context: { ...context, overlayContainer: instance } }
}

function updateSquare(instance, props, prevProps) {
  if (props.center !== prevProps.center || props.size !== prevProps.size) {
    instance.setBounds(getBounds(props))
  }
}

const Square = createPathComponent(createSquare, updateSquare)

const center = [51.505, -0.09]

const Map = () => {
  return (
    <MapContainer className={styles.Map} center={center} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Square center={center} size={1000}>
        <Popup>Hello Popup</Popup>
      </Square>
    </MapContainer>
  )
}

export default Map