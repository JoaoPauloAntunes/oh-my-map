import { useMemo, useState } from 'react'
import { 
  MapContainer, 
  TileLayer,
  Circle,
  CircleMarker,
  Marker,
  Popup,
  Polygon,
  Tooltip,
  Rectangle,
} from 'react-leaflet'

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import styles from './index.module.scss';


const multiPolygon = [
  [
    [51.51, -0.12],
    [51.51, -0.13],
    [51.53, -0.13],
  ],
  [
    [51.51, -0.05],
    [51.51, -0.07],
    [51.53, -0.07],
  ],
]

const rectangle = [
  [51.49, -0.08],
  [51.5, -0.06],
]

function TooltipCircle() {
  const [clickedCount, setClickedCount] = useState(0)
  const eventHandlers = useMemo(
    () => ({
      click() {
        setClickedCount((count) => count + 1)
      },
    }),
    [],
  )

  const clickedText =
    clickedCount === 0
      ? 'Click this Circle to change the Tooltip text'
      : `Circle click: ${clickedCount}`

  return (
    <Circle
      center={center}
      eventHandlers={eventHandlers}
      pathOptions={{ fillColor: 'blue' }}
      radius={200}>
      <Tooltip>{clickedText}</Tooltip>
    </Circle>
  )
}


const center = [51.505, -0.09];

const TooltipsMap = () => {
  return (
    <MapContainer 
      className={styles.Map}
      center={center} 
      zoom={13}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <TooltipCircle />
      <CircleMarker
        center={[51.51, -0.12]}
        pathOptions={{ color: 'red' }}
        radius={20}>
        <Tooltip>Tooltip for CircleMarker</Tooltip>
      </CircleMarker>
      <Marker position={[51.51, -0.09]}>
        <Popup>Popup for Marker</Popup>
        <Tooltip>Tooltip for Marker</Tooltip>
      </Marker>
      <Polygon pathOptions={{ color: 'purple' }} positions={multiPolygon}>
        <Tooltip sticky>sticky Tooltip for Polygon</Tooltip>
      </Polygon>
      <Rectangle bounds={rectangle} pathOptions={{ color: 'black' }}>
        <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
          permanent Tooltip for Rectangle
        </Tooltip>
      </Rectangle>
    </MapContainer>
  )
}

export default TooltipsMap