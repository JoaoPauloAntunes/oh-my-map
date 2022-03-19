import { useRef } from 'react'
import { MapContainer, TileLayer, useMapEvent } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import styles from './index.module.scss';


function SetViewOnClick({ animateRef }) {
  const map = useMapEvent('click', (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
    })
  })

  return null
}

const Map = () => {
  const animateRef = useRef(false)

  return (
    <>
      <p>
        <label>
          <input
            type="checkbox"
            onChange={() => {
              animateRef.current = !animateRef.current
            }}
          />
          Animate panning
        </label>
      </p>
      <MapContainer className={styles.Map} center={[51.505, -0.09]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SetViewOnClick animateRef={animateRef} />
      </MapContainer>
    </>
  )
}

export default Map