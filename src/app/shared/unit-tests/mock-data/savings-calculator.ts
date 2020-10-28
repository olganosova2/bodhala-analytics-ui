import {SavingMetrics} from '../../../savings-calculator/savings-calculator.service';
import {SAVINGS_CALCULATOR_ARTICLES} from '../../services/config';

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
  articleId: SAVINGS_CALCULATOR_ARTICLES.BlockBilling
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

