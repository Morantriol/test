import { createElement } from "./utils.js";
import { handleSwitchCountry } from "./handleSwitchCountry.js";

export const createFilterItems = (data) => {
  const $sidebarFilter = document.querySelector(".sidebar__filter");

  data.forEach((item, index) => {
    const $filterItem = createElement("button", "sidebar__filter-item");
    const $sidebarTitle = createElement("h4", "sidebar__title");

    $sidebarTitle.textContent = item.countryName;

    $sidebarFilter.appendChild($filterItem);
    $filterItem.appendChild($sidebarTitle);
    $filterItem.id = item.countryId;
    if (index === 0) {
      $filterItem.classList.add("sidebar__filter-item--active");
    }

    $filterItem.addEventListener("click", handleSwitchCountry);
  });
};
