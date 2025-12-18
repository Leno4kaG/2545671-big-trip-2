function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInteger(minValue, maxValue) {
  const lower = Math.ceil(Math.min(minValue, maxValue));
  const upper = Math.floor(Math.max(minValue, maxValue));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

function sortPointsByPrice(poinA, pointB) {
  return pointB.basePrice - poinA.basePrice;
}

export { getRandomArrayElement, getRandomInteger, capitalize, updateItem, sortPointsByPrice };
