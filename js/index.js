import { createFilterItems } from "./createFilter.js";
import { createMap } from "./createMap.js";
import { createOfficeList } from "./createOfficeList.js";
import { getData } from "./getData.js";

const data = await getData();

const createApp = () => {
  createFilterItems(data);
  createOfficeList(data);
  createMap();
};

createApp();
