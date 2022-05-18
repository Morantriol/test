export function handleSwitchCountry(e) {
  const $items = document.querySelectorAll(".sidebar__filter-item");
  // const $titles = document.querySelectorAll(".sidebar__title");
  const $content = document.querySelectorAll(".wrapper__item");
  const $id = e.currentTarget.getAttribute("id");

  $items.forEach((item) => {
    item.classList.remove("sidebar__filter-item--active");
  });

  // $titles.forEach(item => {
  //   item.classList.remove("sidebar__title--active");
  // })

  e.currentTarget.classList.add("sidebar__filter-item--active");

  $content.forEach((item) => {
    item.classList.remove("wrapper__item--active");
    if (item.getAttribute("id") === $id) {
      item.classList.add("wrapper__item--active");
    }
  });
}
