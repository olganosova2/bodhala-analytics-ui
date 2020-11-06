import {IBenchmarkMetrics, IBenchmarkRate} from '../../../benchmarks/model';

export const MOCK_PRACTICE_AREAS = [
  {value: '1', label: 'Litigation'},
  {value: '2', label: 'Corporate'}
];
export const MOCK_YEARS = [
  {value: '2019', label: '2019'},
  {value: '2020', label: '2020'}
];
export const BM_MOCK_FIRMS = [
  {value: '3937', label: 'Walker Daly LLP'},
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
    name: 'Walker Daly LLP',
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
export const MOCK_BENCHMARKS =  {
  "result": [{
    "benchmark_id": 6,
    "year": '2020',
    "firm_id": 283,
    "firm_name": "Wood Smith Henning & Berman",
    "name": "Litigation",
    "tier": "$",
    "peers": ["One", "Two", "Three"],
    "rates": {
      "junior_associate": {
        "client_rate": 390,
        "high": 300,
        "low": 200,
        "practice_area_discount": 10,
        "street": 280,
        "yoy_rate_increase": 5
      },
      "junior_partner": {
        "client_rate": 290,
        "high": 300,
        "low": 200,
        "practice_area_discount": 10,
        "street": 280,
        "yoy_rate_increase": 10
      },
      "mid_associate": {
        "client_rate": 410,
        "high": 500,
        "low": 380,
        "practice_area_discount": 15.5,
        "street": 480,
        "yoy_rate_increase": 5
      },
      "mid_partner": {
        "client_rate": 660,
        "high": 600,
        "low": 300,
        "practice_area_discount": 20.5,
        "street": 580,
        "yoy_rate_increase": 15
      },
      "senior_associate": {
        "client_rate": 530,
        "high": 600,
        "low": 400,
        "practice_area_discount": 10.5,
        "street": 580,
        "yoy_rate_increase": 15
      },
      "senior_partner": {
        "client_rate": 630,
        "high": 750,
        "low": 500,
        "practice_area_discount": 12.5,
        "street": 680,
        "yoy_rate_increase": 10
      }
    }
  }, {
    "benchmark_id": 5,
    "year": '2020',
    "firm_id": 283,
    "firm_name": "Wood Smith Henning & Berman",
    "name": "M&A",
    "tier": "$",
    "peers": [],
    "rates": {
      "junior_associate": {
        "client_rate": 270,
        "high": 300,
        "low": 200,
        "practice_area_discount": 10,
        "street": 280,
        "yoy_rate_increase": 5
      },
      "junior_partner": {
        "client_rate": 230,
        "high": 300,
        "low": 200,
        "practice_area_discount": 10,
        "street": 280,
        "yoy_rate_increase": 10
      },
      "mid_associate": {
        "client_rate": 480,
        "high": 500,
        "low": 300,
        "practice_area_discount": 15.5,
        "street": 480,
        "yoy_rate_increase": 5
      },
      "mid_partner": {
        "client_rate": 480,
        "high": 600,
        "low": 300,
        "practice_area_discount": 20.5,
        "street": 580,
        "yoy_rate_increase": 15
      },
      "senior_associate": {
        "client_rate": 510,
        "high": 600,
        "low": 400,
        "practice_area_discount": 10.5,
        "street": 580,
        "yoy_rate_increase": 15
      },
      "senior_partner": {
        "client_rate": 780,
        "high": 750,
        "low": 500,
        "practice_area_discount": 12.5,
        "street": 680,
        "yoy_rate_increase": 10
      }
    }
  }, {
    "benchmark_id": 2,
    "year": '2020',
    "firm_id": 452,
    "firm_name": "Wilson, Elser, Moskowitz, Edelman & Dicker, Llp",
    "name": "M&A",
    "tier": "$$$",
    "peers": [],
    "rates": {
      "junior_associate": {
        "client_rate": 220,
        "high": 300,
        "low": 200,
        "practice_area_discount": 10,
        "street": 280,
        "yoy_rate_increase": 5
      },
      "junior_partner": {
        "client_rate": 190,
        "high": 300,
        "low": 200,
        "practice_area_discount": 10,
        "street": 280,
        "yoy_rate_increase": 10
      },
      "mid_associate": {
        "client_rate": 440,
        "high": 500,
        "low": 380,
        "practice_area_discount": 15.5,
        "street": 480,
        "yoy_rate_increase": 5
      },
      "mid_partner": {
        "client_rate": 680,
        "high": 600,
        "low": 300,
        "practice_area_discount": 20.5,
        "street": 580,
        "yoy_rate_increase": 15
      },
      "senior_associate": {
        "client_rate": 550,
        "high": 600,
        "low": 400,
        "practice_area_discount": 10.5,
        "street": 580,
        "yoy_rate_increase": 15
      },
      "senior_partner": {
        "client_rate": 690,
        "high": 750,
        "low": 500,
        "practice_area_discount": 12.5,
        "street": 680,
        "yoy_rate_increase": 10
      }
    }
  }, {
    "benchmark_id": 3,
    "year": '2020',
    "firm_id": 452,
    "firm_name": "Wilson, Elser, Moskowitz, Edelman & Dicker, Llp",
    "name": "Corporate",
    "tier": "$$$",
    "peers": [],
    "rates": {
      "junior_associate": {
        "client_rate": 190,
        "high": 300,
        "low": 200,
        "practice_area_discount": 10,
        "street": 280,
        "yoy_rate_increase": 5
      },
      "junior_partner": {
        "client_rate": 290,
        "high": 300,
        "low": 200,
        "practice_area_discount": 10,
        "street": 280,
        "yoy_rate_increase": 10
      },
      "mid_associate": {
        "client_rate": 410,
        "high": 500,
        "low": 380,
        "practice_area_discount": 15.5,
        "street": 480,
        "yoy_rate_increase": 5
      },
      "mid_partner": {
        "client_rate": 660,
        "high": 600,
        "low": 300,
        "practice_area_discount": 20.5,
        "street": 580,
        "yoy_rate_increase": 15
      },
      "senior_associate": {
        "client_rate": 530,
        "high": 600,
        "low": 400,
        "practice_area_discount": 10.5,
        "street": 580,
        "yoy_rate_increase": 15
      },
      "senior_partner": {
        "client_rate": 630,
        "high": 750,
        "low": 500,
        "practice_area_discount": 12.5,
        "street": 680,
        "yoy_rate_increase": 10
      }
    }
  }, {
    "benchmark_id": 7,
    "year": '2019',
    "firm_id": 283,
    "firm_name": "Wood Smith Henning & Berman",
    "name": "Litigation",
    "tier": "$$",
    "peers": [],
    "rates": {
      "junior_associate": {
        "client_rate": 210,
        "high": 300,
        "low": 200,
        "practice_area_discount": 10,
        "street": 280,
        "yoy_rate_increase": 5
      },
      "junior_partner": {
        "client_rate": 160,
        "high": 300,
        "low": 150,
        "practice_area_discount": 10,
        "street": 280,
        "yoy_rate_increase": 10
      },
      "mid_associate": {
        "client_rate": 350,
        "high": 500,
        "low": 300,
        "practice_area_discount": 15.5,
        "street": 480,
        "yoy_rate_increase": 5
      },
      "mid_partner": {
        "client_rate": 320,
        "high": 600,
        "low": 300,
        "practice_area_discount": 20.5,
        "street": 580,
        "yoy_rate_increase": 15
      },
      "senior_associate": {
        "client_rate": 510,
        "high": 600,
        "low": 450,
        "practice_area_discount": 10.5,
        "street": 580,
        "yoy_rate_increase": 15
      },
      "senior_partner": {
        "client_rate": 700,
        "high": 650,
        "low": 500,
        "practice_area_discount": 12.5,
        "street": 680,
        "yoy_rate_increase": 10
      }
    }
  }, {
    "benchmark_id": 8,
    "year": '2019',
    "firm_id": 283,
    "firm_name": "Wood Smith Henning & Berman",
    "name": "News",
    "tier": "$$",
    "peers": [],
    "rates": {
      "junior_associate": {
        "client_rate": 270,
        "high": 300,
        "low": 200,
        "practice_area_discount": 10,
        "street": 280,
        "yoy_rate_increase": 5
      },
      "junior_partner": {
        "client_rate": null,
        "high": 300,
        "low": 150,
        "practice_area_discount": 10,
        "street": 280,
        "yoy_rate_increase": 10
      },
      "mid_associate": {
        "client_rate": 280,
        "high": 500,
        "low": 300,
        "practice_area_discount": 15.5,
        "street": 480,
        "yoy_rate_increase": 5
      },
      "mid_partner": {
        "client_rate": null,
        "high": 600,
        "low": 300,
        "practice_area_discount": 20.5,
        "street": 580,
        "yoy_rate_increase": 15
      },
      "senior_associate": {
        "client_rate": 570,
        "high": 600,
        "low": 400,
        "practice_area_discount": 10.5,
        "street": 580,
        "yoy_rate_increase": 15
      },
      "senior_partner": {
        "client_rate": null,
        "high": 750,
        "low": 500,
        "practice_area_discount": 12.5,
        "street": 680,
        "yoy_rate_increase": 10
      }
    }
  }, {
    "benchmark_id": 1,
    "year": '2019',
    "firm_id": 452,
    "firm_name": "Wilson, Elser, Moskowitz, Edelman & Dicker, Llp",
    "name": "Litigation",
    "tier": "$$",
    "peers": ["Walker Daly LLP", "Ellis And Ko"],
    "rates": {
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
  }, {
    "benchmark_id": 4,
    "year": '2019',
    "firm_id": 452,
    "firm_name": "Wilson, Elser, Moskowitz, Edelman & Dicker, Llp",
    "name": "M&A",
    "tier": "$$$",
    "peers": ["One", "Two", "Three"],
    "rates": {
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
  }],
  "error": null
};
export const MOCK_BM_METRIC = {
  client_rate: 220,
  high: 500,
  low: 300,
  practice_area_discount: 5,
  street: 380,
  yoy_rate_increase: 5
}
export const MOCK_BM_RATE = {
  junior_associate: MOCK_BM_METRIC,
  mid_associate: MOCK_BM_METRIC,
  senior_associate: MOCK_BM_METRIC,
  junior_partner: MOCK_BM_METRIC,
  mid_partner: MOCK_BM_METRIC,
  senior_partner: MOCK_BM_METRIC
};
export const MOCK_BM_ROW = {
  id: 1,
  year: '2020',
  name: 'Kirkland',
  status: 'Good',
  street: 500,
  low: 300,
  high: 600,
  avg_associate_rate: 400,
  associate_delta: 400,
  avg_partner_rate: 500,
  partner_delta: 550,
  tier: '$$',
  avg_practice_area_discount: 5,
  avg_yoy_rate_increase: 6,
  peers: [],
  rates: MOCK_BM_RATE,
  childrenRates: [],
  isExpanded: false,
  isChild: false,
  nonEmptyAssociate: 3,
  nonEmptyPartner: 3,
  highestChildrenRate: 600
};
export const MOCK_FIRMS_WITH_GROUP_ID = {
  "result": [{
    "firm_name": "Katten Muchin Rosenman",
    "bh_lawfirm_id": 62,
    "group_id": 2,
    "total_billed": 577328.6
  }, {
    "firm_name": "Holland & Knight",
    "bh_lawfirm_id": 52,
    "group_id": 4,
    "total_billed": 134916.1
  }, {
    "firm_name": "Drinker Biddle & Reath",
    "bh_lawfirm_id": 73,
    "group_id": 2,
    "total_billed": 87388.5
  }, {
    "firm_name": "Cozen O'Connor",
    "bh_lawfirm_id": 198,
    "group_id": 3,
    "total_billed": 42573.25
  }, {
    "firm_name": "Winstead PC",
    "bh_lawfirm_id": 158,
    "group_id": 3,
    "total_billed": 585
  }],
  "error": null
};

