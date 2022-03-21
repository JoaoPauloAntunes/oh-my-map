import React, {
  Component,
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  useMapEvents,
  MapConsumer,
} from 'react-leaflet'
import L from 'leaflet'
import { EditControl } from "react-leaflet-draw"

import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

import "/node_modules/leaflet-draw/dist/leaflet.draw.css"
import styles from './index.module.scss'

import { createLayersFromJson } from '../../utils/layerFromJson'
import { SearchField } from '../SearchField'
import { TextBoxControl } from '../TextBoxControl';


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
  const [editableFG, setEditableFG] = useState(null)


  function handleEdited(e) {
    let numEdited = 0;
    e.layers.eachLayer((layer) => {
      numEdited += 1;
    });
    console.log(`_onEdited: edited ${numEdited} layers`, e);

    handleChange()
  }

  function handleChange() {
    // this._editableFG contains the edited geometry, which can be manipulated through the leaflet API
    if (!editableFG || !onChange) {
      return
    }

    // make geojson data
    const features = Object.values(this._editableFG._layers).map((layer) => {
      console.log('layer', layer)

      const json = layer.toGeoJSON()
      console.log('json', json)

      if (json.geometry.type == "Point" && layer._radius) {
        json.properties = {
          radius: layer._mRadius ? layer._mRadius : 75,
        }
      }

      return json
    })
    const geojsonData = {
      "type": "FeatureCollection",
      "features": features
    }
    console.log('geojsonData', geojsonData)

    // component callback
    onChange(geojsonData)
  }

  function handleFeatureGroupReady(reactFGref) {
    if (!reactFGref) {
      return
    }
    // populate the leaflet FeatureGroup with the geoJson layers
    const layers = createLayersFromJson(geojsonData.features)
    console.log('layers', layers)

    layers.forEach((layer) => {
      reactFGref.addLayer(layer)
    })

    // store the ref for future access to content
    setEditableFG(reactFGref)
  }


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
      <FeatureGroup
          ref={(reactFGref) => {
            handleFeatureGroupReady(reactFGref)
          }}
        >
          <EditControl
            position="topright"
            onEdited={handleEdited}
            // onCreated={this._onCreated}
            // onDeleted={this._onDeleted}
            // onMounted={this._onMounted}
            // onEditStart={this._onEditStart}
            // onEditStop={this._onEditStop}
            // onDeleteStart={this._onDeleteStart}
            // onDeleteStop={this._onDeleteStop}
            draw={{
              rectangle: false,
            }}
          />
        </FeatureGroup>
    </MapContainer>
  )
}

export default Map