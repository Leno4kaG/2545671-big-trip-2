import { getRandomArrayElement, getRandomInteger } from '../utils/common.js';
//import { nanoid } from 'nanoid';

const mockPoints = [
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c',
    basePrice: 1100,
    dateFrom: '2025-07-10T22:55:56.845Z',
    dateTo: '2025-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcaa',
    isFavorite: !!getRandomInteger(0, 1),
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa21'
    ],
    type: 'taxi'
  },
  {
    id: 'f4b62099-293f-4c3d-a703-94eec4a2808a',
    basePrice: 100,
    dateFrom: '2025-05-10T22:55:56.845Z',
    dateTo: '2025-05-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    isFavorite: !!getRandomInteger(0, 1),
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa23'
    ],
    type: 'bus'
  },
  {
    id: 'f4b62099-293f-4c3d-a704-94eec4a2808d',
    basePrice: 800,
    dateFrom: '2025-06-10T22:55:56.845Z',
    dateTo: '2025-06-12T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcad',
    isFavorite: !!getRandomInteger(0, 1),
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa25',
      'b4c3e4e6-9053-42ce-b747-e281314baa26'
    ],
    type: 'train'
  },
  {
    id: 'f4b62099-293f-4c3d-a705-94eec4a2808e',
    basePrice: 2500,
    dateFrom: '2025-04-15T22:55:56.845Z',
    dateTo: '2025-04-20T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcae',
    isFavorite: !!getRandomInteger(0, 1),
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa28',
      'b4c3e4e6-9053-42ce-b747-e281314baa29'
    ],
    type: 'ship'
  },
  {
    id: 'f4b62099-293f-4c3d-a706-94eec4a2808f',
    basePrice: 4000,
    dateFrom: '2025-11-15T22:55:56.845Z',
    dateTo: '2025-11-17T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcaf',
    isFavorite: !!getRandomInteger(0, 1),
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa31'
    ],
    type: 'drive'
  },
  {
    id: 'f4b62099-293f-4c3d-a707-94eec4a2808g',
    basePrice: 4000,
    dateFrom: '2025-10-05T22:55:56.845Z',
    dateTo: '2025-10-06T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcag',
    isFavorite: !!getRandomInteger(0, 1),
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa33'
    ],
    type: 'flight'
  },
  {
    id: 'f4b62099-293f-4c3d-a708-94eec4a2808h',
    basePrice: 1200,
    dateFrom: '2025-04-12T22:55:56.845Z',
    dateTo: '2025-04-13T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcah',
    isFavorite: !!getRandomInteger(0, 1),
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa35'
    ],
    type: 'check-in'
  },
  {
    id: 'f4b62099-293f-4c3d-a709-94eec4a2808i',
    basePrice: 1100,
    dateFrom: '2025-08-18T22:55:56.845Z',
    dateTo: '2025-08-22T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcai',
    isFavorite: !!getRandomInteger(0, 1),
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa37'
    ],
    type: 'sightseeing'
  },
  {
    id: 'f4b62099-293f-4c3d-a710-94eec4a2808j',
    basePrice: 300,
    dateFrom: '2025-08-10T18:05:56.845Z',
    dateTo: '2025-08-10T20:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcaj',
    isFavorite: !!getRandomInteger(0, 1),
    offers: [],
    type: 'restaurant'
  }
];

function getRandomPoints() {
  return getRandomArrayElement(mockPoints);
}
export { getRandomPoints };
