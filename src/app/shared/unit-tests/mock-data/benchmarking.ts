export const MOCK_PRACTICE_AREAS = [
  {value: '1', label: 'Litigation'},
  {value: '2', label: 'Corporate'}
];
export const MOCK_YEARS = [
  {value: '2019', label: '2019'},
  {value: '2020', label: '2020'}
];
export const BM_MOCK_FIRMS = [
  {value: '3937', label: 'Walker Daly LLP Comparison'},
  {value: '87', label: 'Lewis, Brisbois, Bisgaard & Smith'}
];

export const MOCK_BM_FIRMS = [
  {
    id: 87,
    name: 'Lewis, Brisbois, Bisgaard & Smith',
    tier: '$$$',
    peers: [
      'Some Law Firm',
      'Another Law Firm'
    ],
    rates: {
    "junior_associate": {
      "client_rate": null,
      "high": 300,
      "low": 200,
      "practice_area_discount": 10,
      "street": 280,
      "yoy_rate_increase": 5
    },
    "junior_partner": {
      "client_rate": 320,
      "high": 300,
      "low": 200,
      "practice_area_discount": 10,
      "street": 280,
      "yoy_rate_increase": 10
    },
    "mid_associate": {
      "client_rate": 410,
      "high": 500,
      "low": 420,
      "practice_area_discount": 15.5,
      "street": 480,
      "yoy_rate_increase": 5
    },
    "mid_partner": {
      "client_rate": 610,
      "high": 600,
      "low": 400,
      "practice_area_discount": 20.5,
      "street": 580,
      "yoy_rate_increase": 15
    },
    "senior_associate": {
      "client_rate": 520,
      "high": 600,
      "low": 400,
      "practice_area_discount": 10.5,
      "street": 580,
      "yoy_rate_increase": 15
    },
    "senior_partner": {
      "client_rate": 600,
      "high": 750,
      "low": 500,
      "practice_area_discount": 12.5,
      "street": 680,
      "yoy_rate_increase": 10
    }
    }
  },
  {
    id: 3937,
    name: 'Walker Daly LLP Comparison',
    tier: '$$$',
    peers: [
      'Some Law Firm 2',
      'Another Law Firm 2'
    ],
    rates: {
      "junior_associate": {
        "client_rate": 220,
        "high": 300,
        "low": 250,
        "practice_area_discount": 10,
        "street": 280,
        "yoy_rate_increase": 5
      },
      "junior_partner": {
        "client_rate": 320,
        "high": 350,
        "low": 300,
        "practice_area_discount": 10,
        "street": 280,
        "yoy_rate_increase": 10
      },
      "mid_associate": {
        "client_rate": 420,
        "high": 500,
        "low": 450,
        "practice_area_discount": 15.5,
        "street": 480,
        "yoy_rate_increase": 5
      },
      "mid_partner": {
        "client_rate": 500,
        "high": 600,
        "low": 400,
        "practice_area_discount": 20.5,
        "street": 580,
        "yoy_rate_increase": 15
      },
      "senior_associate": {
        "client_rate": 500,
        "high": 600,
        "low": 400,
        "practice_area_discount": 10.5,
        "street": 580,
        "yoy_rate_increase": 15
      },
      "senior_partner": {
        "client_rate": 580,
        "high": 700,
        "low": 500,
        "practice_area_discount": 12.5,
        "street": 680,
        "yoy_rate_increase": 10
      }
    }
  }
];
