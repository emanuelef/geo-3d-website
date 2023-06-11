import React from "react";
import { Map } from "react-map-gl";
import maplibregl from "maplibre-gl";
import { createRoot } from "react-dom/client";
import DeckGL from "@deck.gl/react";
import { LineLayer, ScatterplotLayer } from "@deck.gl/layers";

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";

const DATA_URL = {
  POINTS: "./points.json", // eslint-disable-line
};

const INITIAL_VIEW_STATE = {
  longitude: -0.341004,
  latitude: 51.477487,
  zoom: 12,
  minZoom: 10,
  maxZoom: 18,
  pitch: 40.5,
  bearing: -27.396674584323023,
};

export default function App() {
  const layers = [
    new ScatterplotLayer({
      id: "airports",
      data: DATA_URL.POINTS,
      radiusScale: 16,
      getPosition: (d) => d.coordinates,
      getFillColor: [255, 0, 255, 100],
      getRadius: 6,
      pickable: true,
    }),
  ];

  return (
    <DeckGL
      layers={layers}
      controller={true}
      initialViewState={INITIAL_VIEW_STATE}
    >
      <Map
        reuseMaps
        mapLib={maplibregl}
        mapStyle={MAP_STYLE}
        preventStyleDiffing={true}
      />
    </DeckGL>
  );
}

const container = document.body.appendChild(document.createElement("div"));
createRoot(container).render(<App />);
