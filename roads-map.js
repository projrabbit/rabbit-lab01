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
      xmin: 102,
      ymin: 8,
      xmax: 110,
      ymax: 23,
      spatialReference: { wkid: 4326 }
    })
  });

  const roadFiles = [
    "bacgiang-langson.json",
    "danang-quangngai.json",
    "HCM-longthanhDaugiay_HCM-trungluong.json",
    "halong-vandon-mongcai.json",
    "nhatrang-camlam.json",
    "quynhon-chithanh.json",
    "trungluong-mythuan_mythuan-cantho.json"
  ];

  function normalizeFeature(feature, fileName) {
    const geometry = feature.geometry;
    const geometryType = geometry && geometry.type;
    if (geometryType !== "LineString" && geometryType !== "MultiLineString") {
      return null;
    }

    const attrs = feature.properties || {};
    const roadName = attrs.name || fileName.replace(".json", "");
    const rawLength = attrs.length != null ? attrs.length : attrs.lenght;
    const rawRightOfWay = attrs.lo_gioi != null ? attrs.lo_gioi : attrs["lo gioi"];
    const rawProvince = attrs.province != null ? attrs.province : attrs.provinces;

    const parsedLength = Number(rawLength);
    const parsedRightOfWay = Number(rawRightOfWay);

    const lengthText = Number.isFinite(parsedLength)
      ? parsedLength.toLocaleString("vi-VN") + " km"
      : "Không có dữ liệu";

    const rightOfWayText = Number.isFinite(parsedRightOfWay)
      ? parsedRightOfWay.toLocaleString("vi-VN") + " m"
      : "Không có dữ liệu";

    const provinceText = Array.isArray(rawProvince)
      ? rawProvince.join(", ")
      : (rawProvince || "Không có dữ liệu");

    return {
      type: "Feature",
      geometry: geometry,
      properties: {
        name: roadName,
        length_text: lengthText,
        right_of_way_text: rightOfWayText,
        province_text: provinceText
      }
    };
  }

  async function loadAllRoadData() {
    const datasets = await Promise.all(
      roadFiles.map(async function(fileName) {
        const response = await fetch("./data/road/" + fileName);
        const data = await response.json();
        return {
          fileName: fileName,
          features: Array.isArray(data.features) ? data.features : []
        };
      })
    );

    const mergedFeatures = datasets.flatMap(function(item) {
      return item.features.map(function(feature) {
        return normalizeFeature(feature, item.fileName);
      }).filter(function(feature) {
        return feature !== null;
      });
    });

    const mergedGeoJson = {
      type: "FeatureCollection",
      features: mergedFeatures
    };

    const colorPalette = [
      [214, 61, 57, 0.95],
      [34, 139, 34, 0.95],
      [30, 144, 255, 0.95],
      [255, 140, 0, 0.95],
      [138, 43, 226, 0.95],
      [0, 139, 139, 0.95],
      [178, 34, 34, 0.95],
      [70, 130, 180, 0.95]
    ];

    const roadNames = Array.from(new Set(mergedFeatures.map(function(feature) {
      return feature.properties.name;
    })));

    const uniqueValueInfos = roadNames.map(function(roadName, index) {
      return {
        value: roadName,
        label: roadName,
        symbol: {
          type: "simple-line",
          color: colorPalette[index % colorPalette.length],
          width: 4.5,
          style: "solid"
        }
      };
    });

    const blob = new Blob([JSON.stringify(mergedGeoJson)], { type: "application/json" });
    const blobUrl = URL.createObjectURL(blob);

    const expresswayLayer = new GeoJSONLayer({
      url: blobUrl,
      title: "Cac tuyen duong",
      outFields: ["*"],
      renderer: {
        type: "unique-value",
        field: "name",
        uniqueValueInfos: uniqueValueInfos,
        defaultSymbol: {
          type: "simple-line",
          color: [120, 120, 120, 0.9],
          width: 4.5,
          style: "solid"
        }
      },
      popupTemplate: {
        title: "{name}",
        content: "<b>Chiều dài:</b> {length_text}<br/>" +
          "<b>Lộ giới:</b> {right_of_way_text}<br/>" +
          "<b>Tỉnh/TP đi qua:</b> {province_text}"
      }
    });

    map.add(expresswayLayer);

    expresswayLayer.when(function() {
      URL.revokeObjectURL(blobUrl);
    });

  }

  loadAllRoadData().catch(function(error) {
    console.error("Khong the tai toan bo du lieu road", error);
  });

});


