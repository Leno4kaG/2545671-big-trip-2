const mockOffers = [
  {
    type: 'taxi',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa21',
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa22',
        title: 'Order Uber',
        price: 20
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa24',
        title: 'Add luggage',
        price: 50
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa23',
        title: 'Upgrade to a business class',
        price: 140
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa24',
        title: 'Add luggage',
        price: 50
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa25',
        title: 'Upgrade to a business class',
        price: 140
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa26',
        title: 'Pet carriers',
        price: 80
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa27',
        title: 'Shower on the train',
        price: 180
      }
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa28',
        title: 'Upgrade to a business class',
        price: 140
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa29',
        title: 'Entertainment',
        price: 480
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa30',
        title: 'Laundry',
        price: 50
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa31',
        title: 'Upgrade to a business class',
        price: 140
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa32',
        title: 'Rent a car',
        price: 200
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa33',
        title: 'Add luggage',
        price: 50
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa34',
        title: 'Switch to comfort',
        price: 80
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa35',
        title: 'Expedited check-in',
        price: 150
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa36',
        title: 'Choice of check-in time',
        price: 250
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa37',
        title: 'Book tickets',
        price: 40
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa38',
        title: 'Lunch in city',
        price: 30
      }
    ]
  },
  {
    type: 'restaurant',
    offers: []
  }
];

function getOffers() {
  return mockOffers;
}

export { getOffers };
