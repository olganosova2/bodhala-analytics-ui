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
    "firm_id": 62,
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
export const BM_CHECK_RATES = {
  "result": {
    "discount": [{
      "percetage_range_start": 15,
      "percetage_range_end": 25,
      "practice_area_id": 75,
      "tier": 1
    }],
    "street_rates": [{
      "bh_lawfirm_id": 15,
      "firm_name": "Cleary Gottlieb Steen & Hamilton",
      "collection_id": 28,
      "title": "Cleary Gottlieb Steen & Hamilton",
      "bh_classification_detail": "Associate - 1st Year",
      "year": 2020,
      "current_standard_rate": 650,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 15,
      "firm_name": "Cleary Gottlieb Steen & Hamilton",
      "collection_id": 28,
      "title": "Cleary Gottlieb Steen & Hamilton",
      "bh_classification_detail": "Associate - 2nd Year",
      "year": 2020,
      "current_standard_rate": 775,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 15,
      "firm_name": "Cleary Gottlieb Steen & Hamilton",
      "collection_id": 28,
      "title": "Cleary Gottlieb Steen & Hamilton",
      "bh_classification_detail": "Associate - 3rd Year",
      "year": 2020,
      "current_standard_rate": 890,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 15,
      "firm_name": "Cleary Gottlieb Steen & Hamilton",
      "collection_id": 28,
      "title": "Cleary Gottlieb Steen & Hamilton",
      "bh_classification_detail": "Associate - 4th Year",
      "year": 2020,
      "current_standard_rate": 980,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 15,
      "firm_name": "Cleary Gottlieb Steen & Hamilton",
      "collection_id": 28,
      "title": "Cleary Gottlieb Steen & Hamilton",
      "bh_classification_detail": "Associate - 5th Year",
      "year": 2020,
      "current_standard_rate": 1030,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 15,
      "firm_name": "Cleary Gottlieb Steen & Hamilton",
      "collection_id": 28,
      "title": "Cleary Gottlieb Steen & Hamilton",
      "bh_classification_detail": "Associate - 6th Year",
      "year": 2020,
      "current_standard_rate": 1065,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 15,
      "firm_name": "Cleary Gottlieb Steen & Hamilton",
      "collection_id": 28,
      "title": "Cleary Gottlieb Steen & Hamilton",
      "bh_classification_detail": "Associate - 7th Year",
      "year": 2020,
      "current_standard_rate": 1090,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 15,
      "firm_name": "Cleary Gottlieb Steen & Hamilton",
      "collection_id": 28,
      "title": "Cleary Gottlieb Steen & Hamilton",
      "bh_classification_detail": "Associate - 8th Year",
      "year": 2020,
      "current_standard_rate": 1100,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 15,
      "firm_name": "Cleary Gottlieb Steen & Hamilton",
      "collection_id": 28,
      "title": "Cleary Gottlieb Steen & Hamilton",
      "bh_classification_detail": "Associate - 9th Year",
      "year": 2020,
      "current_standard_rate": 1100,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 15,
      "firm_name": "Cleary Gottlieb Steen & Hamilton",
      "collection_id": 28,
      "title": "Cleary Gottlieb Steen & Hamilton",
      "bh_classification_detail": "Associate - 10+ Year",
      "year": 2020,
      "current_standard_rate": 1100,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 15,
      "firm_name": "Cleary Gottlieb Steen & Hamilton",
      "collection_id": 28,
      "title": "Cleary Gottlieb Steen & Hamilton",
      "bh_classification_detail": "Partner Tier 1",
      "year": 2020,
      "current_standard_rate": 1445,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 15,
      "firm_name": "Cleary Gottlieb Steen & Hamilton",
      "collection_id": 28,
      "title": "Cleary Gottlieb Steen & Hamilton",
      "bh_classification_detail": "Partner Tier 7",
      "year": 2020,
      "current_standard_rate": 1645,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 15,
      "firm_name": "Cleary Gottlieb Steen & Hamilton",
      "collection_id": 28,
      "title": "Cleary Gottlieb Steen & Hamilton",
      "bh_classification_detail": "Partner Tier 14",
      "year": 2020,
      "current_standard_rate": 1715,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 14,
      "firm_name": "Sullivan & Cromwell",
      "collection_id": 25,
      "title": "Sullivan & Cromwell",
      "bh_classification_detail": "Paralegal",
      "year": 2020,
      "current_standard_rate": 453,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 14,
      "firm_name": "Sullivan & Cromwell",
      "collection_id": 25,
      "title": "Sullivan & Cromwell",
      "bh_classification_detail": "Associate - 1st Year",
      "year": 2020,
      "current_standard_rate": 650,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 14,
      "firm_name": "Sullivan & Cromwell",
      "collection_id": 25,
      "title": "Sullivan & Cromwell",
      "bh_classification_detail": "Associate - 2nd Year",
      "year": 2020,
      "current_standard_rate": 795,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 14,
      "firm_name": "Sullivan & Cromwell",
      "collection_id": 25,
      "title": "Sullivan & Cromwell",
      "bh_classification_detail": "Associate - 3rd Year",
      "year": 2020,
      "current_standard_rate": 995,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 14,
      "firm_name": "Sullivan & Cromwell",
      "collection_id": 25,
      "title": "Sullivan & Cromwell",
      "bh_classification_detail": "Associate - 4th Year",
      "year": 2020,
      "current_standard_rate": 1100,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 14,
      "firm_name": "Sullivan & Cromwell",
      "collection_id": 25,
      "title": "Sullivan & Cromwell",
      "bh_classification_detail": "Associate - 5th Year",
      "year": 2020,
      "current_standard_rate": 1140,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 14,
      "firm_name": "Sullivan & Cromwell",
      "collection_id": 25,
      "title": "Sullivan & Cromwell",
      "bh_classification_detail": "Associate - 6th Year",
      "year": 2020,
      "current_standard_rate": 1160,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 14,
      "firm_name": "Sullivan & Cromwell",
      "collection_id": 25,
      "title": "Sullivan & Cromwell",
      "bh_classification_detail": "Associate - 7th Year",
      "year": 2020,
      "current_standard_rate": 1195,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 14,
      "firm_name": "Sullivan & Cromwell",
      "collection_id": 25,
      "title": "Sullivan & Cromwell",
      "bh_classification_detail": "Associate - 8th Year",
      "year": 2020,
      "current_standard_rate": 1225,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 14,
      "firm_name": "Sullivan & Cromwell",
      "collection_id": 25,
      "title": "Sullivan & Cromwell",
      "bh_classification_detail": "Associate - 9th Year",
      "year": 2020,
      "current_standard_rate": 1275,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 14,
      "firm_name": "Sullivan & Cromwell",
      "collection_id": 25,
      "title": "Sullivan & Cromwell",
      "bh_classification_detail": "Partner Tier 1",
      "year": 2020,
      "current_standard_rate": 1600,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 14,
      "firm_name": "Sullivan & Cromwell",
      "collection_id": 25,
      "title": "Sullivan & Cromwell",
      "bh_classification_detail": "Partner Tier 7",
      "year": 2020,
      "current_standard_rate": 1850,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 14,
      "firm_name": "Sullivan & Cromwell",
      "collection_id": 25,
      "title": "Sullivan & Cromwell",
      "bh_classification_detail": "Partner Tier 14",
      "year": 2020,
      "current_standard_rate": 1960,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 13,
      "firm_name": "Weil, Gotshal & Manges",
      "collection_id": 23,
      "title": "Weil, Gotshal & Manges",
      "bh_classification_detail": "Paralegal",
      "year": 2020,
      "current_standard_rate": 435,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 13,
      "firm_name": "Weil, Gotshal & Manges",
      "collection_id": 23,
      "title": "Weil, Gotshal & Manges",
      "bh_classification_detail": "Associate - 1st Year",
      "year": 2020,
      "current_standard_rate": 595,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 13,
      "firm_name": "Weil, Gotshal & Manges",
      "collection_id": 23,
      "title": "Weil, Gotshal & Manges",
      "bh_classification_detail": "Associate - 2nd Year",
      "year": 2020,
      "current_standard_rate": 730,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 13,
      "firm_name": "Weil, Gotshal & Manges",
      "collection_id": 23,
      "title": "Weil, Gotshal & Manges",
      "bh_classification_detail": "Associate - 3rd Year",
      "year": 2020,
      "current_standard_rate": 845,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 13,
      "firm_name": "Weil, Gotshal & Manges",
      "collection_id": 23,
      "title": "Weil, Gotshal & Manges",
      "bh_classification_detail": "Associate - 4th Year",
      "year": 2020,
      "current_standard_rate": 930,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 13,
      "firm_name": "Weil, Gotshal & Manges",
      "collection_id": 23,
      "title": "Weil, Gotshal & Manges",
      "bh_classification_detail": "Associate - 5th Year",
      "year": 2020,
      "current_standard_rate": 980,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 13,
      "firm_name": "Weil, Gotshal & Manges",
      "collection_id": 23,
      "title": "Weil, Gotshal & Manges",
      "bh_classification_detail": "Associate - 6th Year",
      "year": 2020,
      "current_standard_rate": 1010,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 13,
      "firm_name": "Weil, Gotshal & Manges",
      "collection_id": 23,
      "title": "Weil, Gotshal & Manges",
      "bh_classification_detail": "Associate - 7th Year",
      "year": 2020,
      "current_standard_rate": 1050,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 13,
      "firm_name": "Weil, Gotshal & Manges",
      "collection_id": 23,
      "title": "Weil, Gotshal & Manges",
      "bh_classification_detail": "Associate - 8th Year",
      "year": 2020,
      "current_standard_rate": 1050,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 13,
      "firm_name": "Weil, Gotshal & Manges",
      "collection_id": 23,
      "title": "Weil, Gotshal & Manges",
      "bh_classification_detail": "Associate - 9th Year",
      "year": 2020,
      "current_standard_rate": 1050,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 13,
      "firm_name": "Weil, Gotshal & Manges",
      "collection_id": 23,
      "title": "Weil, Gotshal & Manges",
      "bh_classification_detail": "Associate - 10+ Year",
      "year": 2020,
      "current_standard_rate": 1050,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 13,
      "firm_name": "Weil, Gotshal & Manges",
      "collection_id": 23,
      "title": "Weil, Gotshal & Manges",
      "bh_classification_detail": "Partner Tier 1",
      "year": 2020,
      "current_standard_rate": 1125,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 13,
      "firm_name": "Weil, Gotshal & Manges",
      "collection_id": 23,
      "title": "Weil, Gotshal & Manges",
      "bh_classification_detail": "Partner Tier 7",
      "year": 2020,
      "current_standard_rate": 1410,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 13,
      "firm_name": "Weil, Gotshal & Manges",
      "collection_id": 23,
      "title": "Weil, Gotshal & Manges",
      "bh_classification_detail": "Partner Tier 14",
      "year": 2020,
      "current_standard_rate": 1695,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 25,
      "firm_name": "Paul, Weiss, Rifkind, Wharton & Garrison",
      "collection_id": 24,
      "title": "Paul, Weiss, Rifkind, Wharton & Garrison",
      "bh_classification_detail": "Paralegal",
      "year": 2020,
      "current_standard_rate": 365,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 25,
      "firm_name": "Paul, Weiss, Rifkind, Wharton & Garrison",
      "collection_id": 24,
      "title": "Paul, Weiss, Rifkind, Wharton & Garrison",
      "bh_classification_detail": "Associate - 1st Year",
      "year": 2020,
      "current_standard_rate": 640,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 25,
      "firm_name": "Paul, Weiss, Rifkind, Wharton & Garrison",
      "collection_id": 24,
      "title": "Paul, Weiss, Rifkind, Wharton & Garrison",
      "bh_classification_detail": "Associate - 2nd Year",
      "year": 2020,
      "current_standard_rate": 735,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 25,
      "firm_name": "Paul, Weiss, Rifkind, Wharton & Garrison",
      "collection_id": 24,
      "title": "Paul, Weiss, Rifkind, Wharton & Garrison",
      "bh_classification_detail": "Associate - 3rd Year",
      "year": 2020,
      "current_standard_rate": 835,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 25,
      "firm_name": "Paul, Weiss, Rifkind, Wharton & Garrison",
      "collection_id": 24,
      "title": "Paul, Weiss, Rifkind, Wharton & Garrison",
      "bh_classification_detail": "Associate - 4th Year",
      "year": 2020,
      "current_standard_rate": 920,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 25,
      "firm_name": "Paul, Weiss, Rifkind, Wharton & Garrison",
      "collection_id": 24,
      "title": "Paul, Weiss, Rifkind, Wharton & Garrison",
      "bh_classification_detail": "Associate - 5th Year",
      "year": 2020,
      "current_standard_rate": 940,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 25,
      "firm_name": "Paul, Weiss, Rifkind, Wharton & Garrison",
      "collection_id": 24,
      "title": "Paul, Weiss, Rifkind, Wharton & Garrison",
      "bh_classification_detail": "Associate - 6th Year",
      "year": 2020,
      "current_standard_rate": 980,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 25,
      "firm_name": "Paul, Weiss, Rifkind, Wharton & Garrison",
      "collection_id": 24,
      "title": "Paul, Weiss, Rifkind, Wharton & Garrison",
      "bh_classification_detail": "Associate - 7th Year",
      "year": 2020,
      "current_standard_rate": 1005,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 25,
      "firm_name": "Paul, Weiss, Rifkind, Wharton & Garrison",
      "collection_id": 24,
      "title": "Paul, Weiss, Rifkind, Wharton & Garrison",
      "bh_classification_detail": "Associate - 8th Year",
      "year": 2020,
      "current_standard_rate": 1030,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 25,
      "firm_name": "Paul, Weiss, Rifkind, Wharton & Garrison",
      "collection_id": 24,
      "title": "Paul, Weiss, Rifkind, Wharton & Garrison",
      "bh_classification_detail": "Associate - 9th Year",
      "year": 2020,
      "current_standard_rate": 1065,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 25,
      "firm_name": "Paul, Weiss, Rifkind, Wharton & Garrison",
      "collection_id": 24,
      "title": "Paul, Weiss, Rifkind, Wharton & Garrison",
      "bh_classification_detail": "Associate - 10+ Year",
      "year": 2020,
      "current_standard_rate": 1065,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 25,
      "firm_name": "Paul, Weiss, Rifkind, Wharton & Garrison",
      "collection_id": 24,
      "title": "Paul, Weiss, Rifkind, Wharton & Garrison",
      "bh_classification_detail": "Partner Tier 1",
      "year": 2020,
      "current_standard_rate": 1230,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 25,
      "firm_name": "Paul, Weiss, Rifkind, Wharton & Garrison",
      "collection_id": 24,
      "title": "Paul, Weiss, Rifkind, Wharton & Garrison",
      "bh_classification_detail": "Partner Tier 7",
      "year": 2020,
      "current_standard_rate": 1355,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 25,
      "firm_name": "Paul, Weiss, Rifkind, Wharton & Garrison",
      "collection_id": 24,
      "title": "Paul, Weiss, Rifkind, Wharton & Garrison",
      "bh_classification_detail": "Partner Tier 14",
      "year": 2020,
      "current_standard_rate": 1560,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 42,
      "firm_name": "Debevoise & Plimpton",
      "collection_id": 48,
      "title": "Debevoise & Plimpton",
      "bh_classification_detail": "Paralegal",
      "year": 2020,
      "current_standard_rate": 460,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 42,
      "firm_name": "Debevoise & Plimpton",
      "collection_id": 48,
      "title": "Debevoise & Plimpton",
      "bh_classification_detail": "Associate - 1st Year",
      "year": 2020,
      "current_standard_rate": 735,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 42,
      "firm_name": "Debevoise & Plimpton",
      "collection_id": 48,
      "title": "Debevoise & Plimpton",
      "bh_classification_detail": "Associate - 2nd Year",
      "year": 2020,
      "current_standard_rate": 920,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 42,
      "firm_name": "Debevoise & Plimpton",
      "collection_id": 48,
      "title": "Debevoise & Plimpton",
      "bh_classification_detail": "Associate - 3rd Year",
      "year": 2020,
      "current_standard_rate": 1065,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 42,
      "firm_name": "Debevoise & Plimpton",
      "collection_id": 48,
      "title": "Debevoise & Plimpton",
      "bh_classification_detail": "Associate - 4th Year",
      "year": 2020,
      "current_standard_rate": 1155,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 42,
      "firm_name": "Debevoise & Plimpton",
      "collection_id": 48,
      "title": "Debevoise & Plimpton",
      "bh_classification_detail": "Associate - 5th Year",
      "year": 2020,
      "current_standard_rate": 1205,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 42,
      "firm_name": "Debevoise & Plimpton",
      "collection_id": 48,
      "title": "Debevoise & Plimpton",
      "bh_classification_detail": "Associate - 6th Year",
      "year": 2020,
      "current_standard_rate": 1225,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 42,
      "firm_name": "Debevoise & Plimpton",
      "collection_id": 48,
      "title": "Debevoise & Plimpton",
      "bh_classification_detail": "Associate - 7th Year",
      "year": 2020,
      "current_standard_rate": 1225,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 42,
      "firm_name": "Debevoise & Plimpton",
      "collection_id": 48,
      "title": "Debevoise & Plimpton",
      "bh_classification_detail": "Associate - 8th Year",
      "year": 2020,
      "current_standard_rate": 1225,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 42,
      "firm_name": "Debevoise & Plimpton",
      "collection_id": 48,
      "title": "Debevoise & Plimpton",
      "bh_classification_detail": "Associate - 9th Year",
      "year": 2020,
      "current_standard_rate": 1225,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 42,
      "firm_name": "Debevoise & Plimpton",
      "collection_id": 48,
      "title": "Debevoise & Plimpton",
      "bh_classification_detail": "Associate - 10+ Year",
      "year": 2020,
      "current_standard_rate": 1225,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 42,
      "firm_name": "Debevoise & Plimpton",
      "collection_id": 48,
      "title": "Debevoise & Plimpton",
      "bh_classification_detail": "Partner Tier 1",
      "year": 2020,
      "current_standard_rate": 1580,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 42,
      "firm_name": "Debevoise & Plimpton",
      "collection_id": 48,
      "title": "Debevoise & Plimpton",
      "bh_classification_detail": "Partner Tier 7",
      "year": 2020,
      "current_standard_rate": 1800,
      "practice_area_discount_pct": null
    }, {
      "bh_lawfirm_id": 42,
      "firm_name": "Debevoise & Plimpton",
      "collection_id": 48,
      "title": "Debevoise & Plimpton",
      "bh_classification_detail": "Partner Tier 14",
      "year": 2020,
      "current_standard_rate": 1860,
      "practice_area_discount_pct": null
    }],
    "collections": [{
      "collection_id": 119,
      "title": "Cooley Rate Card Collection - Capital Markets - 2020",
      "status": "BIDDING",
      "lawyer_info_id": null,
      "collection_category_id": 34,
      "display_name": "Capital Markets"
    }],
    "rates": [{
      "collection_id": 118,
      "title": "Cooley Rate Card Collection - Litigation - 2020",
      "collection_category_id": 33,
      "display_name": "Litigation",
      "bh_classification_detail": "Associate - 1st Year",
      "year": 2020,
      "current_standard_rate": 500,
      "practice_area_discount_pct": 10
    }, {
      "collection_id": 118,
      "title": "Cooley Rate Card Collection - Litigation - 2020",
      "collection_category_id": 33,
      "display_name": "Litigation",
      "bh_classification_detail": "Associate - 2nd Year",
      "year": 2020,
      "current_standard_rate": 520,
      "practice_area_discount_pct": 10
    }, {
      "collection_id": 118,
      "title": "Cooley Rate Card Collection - Litigation - 2020",
      "collection_category_id": 33,
      "display_name": "Litigation",
      "bh_classification_detail": "Associate - 3rd Year",
      "year": 2020,
      "current_standard_rate": 530,
      "practice_area_discount_pct": 10
    }, {
      "collection_id": 118,
      "title": "Cooley Rate Card Collection - Litigation - 2020",
      "collection_category_id": 33,
      "display_name": "Litigation",
      "bh_classification_detail": "Associate - 4th Year",
      "year": 2020,
      "current_standard_rate": 540,
      "practice_area_discount_pct": 10
    }, {
      "collection_id": 118,
      "title": "Cooley Rate Card Collection - Litigation - 2020",
      "collection_category_id": 33,
      "display_name": "Litigation",
      "bh_classification_detail": "Associate - 5th Year",
      "year": 2020,
      "current_standard_rate": 560,
      "practice_area_discount_pct": 10
    }, {
      "collection_id": 118,
      "title": "Cooley Rate Card Collection - Litigation - 2020",
      "collection_category_id": 33,
      "display_name": "Litigation",
      "bh_classification_detail": "Associate - 6th Year",
      "year": 2020,
      "current_standard_rate": 570,
      "practice_area_discount_pct": 10
    }, {
      "collection_id": 118,
      "title": "Cooley Rate Card Collection - Litigation - 2020",
      "collection_category_id": 33,
      "display_name": "Litigation",
      "bh_classification_detail": "Associate - 7th Year",
      "year": 2020,
      "current_standard_rate": 580,
      "practice_area_discount_pct": 10
    }, {
      "collection_id": 118,
      "title": "Cooley Rate Card Collection - Litigation - 2020",
      "collection_category_id": 33,
      "display_name": "Litigation",
      "bh_classification_detail": "Associate - 8th Year",
      "year": 2020,
      "current_standard_rate": 600,
      "practice_area_discount_pct": 10
    }, {
      "collection_id": 118,
      "title": "Cooley Rate Card Collection - Litigation - 2020",
      "collection_category_id": 33,
      "display_name": "Litigation",
      "bh_classification_detail": "Associate - 9th Year",
      "year": 2020,
      "current_standard_rate": 620,
      "practice_area_discount_pct": 10
    }, {
      "collection_id": 118,
      "title": "Cooley Rate Card Collection - Litigation - 2020",
      "collection_category_id": 33,
      "display_name": "Litigation",
      "bh_classification_detail": "Associate - 10+ Year",
      "year": 2020,
      "current_standard_rate": 630,
      "practice_area_discount_pct": 10
    }, {
      "collection_id": 118,
      "title": "Cooley Rate Card Collection - Litigation - 2020",
      "collection_category_id": 33,
      "display_name": "Litigation",
      "bh_classification_detail": "Counsel",
      "year": 2020,
      "current_standard_rate": 640,
      "practice_area_discount_pct": 10
    }, {
      "collection_id": 118,
      "title": "Cooley Rate Card Collection - Litigation - 2020",
      "collection_category_id": 33,
      "display_name": "Litigation",
      "bh_classification_detail": "Paralegal",
      "year": 2020,
      "current_standard_rate": null,
      "practice_area_discount_pct": 10
    }, {
      "collection_id": 118,
      "title": "Cooley Rate Card Collection - Litigation - 2020",
      "collection_category_id": 33,
      "display_name": "Litigation",
      "bh_classification_detail": "Partner Tier 1",
      "year": 2020,
      "current_standard_rate": 900,
      "practice_area_discount_pct": 10
    }, {
      "collection_id": 118,
      "title": "Cooley Rate Card Collection - Litigation - 2020",
      "collection_category_id": 33,
      "display_name": "Litigation",
      "bh_classification_detail": "Partner Tier 2",
      "year": 2020,
      "current_standard_rate": 950,
      "practice_area_discount_pct": 10
    }, {
      "collection_id": 118,
      "title": "Cooley Rate Card Collection - Litigation - 2020",
      "collection_category_id": 33,
      "display_name": "Litigation",
      "bh_classification_detail": "Partner Tier 3",
      "year": 2020,
      "current_standard_rate": 960,
      "practice_area_discount_pct": 10
    }, {
      "collection_id": 118,
      "title": "Cooley Rate Card Collection - Litigation - 2020",
      "collection_category_id": 33,
      "display_name": "Litigation",
      "bh_classification_detail": "Partner Tier 4",
      "year": 2020,
      "current_standard_rate": 970,
      "practice_area_discount_pct": 10
    }, {
      "collection_id": 118,
      "title": "Cooley Rate Card Collection - Litigation - 2020",
      "collection_category_id": 33,
      "display_name": "Litigation",
      "bh_classification_detail": "Partner Tier 5",
      "year": 2020,
      "current_standard_rate": 980,
      "practice_area_discount_pct": 10
    }, {
      "collection_id": 118,
      "title": "Cooley Rate Card Collection - Litigation - 2020",
      "collection_category_id": 33,
      "display_name": "Litigation",
      "bh_classification_detail": "Partner Tier 6",
      "year": 2020,
      "current_standard_rate": 990,
      "practice_area_discount_pct": 10
    }, {
      "collection_id": 118,
      "title": "Cooley Rate Card Collection - Litigation - 2020",
      "collection_category_id": 33,
      "display_name": "Litigation",
      "bh_classification_detail": "Partner Tier 7",
      "year": 2020,
      "current_standard_rate": 1000,
      "practice_area_discount_pct": 10
    }, {
      "collection_id": 118,
      "title": "Cooley Rate Card Collection - Litigation - 2020",
      "collection_category_id": 33,
      "display_name": "Litigation",
      "bh_classification_detail": "Partner Tier 8",
      "year": 2020,
      "current_standard_rate": 1100,
      "practice_area_discount_pct": 10
    }, {
      "collection_id": 118,
      "title": "Cooley Rate Card Collection - Litigation - 2020",
      "collection_category_id": 33,
      "display_name": "Litigation",
      "bh_classification_detail": "Partner Tier 9",
      "year": 2020,
      "current_standard_rate": 1150,
      "practice_area_discount_pct": 10
    }, {
      "collection_id": 118,
      "title": "Cooley Rate Card Collection - Litigation - 2020",
      "collection_category_id": 33,
      "display_name": "Litigation",
      "bh_classification_detail": "Partner Tier 10",
      "year": 2020,
      "current_standard_rate": 1200,
      "practice_area_discount_pct": 10
    }, {
      "collection_id": 118,
      "title": "Cooley Rate Card Collection - Litigation - 2020",
      "collection_category_id": 33,
      "display_name": "Litigation",
      "bh_classification_detail": "Partner Tier 11",
      "year": 2020,
      "current_standard_rate": 1250,
      "practice_area_discount_pct": 10
    }, {
      "collection_id": 118,
      "title": "Cooley Rate Card Collection - Litigation - 2020",
      "collection_category_id": 33,
      "display_name": "Litigation",
      "bh_classification_detail": "Partner Tier 12",
      "year": 2020,
      "current_standard_rate": 1300,
      "practice_area_discount_pct": 10
    }, {
      "collection_id": 118,
      "title": "Cooley Rate Card Collection - Litigation - 2020",
      "collection_category_id": 33,
      "display_name": "Litigation",
      "bh_classification_detail": "Partner Tier 13",
      "year": 2020,
      "current_standard_rate": 1350,
      "practice_area_discount_pct": 10
    }, {
      "collection_id": 118,
      "title": "Cooley Rate Card Collection - Litigation - 2020",
      "collection_category_id": 33,
      "display_name": "Litigation",
      "bh_classification_detail": "Partner Tier 14",
      "year": 2020,
      "current_standard_rate": 1400,
      "practice_area_discount_pct": 10
    }, {
      "collection_id": 118,
      "title": "Cooley Rate Card Collection - Litigation - 2020",
      "collection_category_id": 33,
      "display_name": "Litigation",
      "bh_classification_detail": "Partner Tier 15",
      "year": 2020,
      "current_standard_rate": 1600,
      "practice_area_discount_pct": 10
    }, {
      "collection_id": 118,
      "title": "Cooley Rate Card Collection - Litigation - 2020",
      "collection_category_id": 33,
      "display_name": "Litigation",
      "bh_classification_detail": "Partner Tier 16",
      "year": 2020,
      "current_standard_rate": null,
      "practice_area_discount_pct": 10
    }, {
      "collection_id": 118,
      "title": "Cooley Rate Card Collection - Litigation - 2020",
      "collection_category_id": 33,
      "display_name": "Litigation",
      "bh_classification_detail": "Partner Tier 17",
      "year": 2020,
      "current_standard_rate": null,
      "practice_area_discount_pct": 10
    }, {
      "collection_id": 118,
      "title": "Cooley Rate Card Collection - Litigation - 2020",
      "collection_category_id": 33,
      "display_name": "Litigation",
      "bh_classification_detail": "Partner Tier 18",
      "year": 2020,
      "current_standard_rate": null,
      "practice_area_discount_pct": 10
    }, {
      "collection_id": 118,
      "title": "Cooley Rate Card Collection - Litigation - 2020",
      "collection_category_id": 33,
      "display_name": "Litigation",
      "bh_classification_detail": "Partner Tier 19",
      "year": 2020,
      "current_standard_rate": null,
      "practice_area_discount_pct": 10
    }, {
      "collection_id": 118,
      "title": "Cooley Rate Card Collection - Litigation - 2020",
      "collection_category_id": 33,
      "display_name": "Litigation",
      "bh_classification_detail": "Partner Tier 20",
      "year": 2020,
      "current_standard_rate": null,
      "practice_area_discount_pct": 10
    }]
  },
  "error": null
};
export const MOCK_PA_AND_ID = {
  "result": [{
    "id": 65,
    "name": "Banking & Credit"
  }, {
    "id": 64,
    "name": "Bankruptcy"
  }, {
    "id": 66,
    "name": "Capital Markets"
  }, {
    "id": 67,
    "name": "Energy"
  }, {
    "id": 68,
    "name": "Funds"
  }, {
    "id": 69,
    "name": "General/Other"
  }, {
    "id": 70,
    "name": "Health Care"
  }, {
    "id": 71,
    "name": "IP"
  }, {
    "id": 72,
    "name": "Labor & Employment"
  }, {
    "id": 75,
    "name": "Litigation"
  }, {
    "id": 73,
    "name": "M&A"
  }, {
    "id": 74,
    "name": "Real Estate"
  }],
  "error": null
};
export const MOCK_ADMIN_BENCHMARK = {
  "error": null,
  "result": {
    "client": "AIG Test",
    "client_id": 190,
    "firm": "Cooley",
    "firm_id": 47,
    "id": 26,
    "practice_areas": [
      {
        "benchmark_id": 26,
        "id": 53,
        "name": "M&A",
        "peers": [
          "Cleary Gottlieb Steen & Hamilton",
          "Latham & Watkins",
          "Sullivan & Cromwell",
          "Weil, Gotshal & Manges",
          "Kirkland & Ellis"
        ],
        "rates": {
          "junior_associate": {
            "client_rate": 586,
            "high": 711,
            "low": 634,
            "practice_area_discount": 5,
            "street": 769,
            "yoy_rate_increase": null
          },
          "junior_partner": {
            "client_rate": 887,
            "high": 1218,
            "low": 1087,
            "practice_area_discount": 5,
            "street": 1317,
            "yoy_rate_increase": null
          },
          "mid_associate": {
            "client_rate": 618,
            "high": 968,
            "low": 863,
            "practice_area_discount": 5,
            "street": 1046,
            "yoy_rate_increase": null
          },
          "mid_partner": {
            "client_rate": 1029,
            "high": 1425,
            "low": 1271,
            "practice_area_discount": 5,
            "street": 1540,
            "yoy_rate_increase": null
          },
          "senior_associate": {
            "client_rate": 651,
            "high": 1053,
            "low": 939,
            "practice_area_discount": 5,
            "street": 1138,
            "yoy_rate_increase": null
          },
          "senior_partner": {
            "client_rate": 1262,
            "high": 1582,
            "low": 1411,
            "practice_area_discount": 5,
            "street": 1710,
            "yoy_rate_increase": null
          }
        },
        "tier": "$$$$"
      }
    ],
    "year": 2020
  }
};




