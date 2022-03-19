import { MapContainer, SVGOverlay, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

import styles from './index.module.scss'

const position = [51.505, -0.09]
const bounds = [
  [51.49, -0.08],
  [51.5, -0.06],
]

const SVGOverlayMap = () => {
  return (
    <MapContainer 
      className={styles.Map}
      center={position} 
      zoom={13}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SVGOverlay attributes={{ stroke: 'red' }} bounds={bounds}>
        <rect x="0" y="0" width="100%" height="100%" fill="blue" />
        <circle r="5" cx="10" cy="10" fill="red" />
        <text x="50%" y="50%" stroke="white">
          text
        </text>
      </SVGOverlay>
    </MapContainer>
  )
}

export default SVGOverlayMap
