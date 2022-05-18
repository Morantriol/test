import { createElement } from "./utils.js";

export const createOfficeList = (data) => {
  const $wrapper = document.querySelector(".wrapper");

  data.forEach((item, index) => {
    const $itemWrapper = createElement("div", "wrapper__item");
    $itemWrapper.id = item.countryId;
    if (index === 0) {
      $itemWrapper.classList.add("wrapper__item--active");
    }
    $wrapper.appendChild($itemWrapper);

    item.cities.forEach((city) => {
      const $spoiler = createElement("details", "spoiler");
      const $spoilerControl = createElement("summary", "spoiler__control");
      const $spoilerTitle = createElement("h3", "spoiler__title");
      const $spoilerIcon = createElement("span", "spoiler__icon");
      const $spoilerContent = createElement("div", "spoiler__content");
      const $spoilerCityName = createElement("ul", "spoiler__office-list");

      city.offices.forEach((office) => {
        const $spoilerOfficeItem = createElement("li", "spoiler__office-item");
        const $spoilerOfficeName = createElement("h4", "spoiler__office-name");
        const $spoilerOfficeContact = createElement(
          "p",
          "spoiler__office-contact"
        );
        const $spoilerOfficeTel = createElement("div", "spoiler__office-tel");
        const $spoilerOfficeMail = createElement("div", "spoiler_office-mail");
        const $spoilerOfficeEMail = createElement("a", "spoiler__office-email");

        $spoilerOfficeName.textContent = office.name;
        $spoilerOfficeContact.textContent = office.contactName;

        $spoilerOfficeEMail.addEventListener("click", (e) => {
          e.stopPropagation();
        });

        $spoilerOfficeEMail.textContent = office.email;
        $spoilerOfficeEMail.href = `mailto:${office.email}`;

        office.tel.forEach((telNumber) => {
          const $spoilerOfficeNumber = createElement(
            "a",
            "spoiler__office-number"
          );

          $spoilerOfficeNumber.textContent = telNumber;
          $spoilerOfficeNumber.href = `tel:${telNumber}`;

          $spoilerOfficeNumber.addEventListener("click", (e) => {
            e.stopPropagation();
          });

          $spoilerOfficeTel.appendChild($spoilerOfficeNumber);
        });

        $spoilerOfficeItem.appendChild($spoilerOfficeName);
        $spoilerOfficeItem.appendChild($spoilerOfficeContact);
        $spoilerOfficeItem.appendChild($spoilerOfficeTel);
        $spoilerOfficeItem.appendChild($spoilerOfficeMail);
        $spoilerOfficeMail.appendChild($spoilerOfficeEMail);
        $spoilerCityName.appendChild($spoilerOfficeItem);
      });

      $spoilerTitle.textContent = city.name;

      $spoilerControl.addEventListener("click", () => {
        $spoilerTitle.classList.toggle("spoiler__title--active");
        $spoilerIcon.classList.toggle("spoiler__icon--active");
      });

      $spoilerContent.appendChild($spoilerCityName);
      $spoilerControl.appendChild($spoilerTitle);
      $spoilerControl.appendChild($spoilerIcon);
      $spoiler.appendChild($spoilerControl);
      $spoiler.appendChild($spoilerContent);
      $itemWrapper.appendChild($spoiler);
    });
  });
};
