require([
  "esri/Map",
  "esri/views/MapView"
], function(Map, MapView) {

  const map = new Map({
    basemap: "topo-vector"
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 5,
    center: [108, 16]
  });

  // Requirement 1: administrative provinces layers and popup.

});
