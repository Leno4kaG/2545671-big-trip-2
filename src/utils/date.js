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

  const pad = (num) => String(num).padStart(2, '0');

  if (diffMs < MILLISECONDS_IN_HOUR) {
    return `${pad(minutes)}m`;
  }
  if (diffMs < MILLISECONDS_IN_DAY) {
    return `${pad(hours)}h ${pad(minutes)}m`;
  }
  return `${pad(days)}d ${pad(hours)}h ${pad(minutes)}m`;
}

export { humanizeDueDate, getDifferenceInTime };
