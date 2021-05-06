import L from "leaflet";
import { useMap } from "react-leaflet";


export default function GeoJSONCluster({ data }) {
  const map = useMap();

  const geoJson = new L.GeoJSON(data);
  geoJson.addTo(map);

  return null
}
