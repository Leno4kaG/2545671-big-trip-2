import dayjs from 'dayjs';
import { MILLISECONDS_IN_MINUTE, MILLISECONDS_IN_HOUR, MILLISECONDS_IN_DAY } from './consts.js';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInteger(minValue, maxValue) {
  const lower = Math.ceil(Math.min(minValue, maxValue));
  const upper = Math.floor(Math.max(minValue, maxValue));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

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
  } else if (diffMs < MILLISECONDS_IN_DAY) {
    return `${hours}H ${minutes}M`;
  } else {
    return `${days}D ${hours}H ${minutes}M`;
  }
}

function transformString(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


export { getRandomArrayElement, getRandomInteger, humanizeDueDate, getDifferenceInTime, transformString };
