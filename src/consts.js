export const POINT_COUNT = 4;

export const MILLISECONDS_IN_MINUTE = 60000;

export const MILLISECONDS_IN_HOUR = MILLISECONDS_IN_MINUTE * 60;

export const MILLISECONDS_IN_DAY = MILLISECONDS_IN_HOUR * 24;

export const DATE_FORMAT = {
  DAY_MONTH: 'D MMM',
  MONTH_DAY: 'MMM DD',
  HOUR_MINUTES: 'HH:mm',
  DAY_MONTH_YEAR_TIME: 'DD/MM/YY[&nbsp;]HH:mm',
};

export const POINTS_TYPES = [
  'taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'
];

export const CITIES = ['Chamonix', 'Amsterdam', 'Geneva', 'Madrid', 'Istanbul', 'Rio de Janeiro', 'St. Petersburg', 'Paris'];

export const FilterType = {
  EVERYTHING: 'Everything',
  FUTURE: 'Future',
  PRESENT: 'Present',
  PAST: 'Past'
};

export const EmptyFilterMessages = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now'
};

export const SORT_TYPE = ['day', 'event', 'time', 'price', 'offers'];
