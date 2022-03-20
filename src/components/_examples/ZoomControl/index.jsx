import { createControlComponent } from '@react-leaflet/core'
import { Control } from 'leaflet'

export const ZoomControl = createControlComponent(
  (props) => new Control.Zoom(props),
)

export default ZoomControl;