import { 
    useEffect, 
    useRef,
} from 'react';
import {
    MapContainer,
    TileLayer,
    Circle,
} from 'react-leaflet'

import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

import styles from './index.module.scss'


function MyComponent() {
    const circleRef = useRef()

    useEffect(() => {
        const radius = circleRef.current.getRadius();
        console.log({"radius": radius})
    })

    return <Circle ref={circleRef} center={[50.5, 30.5]} radius={200} />
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