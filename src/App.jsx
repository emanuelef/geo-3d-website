import React from "react";
import { Map } from "react-map-gl";
import maplibregl from "maplibre-gl";
import { createRoot } from "react-dom/client";
import DeckGL from "@deck.gl/react";
import { LineLayer, ScatterplotLayer } from "@deck.gl/layers";

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";

const DATA_URL = {
  POINTS:
    "https://raw.githubusercontent.com/emanuelef/geo-3d-website/main/data/points.json",
  SEGMENTS:
    "https://raw.githubusercontent.com/emanuelef/geo-3d-website/main/data/segments.json",
  MIN_DISTANCE:
    "https://raw.githubusercontent.com/emanuelef/geo-3d-website/main/data/mindistance.json",
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

function getTooltip({ object }) {
  console.log(object);
  return (
    object &&
    `\
  ${object.name || ""}
  ${object.minDistance || ""}`
  );
}

export default function App() {
  const layers = [
    new ScatterplotLayer({
      id: "points",
      data: DATA_URL.POINTS,
      radiusScale: 16,
      getPosition: (d) => d.coordinates,
      getFillColor: [255, 0, 255, 100],
      getRadius: 6,
      pickable: true,
    }),
    new LineLayer({
      id: "segments",
      data: DATA_URL.SEGMENTS,
      opacity: 0.8,
      getSourcePosition: (d) => d.start,
      getTargetPosition: (d) => d.end,
      getColor: [0, 255, 0, 120],
      getWidth: 2,
      pickable: true,
      //dataTransform: (d) => d.filter((f) => f.icao == FLIGHT_ICAO),
    }),
    new LineLayer({
      id: "min-distance",
      data: DATA_URL.MIN_DISTANCE,
      opacity: 0.8,
      getSourcePosition: (d) => d.start,
      getTargetPosition: (d) => d.end,
      getColor: [255, 0, 0, 200],
      getWidth: 2,
      pickable: true,
      //dataTransform: (d) => d.filter((f) => f.icao == FLIGHT_ICAO),
    }),
  ];

  return (
    <DeckGL
      layers={layers}
      controller={true}
      getTooltip={getTooltip}
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
