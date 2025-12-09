import { FilterType } from '../consts.js';
import { isFutureDatePoint, isPastDatePoint, isPresentDatePoint } from './date.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFutureDatePoint(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPresentDatePoint(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastDatePoint(point.dateTo))
};

function generateFilter(points) {
  return Object.entries(filter).map(
    ([filterType, filterPoints]) => ({
      type: filterType,
      count: filterPoints(points).length,
    }),
  );
}

export { filter, generateFilter };
