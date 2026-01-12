import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { FilterType } from '../consts.js';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

import { MILLISECONDS_IN_MINUTE, MILLISECONDS_IN_HOUR, MILLISECONDS_IN_DAY } from '../consts.js';

function humanizeDueDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

function getDifferenceInTime(start, end) {
  const diffMs = dayjs(end).diff(dayjs(start));

  const days = Math.floor(diffMs / MILLISECONDS_IN_DAY);
  const hours = Math.floor((diffMs % MILLISECONDS_IN_DAY) / MILLISECONDS_IN_HOUR);
  const minutes = Math.floor((diffMs % MILLISECONDS_IN_HOUR) / MILLISECONDS_IN_MINUTE);

  if (diffMs < MILLISECONDS_IN_HOUR) {
    return `${minutes}M`;
  }
  if (diffMs < MILLISECONDS_IN_DAY) {
    return `${hours}H ${minutes}M`;
  }
  return `${days}D ${hours}H ${minutes}M`;
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
  switch(type) {
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

export { humanizeDueDate, getDifferenceInTime,sortByDate, sortPointsByTime, filterPoints };
