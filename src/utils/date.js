import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

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
  return dueDate && dayjs().isBefore(dueDate);
}

function isPresentDatePoint(dateFrom, dateTo) {
  return dayjs().isSameOrAfter(dateFrom) && dayjs().isSameOrBefore(dateTo);
}

function isPastDatePoint(dueDate) {
  return dueDate && dayjs(dueDate).isAfter(dayjs());
}

function sortPointsByTime(pointA, pointB) {
  return dayjs(pointB.dateTo).diff(pointB.dateFrom) - dayjs(pointA.dateTo).diff(pointA.dateFrom);
}

export { humanizeDueDate, getDifferenceInTime, isFutureDatePoint, isPresentDatePoint, isPastDatePoint, sortPointsByTime };
