import {SavingMetrics} from '../../../savings-calculator/savings-calculator.service';
import {FRESH_DESK_ARTICLES} from '../../services/config';

export const MOCK_METRIC = {
  origPercent: 17,
  percent: 17,
  total: 100,
  title: 'Block Billing',
  savingsType: SavingMetrics.BlockBilling,
  maxRange: 100,
  savings: 0,
  details: [],
  tooltip: 'Bodhala defines block billing as a single billing entry greater than 4 hours. Bodhala\'s aceptable threshold is under 20%.',
  articleId: FRESH_DESK_ARTICLES.BlockBilling
};
export const SAVINGS_DATA = {
  "result": {
    "bb_percent": [{
      "end_date": "2019-06-24",
      "bbp": 48.16056818034958093030390998,
      "total_billed": 481976.873,
      "total_block_billed": 214998.68
    }],
    "rate_increase": [{
      "end_date": "2019-01-01",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 191137.7596,
        "total_afa": 0,
        "total_spend": 191137.7596,
        "total_hours": 1389.8999,
        "effective_rate": 137.519
      }, {
        "bh_classification": "partner",
        "total_billed": 594303.5091,
        "total_afa": 0,
        "total_spend": 594303.5091,
        "total_hours": 3751.4999,
        "effective_rate": 158.4175
      }, {
        "bh_classification": "paralegal",
        "total_billed": 73809.21,
        "total_afa": 0,
        "total_spend": 73809.21,
        "total_hours": 844.2,
        "effective_rate": 87.4309
      }]
    }, {
      "end_date": "2018-01-01",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 33797.45,
        "total_afa": 0,
        "total_spend": 33797.45,
        "total_hours": 246.9,
        "effective_rate": 136.8872
      }, {
        "bh_classification": "partner",
        "total_billed": 169585.7,
        "total_afa": 0,
        "total_spend": 169585.7,
        "total_hours": 1138.7,
        "effective_rate": 148.9292
      }, {
        "bh_classification": "paralegal",
        "total_billed": 34904.62,
        "total_afa": 0,
        "total_spend": 34904.62,
        "total_hours": 459,
        "effective_rate": 76.0449
      }]
    }, {
      "end_date": "2017-01-01",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 52.37,
        "total_afa": 0,
        "total_spend": 52.37,
        "total_hours": 0.5,
        "effective_rate": 104.74
      }, {
        "bh_classification": "partner",
        "total_billed": 18715.848,
        "total_afa": 0,
        "total_spend": 18715.848,
        "total_hours": 169.6,
        "effective_rate": 110.3528
      }, {
        "bh_classification": "other",
        "total_billed": 42.195,
        "total_afa": 0,
        "total_spend": 42.195,
        "total_hours": 0.4,
        "effective_rate": 105.4875
      }, {
        "bh_classification": "paralegal",
        "total_billed": 305.55,
        "total_afa": 0,
        "total_spend": 305.55,
        "total_hours": 4.5,
        "effective_rate": 67.9
      }]
    }],
    "overstaffing": [{
      "end_date": "2019-06-24",
      "overstaffing": [{
        "timekeepers": 4,
        "firm_id": 8316,
        "firm_name": "ANDERSON JULIAN & HULL LLP",
        "line_item_date": "2018-07-26",
        "total_billed": 1124.24,
        "client_matter_id": "OSOS901VE",
        "matter_name": "501-265705-001",
        "total_hours": 7.6
      }, {
        "timekeepers": 4,
        "firm_id": 8316,
        "firm_name": "ANDERSON JULIAN & HULL LLP",
        "line_item_date": "2018-11-16",
        "total_billed": 1284.28,
        "client_matter_id": "OSOS901VE",
        "matter_name": "501-265705-001",
        "total_hours": 8.8
      }, {
        "timekeepers": 4,
        "firm_id": 8316,
        "firm_name": "ANDERSON JULIAN & HULL LLP",
        "line_item_date": "2018-10-04",
        "total_billed": 1006.86,
        "client_matter_id": "OSOS901VE",
        "matter_name": "501-265705-001",
        "total_hours": 7.1
      }, {
        "timekeepers": 4,
        "firm_id": 8316,
        "firm_name": "ANDERSON JULIAN & HULL LLP",
        "line_item_date": "2018-08-28",
        "total_billed": 695.4999,
        "client_matter_id": "OSOS901VE",
        "matter_name": "501-265705-001",
        "total_hours": 7.4
      }, {
        "timekeepers": 4,
        "firm_id": 8316,
        "firm_name": "ANDERSON JULIAN & HULL LLP",
        "line_item_date": "2018-08-15",
        "total_billed": 2047.19,
        "client_matter_id": "OSOS901VE",
        "matter_name": "501-265705-001",
        "total_hours": 24.9
      }, {
        "timekeepers": 4,
        "firm_id": 8316,
        "firm_name": "ANDERSON JULIAN & HULL LLP",
        "line_item_date": "2019-01-16",
        "total_billed": 650.88,
        "client_matter_id": "OSOS901VE",
        "matter_name": "501-265705-001",
        "total_hours": 4.4
      }, {
        "timekeepers": 4,
        "firm_id": 8316,
        "firm_name": "ANDERSON JULIAN & HULL LLP",
        "line_item_date": "2018-08-20",
        "total_billed": 761.93,
        "client_matter_id": "OSOS901VE",
        "matter_name": "501-265705-001",
        "total_hours": 8
      }, {
        "timekeepers": 4,
        "firm_id": 8316,
        "firm_name": "ANDERSON JULIAN & HULL LLP",
        "line_item_date": "2019-01-09",
        "total_billed": 217.28,
        "client_matter_id": "OSOS901VE",
        "matter_name": "501-265705-001",
        "total_hours": 2.8
      }, {
        "timekeepers": 5,
        "firm_id": 8316,
        "firm_name": "ANDERSON JULIAN & HULL LLP",
        "line_item_date": "2018-09-10",
        "total_billed": 517,
        "client_matter_id": "OSOS901VE",
        "matter_name": "501-265705-001",
        "total_hours": 3.6
      }, {
        "timekeepers": 4,
        "firm_id": 8316,
        "firm_name": "ANDERSON JULIAN & HULL LLP",
        "line_item_date": "2018-09-13",
        "total_billed": 904.5,
        "client_matter_id": "OSOS901VE",
        "matter_name": "501-265705-001",
        "total_hours": 6.2
      }, {
        "timekeepers": 4,
        "firm_id": 8316,
        "firm_name": "ANDERSON JULIAN & HULL LLP",
        "line_item_date": "2018-11-20",
        "total_billed": 769.22,
        "client_matter_id": "OSOS901VE",
        "matter_name": "501-265705-001",
        "total_hours": 5.2
      }, {
        "timekeepers": 4,
        "firm_id": 8316,
        "firm_name": "ANDERSON JULIAN & HULL LLP",
        "line_item_date": "2018-10-05",
        "total_billed": 238.61,
        "client_matter_id": "OSOS901VE",
        "matter_name": "501-265705-001",
        "total_hours": 2
      }, {
        "timekeepers": 4,
        "firm_id": 8316,
        "firm_name": "ANDERSON JULIAN & HULL LLP",
        "line_item_date": "2018-09-24",
        "total_billed": 1024.5,
        "client_matter_id": "OSOS901VE",
        "matter_name": "501-265705-001",
        "total_hours": 9.3
      }, {
        "timekeepers": 4,
        "firm_id": 8316,
        "firm_name": "ANDERSON JULIAN & HULL LLP",
        "line_item_date": "2018-11-08",
        "total_billed": 1064.56,
        "client_matter_id": "OSOS901VE",
        "matter_name": "501-265705-001",
        "total_hours": 6.8
      }]
    }]
  },
  "error": null
}
export const MOCK_CLIENT_SAVINGS = {
  "result": [{
    "bh_client_id": 105,
    "org_name": "AB INBEV",
    "rates": [{
      "end_date": "2016-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 1299.88,
        "total_afa": 0,
        "total_spend": 1299.88,
        "total_hours": 7.6,
        "effective_rate": 171.0368
      }, {
        "bh_classification": "partner",
        "total_billed": 3192.32,
        "total_afa": 0,
        "total_spend": 3192.32,
        "total_hours": 3.2,
        "effective_rate": 997.6
      }]
    }, {
      "end_date": "2015-12-31",
      "rate_increase": []
    }, {
      "end_date": "2014-12-31",
      "rate_increase": []
    }]
  }, {
    "bh_client_id": 190,
    "org_name": "AIG Test",
    "rates": [{
      "end_date": "2018-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 77259318.8638,
        "total_afa": 190755.88,
        "total_spend": 77450074.7438,
        "total_hours": 532648.4756,
        "effective_rate": 145.4056
      }, {
        "bh_classification": "partner",
        "total_billed": 138361911.1124,
        "total_afa": 461246.05,
        "total_spend": 138823157.1624,
        "total_hours": 792750.8162,
        "effective_rate": 175.1157
      }]
    }, {
      "end_date": "2017-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 84598432.4908,
        "total_afa": 25115,
        "total_spend": 84623547.4908,
        "total_hours": 576911.8993,
        "effective_rate": 146.6836
      }, {
        "bh_classification": "partner",
        "total_billed": 150243011.2249,
        "total_afa": 145084.77,
        "total_spend": 150388095.9949,
        "total_hours": 853694.412,
        "effective_rate": 176.1615
      }]
    }, {
      "end_date": "2016-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 77734846.6317,
        "total_afa": 194039.81,
        "total_spend": 77928886.4417,
        "total_hours": 527962.6279,
        "effective_rate": 147.603
      }, {
        "bh_classification": "partner",
        "total_billed": 149045651.6661,
        "total_afa": 580598,
        "total_spend": 149626249.6661,
        "total_hours": 903313.1136,
        "effective_rate": 165.6416
      }]
    }]
  }, {
    "bh_client_id": 103,
    "org_name": "Astellas",
    "rates": [{
      "end_date": "2016-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 6910777.11,
        "total_afa": 0,
        "total_spend": 6910777.11,
        "total_hours": 15769.43,
        "effective_rate": 438.2388
      }, {
        "bh_classification": "partner",
        "total_billed": 4056177.3,
        "total_afa": 0,
        "total_spend": 4056177.3,
        "total_hours": 5603.68,
        "effective_rate": 723.8417
      }]
    }, {
      "end_date": "2015-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 5381890.9,
        "total_afa": 0,
        "total_spend": 5381890.9,
        "total_hours": 15575.66,
        "effective_rate": 345.5321
      }, {
        "bh_classification": "partner",
        "total_billed": 3696969.33,
        "total_afa": 0,
        "total_spend": 3696969.33,
        "total_hours": 4840.71,
        "effective_rate": 763.7246
      }]
    }, {
      "end_date": "2014-12-31",
      "rate_increase": []
    }]
  }, {
    "bh_client_id": 110,
    "org_name": "Blackrock",
    "rates": [{
      "end_date": "2017-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 31055041.3389,
        "total_afa": 0,
        "total_spend": 31055041.3389,
        "total_hours": 56688.7,
        "effective_rate": 547.8171
      }, {
        "bh_classification": "partner",
        "total_billed": 17488132.0608,
        "total_afa": 0,
        "total_spend": 17488132.0608,
        "total_hours": 20492.7,
        "effective_rate": 853.3835
      }]
    }, {
      "end_date": "2016-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 8865809.4934,
        "total_afa": 0,
        "total_spend": 8865809.4934,
        "total_hours": 17784,
        "effective_rate": 498.5272
      }, {
        "bh_classification": "partner",
        "total_billed": 4865934.2484,
        "total_afa": 0,
        "total_spend": 4865934.2484,
        "total_hours": 5442.2,
        "effective_rate": 894.1116
      }]
    }, {
      "end_date": "2015-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 2277308.22,
        "total_afa": 0,
        "total_spend": 2277308.22,
        "total_hours": 511.4,
        "effective_rate": 4453.086
      }, {
        "bh_classification": "partner",
        "total_billed": 167471.7286,
        "total_afa": 0,
        "total_spend": 167471.7286,
        "total_hours": 173.8,
        "effective_rate": 963.5887
      }]
    }]
  }, {
    "bh_client_id": 157,
    "org_name": "Blackstone",
    "rates": [{
      "end_date": "2017-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 55495,
        "total_afa": 0,
        "total_spend": 55495,
        "total_hours": 100.9,
        "effective_rate": 550
      }, {
        "bh_classification": "partner",
        "total_billed": 134750,
        "total_afa": 0,
        "total_spend": 134750,
        "total_hours": 137.1,
        "effective_rate": 982.8592
      }]
    }, {
      "end_date": "2016-12-31",
      "rate_increase": []
    }, {
      "end_date": "2015-12-31",
      "rate_increase": []
    }]
  }, {
    "bh_client_id": 113,
    "org_name": "Bloomberg",
    "rates": [{
      "end_date": "2015-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 1193810.6,
        "total_afa": 0,
        "total_spend": 1193810.6,
        "total_hours": 12.8,
        "effective_rate": 93266.4531
      }]
    }, {
      "end_date": "2014-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 2374185.4,
        "total_afa": 0,
        "total_spend": 2374185.4,
        "total_hours": 40,
        "effective_rate": 59354.635
      }]
    }, {
      "end_date": "2013-12-31",
      "rate_increase": []
    }]
  }, {
    "bh_client_id": 120,
    "org_name": "Bridgewater",
    "rates": [{
      "end_date": "2016-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 2016058.31,
        "total_afa": 0,
        "total_spend": 2016058.31,
        "total_hours": 3561.25,
        "effective_rate": 566.1097
      }, {
        "bh_classification": "partner",
        "total_billed": 1945421.31,
        "total_afa": 0,
        "total_spend": 1945421.31,
        "total_hours": 2405.66,
        "effective_rate": 808.685
      }]
    }, {
      "end_date": "2015-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 1997540.34,
        "total_afa": 0,
        "total_spend": 1997540.34,
        "total_hours": 3422.14,
        "effective_rate": 583.7108
      }, {
        "bh_classification": "partner",
        "total_billed": 2519621.79,
        "total_afa": 0,
        "total_spend": 2519621.79,
        "total_hours": 2206.13,
        "effective_rate": 1142.1003
      }]
    }, {
      "end_date": "2014-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 2933838.58,
        "total_afa": 0,
        "total_spend": 2933838.58,
        "total_hours": 5025.96,
        "effective_rate": 583.7369
      }, {
        "bh_classification": "partner",
        "total_billed": 3590087.12,
        "total_afa": 0,
        "total_spend": 3590087.12,
        "total_hours": 3505.89,
        "effective_rate": 1024.0159
      }]
    }]
  }, {
    "bh_client_id": 289,
    "org_name": "Expensify",
    "rates": [{
      "end_date": "1969-12-31",
      "rate_increase": []
    }, {
      "end_date": "1968-12-31",
      "rate_increase": []
    }, {
      "end_date": "1967-12-31",
      "rate_increase": []
    }]
  }, {
    "bh_client_id": 59,
    "org_name": "GoldenTree Asset Management, LP",
    "rates": [{
      "end_date": "2017-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 7157810.1692,
        "total_afa": 0,
        "total_spend": 7157810.1692,
        "total_hours": 8343.35,
        "effective_rate": 857.906
      }, {
        "bh_classification": "partner",
        "total_billed": 7285824.4298,
        "total_afa": 0,
        "total_spend": 7285824.4298,
        "total_hours": 5950.55,
        "effective_rate": 1224.3951
      }]
    }, {
      "end_date": "2016-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 1991172.2553,
        "total_afa": 0,
        "total_spend": 1991172.2553,
        "total_hours": 2807.5,
        "effective_rate": 709.2332
      }, {
        "bh_classification": "partner",
        "total_billed": 1425656.4391,
        "total_afa": 0,
        "total_spend": 1425656.4391,
        "total_hours": 1199.75,
        "effective_rate": 1188.2945
      }]
    }, {
      "end_date": "2015-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 3708672.28,
        "total_afa": 0,
        "total_spend": 3708672.28,
        "total_hours": 1587.95,
        "effective_rate": 2335.5094
      }, {
        "bh_classification": "partner",
        "total_billed": 1697303.57,
        "total_afa": 0,
        "total_spend": 1697303.57,
        "total_hours": 322.55,
        "effective_rate": 5262.1409
      }]
    }]
  }, {
    "bh_client_id": 78,
    "org_name": "Macquarie",
    "rates": [{
      "end_date": "2015-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 2488711.5,
        "total_afa": 0,
        "total_spend": 2488711.5,
        "total_hours": 3473.26,
        "effective_rate": 716.5347
      }, {
        "bh_classification": "partner",
        "total_billed": 1961152.18,
        "total_afa": 0,
        "total_spend": 1961152.18,
        "total_hours": 1809.95,
        "effective_rate": 1083.5394
      }]
    }, {
      "end_date": "2014-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 424246.25,
        "total_afa": 0,
        "total_spend": 424246.25,
        "total_hours": 629.19,
        "effective_rate": 674.2736
      }, {
        "bh_classification": "partner",
        "total_billed": 273462,
        "total_afa": 0,
        "total_spend": 273462,
        "total_hours": 264.6,
        "effective_rate": 1033.492
      }]
    }, {
      "end_date": "2013-12-31",
      "rate_increase": []
    }]
  }, {
    "bh_client_id": 223,
    "org_name": "Morgan Stanley",
    "rates": [{
      "end_date": "2015-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 131024.05,
        "total_afa": 0,
        "total_spend": 131024.05,
        "total_hours": 326.75,
        "effective_rate": 400.9917
      }, {
        "bh_classification": "partner",
        "total_billed": 135509.3,
        "total_afa": 0,
        "total_spend": 135509.3,
        "total_hours": 448.3,
        "effective_rate": 302.2737
      }]
    }, {
      "end_date": "2014-12-31",
      "rate_increase": []
    }, {
      "end_date": "2013-12-31",
      "rate_increase": []
    }]
  }, {
    "bh_client_id": 89,
    "org_name": "State Farm",
    "rates": [{
      "end_date": "2018-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 11115415.7,
        "total_afa": 0,
        "total_spend": 11115415.7,
        "total_hours": 53746.51,
        "effective_rate": 206.8118
      }, {
        "bh_classification": "partner",
        "total_billed": 20221521.89,
        "total_afa": 0,
        "total_spend": 20221521.89,
        "total_hours": 84337.61,
        "effective_rate": 239.7687
      }]
    }, {
      "end_date": "2017-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 15150176.38,
        "total_afa": 0,
        "total_spend": 15150176.38,
        "total_hours": 71617.01,
        "effective_rate": 211.5443
      }, {
        "bh_classification": "partner",
        "total_billed": 26339820.29,
        "total_afa": 0,
        "total_spend": 26339820.29,
        "total_hours": 110110.12,
        "effective_rate": 239.2134
      }]
    }, {
      "end_date": "2016-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 18177513.19,
        "total_afa": 0,
        "total_spend": 18177513.19,
        "total_hours": 86154.28,
        "effective_rate": 210.9879
      }, {
        "bh_classification": "partner",
        "total_billed": 30065122.44,
        "total_afa": 0,
        "total_spend": 30065122.44,
        "total_hours": 125721.35,
        "effective_rate": 239.1409
      }]
    }]
  }, {
    "bh_client_id": 87,
    "org_name": "Stryker",
    "rates": [{
      "end_date": "2016-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 12550006.08,
        "total_afa": 0,
        "total_spend": 12550006.08,
        "total_hours": 34522.69,
        "effective_rate": 363.5292
      }, {
        "bh_classification": "partner",
        "total_billed": 16753125.41,
        "total_afa": 0,
        "total_spend": 16753125.41,
        "total_hours": 35669.25,
        "effective_rate": 469.6797
      }]
    }, {
      "end_date": "2015-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 1167167.98,
        "total_afa": 0,
        "total_spend": 1167167.98,
        "total_hours": 1976.65,
        "effective_rate": 590.4778
      }, {
        "bh_classification": "partner",
        "total_billed": 435792.12,
        "total_afa": 0,
        "total_spend": 435792.12,
        "total_hours": 647.75,
        "effective_rate": 672.7782
      }]
    }, {
      "end_date": "2014-12-31",
      "rate_increase": []
    }]
  }, {
    "bh_client_id": 121,
    "org_name": "Tishman Speyer",
    "rates": [{
      "end_date": "2017-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 2486050.408,
        "total_afa": 0,
        "total_spend": 2486050.408,
        "total_hours": 4260.95,
        "effective_rate": 583.4497
      }, {
        "bh_classification": "partner",
        "total_billed": 2934930.4834,
        "total_afa": 0,
        "total_spend": 2934930.4834,
        "total_hours": 3852.25,
        "effective_rate": 761.8743
      }]
    }, {
      "end_date": "2016-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 4706400.678,
        "total_afa": 0,
        "total_spend": 4706400.678,
        "total_hours": 7838.55,
        "effective_rate": 600.4172
      }, {
        "bh_classification": "partner",
        "total_billed": 4921819.738,
        "total_afa": 0,
        "total_spend": 4921819.738,
        "total_hours": 5749.95,
        "effective_rate": 855.976
      }]
    }, {
      "end_date": "2015-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 4987757.12,
        "total_afa": 0,
        "total_spend": 4987757.12,
        "total_hours": 7846.7,
        "effective_rate": 635.6502
      }, {
        "bh_classification": "partner",
        "total_billed": 4663659.8988,
        "total_afa": 0,
        "total_spend": 4663659.8988,
        "total_hours": 5961.1,
        "effective_rate": 782.3488
      }]
    }]
  }, {
    "bh_client_id": 47,
    "org_name": "Ventas",
    "rates": [{
      "end_date": "2018-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 25470,
        "total_afa": 0,
        "total_spend": 25470,
        "total_hours": 68.9,
        "effective_rate": 369.6661
      }, {
        "bh_classification": "partner",
        "total_billed": 55286,
        "total_afa": 0,
        "total_spend": 55286,
        "total_hours": 140,
        "effective_rate": 394.9
      }]
    }, {
      "end_date": "2017-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 3464595.1,
        "total_afa": 0,
        "total_spend": 3464595.1,
        "total_hours": 7210.2,
        "effective_rate": 480.513
      }, {
        "bh_classification": "partner",
        "total_billed": 4205697.06,
        "total_afa": 0,
        "total_spend": 4205697.06,
        "total_hours": 6050.3,
        "effective_rate": 695.122
      }]
    }, {
      "end_date": "2016-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 3744899.08,
        "total_afa": 0,
        "total_spend": 3744899.08,
        "total_hours": 7700,
        "effective_rate": 486.3505
      }, {
        "bh_classification": "partner",
        "total_billed": 4501513.19,
        "total_afa": 0,
        "total_spend": 4501513.19,
        "total_hours": 6804.8,
        "effective_rate": 661.5202
      }]
    }]
  }, {
    "bh_client_id": 74,
    "org_name": "XL Catlin",
    "rates": [{
      "end_date": "2015-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 7430854.9,
        "total_afa": 0,
        "total_spend": 7430854.9,
        "total_hours": 31422.9,
        "effective_rate": 236.4789
      }, {
        "bh_classification": "partner",
        "total_billed": 9443718.6,
        "total_afa": 0,
        "total_spend": 9443718.6,
        "total_hours": 33672,
        "effective_rate": 280.462
      }]
    }, {
      "end_date": "2014-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 152704,
        "total_afa": 0,
        "total_spend": 152704,
        "total_hours": 662.4,
        "effective_rate": 230.5314
      }, {
        "bh_classification": "partner",
        "total_billed": 207333.5,
        "total_afa": 0,
        "total_spend": 207333.5,
        "total_hours": 708.5,
        "effective_rate": 292.6372
      }]
    }, {
      "end_date": "2013-12-31",
      "rate_increase": [{
        "bh_classification": "associate",
        "total_billed": 23624,
        "total_afa": 0,
        "total_spend": 23624,
        "total_hours": 87.4,
        "effective_rate": 270.2974
      }, {
        "bh_classification": "partner",
        "total_billed": 61348,
        "total_afa": 0,
        "total_spend": 61348,
        "total_hours": 226.8,
        "effective_rate": 270.4938
      }]
    }]
  }],
  "error": null
}

