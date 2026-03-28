# rabbit-lab01

## Bao cao cong viec da lam

Du an xay dung 3 trang ban do su dung ArcGIS JavaScript API va du lieu GeoJSON phuc vu 3 yeu cau chinh:

1. Ban do hanh chinh cac tinh/thanh khu vuc mien Nam.
2. Ban do cac tuyen quoc lo cao toc.
3. Ban do diem truong dai hoc.

## Noi dung da hoan thanh

### Yeu cau 1 - Ban do hanh chinh
- File thuc hien: `administrative-map.html`
- Tai va hien thi 8 tep GeoJSON tinh/thanh trong thu muc `data/VN_Southern_provinces/`.
- Gan mau khac nhau cho tung don vi hanh chinh.
- Them nhan ten tinh (`ten_tinh`) truc tiep tren ban do.
- Cau hinh popup hien thi thong tin dan so va dien tich.

### Yeu cau 2 - Ban do tuyen quoc lo cao toc
- File thuc hien: `roads-map.html`
- Doc nhieu tep du lieu tu thu muc `data/road/` va gop thanh mot `FeatureCollection`.
- Chuan hoa thuoc tinh tu du lieu goc:
	- Ten tuyen (`name`)
	- Chieu dai (`length_text`)
	- Lo gioi (`right_of_way_text`)
	- Tinh/thanh di qua (`province_text`)
- Hien thi theo `unique-value renderer` de phan biet mau theo tung tuyen.
- Popup hien thi thong tin chi tiet tung tuyen.

### Yeu cau 3 - Ban do diem truong dai hoc
- File thuc hien: `universities-map.html`
- Doc du lieu tu 5 tep JSON trong thu muc `data/university/`.
- Chuyen du lieu thanh diem ban do (`Graphic`) va hien thi bang `picture-marker`.
- Bo qua ban ghi sai toa do (latitude/longitude khong hop le).
- Popup hien thi thong tin truong: ten, nam thanh lap, nganh dao tao, quy mo sinh vien.

## Cong nghe su dung
- ArcGIS JavaScript API 4.29 (CDN)
- GeoJSONLayer, GraphicsLayer, MapView
- JavaScript (ES6), HTML, CSS

Thong tin dependencies trong `package.json`:
- `@arcgis/core`
- `@arcgis/map-components`
- `@esri/calcite-components`

## Cau truc thu muc du lieu
- `data/VN_Southern_provinces/`: Du lieu hanh chinh theo tinh/thanh.
- `data/road/`: Du lieu cac tuyen duong.
- `data/university/`: Du lieu diem truong dai hoc.

## Cach chay du an

1. Clone repository.
2. Mo thu muc `rabbit-lab01` trong VS Code.
3. Chay bang local server (Live Server hoac bat ky HTTP server nao) de doc file JSON/GeoJSON.
4. Mo cac trang:
	 - `administrative-map.html`
	 - `roads-map.html`
	 - `universities-map.html`

## Quy uoc lam viec nhom (Git)
- Moi thanh vien lam viec tren nhanh rieng, tao PR de review.
- Khong push truc tiep len nhanh `main`.
- Dat ten nhanh theo mau: `dev-<your_name>` (vi du: `dev-mnhtn`).
