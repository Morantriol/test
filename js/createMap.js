import { getData } from "./getData.js";

export const createMap = () => ymaps.ready(init);

const data = await getData();

function init() {
  let map = new ymaps.Map("map", {
    center: [0, 0],
    zoom: 2,
  });

  const points = [];

  const $offices = document.querySelectorAll(".spoiler__office-item");

  // $offices.forEach(office => {
  //   office.addEventListener("click", () => {

  //   })
  // })

  data.forEach((country) => {
    country.cities.forEach((city) => {
      city.offices.forEach((office) => {
        let placemark = new ymaps.GeoObject(office.placemark);
        points.push(placemark);
        $offices.forEach((officeEl) => {
          if (
            officeEl.addEventListener &&
            officeEl.firstChild.innerHTML === office.name
          ) {
            officeEl.addEventListener("click", () => {
              map.setCenter(office.placemark.geometry.coordinates, 15, {
                checkZoomRange: true,
                duration: 400,
              });
            });
          }
        });
      });
    });
  });

  const placemarks = ymaps.geoQuery(points);

  function checkState() {
    map.geoObjects.removeAll();

    let shownObjects;
    let byCountry = new ymaps.GeoQueryResult();

    if (
      document.querySelector(".sidebar__filter-item--active").id === "russia"
    ) {
      byCountry = placemarks.search('properties.country = "russia"');
    }

    if (
      document.querySelector(".sidebar__filter-item--active").id === "belarus"
    ) {
      byCountry = placemarks.search('properties.country = "belarus"');
    }

    shownObjects = byCountry
      .applyBoundsToMap(map, { checkZoomRange: true })
      .addToMap(map);

    placemarks.remove(shownObjects).removeFromMap(map);

    map.geoObjects.add(
      shownObjects.clusterize({ maxZoom: 10, zoomMargin: 300 })
    );
  }

  const $russia = document.getElementById("russia");

  $russia.addEventListener("click", () => {
    checkState();
  });

  const $belarus = document.getElementById("belarus");

  $belarus.addEventListener("click", () => {
    checkState();
  });

  checkState();

  map.controls.remove("geolocationControl"); // удаляем геолокацию
  map.controls.remove("searchControl"); // удаляем поиск
  map.controls.remove("trafficControl"); // удаляем контроль трафика
  map.controls.remove("typeSelector"); // удаляем тип
  map.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
  map.controls.remove("zoomControl"); // удаляем контрол зуммирования
  map.controls.remove("rulerControl"); // удаляем контрол правил
  // map.behaviors.disable(["scrollZoom"]); // отключаем скролл карты (опционально)
}
