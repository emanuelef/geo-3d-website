import React from "react";
import { Map } from "react-map-gl";
import maplibregl from "maplibre-gl";
import { createRoot } from "react-dom/client";
import DeckGL from "@deck.gl/react";
import { LineLayer, ScatterplotLayer } from "@deck.gl/layers";


const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";

const INITIAL_VIEW_STATE = {
  latitude: 51.47,
  longitude: 0.45,
  zoom: 4,
  bearing: 0,
  pitch: 30,
};

function Root() {
  const onClick = (info) => {
    if (info.object) {
      // eslint-disable-next-line
      alert(
        `${info.object.properties.name} (${info.object.properties.abbrev})`
      );
    }
  };

  return (
    <DeckGL controller={true} initialViewState={INITIAL_VIEW_STATE}>
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
createRoot(container).render(<Root />);
