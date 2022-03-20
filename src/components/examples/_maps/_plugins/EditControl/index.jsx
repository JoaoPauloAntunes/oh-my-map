import { useState, useEffect } from 'react'
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  Circle,
} from 'react-leaflet'
import { EditControl } from "react-leaflet-draw"
import { v4 as uuid4 } from 'uuid'

import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

import "/node_modules/leaflet-draw/dist/leaflet.draw.css"
import styles from './index.module.scss'


const Map = ({ geojsonData, onChange }) => {
  const [editableFG, setEditableFG] = useState(null)

  // useEffect(() => {
  //   console.log(editableFG)
  //   if (!editableFG) {
  //     return
  //   }

  //   console.log('editableFG', editableFG)
  //   console.log('editableFG.toGeoJSON', editableFG.toGeoJSON())
  // }, [editableFG])

  function handleEdited(e) {
    let numEdited = 0
    e.layers.eachLayer((layer) => {
      numEdited += 1
    });
    console.log(`handleEdited: edited ${numEdited} layers`, e)
  }
  
  function handleCreated(e) {
    let type = e.layerType
    let layer = e.layer
    
    const feature = layer.toGeoJSON()
    feature.properties.id = uuid4()
    console.log("feature", feature)
    // geojsonData.features.push(feature)
    // console.log("geojsonData")
    // console.log(geojsonData)
    // setGeojsonData(geojsonData)

    handleChange()
  }

  function handleDeleted(e) {
    let numDeleted = 0

    console.log('editableFG', editableFG)
    e.layers.eachLayer((layer) => {
      console.log("layer", layer)
      console.log("feature", layer.feature)
      // console.log("id", layer.feature.properties.id)

      


      // geojsonData.features = geojsonData.features.filter((value) => value.properties.id != layer.feature.properties.id)
      // setGeojsonData(geojsonData)
      numDeleted += 1
    });
    console.log(`handleDeleted: removed ${numDeleted} layers`, e)

    handleChange()
  }

  function handleMounted(drawControl) {
    console.log('handleMounted', drawControl)
  }

  function handleEditStart(e) {
    console.log('handleEditStart', e)
  }

  function handleEditStop(e) {
    console.log('handleEditStop', e)
  }

  function handleDeleteStart(e) {
    console.log('handleDeleteStart', e)
  }

  function handleDeleteStop(e) {
    console.log('handleDeleteStop', e)
  }

  function handleChange() {
    // setGeojsonData(geojsonData)

    if (!editableFG || !onChange) {
      return
    }
    print('editableFG', editableFG)
    geojson = editableFG.toGeoJSON()
    console.log('geojson', geojson)
    console.log('features', geojson.features)
    // onChange()
  }

  function handleFeatureGroupReady(reactFGRef) {
    console.log('handleFeatureGroupReady', reactFGRef)
    if (!reactFGRef) {
      return
    }
    // populate the leaflet FeatureGroup with the geoJson layers
    let leafletGeoJSON = new L.GeoJSON(geojsonData)

    let leafletFGRef = reactFGRef
    // console.log('leafletFGRef', leafletFGRef)

    leafletGeoJSON.eachLayer((layer) => {
      // console.log('layer', layer)
      leafletFGRef.addLayer(layer)
    })

    // console.log('reactFGRef', reactFGRef)
    // console.log('reactFGRef.toGeoJSON', reactFGRef.toGeoJSON())
    setEditableFG(reactFGRef)
  };

  return (
    <MapContainer className={styles.Map} center={[37.8189, -122.4786]} zoom={14}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FeatureGroup
          ref={(reactFGRef) => {
            handleFeatureGroupReady(reactFGRef)
          }}
        >
          <EditControl
            position="topright"
            onEdited={handleEdited}
            onCreated={handleCreated}
            onDeleted={handleDeleted}
            onMounted={handleMounted}
            onEditStart={handleEditStart}
            onEditStop={handleEditStop}
            onDeleteStart={handleDeleteStart}
            onDeleteStop={handleDeleteStop}
            draw={{
              rectangle: false,
            }}
          />
        </FeatureGroup>
      </MapContainer>
  )
}

export default Map