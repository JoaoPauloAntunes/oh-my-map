import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

const createRoutineMachineLayer = (props) => {
  const instance = L.Routing.control({
    position: 'topleft',
    waypoints: [
      L.latLng(38.9072, -77.036),
      L.latLng(37.7749, -122.4194)
    ],
    lineOptions: {
      styles: [
        {
          color: '#757de8',
        },
      ],
    },
  });

  return instance;
};

// Pass our createRoutingMachineLayer to the createControlHook:
const RoutingMachine = createControlComponent(createRoutineMachineLayer);

// Export
export default RoutingMachine;