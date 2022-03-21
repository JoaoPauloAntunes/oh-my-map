import {
  useState,
} from 'react';
import {
  MapContainer,
  TileLayer,
  useMapEvents,
} from 'react-leaflet'
import L from 'leaflet'

import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

import "/node_modules/leaflet-draw/dist/leaflet.draw.css"
import styles from './index.module.scss'

import { SearchField } from '../SearchField'
import { TextBoxControl } from '../TextBoxControl'
import { EditFeatureGroup } from '../EditFeatureGroup'


function MapEvents({ setLocation }) {
  const map = useMapEvents({
    moveend: (e) => {
      console.log('center:', map.getCenter())
      setLocation(map.getCenter())
    }
  })

  return null
}


const Map = ({ mapConfig, geojsonData }) => {
  const mapCenter = L.latLng(mapConfig.center[0], mapConfig.center[1])
  const [location, setLocation] = useState(mapCenter)

  return (
    <MapContainer className={styles.Map} center={mapCenter} zoom={mapConfig.zoom}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SearchField apiKey={process.env.NEXT_PUBLIC_MAPBOX_KEY} />
      <MapEvents setLocation={setLocation} />
      <TextBoxControl position='bottomleft'>
        {`LatLng: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`}
      </TextBoxControl>
      <EditFeatureGroup geojsonData={geojsonData} />
    </MapContainer>
  )
}

export default Map