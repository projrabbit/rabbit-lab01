require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/GeoJSONLayer",
  "esri/geometry/Extent",
  "esri/widgets/Legend"
], function(Map, MapView, GeoJSONLayer, Extent, Legend) {

  const map = new Map({
    basemap: "topo-vector"
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    extent: new Extent({
      xmin: 105.6,
      ymin: 9.8,
      xmax: 106.5,
      ymax: 10.6,
      spatialReference: { wkid: 4326 }
    })
  });

  const expresswayLayer = new GeoJSONLayer({
    url: "./data/road/CT_TL_MT__MT_CT.json",
    title: "Các tuyến cao tốc Trung Lương - Mỹ Thuận - Cần Thơ",
    outFields: ["*"],
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        color: [214, 61, 57, 0.95],
        width: 4.5,
        style: "solid"
      }
    },
    popupTemplate: {
      title: "{name}",
      content: function(event) {
        const attrs = event.graphic.attributes || {};
        const lengthKm = typeof attrs.lenght === "number" ? attrs.lenght : Number(attrs.lenght || 0);
        const rightOfWay = typeof attrs.lo_gioi === "number" ? attrs.lo_gioi : Number(attrs.lo_gioi || 0);
        const provinceValue = attrs.province;
        const provinceText = Array.isArray(provinceValue)
          ? provinceValue.join(", ")
          : (provinceValue || "Không có dữ liệu");

        return "<b>Chiều dài:</b> " + lengthKm.toLocaleString("vi-VN") + " km<br/>" +
          "<b>Lộ giới:</b> " + rightOfWay.toLocaleString("vi-VN") + " m<br/>" +
          "<b>Tỉnh/TP đi qua:</b> " + provinceText;
      }
    }
  });

  map.add(expresswayLayer);

  const legend = new Legend({
    view: view
  });
  view.ui.add(legend, "bottom-right");

});


