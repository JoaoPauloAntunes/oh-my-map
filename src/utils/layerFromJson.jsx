import { forEach } from 'lodash';
import L from 'leaflet'

export const createLayersFromJson = (data) => {
  const layers = [];

  forEach(data, (geo, id) => {
    console.log('geo', geo)
    L.geoJSON(geo, {
      pointToLayer: (feature, latlng) => {
        if (feature.properties.radius) {
          return new L.Circle(latlng, {
            radius: feature.properties.radius,
            fill: "red"
          });
        } else {
          return new L.Marker(latlng);
        }
      },
      onEachFeature: (feature, layer) => {
        layers.push(layer);
      },
    });
  });
  
  return layers;
};