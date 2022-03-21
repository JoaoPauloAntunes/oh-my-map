import React, {
  Component
} from 'react'
import {
  FeatureGroup,
} from 'react-leaflet'

import { EditControl } from "react-leaflet-draw"

import { createLayersFromJson } from '../../utils/layerFromJson'
import { api } from '../../services/api'


async function updateGeojson(geojsonData) {
  const { data } = await api.put("/geojson", geojsonData)
  return data
}


export class EditFeatureGroup extends Component {
  _editableFG = null

  render() {
    return (
      <FeatureGroup
        ref={(reactFGref) => {
          this._onFeatureGroupReady(reactFGref)
        }}
      >
        <EditControl
          position="topright"
          onEdited={this._onEdited}
          onCreated={this._onCreated}
          onDeleted={this._onDeleted}
          onMounted={this._onMounted}
          onEditStart={this._onEditStart}
          onEditStop={this._onEditStop}
          onDeleteStart={this._onDeleteStart}
          onDeleteStop={this._onDeleteStop}
          draw={{
            rectangle: false,
          }}
        />
      </FeatureGroup>
    )
  }

  _onEdited = (e) => {
    let numEdited = 0;
    e.layers.eachLayer((layer) => {
      numEdited += 1;
    });
    console.log(`_onEdited: edited ${numEdited} layers`, e);

    this._onChange();
  };

  _onCreated = (e) => {
    let type = e.layerType;
    let layer = e.layer;
    console.log('type', type)
    console.log('layer', layer)
    console.log('layer.toGeoJSON', layer.toGeoJSON())
    if (type === 'marker') {
      // Do marker specific actions
      console.log('_onCreated: marker created', e);
    } else {
      console.log('_onCreated: something else created:', type, e);
    }

    this._onChange();
  };

  _onDeleted = (e) => {
    let numDeleted = 0;
    e.layers.eachLayer((layer) => {
      numDeleted += 1;
    });
    console.log(`onDeleted: removed ${numDeleted} layers`, e);

    this._onChange();
  };

  _onMounted = (drawControl) => {
    console.log('_onMounted', drawControl);
  };

  _onEditStart = (e) => {
    console.log('_onEditStart', e);
  };

  _onEditStop = (e) => {
    console.log('_onEditStop', e);
  };

  _onDeleteStart = (e) => {
    console.log('_onDeleteStart', e);
  };

  _onDeleteStop = (e) => {
    console.log('_onDeleteStop', e);
  };

  _onFeatureGroupReady = (reactFGref) => {
    if (!reactFGref) {
      return;
    }
    
    // populate the leaflet FeatureGroup with the geoJson layers
    const { geojsonData } = this.props;
    let layers = createLayersFromJson(geojsonData.features)
    console.log('layers', layers)

    layers.forEach((layer) => {
      reactFGref.addLayer(layer)
    })

    // store the ref for future access to content
    this._editableFG = reactFGref;
  };

  _onChange = () => {
    // this._editableFG contains the edited geometry, which can be manipulated through the leaflet API
    if (!this._editableFG) {
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

    updateGeojson(geojsonData)
  };
}