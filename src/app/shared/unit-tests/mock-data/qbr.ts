
export const MOCK_QUARTER_DATES = {
    "monthNumbers": [
        3,
        6,
        9,
        12
    ],
    "formattedQuarterDates": [
        "03-01",
        "06-01",
        "09-01",
        "12-01"
    ]
};

export const MOCK_PAS = [
  {
      "label": "None",
      "value": null
  },
  {
      "label": "IP",
      "value": "IP"
  },
  {
      "label": "Litigation",
      "value": "Litigation"
  }
];

export const MOCK_TOP_FIRMS = [
  {
      "label": "None",
      "value": null
  },
  {
      "label": "Paul, Weiss, Rifkind, Wharton & Garrison",
      "value": 25
  },
  {
      "label": "Transperfect Solutions",
      "value": 28983
  }
];

export const MOCK_SECOND_FIRMS = [
  {
      "label": "None",
      "value": null
  },
  {
      "label": "TESTING",
      "value": 123
  },
  {
      "label": "MIC CHECK",
      "value": 456
  }
];



export const MOCK_GENERIC_QBR_RECOMMENDATIONS = [
  {
      "id": 1,
      "title": "Increase Discounts",
      "opportunity": "Obtain greater relationship and practice area discounts to reduce net effective rates.",
      "why_it_matters": "All firms are willing to negotiate discounts based on relationship, practice area or volume and these discounts can be highly impactful for managing legal spend.",
      "action": "1. Evaluate current discount and ask for increase\n2. Ensure firms are required to obtain agreement before attempting to increase rates or decrease discounts",
      "created_by": "sys",
      "created_on": "2021-11-15T13:51:49.156981",
      "deleted_by": null,
      "deleted_on": null,
      "modified_by": null,
      "modified_on": null
  },
  {
      "id": 2,
      "title": "Prevent Rate Increases",
      "opportunity": "Freeze billing rates YoY or hold down rate increases to below 2-3%",
      "why_it_matters": "Holding down rate increases is an essential tool to reduce legal fees and ensure you're paying appropriate rates to your firms",
      "action": "1. Review net effective rates YoY\n2. Identify any proposed or actual rate increases\n3. Negotiate with firms top prevent rate increases",
      "created_by": "sys",
      "created_on": "2021-11-15T13:51:49.156981",
      "deleted_by": null,
      "deleted_on": null,
      "modified_by": null,
      "modified_on": null
  },
  {
      "id": 3,
      "title": "Partner / Associate Work Allocation",
      "opportunity": "Client should aim to increase or maintain associate work allocation at 65% or more of all attorney hours, keeping partner percentage of hours below 35% ",
      "why_it_matters": "Allocating work to associates reduces costs and associates are the appropriate attorney level for most attorney work, save for complex/strategic work warranting partner involvement",
      "action": "1. Evaluate partner and associate percentage of hours worked;\n2. Ensure partner percentage is kept below 35% and aim to keep partner work on matters at [ Firm ] to ensure the lowest cost timekeeper qualified is performing the work; \n3. Communicate expectations to [ Firm ] ",
      "created_by": "sys",
      "created_on": "2021-11-15T13:51:49.156981",
      "deleted_by": null,
      "deleted_on": null,
      "modified_by": null,
      "modified_on": null
  },
  {
      "id": 4,
      "title": "Decrease Block Billing",
      "opportunity": "",
      "why_it_matters": "Limiting block billing practices results in more accurate timekeeping and reduces inflationary billing practices.",
      "action": "1. Review percentage of block billing \n2. Pay [ Firm ] a reduced amount for block billed work \n3. Communicate to firms the requirement that block billing above 20% of time is not acceptable.",
      "created_by": "sys",
      "created_on": "2021-11-15T13:51:49.156981",
      "deleted_by": null,
      "deleted_on": null,
      "modified_by": null,
      "modified_on": null
  },
  {
      "id": 5,
      "title": "Shift Work to Other Firms",
      "opportunity": "Significant savings are available when comparing the efficiency of your firms and moving work to more cost-effective firms.",
      "why_it_matters": "While focus on rates and work allocation can be effective, firm selection offers even greater savings opportunities.",
      "action": "1. Identify lower-cost firms who can take on more work\n2. Provide work, where appropriate, to best available lower-cost firms, instead of higher-cost firms",
      "created_by": "sys",
      "created_on": "2021-11-15T13:51:49.156981",
      "deleted_by": null,
      "deleted_on": null,
      "modified_by": null,
      "modified_on": null
  },
  {
      "id": 6,
      "title": "Custom Recommendation",
      "opportunity": "Custom                                           ",
      "why_it_matters": "Custom                                           ",
      "action": "Custom                                           ",
      "created_by": "sys",
      "created_on": "2021-11-15T13:51:49.156981",
      "deleted_by": null,
      "deleted_on": null,
      "modified_by": null,
      "modified_on": null
  }
];

export const MOCK_QBR = {
  "id": 276,
  "bh_client_id": 113,
  "title": "Quarterly Business Review for Bloomberg",
  "report_type": "QoQAdjacent",
  "filters": {
      "name": "filters",
      "filters": [
          {
              "step": 0.25,
              "type": "NUMERIC",
              "value": 4,
              "default": 4,
              "display": true,
              "exclude": false,
              "ordered": false,
              "preload": 0,
              "isCapped": false,
              "maxRange": 0,
              "minRange": 0,
              "fieldName": "threshold",
              "displayName": "Hour Threshold",
              "filterGroup": "Threshold",
              "isMatterTag": false,
              "matterCollection": ""
          },
          {
              "step": 500,
              "type": "NUMERIC",
              "value": 0,
              "default": 0,
              "display": true,
              "exclude": false,
              "ordered": false,
              "preload": 0,
              "isCapped": false,
              "maxRange": 0,
              "minRange": 0,
              "fieldName": "dollar_threshold",
              "displayName": "Dollar Threshold",
              "filterGroup": "Threshold",
              "isMatterTag": false,
              "matterCollection": ""
          },
          {
              "type": "MULTISELECT",
              "value": [],
              "display": true,
              "exclude": false,
              "ordered": false,
              "preload": 0,
              "isCapped": false,
              "maxRange": 0,
              "minRange": 0,
              "fieldName": "firms",
              "displayName": "Firms",
              "filterGroup": "Firms",
              "isMatterTag": false,
              "matterCollection": ""
          },
          {
              "type": "MULTISELECT",
              "value": [],
              "display": true,
              "exclude": false,
              "ordered": false,
              "preload": 0,
              "isCapped": false,
              "maxRange": 0,
              "minRange": 0,
              "fieldName": "matterNames",
              "displayName": "Matter Names",
              "filterGroup": "Matters",
              "isMatterTag": false,
              "matterCollection": ""
          },
          {
              "type": "MULTISELECT",
              "value": [],
              "display": true,
              "exclude": false,
              "ordered": false,
              "preload": 0,
              "isCapped": false,
              "maxRange": 0,
              "minRange": 0,
              "fieldName": "matters",
              "displayName": "Matter IDs",
              "filterGroup": "Matters",
              "isMatterTag": false,
              "matterCollection": ""
          },
          {
              "type": "MULTISELECT",
              "value": [],
              "display": true,
              "exclude": false,
              "ordered": false,
              "preload": 0,
              "isCapped": false,
              "maxRange": 0,
              "minRange": 0,
              "fieldName": "geographies",
              "displayName": "Geographies",
              "filterGroup": "Internal",
              "isMatterTag": false,
              "matterCollection": ""
          },
          {
              "type": "MULTISELECT",
              "value": [],
              "display": true,
              "exclude": false,
              "ordered": false,
              "preload": 0,
              "isCapped": false,
              "maxRange": 0,
              "minRange": 0,
              "fieldName": "utbmsCodes",
              "displayName": "Task Codes",
              "filterGroup": "Matters",
              "isMatterTag": false,
              "matterCollection": ""
          },
          {
              "type": "MULTISELECT",
              "value": [],
              "display": true,
              "exclude": false,
              "ordered": false,
              "preload": 0,
              "isCapped": false,
              "maxRange": 0,
              "minRange": 0,
              "fieldName": "firmTypes",
              "displayName": "Firm Types",
              "filterGroup": "Firms",
              "isMatterTag": false,
              "matterCollection": ""
          },
          {
              "type": "MULTISELECT",
              "value": [],
              "display": true,
              "exclude": false,
              "ordered": false,
              "preload": 0,
              "isCapped": false,
              "maxRange": 0,
              "minRange": 0,
              "fieldName": "bdPracticeAreas",
              "displayName": "Smart Practice Areas",
              "filterGroup": "Practice Areas",
              "isMatterTag": false,
              "matterCollection": ""
          },
          {
              "type": "DATERANGE",
              "value": {
                  "endDate": "2021-03-10T05:00:00.000Z",
                  "startDate": "2019-03-10T05:00:00.000Z"
              },
              "display": true,
              "exclude": false,
              "maxDate": "2021-03-10",
              "minDate": "2014-06-30",
              "ordered": false,
              "preload": 0,
              "isCapped": false,
              "maxRange": 0,
              "minRange": 0,
              "fieldName": "dateRange",
              "displayName": "Date Range",
              "filterGroup": "Dates",
              "isMatterTag": false,
              "matterCollection": ""
          },
          {
              "type": "DATERANGE",
              "value": {
                  "endDate": "2021-03-10T05:00:00.000Z",
                  "startDate": "2019-03-10T05:00:00.000Z"
              },
              "display": true,
              "exclude": false,
              "maxDate": "2020-07-04",
              "minDate": "2020-07-04",
              "ordered": false,
              "preload": 0,
              "isCapped": false,
              "maxRange": 0,
              "minRange": 0,
              "fieldName": "datePaid",
              "displayName": "Date Paid Range",
              "filterGroup": "Dates",
              "isMatterTag": false,
              "matterCollection": ""
          },
          {
              "type": "DATERANGE",
              "value": {
                  "endDate": "2021-03-10T05:00:00.000Z",
                  "startDate": "2019-03-10T05:00:00.000Z"
              },
              "display": true,
              "exclude": false,
              "maxDate": "2020-08-05",
              "minDate": "2020-08-05",
              "ordered": false,
              "preload": 0,
              "isCapped": false,
              "maxRange": 0,
              "minRange": 0,
              "fieldName": "invoiceDate",
              "displayName": "Invoice Date Range",
              "filterGroup": "Dates",
              "isMatterTag": false,
              "matterCollection": ""
          },
          {
              "type": "RANGESLIDER",
              "value": [
                  1,
                  1000
              ],
              "display": true,
              "exclude": false,
              "ordered": false,
              "preload": 0,
              "isCapped": true,
              "maxRange": 1000,
              "minRange": 1,
              "fieldName": "firmMatterCount",
              "displayName": "Number of Matters",
              "filterGroup": "Firms",
              "isMatterTag": false,
              "matterCollection": ""
          },
          {
              "type": "MULTISELECT",
              "value": [],
              "display": true,
              "exclude": false,
              "ordered": false,
              "preload": 0,
              "isCapped": false,
              "maxRange": 0,
              "minRange": 0,
              "fieldName": "leadPartners",
              "displayName": "Lead Partners",
              "filterGroup": "Firms",
              "isMatterTag": false,
              "matterCollection": ""
          },
          {
              "step": 50000,
              "type": "RANGESLIDER",
              "value": [
                  0,
                  4850000
              ],
              "display": true,
              "exclude": false,
              "ordered": false,
              "preload": 0,
              "isCapped": true,
              "maxRange": 4850000,
              "minRange": 0,
              "fieldName": "matterCost",
              "displayName": "Total Matter Cost",
              "filterGroup": "Matters",
              "isMatterTag": false,
              "matterCollection": ""
          },
          {
              "step": 50,
              "type": "RANGESLIDER",
              "value": [
                  1,
                  500
              ],
              "display": true,
              "exclude": false,
              "ordered": false,
              "preload": 0,
              "isCapped": true,
              "maxRange": 500,
              "minRange": 1,
              "fieldName": "firmSize",
              "displayName": "Firm Size (Attorneys)",
              "filterGroup": "Firms",
              "isMatterTag": false,
              "matterCollection": ""
          },
          {
              "type": "SELECT",
              "value": null,
              "display": true,
              "exclude": false,
              "options": [
                  {
                      "label": "-Select-",
                      "value": null
                  },
                  {
                      "label": "Closed",
                      "value": "Closed"
                  },
                  {
                      "label": "Open",
                      "value": "Open"
                  }
              ],
              "ordered": false,
              "preload": 0,
              "isCapped": false,
              "maxRange": 0,
              "minRange": 0,
              "fieldName": "matterStatus",
              "displayName": "Matter Status",
              "filterGroup": "Matters",
              "isMatterTag": false,
              "matterCollection": ""
          },
          {
              "type": "DATE",
              "value": null,
              "display": true,
              "exclude": false,
              "ordered": false,
              "preload": 0,
              "isCapped": false,
              "maxRange": 0,
              "minRange": 0,
              "fieldName": "matterOpenDateStart",
              "displayName": "Matter Open Date Start",
              "filterGroup": "Matters",
              "isMatterTag": false,
              "matterCollection": ""
          },
          {
              "type": "DATE",
              "value": null,
              "display": true,
              "exclude": false,
              "ordered": false,
              "preload": 0,
              "isCapped": false,
              "maxRange": 0,
              "minRange": 0,
              "fieldName": "matterOpenDateEnd",
              "displayName": "Matter Open Date End",
              "filterGroup": "Matters",
              "isMatterTag": false,
              "matterCollection": ""
          },
          {
              "type": "DATE",
              "value": null,
              "display": true,
              "exclude": false,
              "ordered": false,
              "preload": 0,
              "isCapped": false,
              "maxRange": 0,
              "minRange": 0,
              "fieldName": "matterCloseDateStart",
              "displayName": "Matter Close Date Start",
              "filterGroup": "Matters",
              "isMatterTag": false,
              "matterCollection": ""
          },
          {
              "type": "DATE",
              "value": null,
              "display": true,
              "exclude": false,
              "ordered": false,
              "preload": 0,
              "isCapped": false,
              "maxRange": 0,
              "minRange": 0,
              "fieldName": "matterCloseDateEnd",
              "displayName": "Matter Close Date End",
              "filterGroup": "Matters",
              "isMatterTag": false,
              "matterCollection": ""
          },
          {
              "type": "DAYOFMATTER",
              "value": {
                  "dayOfMatter1": null,
                  "dayOfMatter2": null,
                  "dayOfMatterRange": null
              },
              "display": true,
              "exclude": false,
              "options": [
                  {
                      "label": "-Select-",
                      "value": null
                  },
                  {
                      "label": "First",
                      "value": "First"
                  },
                  {
                      "label": "Last",
                      "value": "Last"
                  },
                  {
                      "label": "Between",
                      "value": "Between"
                  }
              ],
              "ordered": false,
              "preload": 0,
              "isCapped": false,
              "maxRange": 0,
              "minRange": 0,
              "fieldName": "dayOfMatter",
              "displayName": "Day of Matter",
              "filterGroup": "Matters",
              "isMatterTag": false,
              "matterCollection": ""
          },
          {
              "type": "SELECT",
              "value": null,
              "display": true,
              "exclude": false,
              "options": null,
              "ordered": false,
              "preload": 0,
              "isCapped": false,
              "maxRange": 0,
              "minRange": 0,
              "fieldName": "matterTagCollections",
              "displayName": "Matter Tag Collections",
              "filterGroup": "Matters",
              "isMatterTag": false,
              "matterCollection": ""
          }
      ]
  },
  "chosen_metrics": {
      "total_spend": true,
      "blended_rate": false,
      "bodhala_price_index": false,
      "partner_hourly_cost": true,
      "associate_hourly_cost": true,
      "block_billing_percent": true,
      "partner_hours_percent": true,
      "associate_hours_percent": true
  },
  "start_date": "2019-03-01",
  "end_date": "2019-05-31",
  "querystring": {
      "enddate": "2021-03-10",
      "clientId": 113,
      "expenses": true,
      "startdate": "2019-03-10",
      "threshold": "4"
  },
  "status": "IN PROGRESS",
  "created_by": "447",
  "created_on": "2021-11-16T10:02:02.097703",
  "deleted_by": null,
  "deleted_on": null,
  "modified_by": "447",
  "modified_on": "2021-11-17T09:24:45.804704"
};


export const MOCK_SAVED_QBR_RECOMMENDATIONS = [
  {
      "id": 350,
      "qbr_id": 276,
      "recommendation_type_id": 1,
      "sort_order": 0,
      "metrics_edited": false,
      "practice_area": null,
      "firm_id": null,
      "title": "Increase Discounts",
      "subtitle": null,
      "opportunity": "Obtain greater relationship and practice area discounts to reduce net effective rates.",
      "why_it_matters": "All firms are willing to negotiate discounts based on relationship, practice area or volume and these discounts can be highly impactful for managing legal spend.",
      "recommendation": "$10,065,011\nTotal Spend\n12.8%\nTotal Spend Trend",
      "section": "Insights",
      "included": true,
      "created_on": "2021-11-17T09:24:50.578652",
      "deleted_on": null,
      "created_by": "447",
      "type": "Increase Discounts",
      "firm_name": null,
      "corresponding_insight_id": null,
      "recommended_discount_pct_lower_range": null,
      "recommended_discount_pct_upper_range": null,
      "current_discount_pct": null,
      "spend_increase_pct": null,
      "rate_increase_pct": null,
      "desired_rate_increase_pct": null,
      "previous_firm_ids": null,
      "recommended_firm_ids": null,
      "desired_partner_pct_of_hours_worked": null,
      "desired_associate_pct_of_hours_worked": null,
      "desired_paralegal_pct_of_hours_worked": null,
      "desired_block_billing_pct": null,
      "action": "",
      "currentFirmOptions": [
        {
            "label": "None",
            "value": null
        },
        {
            "label": "Wilmer Cutler Pickering Hale & Dorr",
            "value": 17
        },
        {
            "label": "Cornerstone Research",
            "value": 28974
        }
    ],
      "potential_savings": null
  },
  {
      "id": 351,
      "qbr_id": 276,
      "recommendation_type_id": 2,
      "sort_order": 1,
      "metrics_edited": false,
      "practice_area": null,
      "firm_id": null,
      "title": "Prevent Rate Increases",
      "subtitle": null,
      "opportunity": "Freeze billing rates YoY or hold down rate increases to below 2-3%",
      "why_it_matters": "Holding down rate increases is an essential tool to reduce legal fees and ensure you're paying appropriate rates to your firms",
      "recommendation": "14.7%\nAvg. Assoc Rate Increase\n-7.6%\nAvg. Partner Rate Increase",
      "section": "Insights",
      "included": true,
      "created_on": "2021-11-17T09:24:51.802240",
      "deleted_on": null,
      "created_by": "447",
      "type": "Prevent Rate Increases",
      "firm_name": null,
      "corresponding_insight_id": null,
      "recommended_discount_pct_lower_range": null,
      "recommended_discount_pct_upper_range": null,
      "current_discount_pct": null,
      "spend_increase_pct": null,
      "rate_increase_pct": null,
      "desired_rate_increase_pct": null,
      "previous_firm_ids": null,
      "recommended_firm_ids": null,
      "desired_partner_pct_of_hours_worked": null,
      "desired_associate_pct_of_hours_worked": null,
      "desired_paralegal_pct_of_hours_worked": null,
      "desired_block_billing_pct": null,
      "action": "",
      "currentFirmOptions": [
        {
            "label": "None",
            "value": null
        },
        {
            "label": "Wilmer Cutler Pickering Hale & Dorr",
            "value": 17
        },
        {
            "label": "Cornerstone Research",
            "value": 28974
        }
    ],
      "potential_savings": null
  },
  {
      "id": 352,
      "qbr_id": 276,
      "recommendation_type_id": 3,
      "sort_order": 2,
      "metrics_edited": false,
      "practice_area": null,
      "firm_id": null,
      "title": "Partner / Associate Work Allocation",
      "subtitle": null,
      "opportunity": "Client should aim to increase or maintain associate work allocation at 65% or more of all attorney hours, keeping partner percentage of hours below 35% ",
      "why_it_matters": "Allocating work to associates reduces costs and associates are the appropriate attorney level for most attorney work, save for complex/strategic work warranting partner involvement",
      "recommendation": "$939\nAvg. Partner Rate\n19.8%\nPartner Hours Billed",
      "section": "Insights",
      "included": true,
      "created_on": "2021-11-17T09:24:55.017996",
      "deleted_on": null,
      "created_by": "447",
      "type": "Partner / Associate Work Allocation",
      "firm_name": null,
      "corresponding_insight_id": null,
      "recommended_discount_pct_lower_range": null,
      "recommended_discount_pct_upper_range": null,
      "current_discount_pct": null,
      "spend_increase_pct": null,
      "rate_increase_pct": null,
      "desired_rate_increase_pct": null,
      "previous_firm_ids": null,
      "recommended_firm_ids": null,
      "desired_partner_pct_of_hours_worked": null,
      "desired_associate_pct_of_hours_worked": null,
      "desired_paralegal_pct_of_hours_worked": null,
      "desired_block_billing_pct": null,
      "action": "",
      "currentFirmOptions": [
        {
            "label": "None",
            "value": null
        },
        {
            "label": "Wilmer Cutler Pickering Hale & Dorr",
            "value": 17
        },
        {
            "label": "Cornerstone Research",
            "value": 28974
        }
    ],
      "potential_savings": null
  },
  {
      "id": 353,
      "qbr_id": 276,
      "recommendation_type_id": 1,
      "sort_order": 3,
      "metrics_edited": false,
      "practice_area": null,
      "firm_id": null,
      "title": "Increase Discounts",
      "subtitle": null,
      "opportunity": "Obtain greater relationship and practice area discounts to reduce net effective rates.",
      "why_it_matters": "All firms are willing to negotiate discounts based on relationship, practice area or volume and these discounts can be highly impactful for managing legal spend.",
      "recommendation": "1. Evaluate current discount and ask for increase\n2. Ensure firms are required to obtain agreement before attempting to increase rates or decrease discounts",
      "section": "Next Steps",
      "included": true,
      "created_on": "2021-11-17T09:24:58.662461",
      "deleted_on": null,
      "created_by": "447",
      "type": "Increase Discounts",
      "firm_name": null,
      "corresponding_insight_id": 350,
      "recommended_discount_pct_lower_range": 5,
      "recommended_discount_pct_upper_range": null,
      "current_discount_pct": 0,
      "spend_increase_pct": 0,
      "rate_increase_pct": null,
      "desired_rate_increase_pct": null,
      "previous_firm_ids": null,
      "recommended_firm_ids": null,
      "desired_partner_pct_of_hours_worked": null,
      "desired_associate_pct_of_hours_worked": null,
      "desired_paralegal_pct_of_hours_worked": null,
      "desired_block_billing_pct": null,
      "action": "",
      "currentFirmOptions": [
        {
            "label": "None",
            "value": null
        },
        {
            "label": "Wilmer Cutler Pickering Hale & Dorr",
            "value": 17
        },
        {
            "label": "Cornerstone Research",
            "value": 28974
        }
    ],
      "potential_savings": 503250.558715
  },
  {
      "id": 354,
      "qbr_id": 276,
      "recommendation_type_id": 2,
      "sort_order": 4,
      "metrics_edited": false,
      "practice_area": null,
      "firm_id": null,
      "title": "Prevent Rate Increases",
      "subtitle": null,
      "opportunity": "Freeze billing rates YoY or hold down rate increases to below 2-3%",
      "why_it_matters": "Holding down rate increases is an essential tool to reduce legal fees and ensure you're paying appropriate rates to your firms",
      "recommendation": "1. Review net effective rates YoY\n2. Identify any proposed or actual rate increases\n3. Negotiate with firms top prevent rate increases",
      "section": "Next Steps",
      "included": true,
      "created_on": "2021-11-17T09:24:59.138488",
      "deleted_on": null,
      "created_by": "447",
      "type": "Prevent Rate Increases",
      "firm_name": null,
      "corresponding_insight_id": 351,
      "recommended_discount_pct_lower_range": null,
      "recommended_discount_pct_upper_range": null,
      "current_discount_pct": null,
      "spend_increase_pct": 0,
      "rate_increase_pct": null,
      "desired_rate_increase_pct": 3,
      "previous_firm_ids": null,
      "recommended_firm_ids": null,
      "desired_partner_pct_of_hours_worked": null,
      "desired_associate_pct_of_hours_worked": null,
      "desired_paralegal_pct_of_hours_worked": null,
      "desired_block_billing_pct": null,
      "action": "",
      "currentFirmOptions": [
        {
            "label": "None",
            "value": null
        },
        {
            "label": "Wilmer Cutler Pickering Hale & Dorr",
            "value": 17
        },
        {
            "label": "Cornerstone Research",
            "value": 28974
        }
    ],
      "potential_savings": -1765.7118959598656
  },
  {
      "id": 355,
      "qbr_id": 276,
      "recommendation_type_id": 3,
      "sort_order": 5,
      "metrics_edited": false,
      "practice_area": null,
      "firm_id": null,
      "title": "Partner / Associate Work Allocation",
      "subtitle": null,
      "opportunity": "Client should aim to increase or maintain associate work allocation at 65% or more of all attorney hours, keeping partner percentage of hours below 35% ",
      "why_it_matters": "Allocating work to associates reduces costs and associates are the appropriate attorney level for most attorney work, save for complex/strategic work warranting partner involvement",
      "recommendation": "ensure the lowest cost timekeeper qualified is performing the work; \n3. Communicate expectations to your firms ",
      "section": "Next Steps",
      "included": true,
      "created_on": "2021-11-17T09:25:02.410680",
      "deleted_on": null,
      "created_by": "447",
      "type": "Partner / Associate Work Allocation",
      "firm_name": null,
      "corresponding_insight_id": 352,
      "recommended_discount_pct_lower_range": null,
      "recommended_discount_pct_upper_range": null,
      "current_discount_pct": null,
      "spend_increase_pct": 0,
      "rate_increase_pct": null,
      "desired_rate_increase_pct": null,
      "previous_firm_ids": null,
      "recommended_firm_ids": null,
      "desired_partner_pct_of_hours_worked": 35,
      "desired_associate_pct_of_hours_worked": 65,
      "desired_paralegal_pct_of_hours_worked": 0,
      "desired_block_billing_pct": null,
      "action": "",
      "currentFirmOptions": [
        {
            "label": "None",
            "value": null
        },
        {
            "label": "Wilmer Cutler Pickering Hale & Dorr",
            "value": 17
        },
        {
            "label": "Cornerstone Research",
            "value": 28974
        }
    ],
      "potential_savings": -91994.91201968491
  },
  {
    "id": 356,
    "qbr_id": 280,
    "recommendation_type_id": 4,
    "practice_area": null,
    "firm_id": null,
    "metrics_edited": false,
    "title": "Decrease Block Billing",
    "subtitle": null,
    "opportunity": "Block billing across all firms from Mar 1, 2019 to Feb 29, 2020 increased by 0.6%",
    "why_it_matters": "Limiting block billing practices results in more accurate timekeeping and reduces inflationary billing practices.",
    "recommendation": "43.3%\nPercent Block Billed\n0.6%\nBlock Billing Trend",
    "section": "Insights",
    "included": true,
    "created_on": "2021-11-18T10:27:42.364398",
    "deleted_on": null,
    "created_by": "447",
    "type": "Decrease Block Billing",
    "firm_name": null,
    "corresponding_insight_id": null,
    "recommended_discount_pct_lower_range": null,
    "recommended_discount_pct_upper_range": null,
    "current_discount_pct": null,
    "spend_increase_pct": null,
    "rate_increase_pct": null,
    "desired_rate_increase_pct": null,
    "previous_firm_ids": null,
    "recommended_firm_ids": null,
    "desired_partner_pct_of_hours_worked": null,
    "desired_associate_pct_of_hours_worked": null,
    "desired_paralegal_pct_of_hours_worked": null,
    "desired_block_billing_pct": null,
    "potential_savings": null,
    "notable_metrics": "43.3%\nPercent Block Billed\n0.6%\nBlock Billing Trend",
    "sort_order": 6,
    "currentFirmOptions": [
        {
            "label": "None",
            "value": null
        },
        {
            "label": "Wilmer Cutler Pickering Hale & Dorr",
            "value": 17
        },
        {
            "label": "Cornerstone Research",
            "value": 28974
        }
    ],
    "action": "1. Review percentage of block billing \n2. Pay your firms a reduced amount for block billed work \n3. Communicate to your firms the requirement that block billing above 20% of time is not acceptable."
  },
  {
    "id": 357,
    "qbr_id": 280,
    "recommendation_type_id": 5,
    "practice_area": "Litigation",
    "firm_id": 25,
    "metrics_edited": false,
    "title": "Shift Work to Other Firms",
    "subtitle": null,
    "opportunity": "Significant savings are available when comparing the efficiency of your firms and moving work to more cost-effective firms.",
    "why_it_matters": "While focus on rates and work allocation can be effective, firm selection offers even greater savings opportunities.",
    "recommendation": "$584\nPaul, Weiss, Rifkind, Wharton & Garrison Blended Rate\n$862\nRopes & Gray Blended Rate",
    "section": "Insights",
    "included": true,
    "created_on": "2021-11-18T10:28:13.587762",
    "deleted_on": null,
    "created_by": "447",
    "type": "Shift Work to Other Firms",
    "firm_name": "Paul, Weiss, Rifkind, Wharton & Garrison",
    "corresponding_insight_id": null,
    "recommended_discount_pct_lower_range": null,
    "recommended_discount_pct_upper_range": null,
    "current_discount_pct": null,
    "spend_increase_pct": null,
    "rate_increase_pct": null,
    "desired_rate_increase_pct": null,
    "previous_firm_ids": null,
    "recommended_firm_ids": null,
    "desired_partner_pct_of_hours_worked": null,
    "desired_associate_pct_of_hours_worked": null,
    "desired_paralegal_pct_of_hours_worked": null,
    "desired_block_billing_pct": null,
    "potential_savings": null,
    "notable_metrics": "$584\nPaul, Weiss, Rifkind, Wharton & Garrison Blended Rate\n$862\nRopes & Gray Blended Rate",
    "sort_order": 7,
    "currentFirmOptions": [
        {
            "label": "None",
            "value": null
        },
        {
            "label": "Paul, Weiss, Rifkind, Wharton & Garrison",
            "value": 25
        },
        {
            "label": "Ropes & Gray",
            "value": 23
        }
    ],
    "action": "1. Identify lower-cost firms who can take on more work\n2. Provide work, where appropriate, to best available lower-cost firms, instead of higher-cost firms"
}
];


export const MOCK_QBR_RECOMMENDATIONS_WITHOUT_ID = [
  {
      "id": null,
      "title": "Increase Discounts",
      "opportunity": "Obtain greater relationship and practice area discounts to reduce net effective rates.",
      "why_it_matters": "All firms are willing to negotiate discounts based on relationship, practice area or volume and these discounts can be highly impactful for managing legal spend.",
      "action": "1. Evaluate current discount and ask for increase\n2. Ensure firms are required to obtain agreement before attempting to increase rates or decrease discounts",
      "created_by": "sys",
      "created_on": "2021-11-15T13:51:49.156981",
      "deleted_by": null,
      "deleted_on": null,
      "modified_by": null,
      "modified_on": null,
      "included": true,
      "practice_area": null,
      "firm_id": null,
      "type": "Increase Discounts",
      "sort_order": 1,
      "recommendation_type_id": 1,
      "opp_edited": false,
      "metrics_edited": false,
      "section": "Insights",
      "qbr_id": 280,
      "currentFirmOptions": [
          {
              "label": "None",
              "value": null
          },
          {
              "label": "Wilmer Cutler Pickering Hale & Dorr",
              "value": 17
          },
          {
              "label": "Cornerstone Research",
              "value": 28974
          }
      ],
      "notable_metrics": "$25,951,467\nTotal Spend\n-0.9%\nTotal Spend Trend"
  },
  {
      "id": null,
      "title": "Prevent Rate Increases",
      "opportunity": "Freeze billing rates YoY or hold down rate increases to below 2-3%",
      "why_it_matters": "Holding down rate increases is an essential tool to reduce legal fees and ensure you're paying appropriate rates to your firms",
      "action": "1. Review net effective rates YoY\n2. Identify any proposed or actual rate increases\n3. Negotiate with firms top prevent rate increases",
      "created_by": "sys",
      "created_on": "2021-11-15T13:51:49.156981",
      "deleted_by": null,
      "deleted_on": null,
      "modified_by": null,
      "modified_on": null,
      "included": true,
      "practice_area": null,
      "firm_id": null,
      "type": "Prevent Rate Increases",
      "sort_order": 2,
      "recommendation_type_id": 2,
      "opp_edited": false,
      "metrics_edited": false,
      "section": "Insights",
      "qbr_id": 280,
      "currentFirmOptions": [
          {
              "label": "None",
              "value": null
          },
          {
              "label": "Wilmer Cutler Pickering Hale & Dorr",
              "value": 17
          },
          {
              "label": "Cornerstone Research",
              "value": 28974
          }
      ],
      "desired_rate_increase_pct": 3,
      "notable_metrics": "14.7%\nAvg. Assoc Rate Increase\n-7.6%\nAvg. Partner Rate Increase"
  },
  {
      "id": null,
      "title": "Partner / Associate Work Allocation",
      "opportunity": "Client should aim to increase or maintain associate work allocation at 65% or more of all attorney hours, keeping partner percentage of hours below 35% ",
      "why_it_matters": "Allocating work to associates reduces costs and associates are the appropriate attorney level for most attorney work, save for complex/strategic work warranting partner involvement",
      "action": "1. Evaluate partner and associate percentage of hours worked \n2. Ensure partner percentage is kept below 35% and aim to keep partner work on matters at your firms to ensure the lowest cost timekeeper qualified is performing the work\n 3. Communicate expectations to your firms",
      "created_by": "sys",
      "created_on": "2021-11-15T13:51:49.156981",
      "deleted_by": null,
      "deleted_on": null,
      "modified_by": null,
      "modified_on": null,
      "included": true,
      "practice_area": null,
      "firm_id": null,
      "type": "Partner / Associate Work Allocation",
      "sort_order": 3,
      "recommendation_type_id": 3,
      "opp_edited": false,
      "metrics_edited": false,
      "section": "Insights",
      "qbr_id": 280,
      "currentFirmOptions": [
          {
              "label": "None",
              "value": null
          },
          {
              "label": "Wilmer Cutler Pickering Hale & Dorr",
              "value": 17
          },
          {
              "label": "Cornerstone Research",
              "value": 28974
          }
      ],
      "notable_metrics": "$917\nAvg. Partner Rate\n20.3%\nPartner Hours Billed"
  },
  {
      "id": null,
      "title": "Decrease Block Billing",
      "opportunity": "Block billing across all firms from Mar 1, 2019 to Feb 29, 2020 increased by 0.6%",
      "why_it_matters": "Limiting block billing practices results in more accurate timekeeping and reduces inflationary billing practices.",
      "action": "1. Review percentage of block billing \n2. Pay your firms a reduced amount for block billed work \n3. Communicate to your firms the requirement that block billing above 20% of time is not acceptable.",
      "created_by": "sys",
      "created_on": "2021-11-15T13:51:49.156981",
      "deleted_by": null,
      "deleted_on": null,
      "modified_by": null,
      "modified_on": null,
      "included": true,
      "practice_area": null,
      "firm_id": null,
      "type": "Decrease Block Billing",
      "sort_order": 4,
      "recommendation_type_id": 4,
      "opp_edited": false,
      "metrics_edited": false,
      "section": "Insights",
      "qbr_id": 280,
      "currentFirmOptions": [
          {
              "label": "None",
              "value": null
          },
          {
              "label": "Wilmer Cutler Pickering Hale & Dorr",
              "value": 17
          },
          {
              "label": "Cornerstone Research",
              "value": 28974
          }
      ],
      "notable_metrics": "43.3%\nPercent Block Billed\n0.6%\nBlock Billing Trend"
  },
  {
      "id": null,
      "title": "Shift Work to Other Firms",
      "opportunity": "Significant savings are available when comparing the efficiency of your firms and moving work to more cost-effective firms.",
      "why_it_matters": "While focus on rates and work allocation can be effective, firm selection offers even greater savings opportunities.",
      "action": "1. Identify lower-cost firms who can take on more work\n2. Provide work, where appropriate, to best available lower-cost firms, instead of higher-cost firms",
      "created_by": "sys",
      "created_on": "2021-11-15T13:51:49.156981",
      "deleted_by": null,
      "deleted_on": null,
      "modified_by": null,
      "modified_on": null,
      "included": true,
      "practice_area": null,
      "firm_id": null,
      "type": "Shift Work to Other Firms",
      "sort_order": 5,
      "recommendation_type_id": 5,
      "opp_edited": false,
      "metrics_edited": false,
      "section": "Insights",
      "qbr_id": 280,
      "currentFirmOptions": [
          {
              "label": "None",
              "value": null
          },
          {
              "label": "Wilmer Cutler Pickering Hale & Dorr",
              "value": 17
          },
          {
              "label": "Cornerstone Research",
              "value": 28974
          }
      ],
      "notable_metrics": "$771\nWilmer Cutler Pickering Hale & Dorr Blended Rate\n$NaN\nCornerstone Research Blended Rate"
  },
  {
      "id": null,
      "title": "Custom Recommendation",
      "opportunity": "Custom                                           ",
      "why_it_matters": "Custom                                           ",
      "action": "Custom",
      "created_by": "sys",
      "created_on": "2021-11-15T13:51:49.156981",
      "deleted_by": null,
      "deleted_on": null,
      "modified_by": null,
      "modified_on": null,
      "included": true,
      "practice_area": null,
      "firm_id": null,
      "type": "Custom Recommendation",
      "sort_order": 6,
      "recommendation_type_id": 6,
      "opp_edited": false,
      "metrics_edited": false,
      "section": "Insights",
      "qbr_id": 280,
      "currentFirmOptions": [
          {
              "label": "None",
              "value": null
          },
          {
              "label": "Wilmer Cutler Pickering Hale & Dorr",
              "value": 17
          },
          {
              "label": "Cornerstone Research",
              "value": 28974
          }
      ],
      "notable_metrics": "Custom                                           "
  }
];


export const MOCK_REPORT_DATA = {
  "total_block_billed": 8087685.6991,
  "percent_block_billed": 43.304224305112385,
  "total_spend": {
      "total": 24940770.5995,
      "total_billed": 24940770.5995,
      "total_afa": 0
  },
  "total_spend_including_expenses": {
      "total": 25951466.6414,
      "total_billed": 24940770.5995,
      "total_afa": 0,
      "total_expenses": 1010696.0419
  },
  "associate_tks_per_matter": {
      "avg": 2.188311688311688
  },
  "partner_tks_per_matter": {
      "avg": 1.7467532467532467
  },
  "avg_matter_cost": {
      "avg_cost": 551457.818050658
  },
  "total_partner_billed": 6776161.9653,
  "total_associate_billed": 11900273.9457,
  "avg_matter_cost_including_expenses": {
      "avg_cost": 573009.9800019737
  },
  "avg_matter_duration": {
      "avg_duration": 629.1233766233767
  },
  "industry_benchmarks": {},
  "avg_partner_rate": 917.489146414282,
  "avg_associate_rate": 601.254721292011,
  "avg_paralegal_legal_assistant_rate": 267.33051989273133,
  "avg_blended_rate": 687.1907524666135,
  "avg_leverage": 2.6798816608106373,
  "bodhala_price_index": 2528.7806474805534,
  "total_partner_hours": 7385.55,
  "total_associate_hours": 19792.4,
  "total_paralegal_hours": 2498.4,
  "total_hours": 36442.15,
  "start_date": "2019-03-01",
  "end_date": "2020-02-29",
  "partner_percent_hours_worked": 20.2665045832916,
  "associate_percent_hours_worked": 54.31183396149788,
  "total_spend_trend": -0.8855941741379492,
  "total_spend_diff": -231878.1763000004,
  "partner_rate_trend": 2.7040480267454203,
  "assoc_rate_trend": 9.706804580930783,
  "partner_hrs_trend": -1.9980847805196618,
  "assoc_hrs_trend": 0.02591684181570031,
  "bb_trend": 0.560072882536069,
  "bpi_trend": 13.410542770891265,
  "blended_rate_trend": 5.970846992038759
};

export const MOCK_TOP_PA = {
  "practice_area": "IP",
  "total_billed": 6868127.9631,
  "total_hours": 6911.5,
  "total_partner_billed": 1599090.7412,
  "total_associate_billed": 2376883.4936,
  "expenses": 63450.7117,
  "associate_percent_hours_worked": 52.19416913839253,
  "partner_percent_hours_worked": 21.231281198003327,
  "paralegal_percent_hours_worked": 5.770093322722998,
  "avg_associate_rate": 658.8910277762377,
  "avg_partner_rate": 1089.7442695924765,
  "avg_paralegal_rate": 412.9170040120361,
  "avg_blended_rate": 783.4740748009774,
  "percent_block_billed": 24.50513576954832,
  "bodhala_price_index": 2709.536755349598,
  "total_billed_trend": -23.881392487087183,
  "total_billed_with_expenses": 6931578.6748,
  "partner_rate_trend": 4.789953125507274,
  "assoc_rate_trend": 13.729912027870395,
  "partner_hrs_trend": 3.7686409603198534,
  "assoc_hrs_trend": 2.5619070277480844,
  "bb_trend": -6.983024040417977,
  "bpi_trend": 0.8555953496294677,
  "blended_rate_trend": 12.044775052434442
};

export const MOCK_TOP_PA_TOP_FIRM = {
  "firm_id": 17,
  "firm_name": "Wilmer Cutler Pickering Hale & Dorr",
  "practice_area": "IP",
  "expenses": 6488,
  "total_billed": 2841802.63,
  "total_hours": 4990.7,
  "total_partner_billed": 634792.21,
  "total_associate_billed": 1933860,
  "associate_percent_hours_worked": 55.689582623680046,
  "partner_percent_hours_worked": 11.054561484360912,
  "paralegal_percent_hours_worked": 6.564209429538943,
  "avg_associate_rate": 695.8082970532148,
  "avg_partner_rate": 1150.6112198658689,
  "avg_paralegal_rate": 458.2704822954823,
  "avg_blended_rate": 771.1354578204744,
  "percent_block_billed": 25.39886978315371,
  "bodhala_price_index": 4655.88582562987,
  "total_billed_trend": -12.44379052996203,
  "total_billed_with_expenses": 2848290.63,
  "partner_rate_trend": 3.367173689774061,
  "assoc_rate_trend": 7.220925776574538,
  "partner_hrs_trend": 6.0641868360564555,
  "assoc_hrs_trend": 12.809874839485367,
  "bb_trend": 6.397085330465995,
  "bpi_trend": -30.397039553576132,
  "blended_rate_trend": 10.58267401212789
};

export const MOCK_TOP_PA_SECOND_FIRM = {
  "firm_id": 28974,
  "firm_name": "Cornerstone Research",
  "practice_area": "IP",
  "expenses": 70873.86,
  "total_billed": 2055652.43,
  "total_hours": 7,
  "total_partner_billed": 0,
  "total_associate_billed": 0,
  "associate_percent_hours_worked": 0,
  "partner_percent_hours_worked": 0,
  "paralegal_percent_hours_worked": 0,
  "avg_associate_rate": 0,
  "avg_partner_rate": 0,
  "avg_paralegal_rate": 0,
  "percent_block_billed": 0,
  "bodhala_price_index": 0,
  "total_billed_trend": 332.10310403264157,
  "total_billed_with_expenses": 2126526.29
};

export const MOCK_TOP_PA_TOP_MATTER = {
  "matter_name": "Updating",
  "matter_id": "100383",
  "practice_area": "IP",
  "expenses": 76729.28,
  "total_billed": 5363842.45,
  "associate_percent_hours_worked": 55.76272902115599,
  "partner_percent_hours_worked": 10.09009009009009,
  "avg_associate_rate": 696.2699825733372,
  "avg_partner_rate": 1225.8686195826647,
  "avg_blended_rate": 777.4160600098377,
  "percent_block_billed": 26.047169025797334,
  "bodhala_price_index": 5073.794060995185,
  "pct_of_total_spend": 78.09759047615319,
  "total_billed_trend": 43.040751411279345,
  "total_billed_with_expenses": 5440571.73,
  "partner_rate_trend": -2.3061195691856495,
  "assoc_rate_trend": 8.231355437678234,
  "partner_hrs_trend": 5.622258228911114,
  "assoc_hrs_trend": 13.469926916288486,
  "bb_trend": 4.646879744493599,
  "bpi_trend": -30.91692741778893,
  "blended_rate_trend": 10.783705493607743,
  "pct_of_total_spend_trend": 36.32961400106665
};

export const MOCK_SECOND_PA = {
  "practice_area": "Litigation",
  "total_billed": 5388889.096,
  "total_hours": 9348.3,
  "total_partner_billed": 877669.3035,
  "total_associate_billed": 3743704.1344,
  "expenses": 290463.2932,
  "associate_percent_hours_worked": 72.43883914722463,
  "partner_percent_hours_worked": 10.838334242589562,
  "paralegal_percent_hours_worked": 15.197415572884909,
  "avg_associate_rate": 552.8373747600342,
  "avg_partner_rate": 866.235001480458,
  "avg_paralegal_rate": 238.82752164425986,
  "avg_blended_rate": 593.6253613230572,
  "percent_block_billed": 63.242600905848775,
  "bodhala_price_index": 4561.166046091591,
  "total_billed_trend": -42.16282290148198,
  "total_billed_with_expenses": 5679352.3892,
  "partner_rate_trend": 4.571293465755244,
  "assoc_rate_trend": 7.229163202439293,
  "partner_hrs_trend": -10.932474953878087,
  "assoc_hrs_trend": 5.935015867700415,
  "bb_trend": 3.8740180766472676,
  "bpi_trend": 89.78915099436921,
  "blended_rate_trend": 0.1542293924816418
};

export const MOCK_SECOND_PA_TOP_FIRM = {
  "firm_id": 25,
  "firm_name": "Paul, Weiss, Rifkind, Wharton & Garrison",
  "practice_area": "Litigation",
  "expenses": 22646.59,
  "total_billed": 4363314.3,
  "total_hours": 8251.6,
  "total_partner_billed": 484374.3,
  "total_associate_billed": 3563773.94,
  "associate_percent_hours_worked": 78.78714431140627,
  "avg_associate_rate": 548.1717129145388,
  "partner_percent_hours_worked": 5.278976198555432,
  "avg_partner_rate": 1111.970385674931,
  "avg_paralegal_rate": 239.7064648615759,
  "paralegal_percent_hours_worked": 15.933879490038294,
  "avg_blended_rate": 583.5757467420135,
  "percent_block_billed": 71.14179469870402,
  "bodhala_price_index": 9293.269605142332,
  "total_billed_trend": 32.025737783168154,
  "total_billed_with_expenses": 4385960.89,
  "partner_rate_trend": -9.097156003451845,
  "assoc_rate_trend": 6.634222220660879,
  "partner_hrs_trend": 2.942484473950743,
  "assoc_hrs_trend": -10.817851689332059,
  "bb_trend": 0.5798998431236981,
  "bpi_trend": -55.61498205318867,
  "blended_rate_trend": 9.676195592883685
};

export const MOCK_SECOND_PA_SECOND_FIRM = {
  "firm_id": 23,
  "firm_name": "Ropes & Gray",
  "practice_area": "Litigation",
  "expenses": 0,
  "total_billed": 301402,
  "total_hours": 389.7,
  "total_partner_billed": 168382,
  "total_associate_billed": 100302,
  "associate_percent_hours_worked": 33.333333333333336,
  "partner_percent_hours_worked": 46.67693097254298,
  "paralegal_percent_hours_worked": 0,
  "avg_associate_rate": 772.1478060046189,
  "avg_partner_rate": 925.6844420010995,
  "avg_paralegal_rate": 0,
  "avg_blended_rate": 861.7190506735086,
  "percent_block_billed": 11.921067127182862,
  "bodhala_price_index": 1477.0973062122043,
  "total_billed_trend": 47.55223529872521,
  "total_billed_with_expenses": 301402,
  "partner_rate_trend": 3.1822052924601385,
  "assoc_rate_trend": 23.575867711840594,
  "partner_hrs_trend": 21.005575473821757,
  "assoc_hrs_trend": -22.580988917306044,
  "bb_trend": 2.9316338475287633,
  "bpi_trend": -34.58620277026759,
  "blended_rate_trend": 21.28052642335234
};

export const MOCK_SECOND_PA_TOP_MATTER = {
  "matter_name": "Absolutely Optima",
  "matter_id": "100369",
  "practice_area": "Litigation",
  "expenses": 22646.59,
  "total_billed": 4744596.08,
  "associate_percent_hours_worked": 78.68225498027255,
  "partner_percent_hours_worked": 5.271948297146177,
  "avg_associate_rate": 548.1717129145388,
  "avg_partner_rate": 1111.970385674931,
  "avg_blended_rate": 583.5757467420135,
  "percent_block_billed": 71.14179469870402,
  "bodhala_price_index": 9293.269605142332,
  "pct_of_total_spend": 88.0440475852762,
  "total_billed_trend": 16.977765388684563,
  "total_billed_with_expenses": 4767242.67,
  "partner_rate_trend": -9.097156003451845,
  "assoc_rate_trend": 6.634222220660879,
  "partner_hrs_trend": 2.9411927579575683,
  "assoc_hrs_trend": -10.702756988057402,
  "bb_trend": 0.5798998431236981,
  "bpi_trend": -55.61498205318867,
  "blended_rate_trend": 9.676195592883685,
  "pct_of_total_spend_trend": 46.541743290006266
};
