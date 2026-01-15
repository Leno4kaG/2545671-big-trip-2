import { SortTypes } from '../consts.js';
import { sortByDate, sortPointsByTime } from './date.js';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInteger(minValue, maxValue) {
  const lower = Math.ceil(Math.min(minValue, maxValue));
  const upper = Math.floor(Math.max(minValue, maxValue));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getOffersByType(allOffers, type) {
  return allOffers.find((offer) => offer.type === type);
}

function getDestinationsById(elements, id) {

  return elements.find((element) => element.id === id);
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

function sortPoints(sortType, points) {
  switch (sortType) {
    case SortTypes.DAY:
      points.sort(sortByDate);
      break;
    case SortTypes.TIME:
      points.sort(sortPointsByTime);
      break;
    case SortTypes.PRICE:
      points.sort(sortPointsByPrice);
      break;
  }
}

export {
  getRandomArrayElement, getRandomInteger, getOffersByType, getDestinationsById,
  capitalize, updateItem, sortPoints
};
