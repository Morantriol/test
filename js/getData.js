export const getData = async () => {
  const response = await fetch("../test/data.json");

  const result = await response.json();

  return result;
};