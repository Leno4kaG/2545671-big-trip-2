import { SortTypes, FilterType } from '../consts.js';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

import dayjs from 'dayjs';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

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


function isFutureDatePoint(dueDate) {
  return !!dueDate && dayjs(dueDate).isAfter(dayjs());
}

function isPresentDatePoint(dateFrom, dateTo) {
  return dayjs().isSameOrAfter(dayjs(dateFrom)) && dayjs().isSameOrBefore(dayjs(dateTo));
}

function isPastDatePoint(dueDate) {
  return !!dueDate && dayjs(dueDate).isBefore(dayjs());
}

function sortByDate(pointA, pointB) {
  return dayjs(pointA.dateFrom) - dayjs(pointB.dateFrom);
}

function sortPointsByTime(pointA, pointB) {
  return dayjs(pointB.dateTo).diff(pointB.dateFrom) - dayjs(pointA.dateTo).diff(pointA.dateFrom);
}

function filterPoints(type, points) {
  switch (type) {
    case FilterType.EVERYTHING:
      return points;
    case FilterType.FUTURE:
      return points.filter((point) => isFutureDatePoint(point.dateFrom));
    case FilterType.PRESENT:
      return points.filter((point) => isPresentDatePoint(point.dateFrom, point.dateTo));
    case FilterType.PAST:
      return points.filter((point) => isPastDatePoint(point.dateTo));
  }
}

function sortPointsByPrice(poinA, pointB) {
  return pointB.basePrice - poinA.basePrice;
}

function sortPoints(sortType, points) {
  switch (sortType) {
    case SortTypes.DAY:
      return points.slice().sort(sortByDate);
    case SortTypes.TIME:
      return points.slice().sort(sortPointsByTime);
    case SortTypes.PRICE:
      return points.slice().sort(sortPointsByPrice);
    default:
      return points;
  }
}

export {
  getOffersByType, getDestinationsById, capitalize, updateItem, filterPoints, sortPoints
};
