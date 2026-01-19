import dayjs from 'dayjs';

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


export { humanizeDueDate, getDifferenceInTime };
