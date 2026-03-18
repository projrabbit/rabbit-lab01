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

  const campusLayer = new GraphicsLayer({
    title: "Truong dai hoc"
  });

  map.add(campusLayer);

  const popupTemplate = {
    title: "{ten_truong}",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "loai_don_vi",
            label: "Loại đơn vị"
          },
          {
            fieldName: "co_so",
            label: "Cơ sở"
          },
          {
            fieldName: "dia_chi",
            label: "Địa chỉ"
          },
          {
            fieldName: "nam_thanh_lap",
            label: "Năm thành lập"
          },
          {
            fieldName: "so_sinh_vien",
            label: "Số sinh viên",
            format: {
              digitSeparator: true,
              places: 0
            }
          },
          {
            fieldName: "nhom_nganh",
            label: "Nhóm ngành"
          }
        ]
      }
    ]
  };

  const pictureMarkerSymbol = {
    type: "picture-marker",
    url: "https://static.arcgis.com/images/Symbols/Shapes/BluePin1LargeB.png",
    width: "26px",
    height: "26px",
    yoffset: "10px"
  };

  esriRequest("./data/university/ten_truong_ueh_hcmue.json", {
    responseType: "json"
  }).then(function(response) {
    const universities = response.data;

    universities.forEach(function(item) {
      const isUeh = item.name.indexOf("Kinh tế") !== -1;

      const graphic = new Graphic({
        geometry: new Point({
          longitude: item.longitude,
          latitude: item.latitude,
          spatialReference: { wkid: 4326 }
        }),
        symbol: pictureMarkerSymbol,
        attributes: {
          loai_don_vi: "Trường đại học",
          ten_truong: item.name,
          co_so: isUeh ? "Cơ sở A" : "Cơ sở chính",
          dia_chi: isUeh
            ? "59C Nguyễn Đình Chiểu, Phường Xuân Hòa, TP.HCM"
            : "280 An Dương Vương, Phường Chợ Quán, TP.HCM",
          nam_thanh_lap: item.year,
          so_sinh_vien: item.students,
          nhom_nganh: item.majors
        },
        popupTemplate: popupTemplate
      });

      campusLayer.add(graphic);
    });
  });

});
