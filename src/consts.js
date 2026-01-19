export const MILLISECONDS_IN_MINUTE = 60000;

export const MILLISECONDS_IN_HOUR = MILLISECONDS_IN_MINUTE * 60;

export const MILLISECONDS_IN_DAY = MILLISECONDS_IN_HOUR * 24;

export const DATE_FORMAT = {
  DAY_MONTH: 'D MMM',
  MONTH_DAY: 'MMM DD',
  HOUR_MINUTES: 'HH:mm',
  DAY_MONTH_YEAR_TIME: 'DD/MM/YY[&nbsp;]HH:mm',
  DATE_PICKER: 'd/m/y H:i'
};

export const POINTS_TYPES = [
  'taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'
];

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

export const SortTypes = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

export const DISABLED_SORTS = [SortTypes.EVENT, SortTypes.OFFERS];

export const DEFAULT_SORT = SortTypes.DAY;

export const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  ERROR: 'ERROR',
};

export const BLANK_POINT = {
  id: 0,
  basePrice: 0,
  dateFrom: '',
  dateTo: '',
  destination: '',
  isFavorite: false,
  offers: [],
  type: POINTS_TYPES[5].toLowerCase()
};

export const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export const AUTHORIZATION = 'Basic bD3953Px06iy2j';
export const BASE_URL = 'https://22.objects.htmlacademy.pro/big-trip';

export const InfoMessage = {
  LOADING: 'Loading...',
  ERROR: 'Failed to load latest route information'
};

export const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000
};
