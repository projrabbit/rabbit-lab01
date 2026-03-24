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
    zoom: 6,
    center: [106.2, 10.5]
  });

  const universitiesLayer = new GraphicsLayer({
    title: "Diem truong dai hoc"
  });
  map.add(universitiesLayer);

  const dataFiles = [
    "./data/university/ueh_hcmue.json",
    "./data/university/uit_ctu.json",
    "./data/university/agu_tgu.json",
    "./data/university/tvu_dtu.json"
  ];

  const universitySymbol = {
    type: "picture-marker",
    url: "https://static.arcgis.com/images/Symbols/Shapes/BluePin1LargeB.png",
    width: "28px",
    height: "28px"
  };

  function toUniversityGraphic(university) {
    const longitude = Number(university.longitude);
    const latitude = Number(university.latitude);

    if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
      return null;
    }

    return new Graphic({
      geometry: new Point({
        longitude: longitude,
        latitude: latitude
      }),
      symbol: universitySymbol,
      attributes: {
        name: university.name || "Khong co du lieu",
        year: university.year || "Khong ro",
        majors: university.majors || "Khong co du lieu",
        students: Number.isFinite(Number(university.students))
          ? Number(university.students)
          : null
      },
      popupTemplate: {
        title: "{name}",
        content: function(event) {
          const attrs = event.graphic.attributes || {};
          const studentsText = Number.isFinite(Number(attrs.students))
            ? "Khoang " + Number(attrs.students).toLocaleString("vi-VN") + " sinh vien"
            : "Khong ro";
          return "<b>Nam thanh lap:</b> " + attrs.year + "<br/>" +
            "<b>Nganh dao tao:</b> " + attrs.majors + "<br/>" +
            "<b>So luong sinh vien (tuong doi):</b> " + studentsText;
        }
      }
    });
  }

  function loadUniversityData() {
    const requests = dataFiles.map(function(url) {
      return esriRequest(url, {
        responseType: "json"
      }).then(function(response) {
        return Array.isArray(response.data) ? response.data : [];
      });
    });

    Promise.all(requests)
      .then(function(results) {
        const universities = results.flat();
        const graphics = universities
          .map(toUniversityGraphic)
          .filter(function(graphic) { return graphic !== null; });

        universitiesLayer.addMany(graphics);

        if (graphics.length > 0) {
          view.goTo(graphics).catch(function() {
            // Keep default view if goTo fails.
          });
        }
      })
      .catch(function(error) {
        console.error("Khong the tai du lieu truong dai hoc", error);
      });
  }

  view.when(loadUniversityData);

});
