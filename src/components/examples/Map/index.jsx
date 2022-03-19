import {
  MapContainer,
} from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import styles from './index.module.scss';


const center = [51.505, -0.09];

const Map = () => {
  return (
    <MapContainer 
      className={styles.Map}
      center={center} 
      zoom={13}
    >
    </MapContainer>
  )
}

export default Map