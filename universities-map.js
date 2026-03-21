require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/GraphicsLayer",
  "esri/Graphic",
  "esri/geometry/Point",
  "esri/request"
], function(Map, MapView, GraphicsLayer, Graphic, Point, esriRequest) {

  const map = new Map({
    basemap: "topo-vector"
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 17,
    center: [106.6948371, 10.7829634]
  });

  
});
