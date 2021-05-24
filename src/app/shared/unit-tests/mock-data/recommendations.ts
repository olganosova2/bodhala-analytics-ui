export const MOCK_RECOMMENDATION_REPORTS = {
  result: [
    {
        "id": 54,
        "title": "rate increase rec",
        "created_on": "2021-05-17T15:23:31.101080",
        "deleted_on": null,
        "num_recommendations": 1
    },
    {
        "id": 38,
        "title": "Block Billing",
        "created_on": "2021-05-12T19:41:05.761760",
        "deleted_on": null,
        "num_recommendations": 1
    },
    {
        "id": 51,
        "title": "Discount",
        "created_on": "2021-05-14T18:37:15.710058",
        "deleted_on": null,
        "num_recommendations": 1
    },
    {
        "id": 56,
        "title": "shift work to firms w/ higher blended rate",
        "created_on": "2021-05-18T13:54:45.611004",
        "deleted_on": null,
        "num_recommendations": 1
    },
    {
        "id": 53,
        "title": "Staffing",
        "created_on": "2021-05-14T19:00:28.738405",
        "deleted_on": null,
        "num_recommendations": 1
    }
  ]
}

export const MOCK_FIRM_OPTIONS = [
  {
    "value": 62,
    "label": "Test1"
  },
  {
    "value": 653,
    "label": "Test2"
  },
  {
    "value": 967,
    "label": "Test3"
  },
  {
    "value": 28515,
    "label": "Test4"
  },
  {
    "value": 102,
    "label": "Test5"
  },
  {
    "value": 644,
    "label": "Test6"
  },
  {
    "value": 5456,
    "label": "Test7"
  }
]

export const MOCK_RECOMMENDATION_TYPES = [
    {
      "value": 1,
      "label": "Discount"
    },
    {
      "value": 3,
      "label": "Modify Staffing Allocation"
    },
    {
      "value": 2,
      "label": "Rate Increase Prevention / Reduction"
    },
    {
      "value": 4,
      "label": "Reduce / Eliminate Block Billing"
    },
    {
      "value": 5,
      "label": "Shift Work From Firm(s) to Firm(s)"
    }
]

export const MOCK_PA_SETTING = {
  result: {
    "enabled": {
      "client_id": null,
      "created_by": null,
      "created_on": "Wed, 04 Nov 2020 15:44:22 GMT",
      "deleted_by": null,
      "deleted_on": null,
      "description": "config for analytics practice areas",
      "id": 10201,
      "json_config": "Smart Practice Areas",
      "modified_by": 889,
      "modified_on": "Thu, 20 May 2021 19:12:03 GMT",
      "name": "analytics.practice.bodhala.areas",
      "org_id": 161,
      "user_id": null,
      "value": "Smart Practice Areas"
    }
  }
}

export const MOCK_RECOMMENDATION_REPORT = {
    "id": 60,
    "bh_client_id": 89,
    "title": "testing year save",
    "created_by": "889",
    "created_on": "2021-05-20T17:29:05.166989",
    "deleted_by": null,
    "deleted_on": null,
    "modified_by": "889",
    "modified_on": "2021-05-20T18:50:32.760216",
    "recommendations": [
      {
        "id": 40,
        "report_id": 60,
        "type_id": 3,
        "bh_lawfirm_id": 62,
        "year": 2019,
        "practice_area": null,
        "is_smart_practice_area": false,
        "comment": "<p>some savings possible</p>",
        "discount_type": null,
        "recommended_discount_pct_lower_range": null,
        "recommended_discount_pct_upper_range": null,
        "current_discount_pct": null,
        "spend_increase_pct": 0,
        "rate_increase_pct": null,
        "desired_rate_increase_pct": null,
        "previous_firm_ids": [],
        "recommended_firm_ids": [],
        "desired_partner_pct_of_hours_worked": 15,
        "desired_associate_pct_of_hours_worked": 50,
        "desired_paralegal_pct_of_hours_worked": 35,
        "desired_block_billing_pct": null,
        "created_by": "889",
        "created_on": "2021-05-20T17:29:05.183652",
        "deleted_by": null,
        "deleted_on": null,
        "modified_by": "889",
        "modified_on": "2021-05-20T18:50:32.771675",
        "title": null,
        "previous_firm_names": [],
        "recommended_firm_names": [],
        "selected_type": 'Modify Staffing Allocation',
        "firm_name": 'Test'
      },
      {
        "id": 41,
        "report_id": 60,
        "type_id": 2,
        "bh_lawfirm_id": 62,
        "year": 2019,
        "practice_area": null,
        "is_smart_practice_area": false,
        "comment": "<p>asdf</p>",
        "discount_type": null,
        "recommended_discount_pct_lower_range": null,
        "recommended_discount_pct_upper_range": null,
        "current_discount_pct": null,
        "spend_increase_pct": null,
        "rate_increase_pct": null,
        "desired_rate_increase_pct": 3,
        "previous_firm_ids": [],
        "recommended_firm_ids": [],
        "desired_partner_pct_of_hours_worked": null,
        "desired_associate_pct_of_hours_worked": null,
        "desired_paralegal_pct_of_hours_worked": null,
        "desired_block_billing_pct": null,
        "created_by": "889",
        "created_on": "2021-05-20T17:29:05.189154",
        "deleted_by": null,
        "deleted_on": null,
        "modified_by": "889",
        "modified_on": "2021-05-20T18:50:32.775137",
        "title": null,
        "previous_firm_names": [],
        "recommended_firm_names": [],
        "selected_type": 'Rate Increase Prevention / Reduction',
        "firm_name": 'Test'
      },
      {
        "id": 39,
        "report_id": 60,
        "type_id": 1,
        "bh_lawfirm_id": 62,
        "year": 2019,
        "practice_area": "Fraud/Misrepresentation/Larceny",
        "is_smart_practice_area": false,
        "comment": "<p>asdf</p>",
        "discount_type": null,
        "recommended_discount_pct_lower_range": 10,
        "recommended_discount_pct_upper_range": 15,
        "current_discount_pct": 5,
        "spend_increase_pct": 0,
        "rate_increase_pct": null,
        "desired_rate_increase_pct": null,
        "previous_firm_ids": [],
        "recommended_firm_ids": [],
        "desired_partner_pct_of_hours_worked": null,
        "desired_associate_pct_of_hours_worked": null,
        "desired_paralegal_pct_of_hours_worked": null,
        "desired_block_billing_pct": null,
        "created_by": "889",
        "created_on": "2021-05-20T17:29:05.174875",
        "deleted_by": null,
        "deleted_on": null,
        "modified_by": "889",
        "modified_on": "2021-05-20T18:50:32.767239",
        "title": null,
        "previous_firm_names": [],
        "recommended_firm_names": [],
        "selected_type": 'Discount',
        "firm_name": 'Test'
      },
      {
        "id": 42,
        "report_id": 60,
        "type_id": 4,
        "bh_lawfirm_id": 62,
        "year": 2019,
        "practice_area": "Fraud/Misrepresentation/Larceny",
        "is_smart_practice_area": false,
        "comment": "<p>bunch of monay</p><p><br></p>",
        "discount_type": null,
        "recommended_discount_pct_lower_range": null,
        "recommended_discount_pct_upper_range": null,
        "current_discount_pct": null,
        "spend_increase_pct": null,
        "rate_increase_pct": null,
        "desired_rate_increase_pct": null,
        "previous_firm_ids": [],
        "recommended_firm_ids": [],
        "desired_partner_pct_of_hours_worked": null,
        "desired_associate_pct_of_hours_worked": null,
        "desired_paralegal_pct_of_hours_worked": null,
        "desired_block_billing_pct": 3,
        "created_by": "889",
        "created_on": "2021-05-20T17:29:05.195529",
        "deleted_by": null,
        "deleted_on": null,
        "modified_by": "889",
        "modified_on": "2021-05-20T18:50:32.778520",
        "title": null,
        "previous_firm_names": [],
        "recommended_firm_names": [],
        "selected_type": 'Reduce / Eliminate Block Billing',
        "firm_name": 'Test'
      },
      {
        "id": 43,
        "report_id": 60,
        "type_id": 5,
        "bh_lawfirm_id": null,
        "year": null,
        "practice_area": "Breach of Contract",
        "is_smart_practice_area": false,
        "comment": "<p>shift work</p>",
        "discount_type": null,
        "recommended_discount_pct_lower_range": null,
        "recommended_discount_pct_upper_range": null,
        "current_discount_pct": null,
        "spend_increase_pct": null,
        "rate_increase_pct": null,
        "desired_rate_increase_pct": null,
        "previous_firm_ids": [
          653,
          967,
          28515
        ],
        "recommended_firm_ids": [
          102,
          644,
          5456
        ],
        "desired_partner_pct_of_hours_worked": null,
        "desired_associate_pct_of_hours_worked": null,
        "desired_paralegal_pct_of_hours_worked": null,
        "desired_block_billing_pct": null,
        "created_by": "889",
        "created_on": "2021-05-20T18:50:32.780925",
        "deleted_by": null,
        "deleted_on": null,
        "modified_by": null,
        "modified_on": null,
        "title": null,
        "previous_firm_names": ['Test', 'Test1', 'Test2'],
        "recommended_firm_names": ['Test3', 'Test4', 'Test5'],
        "selected_type": 'Shift Work From Firm(s) to Firm(s)',
        "firm_name": ''
      }
    ]
}

export const MOCK_RECOMMENDATION_DISCOUNT_DATA = {
  result: {
    "ytd": [
      {
        "total_billed": 1014048.5,
        "client_matter_type": "Fraud/Misrepresentation/Larceny",
        "year": 2019
      }
    ],
    "previous_year": [
      {
        "total_billed": 3547084.32,
        "client_matter_type": "Fraud/Misrepresentation/Larceny",
        "year": 2018
      }
    ]
  }
}

export const MOCK_RECOMMENDATION_STAFFING_DATA = [
    {
      "total_billed": 730154.3,
      "total_expenses": 283894.2,
      "total_hours": 1937.4,
      "total_partner_hours": 374.4,
      "total_partner_billed_minus_writeoff": 231532.5,
      "total_partner_hours_minus_writeoff": 374.4,
      "total_associate_hours": 921,
      "total_associate_billed_minus_writeoff": 377630.3,
      "total_associate_hours_minus_writeoff": 921,
      "total_paralegal_hours": 642,
      "total_paralegal_billed_minus_writeoff": 120991.5,
      "total_paralegal_hours_minus_writeoff": 642,
      "partner_percent": 19.32,
      "associate_percent": 47.53,
      "paralegal_percent": 33.13,
      "avg_associate_rate": 410.022,
      "avg_partner_rate": 618.4094,
      "avg_paralegal_rate": 188.4602,
      "year": 2019
    },
    {
      "total_billed": 2945954.9,
      "total_expenses": 724564.05,
      "total_hours": 7820.5,
      "total_partner_hours": 1501.1,
      "total_partner_billed_minus_writeoff": 923677,
      "total_partner_hours_minus_writeoff": 1501.1,
      "total_associate_hours": 3610.7,
      "total_associate_billed_minus_writeoff": 1506002.4,
      "total_associate_hours_minus_writeoff": 3610.7,
      "total_paralegal_hours": 2708.7,
      "total_paralegal_billed_minus_writeoff": 516275.5,
      "total_paralegal_hours_minus_writeoff": 2708.7,
      "partner_percent": 19.19,
      "associate_percent": 46.16,
      "paralegal_percent": 34.63,
      "avg_associate_rate": 417.0943,
      "avg_partner_rate": 615.3334,
      "avg_paralegal_rate": 190.5989,
      "year": 2018
    }
]

export const MOCK_RECOMMENDATION_BB_DATA_RESULT = {
  result:[
    {
      "total_attorney_billed": 609162.8,
      "total_block_billed": 42609.2,
      "bb_percent": 6.99,
      "year": 2019
    },
    {
      "total_attorney_billed": 2318619,
      "total_block_billed": 339528.5,
      "bb_percent": 14.64,
      "year": 2018
    }
  ]
}



export const MOCK_RECOMMENDATION_BB_DATA = [
  {
    "total_attorney_billed": 609162.8,
    "total_block_billed": 42609.2,
    "bb_percent": 6.99,
    "year": 2019
  },
  {
    "total_attorney_billed": 2318619,
    "total_block_billed": 339528.5,
    "bb_percent": 14.64,
    "year": 2018
  }
]



export const MOCK_RECOMMENDATION_RATE_DATA = {
  result: [
    {
      "total_billed": 1506002.4,
      "total_afa": 0,
      "total_spend": 1506002.4,
      "total_hours": 3610.7,
      "effective_rate": 417.0943,
      "bh_lawfirm_id": 62,
      "firm_name": "Katten Muchin Rosenman",
      "bh_classification": "associate",
      "year": 2018
    },
    {
      "total_billed": 923677,
      "total_afa": 0,
      "total_spend": 923677,
      "total_hours": 1501.1,
      "effective_rate": 615.3334,
      "bh_lawfirm_id": 62,
      "firm_name": "Katten Muchin Rosenman",
      "bh_classification": "partner",
      "year": 2018
    },
    {
      "total_billed": 781192.6,
      "total_afa": 0,
      "total_spend": 781192.6,
      "total_hours": 2405.4,
      "effective_rate": 324.7661,
      "bh_lawfirm_id": 62,
      "firm_name": "Katten Muchin Rosenman",
      "bh_classification": "associate",
      "year": 2017
    },
    {
      "total_billed": 923113,
      "total_afa": 0,
      "total_spend": 923113,
      "total_hours": 1559.6,
      "effective_rate": 591.8908,
      "bh_lawfirm_id": 62,
      "firm_name": "Katten Muchin Rosenman",
      "bh_classification": "partner",
      "year": 2017
    },
    {
      "total_billed": 1394814.4,
      "total_afa": 0,
      "total_spend": 1394814.4,
      "total_hours": 4005.6,
      "effective_rate": 348.216,
      "bh_lawfirm_id": 62,
      "firm_name": "Katten Muchin Rosenman",
      "bh_classification": "associate",
      "year": 2016
    },
    {
      "total_billed": 2223768.9,
      "total_afa": 0,
      "total_spend": 2223768.9,
      "total_hours": 3858.3,
      "effective_rate": 576.3597,
      "bh_lawfirm_id": 62,
      "firm_name": "Katten Muchin Rosenman",
      "bh_classification": "partner",
      "year": 2016
    }
  ]
}

export const MOCK_NEW_REPORT = {
  "id": null,
  "title": "",
  "bh_client_id": 89,
  "recommendations": [
      {
          "id": null,
          "report_id": null,
          "type_id": null,
          "bh_lawfirm_id": null,
          "comment": null,
          "title": null,
          "year": null,
          "practice_area": null,
          "is_smart_practice_area": false,
          "discount_type": null,
          "recommended_discount_pct_lower_range": null,
          "recommended_discount_pct_upper_range": null,
          "current_discount_pct": null,
          "spend_increase_pct": null,
          "rate_increase_pct": null,
          "desired_rate_increase_pct": null,
          "previous_firm_ids": [],
          "recommended_firm_ids": [],
          "previous_firm_names": [],
          "recommended_firm_names": [],
          "desired_partner_pct_of_hours_worked": null,
          "desired_associate_pct_of_hours_worked": null,
          "desired_paralegal_pct_of_hours_worked": null,
          "desired_block_billing_pct": null,
          "created_on": null,
          "created_by": null,
          "modified_on": null,
          "modified_by": null,
          "deleted_on": null,
          "deleted_by": null,
          "selected_type": null,
          "firm_name": null
      }
  ],
  "created_on": "",
  "created_by": "",
  "modified_on": null,
  "modified_by": null,
  "deleted_on": null,
  "deleted_by": null
}

export const MOCK_SHIFT_WORK_RESULT = {
  previous: [
    {
        "tier": "N/A",
        "blended_rate": "177.62",
        "firm": "Allen, Stein & Durbin, P.C."
    },
    {
        "tier": "N/A",
        "blended_rate": "114.95",
        "firm": "Armour Law Firm"
    },
    {
        "tier": "N/A",
        "blended_rate": "161.69",
        "firm": "Atkinson, Haskins, Nellis, Brittingham, Gladd & Fiasco PC"
    }
  ],
  recommended: [
    {
        "tier": "N/A",
        "blended_rate": "695.00",
        "firm": "Bracewell & Giuliani"
    },
    {
        "tier": "N/A",
        "blended_rate": "259.87",
        "firm": "Brackett & Ellis, A Professional Corporation"
    },
    {
        "tier": "N/A",
        "blended_rate": "138.79",
        "firm": "Brennan, Harris & Rominger, LLP"
    }
  ]
}

export const MOCK_STAFFING_SAVINGS = {
  "estimated_spend_with_old_staffing": 3670518.95,
  "estimated_spend_with_rec_staffing": 3599041.8088875003,
  "diff_in_spend": 71477.14111249987
}

export const MOCK_RATE_INCREASE_SAVINGS = {
  "data": [
      {
          "total_billed": 1506002.4,
          "total_afa": 0,
          "total_spend": 1506002.4,
          "total_hours": 3610.7,
          "effective_rate": 417.0943,
          "bh_lawfirm_id": 62,
          "firm_name": "Katten Muchin Rosenman",
          "bh_classification": "associate",
          "year": 2018
      },
      {
          "total_billed": 923677,
          "total_afa": 0,
          "total_spend": 923677,
          "total_hours": 1501.1,
          "effective_rate": 615.3334,
          "bh_lawfirm_id": 62,
          "firm_name": "Katten Muchin Rosenman",
          "bh_classification": "partner",
          "year": 2018
      },
      {
          "total_billed": 781192.6,
          "total_afa": 0,
          "total_spend": 781192.6,
          "total_hours": 2405.4,
          "effective_rate": 324.7661,
          "bh_lawfirm_id": 62,
          "firm_name": "Katten Muchin Rosenman",
          "bh_classification": "associate",
          "year": 2017
      },
      {
          "total_billed": 923113,
          "total_afa": 0,
          "total_spend": 923113,
          "total_hours": 1559.6,
          "effective_rate": 591.8908,
          "bh_lawfirm_id": 62,
          "firm_name": "Katten Muchin Rosenman",
          "bh_classification": "partner",
          "year": 2017
      },
      {
          "total_billed": 1394814.4,
          "total_afa": 0,
          "total_spend": 1394814.4,
          "total_hours": 4005.6,
          "effective_rate": 348.216,
          "bh_lawfirm_id": 62,
          "firm_name": "Katten Muchin Rosenman",
          "bh_classification": "associate",
          "year": 2016
      },
      {
          "total_billed": 2223768.9,
          "total_afa": 0,
          "total_spend": 2223768.9,
          "total_hours": 3858.3,
          "effective_rate": 576.3597,
          "bh_lawfirm_id": 62,
          "firm_name": "Katten Muchin Rosenman",
          "bh_classification": "partner",
          "year": 2016
      }
  ],
  "savings": 121208.84365993255,
  "details": [
      {
          "title": "associate",
          "avgRateIncrease": 0.10847420025726834,
          "totalHours": 3610.7,
          "lastYearRate": 417.0943
      },
      {
          "title": "partner",
          "avgRateIncrease": 0.03327658987483359,
          "totalHours": 1501.1,
          "lastYearRate": 615.3334
      }
  ]
}

export const MOCK_DISCOUNT_SAVINGS = {
  "estimated_spend_with_old_disc": 3547084.32,
  "estimated_spend_with_rec_disc_lower": 3369730.104,
  "estimated_spend_with_rec_disc_upper": 3192375.888,
  "diff_in_spend_lower": 177354.21600000001,
  "diff_in_spend_upper": 354708.43200000003
}

export const MOCK_BLOCK_BILLING_TOTALS = {
  "unacceptable_bb_amount": 269887.2516,
  "estimated_bb_savings": 53977.45032
}

export const RECOMMENDATIONS = [
    {
      "id": 40,
      "report_id": 60,
      "type_id": 3,
      "bh_lawfirm_id": 62,
      "year": 2019,
      "practice_area": null,
      "is_smart_practice_area": false,
      "comment": "<p>some savings possible</p>",
      "discount_type": null,
      "recommended_discount_pct_lower_range": null,
      "recommended_discount_pct_upper_range": null,
      "current_discount_pct": null,
      "spend_increase_pct": 0,
      "rate_increase_pct": null,
      "desired_rate_increase_pct": null,
      "previous_firm_ids": [],
      "recommended_firm_ids": [],
      "desired_partner_pct_of_hours_worked": 15,
      "desired_associate_pct_of_hours_worked": 50,
      "desired_paralegal_pct_of_hours_worked": 35,
      "desired_block_billing_pct": null,
      "created_by": "889",
      "created_on": "2021-05-20T17:29:05.183652",
      "deleted_by": null,
      "deleted_on": null,
      "modified_by": "889",
      "modified_on": "2021-05-20T18:50:32.771675",
      "title": null,
      "previous_firm_names": [],
      "recommended_firm_names": [],
      "selected_type": 'Modify Staffing Allocation',
      "firm_name": 'Test'
    },
    {
      "id": 41,
      "report_id": 60,
      "type_id": 2,
      "bh_lawfirm_id": 62,
      "year": 2019,
      "practice_area": null,
      "is_smart_practice_area": false,
      "comment": "<p>asdf</p>",
      "discount_type": null,
      "recommended_discount_pct_lower_range": null,
      "recommended_discount_pct_upper_range": null,
      "current_discount_pct": null,
      "spend_increase_pct": null,
      "rate_increase_pct": null,
      "desired_rate_increase_pct": 3,
      "previous_firm_ids": [],
      "recommended_firm_ids": [],
      "desired_partner_pct_of_hours_worked": null,
      "desired_associate_pct_of_hours_worked": null,
      "desired_paralegal_pct_of_hours_worked": null,
      "desired_block_billing_pct": null,
      "created_by": "889",
      "created_on": "2021-05-20T17:29:05.189154",
      "deleted_by": null,
      "deleted_on": null,
      "modified_by": "889",
      "modified_on": "2021-05-20T18:50:32.775137",
      "title": null,
      "previous_firm_names": [],
      "recommended_firm_names": [],
      "selected_type": 'Rate Increase Prevention / Reduction',
      "firm_name": 'Test'
    },
    {
      "id": 39,
      "report_id": 60,
      "type_id": 1,
      "bh_lawfirm_id": 62,
      "year": 2019,
      "practice_area": "Fraud/Misrepresentation/Larceny",
      "is_smart_practice_area": false,
      "comment": "<p>asdf</p>",
      "discount_type": null,
      "recommended_discount_pct_lower_range": 10,
      "recommended_discount_pct_upper_range": 15,
      "current_discount_pct": 5,
      "spend_increase_pct": 0,
      "rate_increase_pct": null,
      "desired_rate_increase_pct": null,
      "previous_firm_ids": [],
      "recommended_firm_ids": [],
      "desired_partner_pct_of_hours_worked": null,
      "desired_associate_pct_of_hours_worked": null,
      "desired_paralegal_pct_of_hours_worked": null,
      "desired_block_billing_pct": null,
      "created_by": "889",
      "created_on": "2021-05-20T17:29:05.174875",
      "deleted_by": null,
      "deleted_on": null,
      "modified_by": "889",
      "modified_on": "2021-05-20T18:50:32.767239",
      "title": null,
      "previous_firm_names": [],
      "recommended_firm_names": [],
      "selected_type": 'Discount',
      "firm_name": 'Test'
    },
    {
      "id": 42,
      "report_id": 60,
      "type_id": 4,
      "bh_lawfirm_id": 62,
      "year": 2019,
      "practice_area": "Fraud/Misrepresentation/Larceny",
      "is_smart_practice_area": false,
      "comment": "<p>bunch of monay</p><p><br></p>",
      "discount_type": null,
      "recommended_discount_pct_lower_range": null,
      "recommended_discount_pct_upper_range": null,
      "current_discount_pct": null,
      "spend_increase_pct": null,
      "rate_increase_pct": null,
      "desired_rate_increase_pct": null,
      "previous_firm_ids": [],
      "recommended_firm_ids": [],
      "desired_partner_pct_of_hours_worked": null,
      "desired_associate_pct_of_hours_worked": null,
      "desired_paralegal_pct_of_hours_worked": null,
      "desired_block_billing_pct": 3,
      "created_by": "889",
      "created_on": "2021-05-20T17:29:05.195529",
      "deleted_by": null,
      "deleted_on": null,
      "modified_by": "889",
      "modified_on": "2021-05-20T18:50:32.778520",
      "title": null,
      "previous_firm_names": [],
      "recommended_firm_names": [],
      "selected_type": 'Reduce / Eliminate Block Billing',
      "firm_name": 'Test'
    },
    {
      "id": 43,
      "report_id": 60,
      "type_id": 5,
      "bh_lawfirm_id": null,
      "year": null,
      "practice_area": "Breach of Contract",
      "is_smart_practice_area": false,
      "comment": "<p>shift work</p>",
      "discount_type": null,
      "recommended_discount_pct_lower_range": null,
      "recommended_discount_pct_upper_range": null,
      "current_discount_pct": null,
      "spend_increase_pct": null,
      "rate_increase_pct": null,
      "desired_rate_increase_pct": null,
      "previous_firm_ids": [
        653,
        967,
        28515
      ],
      "recommended_firm_ids": [
        102,
        644,
        5456
      ],
      "desired_partner_pct_of_hours_worked": null,
      "desired_associate_pct_of_hours_worked": null,
      "desired_paralegal_pct_of_hours_worked": null,
      "desired_block_billing_pct": null,
      "created_by": "889",
      "created_on": "2021-05-20T18:50:32.780925",
      "deleted_by": null,
      "deleted_on": null,
      "modified_by": null,
      "modified_on": null,
      "title": null,
      "previous_firm_names": ['Test', 'Test1', 'Test2'],
      "recommended_firm_names": ['Test3', 'Test4', 'Test5'],
      "selected_type": 'Shift Work From Firm(s) to Firm(s)',
      "firm_name": ''
  }
];

export const MOCK_RECOMMENDATION_TYPES_RESULT = {
  result : [
    {
      "id": 1,
      "name": "Discount"
    },
    {
      "id": 3,
      "name": "Modify Staffing Allocation"
    },
    {
      "id": 2,
      "name": "Rate Increase Prevention / Reduction"
    },
    {
      "id": 4,
      "name": "Reduce / Eliminate Block Billing"
    },
    {
      "id": 5,
      "name": "Shift Work From Firm(s) to Firm(s)"
    }
  ]
}

export const MOCK_FIRMS_BY_PA = {
  result: [
    {
      "total_billed": 481688.66,
      "firm_name": "Pugh, Jones & Johnson, P.C.",
      "bh_lawfirm_id": 6918,
      "attorney_billed": 458811,
      "attorney_hours": 1398.3,
      "tier": null,
      "blended_rate": 328.1205
    },
    {
      "total_billed": 5052176.09,
      "firm_name": "Quinn Emanuel Urquhart & Sullivan",
      "bh_lawfirm_id": 28,
      "attorney_billed": 4978933,
      "attorney_hours": 6721.9,
      "tier": 1,
      "blended_rate": 740.7032
    },
    {
      "total_billed": 2350065.91,
      "firm_name": "Ramon Worthington PLLC",
      "bh_lawfirm_id": 1038,
      "attorney_billed": 2108455.45,
      "attorney_hours": 10726.5,
      "tier": null,
      "blended_rate": 196.565
    },
    {
      "total_billed": 4589475.29,
      "firm_name": "Rivkin Radler, LLP",
      "bh_lawfirm_id": 3141,
      "attorney_billed": 4333612.25,
      "attorney_hours": 15683.1,
      "tier": null,
      "blended_rate": 276.3237
    },
    {
      "total_billed": 5582697.98,
      "firm_name": "Steptoe & Johnson",
      "bh_lawfirm_id": 78,
      "attorney_billed": 4618689.85,
      "attorney_hours": 14775.39,
      "tier": 2,
      "blended_rate": 312.5934
    }
  ]
}

export const MOCK_PRACTICE_AREAS_BY_FIRM = {
  result: {
    "clients": [
      {
          "client_matter_type": "Compliance"
      },
      {
          "client_matter_type": "Employment"
      },
      {
          "client_matter_type": "Financial Products"
      },
      {
          "client_matter_type": "General Corporate"
      },
      {
          "client_matter_type": "IP, Vendors and Global Data"
      },
      {
          "client_matter_type": "International"
      },
      {
          "client_matter_type": "Legal and Compliance"
      },
      {
          "client_matter_type": "Litigation"
      },
      {
          "client_matter_type": "Litigation and Investigations"
      },
      {
          "client_matter_type": "Mergers and Acquisitions"
      },
      {
          "client_matter_type": "News"
      },
      {
          "client_matter_type": "Privacy"
      },
      {
          "client_matter_type": "Real Estate"
      },
      {
          "client_matter_type": "Regulatory and Government Relations"
      },
      {
          "client_matter_type": "Regulatory and Transactional Products"
      }
  ],
  "bodhala": [
      {
          "client_matter_type": "Banking & Credit"
      },
      {
          "client_matter_type": "Bankruptcy"
      },
      {
          "client_matter_type": "Capital Markets"
      },
      {
          "client_matter_type": "Energy"
      },
      {
          "client_matter_type": "Funds"
      },
      {
          "client_matter_type": "General/Other"
      },
      {
          "client_matter_type": "IP"
      },
      {
          "client_matter_type": "Labor & Employment"
      },
      {
          "client_matter_type": "Litigation"
      },
      {
          "client_matter_type": "M&A"
      },
      {
          "client_matter_type": "Real Estate"
      }
    ]
  }
}

export const MOCK_PA_GROUPS = [
  {
      "label": "Smart Practice Areas",
      "items": [
          {
              "label": "Banking & Credit - [Smart]",
              "value": "Banking & Credit - [Smart]"
          },
          {
              "label": "Bankruptcy - [Smart]",
              "value": "Bankruptcy - [Smart]"
          },
          {
              "label": "Capital Markets - [Smart]",
              "value": "Capital Markets - [Smart]"
          },
          {
              "label": "Energy - [Smart]",
              "value": "Energy - [Smart]"
          },
          {
              "label": "Funds - [Smart]",
              "value": "Funds - [Smart]"
          },
          {
              "label": "General/Other - [Smart]",
              "value": "General/Other - [Smart]"
          },
          {
              "label": "IP - [Smart]",
              "value": "IP - [Smart]"
          },
          {
              "label": "Labor & Employment - [Smart]",
              "value": "Labor & Employment - [Smart]"
          },
          {
              "label": "Litigation - [Smart]",
              "value": "Litigation - [Smart]"
          },
          {
              "label": "M&A - [Smart]",
              "value": "M&A - [Smart]"
          },
          {
              "label": "Real Estate - [Smart]",
              "value": "Real Estate - [Smart]"
          }
      ]
  },
  {
      "label": "Client Practice Areas",
      "items": [
          {
              "label": "AsiaPac",
              "value": "AsiaPac"
          },
          {
              "label": "Compliance",
              "value": "Compliance"
          },
          {
              "label": "Employment",
              "value": "Employment"
          },
          {
              "label": "Financial Products",
              "value": "Financial Products"
          },
          {
              "label": "General Corporate",
              "value": "General Corporate"
          },
          {
              "label": "IP, Vendors and Global Data",
              "value": "IP, Vendors and Global Data"
          },
          {
              "label": "IP, Verticals and Global Data",
              "value": "IP, Verticals and Global Data"
          },
          {
              "label": "International",
              "value": "International"
          },
          {
              "label": "KTLO",
              "value": "KTLO"
          },
          {
              "label": "Legal and Compliance",
              "value": "Legal and Compliance"
          },
          {
              "label": "Litigation",
              "value": "Litigation"
          },
          {
              "label": "Litigation and Investigations",
              "value": "Litigation and Investigations"
          },
          {
              "label": "Media",
              "value": "Media"
          },
          {
              "label": "Mergers and Acquisitions",
              "value": "Mergers and Acquisitions"
          },
          {
              "label": "News",
              "value": "News"
          },
          {
              "label": "Privacy",
              "value": "Privacy"
          },
          {
              "label": "Real Estate",
              "value": "Real Estate"
          },
          {
              "label": "Regulatory and Government Relations",
              "value": "Regulatory and Government Relations"
          },
          {
              "label": "Regulatory and Transactional Products",
              "value": "Regulatory and Transactional Products"
          },
          {
              "label": "Special Matters",
              "value": "Special Matters"
          },
          {
              "label": "Strategic Securities Regulatory",
              "value": "Strategic Securities Regulatory"
          },
          {
              "label": "VendorSupplier",
              "value": "VendorSupplier"
          }
      ]
  }
];
