function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInteger(minValue, maxValue) {
  const lower = Math.ceil(Math.min(minValue, maxValue));
  const upper = Math.floor(Math.max(minValue, maxValue));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export { getRandomArrayElement, getRandomInteger, updateItem };
