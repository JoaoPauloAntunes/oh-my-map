import {
    MapContainer,
    TileLayer,
    useMap
} from 'react-leaflet'

import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

import styles from './index.module.scss'


function MyComponent() {
    const map = useMap()
    console.log('map center:', map.getCenter())
    return null
}

const Map = () => {
    return (
        <MapContainer className={styles.Map} center={[50.5, 30.5]} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MyComponent />
        </MapContainer>
    )
}

export default Map