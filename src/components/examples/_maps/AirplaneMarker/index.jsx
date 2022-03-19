/*
    Demo: https://codesandbox.io/s/react-leaflet-tracking-marker-example-ivlhk?file=/src/App.js
*/
import { useEffect, useState } from "react"
import {
    MapContainer,
    TileLayer,
} from 'react-leaflet'
import L from "leaflet"

import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

import { LeafletTrackingMarker } from 'react-leaflet-tracking-marker'

const icon = L.icon({
    iconSize: [50, 50],
    popupAnchor: [2, -20],
    iconUrl: "/images/airplane.png"
});

function AirplaneMarker({ data }) {
    const { lat, lng } = data;
    const [prevPos, setPrevPos] = useState([lat, lng]);

    useEffect(() => {
        if (prevPos[1] !== lng && prevPos[0] !== lat) setPrevPos([lat, lng]);
    }, [lat, lng, prevPos]);

    return (
        <LeafletTrackingMarker
            icon={icon}
            position={[lat, lng]}
            previousPosition={prevPos}
            duration={1000}
        />
    );
}


const dataStory = [
    {
      lat: 53.22376666666667,
      lng: 50.745841666666664
    },
    {
      lat: 53.22376666666667,
      lng: 50.745841666666664
    },
    {
      lat: 53.223728333333334,
      lng: 50.74598666666667
    },
    {
      lat: 53.223705,
      lng: 50.746021666666664
    },
    {
      lat: 53.22365166666667,
      lng: 50.746075
    }
];

let cursor = 0;
const Map = () => {
    const [currentTrack, setCurrentTrack] = useState({});

    useEffect(() => {
        setCurrentTrack(dataStory[cursor]);

        const interval = setInterval(() => {
            if (cursor === dataStory.length - 1) {
                cursor = 0;
                setCurrentTrack(dataStory[cursor]);
                return;
            }

            cursor += 1;
            setCurrentTrack(dataStory[cursor]);
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div>
            <MapContainer
                style={{ height: "calc(100vh - 5px)" }}
                center={dataStory[0]}
                zoom={15}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <AirplaneMarker data={currentTrack ?? {}} />
            </MapContainer>
        </div>
    )
}

export default Map