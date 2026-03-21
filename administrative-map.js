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
      xmin: 102.2,
      ymin: 8.3,
      xmax: 108.2,
      ymax: 12.2,
      spatialReference: { wkid: 4326 }
    })
  });

  const provinceFiles = [
    "AG",
    "CM",
    "CT",
    "DN",
    "DT",
    "TN",
    "TPHCM",
    "VL"
  ];

  const provinceColors = [
    [208, 229, 255, 0.7],
    [176, 215, 255, 0.7],
    [153, 199, 252, 0.7],
    [130, 183, 245, 0.7],
    [105, 167, 235, 0.7],
    [80, 149, 220, 0.7],
    [64, 131, 203, 0.7],
    [48, 112, 184, 0.7]
  ];

  const infoTemplate = {
    title: "{ten_tinh}",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "dan_so",
            label: "Dân số",
            format: {
              digitSeparator: true,
              places: 0
            }
          },
          {
            fieldName: "dtich_km2",
            label: "Diện tích (km2)",
            format: {
              digitSeparator: true,
              places: 2
            }
          }
        ]
      }
    ]
  };

  provinceFiles.forEach(function(fileCode, index) {
    const layer = new GeoJSONLayer({
      url: "./data/VN_Southern_provinces/" + fileCode + ".json",
      title: "Tỉnh/TP " + fileCode,
      popupTemplate: infoTemplate,
      renderer: {
        type: "simple",
        symbol: {
          type: "simple-fill",
          color: provinceColors[index % provinceColors.length],
          outline: {
            color: [20, 59, 96, 1],
            width: 1.25
          }
        }
      },
      labelingInfo: [
        {
          symbol: {
            type: "text",
            color: "#1f2d3d",
            haloColor: "#ffffff",
            haloSize: 1,
            font: {
              family: "Segoe UI",
              size: 9,
              weight: "bold"
            }
          },
          labelPlacement: "always-horizontal",
          labelExpressionInfo: {
            expression: "$feature.ten_tinh"
          }
        }
      ]
    });

    map.add(layer);
  });


});
