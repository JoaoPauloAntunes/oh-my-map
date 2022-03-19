import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';


export default function PopupMarker({ position }) {
    return (
        <Marker position={position}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
    )
}