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


export default class Map extends Component {
  
}