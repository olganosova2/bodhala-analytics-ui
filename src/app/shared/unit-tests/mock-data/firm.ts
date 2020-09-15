import {ITag} from '../../../firm/firm.model';

export const MOCK_FIRM = {
  id: 123,
  name: 'Firm1',
  rank: 4,
  url: 'url',
  active: true,
  boutique: 'b',
  crawl_id: 1,
  crawlable: 'yes',
  is_javascript: true,
  is_sitemap: true,
  is_proxy_crawl: true,
  bio_config_file: '',
  news_config_file: '',
  leverage: 1,
  average_partner_rate: 1,
  average_associate_rate: 1,
  estimated_number_lawyers: 1,
  rate_source: '',
  letterhead: true,
  synonym_primary_id: 1,
  json_config: '',
  logo_url: '',
  lawfirm_harvest: '',
  tags: [],
  yearly_stats: []
};
export const MOCK_FIRM_DATA = {
  percent_partners: 30,
  percent_associates: 60,
  num_locations: 1,
  num_attorneys_range: '>1000',
  firmographic_leverage: 2,
  url: ''
};
export const BILLING_TOTAL_ITEM = {
  icon: 'fa-users',
  total: 100,
  total_expenses: 90,
  name: 'All',
  format: 'percent',
  lastCell: false
};
export const BILLING_TOTAL_ITEM_RC = {
  icon: 'fa-users',
  total: 100,
  total_expenses: 90,
  name: 'All',
  format: 'percent',
  avg: 100,
  diff: 0,
  lastCell: false
};
export const MOCK_DIVERSITY_DATA =  {
  total_hours: 2351.9845,
  total_lawyer_hours: 2137.5862,
  male_partner_hours: 0,
  female_partner_hours: 0,
  male_associate_hours: 0,
  female_associate_hours: 0,
  non_ethnic_partner_hours: 0,
  ethnic_partner_hours: 0,
  non_ethnic_associate_hours: 0,
  ethnic_associate_hours: 0
};
export const MOCK_FIRMS = {
  "result": [{
    "id": 4702,
    "crawl_id": 4693,
    "law_firm_name": " Langley & Banack, Inc",
    "logo_url": null
  }, {
    "id": 27710,
    "crawl_id": 27358,
    "law_firm_name": "Kirkland Kirkland Kirkland Kirkland Kirkland Kirkland",
    "logo_url": null
  }, {
    "id": 8299,
    "crawl_id": 7930,
    "law_firm_name": "Kirkland Kirkland Kirkland Kirkland Kirkland Kirkland Kirkland Kirkland Kirkland Kirkland Kirkland",
    "logo_url": null
  }]
};
export const MOCK_TOP_FIRM_SUMMARY = {
  "result": {
    "matters": [{
      "id": "OSOS926TF",
      "name": "710-955228-001",
      "client_matter_type": "WORKERS COMP (AFA) HO SPECIFIC",
      "total_billed": 1900,
      "total_afa": 0,
      "total_expenses": 46.0899,
      "total_spend": 1900,
      "total_block_billed": 0,
      "total_partner_billed": 0,
      "total_associate_billed": 0,
      "atty_hours": 3.3999,
      "atty_billed": 0,
      "blended_rate": 0,
      "partner_percent": 0,
      "block_billing_percent": 0,
      "total_partner_hours": 3.3999,
      "total_associate_hours": 0,
      "bodhala_price_index": 0.0
    }, {
      "id": "OSOS194VL",
      "name": "572-023415-001",
      "client_matter_type": "WORKERS COMP (AFA) HO SPECIFIC",
      "total_billed": 1450,
      "total_afa": 450,
      "total_expenses": 39.67,
      "total_spend": 1900,
      "total_block_billed": 0,
      "total_partner_billed": 0,
      "total_associate_billed": 0,
      "atty_hours": 5.4,
      "atty_billed": 0,
      "blended_rate": 0,
      "partner_percent": 0,
      "block_billing_percent": 0,
      "total_partner_hours": 3.1,
      "total_associate_hours": 2.3,
      "bodhala_price_index": 0.0
    }, {
      "id": "OSOS358VI",
      "name": "710-382621-001",
      "client_matter_type": "WORKERS COMP (AFA) HO SPECIFIC",
      "total_billed": 1450,
      "total_afa": 0,
      "total_expenses": 55.2899,
      "total_spend": 1450,
      "total_block_billed": 0,
      "total_partner_billed": 0,
      "total_associate_billed": 0,
      "atty_hours": 2.9,
      "atty_billed": 0,
      "blended_rate": 0,
      "partner_percent": 0,
      "block_billing_percent": 0,
      "total_partner_hours": 2.9,
      "total_associate_hours": 0,
      "bodhala_price_index": 0.0
    }, {
      "id": "OSOS752VG",
      "name": "572-016457-001",
      "client_matter_type": "WORKERS COMP (AFA) HO SPECIFIC",
      "total_billed": 1450,
      "total_afa": 0,
      "total_expenses": 0,
      "total_spend": 1450,
      "total_block_billed": 0,
      "total_partner_billed": 0,
      "total_associate_billed": 0,
      "atty_hours": 1.9999,
      "atty_billed": 0,
      "blended_rate": 0,
      "partner_percent": 0,
      "block_billing_percent": 0,
      "total_partner_hours": 1.9999,
      "total_associate_hours": 0,
      "bodhala_price_index": 0.0
    }, {
      "id": "OSOS778UI",
      "name": "710-991985-001",
      "client_matter_type": "WORKERS COMP (AFA) HO SPECIFIC",
      "total_billed": 0,
      "total_afa": 1450,
      "total_expenses": 2.65,
      "total_spend": 1450,
      "total_block_billed": 0,
      "total_partner_billed": 0,
      "total_associate_billed": 0,
      "atty_hours": 1.3,
      "atty_billed": 0,
      "blended_rate": 0,
      "partner_percent": 0,
      "block_billing_percent": 0,
      "total_partner_hours": 1.3,
      "total_associate_hours": 0,
      "bodhala_price_index": 0.0
    }],
    "timekeepers": [{
      "id": "b10fa240-40fe-11e9-81b9-0f94fd650986",
      "name": "Workers Compensation Tier 2",
      "seniority": "other",
      "bio_image_url": null,
      "firm": "Lewis, Brisbois, Bisgaard & Smith",
      "lawfirm_id": 87,
      "total": 7250,
      "total_billed": 5800,
      "total_afa": 1450,
      "current_rate": 725,
      "total_hours_billed": 8,
      "total_block_billed": 0,
      "block_billing_percent": 0,
      "effective_rate": 906.25,
      "last_of_month": 7250
    }, {
      "id": "9fc4d352-40fe-11e9-81b9-37907edea9d8",
      "name": "Workers Compensation Tier 1",
      "seniority": "other",
      "bio_image_url": null,
      "firm": "Lewis, Brisbois, Bisgaard & Smith",
      "lawfirm_id": 87,
      "total": 2700,
      "total_billed": 1350,
      "total_afa": 1350,
      "current_rate": 225,
      "total_hours_billed": 6,
      "total_block_billed": 0,
      "block_billing_percent": 0,
      "effective_rate": 450,
      "last_of_month": 2700
    }, {
      "id": "a1b16be4-40fe-11e9-81b9-af790e8793de",
      "name": "Jeanne Bawa",
      "seniority": "partner",
      "bio_image_url": null,
      "firm": "Lewis, Brisbois, Bisgaard & Smith",
      "lawfirm_id": 87,
      "total": 0,
      "total_billed": 0,
      "total_afa": 0,
      "current_rate": 140,
      "total_hours_billed": 1.5,
      "total_block_billed": 0,
      "block_billing_percent": 0,
      "effective_rate": 0,
      "last_of_month": 0
    }, {
      "id": "9b1aa14c-40fe-11e9-81b9-8bded98ff8ae",
      "name": "Lee Davis",
      "seniority": "partner",
      "bio_image_url": null,
      "firm": "Lewis, Brisbois, Bisgaard & Smith",
      "lawfirm_id": 87,
      "total": 0,
      "total_billed": 0,
      "total_afa": 0,
      "current_rate": 140,
      "total_hours_billed": 1.3,
      "total_block_billed": 0,
      "block_billing_percent": 0,
      "effective_rate": 0,
      "last_of_month": 0
    }, {
      "id": "b13d60f4-40fe-11e9-81b9-a35fb864aa2b",
      "name": "John P. Lavery",
      "seniority": "partner",
      "bio_image_url": null,
      "firm": "Lewis, Brisbois, Bisgaard & Smith",
      "lawfirm_id": 87,
      "total": 0,
      "total_billed": 0,
      "total_afa": 0,
      "current_rate": 140,
      "total_hours_billed": 2.7999,
      "total_block_billed": 0,
      "block_billing_percent": 0,
      "effective_rate": 0,
      "last_of_month": 0
    }]
  },
  "error": null
}

export const MOCK_UTBMS_CODES = {
  "result": [
    {"code": "C200", "description": "Researching Law", "subcodes": [{"code": "C200", "description": null, "total_billed": 759592.56, "total_hours": 10.8}], "total_billed": 759592.56, "total_hours": 10.8}, {"code": "C300", "description": "Analysis and Advice", "subcodes": 
    [{"code": "C300", "description": null, "total_billed": 232444.8, "total_hours": 4.4}], "total_billed": 232444.8, "total_hours": 4.4}, 
    {"code": "C400", "description": "Third Party Communication", "subcodes": [], "total_billed": 0, "total_hours": 0}, 
    {"code": "L100", "description": "Case Assessment, Development and Administration", "subcodes": [{"code": "L160", "description": null, "total_billed": 6095330.14, "total_hours": 101.2}, 
    {"code": "L100", "description": null, "total_billed": 896133.68, "total_hours": 52.4}], "total_billed": 9886169.56, "total_hours": 192.6}

  ]
};


export const MOCK_PHASE_TAXONOMY = {
  "result": [
    {"code": "C200", "description": "Researching Law", "subcodes": [{"code": "C200", "description": null, "total_billed": 759592.56, "total_hours": 10.8}], "total_billed": 759592.56, "total_hours": 10.8}, {"code": "C300", "description": "Analysis and Advice", "subcodes": 
    [{"code": "C300", "description": null, "total_billed": 232444.8, "total_hours": 4.4}], "total_billed": 232444.8, "total_hours": 4.4}, 
    {"code": "C400", "description": "Third Party Communication", "subcodes": [], "total_billed": 0, "total_hours": 0}, 
    {"code": "L100", "description": "Case Assessment, Development and Administration", "subcodes": [{"code": "L160", "description": null, "total_billed": 6095330.14, "total_hours": 101.2}, 
    {"code": "L100", "description": null, "total_billed": 896133.68, "total_hours": 52.4}], "total_billed": 9886169.56, "total_hours": 192.6}  ]
};

export const MOCK_SAVED_REPORT_DATA =  [{
  id: 22,
  user_id: 427,
  lawfirm_id: 87,
  print_date: '2020-08-29 00:00:00',
  saved_view: null,
  filter_set: {
    "dataFilters": 
  [{"clientId": 113, "displayName": "Hour Threshold", "fieldName": "threshold", "type": "NUMERIC", "step": 0.25, "filterGroup": "Threshold", "description": null, "value": 4, "default": 4}, 
  {"clientId": 113, "displayName": "Dollar Threshold", "fieldName": "dollar_threshold", "type": "NUMERIC", "filterGroup": "Threshold", "description": null, "value": 0, "step": 500, "default": 0}, 
  {"clientId": 113, "displayName": "Firms", "fieldName": "firms", "type": "MULTISELECT", "filterGroup": "Firms", "description": null}, 
  {"clientId": 113, "displayName": "Matters", "fieldName": "matters", "type": "MULTISELECT", "filterGroup": "Matters", "description": null}, 
  {"clientId": 113, "displayName": "Practice Areas", "fieldName": "practiceAreas", "type": "MULTISELECT", "filterGroup": "Practice Areas", "description": null}, 
  {"clientId": 113, "displayName": "Geographies", "fieldName": "geographies", "type": "MULTISELECT", "filterGroup": "Internal", "description": null}, 
  {"clientId": 113, "displayName": "Task Codes", "fieldName": "utbmsCodes", "type": "MULTISELECT", "filterGroup": "Matters", "description": null}, 
  {"clientId": 113, "displayName": "Firm Types", "fieldName": "firmTypes", "type": "MULTISELECT", "filterGroup": "Firms", "description": null}, 
  {"clientId": 113, "displayName": "Date Range", "fieldName": "dateRange", "type": "DATERANGE", "filterGroup": "Dates", "description": null, "minDate": "2014-06-30", "maxDate": "2019-12-20"}, 
  {"clientId": 113, "displayName": "Number of Matters", "fieldName": "firmMatterCount", "type": "RANGESLIDER", "filterGroup": "Firms", "description": null, "minRange": 1, "maxRange": 1000, "isCapped": true}, 
  {"clientId": 113, "displayName": "Lead Partners", "fieldName": "leadPartners", "type": "MULTISELECT", "filterGroup": "Firms", "description": null}, 
  {"clientId": 113, "displayName": "Total Matter Cost", "fieldName": "matterCost", "type": "RANGESLIDER", "filterGroup": "Matters", "description": null, "minRange": 0, "maxRange": 15250000, "step": 50000, "isCapped": true}, 
  {"clientId": 113, "displayName": "Firm Size (Attorneys)", "fieldName": "firmSize", "type": "RANGESLIDER", "step": 50, "filterGroup": "Firms", "description": null, "minRange": 1, "maxRange": 500, "isCapped": true}, 
  {"clientId": 113, "displayName": "Matter Status", "fieldName": "matterStatus", "type": "SELECT", "filterGroup": "Matters", "options": ["Closed", "Open"], "description": null}, 
  {"clientId": 113, "displayName": "Efficiency", "fieldName": "analytics_matter_tag_type.14", "isMatterTag": true, "filterGroup": "Matters", "type": "RANGESLIDER", "minRange": 0, "maxRange": 5, "options": null, "description": "How efficiently was the matter resolved? With 5 being most efficient.", "ordered": false}, 
  {"clientId": 113, "displayName": "Complexity", "fieldName": "analytics_matter_tag_type.9", "isMatterTag": true, "filterGroup": "Matters", "type": "RANGESLIDER", "minRange": 0, "maxRange": 5, "options": null, "description": "How complex was this matter? With 5 being the most complex.", "ordered": false}, 
  {"clientId": 113, "displayName": "Outcome", "fieldName": "analytics_matter_tag_type.15", "isMatterTag": true, "filterGroup": "Matters", "type": "RANGESLIDER", "minRange": 0, "maxRange": 5, "options": null, "description": "Rate the outcome of this matter? With 5 being the best possible outcome.", "ordered": false}, 
  {"clientId": 113, "displayName": "Critical", "fieldName": "analytics_matter_tag_type.13", "isMatterTag": true, "filterGroup": "Matters", "type": "RANGESLIDER", "minRange": 0, "maxRange": 5, "options": null, "description": "How critical or strategic was this matter? With 5 being most critical or strategic.", "ordered": false}, 
  {"clientId": 113, "displayName": "Matter Tag Collections", "fieldName": "matterTagCollections", "isMatterCollection": true, "filterGroup": "Matters", "description": null, "type": "SELECT", "options": ["M&A", "Funds"]}, 
  {"clientId": 113, "displayName": "Regulatory Interaction", "fieldName": "analytics_matter_tag_type.101", "isMatterTag": true, "filterGroup": "Matters", "type": "SELECT", "options": [], "description": null, "ordered": false, "matterCollection": "M&A"}, 
  {"clientId": 113, "displayName": "Shareholder Arrangements", "fieldName": "analytics_matter_tag_type.98", "isMatterTag": true, "filterGroup": "Matters", "type": "SELECT", "options": [], "description": null, "ordered": false, "matterCollection": "M&A"}, 
  {"clientId": 113, "displayName": "No. of Bidders", "fieldName": "analytics_matter_tag_type.102", "isMatterTag": true, "filterGroup": "Matters", "type": "SELECT", "options": [], "description": null, "ordered": false, "matterCollection": "M&A"}, 
  {"clientId": 113, "displayName": "Earn-out", "fieldName": "analytics_matter_tag_type.96", "isMatterTag": true, "filterGroup": "Matters", "type": "SELECT", "options": [], "description": null, "ordered": false, "matterCollection": "M&A"}, 
  {"clientId": 113, "displayName": "Material Regulatory Diligence", "fieldName": "analytics_matter_tag_type.100", "isMatterTag": true, "filterGroup": "Matters", "type": "MULTISELECT", "options": null, "description": null, "ordered": false, "matterCollection": "M&A"}, 
  {"clientId": 113, "displayName": "Deal Size", "fieldName": "analytics_matter_tag_type.99", "isMatterTag": true, "filterGroup": "Matters", "type": "SELECT", "options": [], "description": null, "ordered": false, "matterCollection": "M&A"}, 
  {"clientId": 113, "displayName": "Buy-Side/Sell-side", "fieldName": "analytics_matter_tag_type.94", "isMatterTag": true, "filterGroup": "Matters", "type": "SELECT", "options": [], "description": null, "ordered": false, "matterCollection": "M&A"}, 
  {"clientId": 113, "displayName": "Carve-out", "fieldName": "analytics_matter_tag_type.95", "isMatterTag": true, "filterGroup": "Matters", "type": "SELECT", "options": [], "description": null, "ordered": false, "matterCollection": "M&A"}, 
  {"clientId": 113, "displayName": "NVCA Documents", "fieldName": "analytics_matter_tag_type.97", "isMatterTag": true, "filterGroup": "Matters", "type": "SELECT", "options": [], "description": null, "ordered": false, "matterCollection": "M&A"}, 
  {"clientId": 113, "displayName": "AML", "fieldName": "analytics_matter_tag_type.93", "isMatterTag": true, "filterGroup": "Matters", "type": "SELECT", "options": [], "description": null, "ordered": false, "matterCollection": "Funds"}, 
  {"clientId": 113, "displayName": "# of Sub-facilities", "fieldName": "analytics_matter_tag_type.89", "isMatterTag": true, "filterGroup": "Matters", "type": "NUMERIC", "default": 0, "value": 0, "step": 1, "options": null, "description": null, "ordered": false, "matterCollection": "Funds"}, 
  {"clientId": 113, "displayName": "# of coinvestment facilities", "fieldName": "analytics_matter_tag_type.91", "isMatterTag": true, "filterGroup": "Matters", "type": "NUMERIC", "default": 0, "value": 0, "step": 1, "options": null, "description": null, "ordered": false, "matterCollection": "Funds"}, 
  {"clientId": 113, "displayName": "Fund Type", "fieldName": "analytics_matter_tag_type.85", "isMatterTag": true, "filterGroup": "Matters", "type": "SELECT", "options": [], "description": null, "ordered": false, "matterCollection": "Funds"}, 
  {"clientId": 113, "displayName": "Placement Agent Agreements", "fieldName": "analytics_matter_tag_type.90", "isMatterTag": true, "filterGroup": "Matters", "type": "SELECT", "options": [], "description": null, "ordered": false, "matterCollection": "Funds"}, 
  {"clientId": 113, "displayName": "# of Closings", "fieldName": "analytics_matter_tag_type.92", "isMatterTag": true, "filterGroup": "Matters", "type": "NUMERIC", "default": 0, "value": 0, "step": 1, "options": null, "description": null, "ordered": false, "matterCollection": "Funds"}, 
  {"clientId": 113, "displayName": "Size", "fieldName": "analytics_matter_tag_type.86", "isMatterTag": true, "filterGroup": "Matters", "type": "NUMERIC", "default": 0, "value": 0, "step": 1, "options": null, "description": null, "ordered": false, "matterCollection": "Funds"}, 
  {"clientId": 113, "displayName": "Upper Tier/Carried Interest Plans/Carry Plan", "fieldName": "analytics_matter_tag_type.87", "isMatterTag": true, "filterGroup": "Matters", "type": "SELECT", "options": [], "description": null, "ordered": false, "matterCollection": "Funds"}, 
  {"clientId": 113, "displayName": "Fund Financing Arrangements", "fieldName": "analytics_matter_tag_type.88", "isMatterTag": true, "filterGroup": "Matters", "type": "SELECT", "options": [], "description": null, "ordered": false, "matterCollection": "Funds"}],
  "datestring": "&startdate=2014-06-30&enddate=2019-12-20",
  "querystring": "&threshold=4&startdate=2014-06-30&enddate=2019-12-20&expenses=false"
  }
}];

export const MOCK_TOTALS_RAW = {
  "total_block_billed": 106722.2997,
  "percent_block_billed": 25.03386538452451574973202988,
  "total_partner_hours": 100,
  "total_associate_hours": 100,
  "total_spend": {
    "total": 446697.799,
    "total_billed": 446697.799,
    "total_afa": 0
  },
  "total_spend_including_expenses": {
    "total": 505142.8164,
    "total_billed": 446697.799,
    "total_afa": 0,
    "total_expenses": 58445.0174
  },
  "associate_tks_per_matter": {
    "avg": 0.7
  },
  "partner_tks_per_matter": {
    "avg": 1.3333333333333333
  },
  "avg_matter_cost": {
    "avg_cost": 19000.5214
  },
  "avg_matter_cost_including_expenses": {
    "avg_cost": 20007.4092
  },
  "avg_matter_duration": {
    "avg_duration": 60.56666666666667
  },
  "industry_benchmarks": {},
  "avg_partner_rate": 230.3298164430602,
  "avg_associate_rate": 160.98897951407756,
  "avg_paralegal_legal_assistant_rate": 85.7477330669204,
  "avg_blended_rate": 203.43603228725934,
  "avg_leverage": 0.535960468307138,
  "bodhala_price_index": 309.32586154925633,
  "start_date": "2019-01-01",
  "end_date": "2019-06-24"

};

export const MOCK_OTHER_FIRMS = {
  "total_block_billed": 106722.2997,
  "percent_block_billed": 25.03386538452451574973202988,
  "total_partner_hours": 90,
  "total_associate_hours": 90,
  "total_spend": {
    "total": 446697.799,
    "total_billed": 446697.799,
    "total_afa": 0
  },
  "total_spend_including_expenses": {
    "total": 505142.8164,
    "total_billed": 446697.799,
    "total_afa": 0,
    "total_expenses": 58445.0174
  },
  "associate_tks_per_matter": {
    "avg": 0.7
  },
  "partner_tks_per_matter": {
    "avg": 1.3333333333333333
  },
  "avg_matter_cost": {
    "avg_cost": 18047.5214
  },
  "avg_matter_cost_including_expenses": {
    "avg_cost": 21557.4092
  },
  "avg_matter_duration": {
    "avg_duration": 57.56666666666667
  },
  "industry_benchmarks": {},
  "avg_partner_rate": 224.3298164430602,
  "avg_associate_rate": 152.98897951407756,
  "avg_paralegal_legal_assistant_rate": 81.7477330669204,
  "avg_blended_rate": 199.43603228725934,
  "avg_leverage": 0.535960468307138,
  "bodhala_price_index": 306.32586154925633,
  "start_date": "2019-01-01",
  "end_date": "2019-06-24"
}

export const MOCK_SPEND_BY_QUARTER_DATA = {
  "result": 
  [{"year_quarter": 2013.1, "partner_rate": 280.0, "associate_rate": 260.0, "non_lawyer_rate": null, "paralegal_rate": null, "total_billed": 894.0, "total_partner_billed": 140.0, "total_associate_billed": 754.0, "total_partner_writeoff": 0.0, "total_associate_writeoff": 0.0, "avg_matter_cost": 447, "total_hours": 3.4, "partner_hours": 0.5, "associate_hours": 2.9, "partner_writeoff_hours": 0.0, "associate_writeoff_hours": 0.0, "total_matters": 2.0, "avg_duration_days": 24.0}, 
  {"year_quarter": 2013.2, "partner_rate": null, "associate_rate": 244.7368, "non_lawyer_rate": null, "paralegal_rate": null, "total_billed": 3720.0, "total_partner_billed": 0.0, "total_associate_billed": 3720.0, "total_partner_writeoff": 0.0, "total_associate_writeoff": 0.0, "avg_matter_cost": 3720, "total_hours": 15.2, "partner_hours": 0.0, "associate_hours": 15.2, "partner_writeoff_hours": 0.0, "associate_writeoff_hours": 0.0, "total_matters": 1.0, "avg_duration_days": 45.0}, 
  {"year_quarter": 2013.3, "partner_rate": 280.0, "associate_rate": 240.0, "non_lawyer_rate": null, "paralegal_rate": null, "total_billed": 3584.0, "total_partner_billed": 1904.0, "total_associate_billed": 1680.0, "total_partner_writeoff": 0.0, "total_associate_writeoff": 0.0, "avg_matter_cost": 398.2222, "total_hours": 13.8, "partner_hours": 6.8, "associate_hours": 7.0, "partner_writeoff_hours": 0.0, "associate_writeoff_hours": 0.0, "total_matters": 9.0, "avg_duration_days": 13.666666666666666}, 
  {"year_quarter": 2013.4, "partner_rate": 280.0, "associate_rate": 252.9729, "non_lawyer_rate": null, "paralegal_rate": null, "total_billed": 1524.0, "total_partner_billed": 588.0, "total_associate_billed": 936.0, "total_partner_writeoff": 0.0, "total_associate_writeoff": 0.0, "avg_matter_cost": 169.3333, "total_hours": 5.8, "partner_hours": 2.1, "associate_hours": 3.7, "partner_writeoff_hours": 0.0, "associate_writeoff_hours": 0.0, "total_matters": 9.0, "avg_duration_days": 7.777777777777778}, 
  {"year_quarter": 2014.1, "partner_rate": 280.0, "associate_rate": 256.6233, "non_lawyer_rate": null, "paralegal_rate": null, "total_billed": 8444.0, "total_partner_billed": 6468.0, "total_associate_billed": 1976.0, "total_partner_writeoff": 0.0, "total_associate_writeoff": 0.0, "avg_matter_cost": 649.5384, "total_hours": 30.8, "partner_hours": 23.1, "associate_hours": 7.7, "partner_writeoff_hours": 0.0, "associate_writeoff_hours": 0.0, "total_matters": 13.0, "avg_duration_days": 19.153846153846153}, 
  {"year_quarter": 2014.2, "partner_rate": 280.0, "associate_rate": 253.5064, "non_lawyer_rate": 75.0, "paralegal_rate": 75.0, "total_billed": 25797.0, "total_partner_billed": 10136.0, "total_associate_billed": 15616.0, "total_partner_writeoff": 0.0, "total_associate_writeoff": 0.0, "avg_matter_cost": 1842.6428, "total_hours": 98.4, "partner_hours": 36.2, "associate_hours": 61.6, "partner_writeoff_hours": 0.0, "associate_writeoff_hours": 0.0, "total_matters": 14.0, "avg_duration_days": 31.071428571428573}, 
  {"year_quarter": 2014.3, "partner_rate": 280.0, "associate_rate": 252.4681, "non_lawyer_rate": 75.0, "paralegal_rate": 75.0, "total_billed": 30113.0, "total_partner_billed": 19936.0, "total_associate_billed": 9922.0, "total_partner_writeoff": 0.0, "total_associate_writeoff": 0.0, "avg_matter_cost": 1584.8947, "total_hours": 113.9, "partner_hours": 71.2, "associate_hours": 39.3, "partner_writeoff_hours": 0.0, "associate_writeoff_hours": 0.0, "total_matters": 19.0, "avg_duration_days": 36.1578947368421}, 
  {"year_quarter": 2014.4, "partner_rate": 280.0, "associate_rate": 249.0882, "non_lawyer_rate": 58.0128, "paralegal_rate": 75.0, "total_billed": 39207.0, "total_partner_billed": 21364.0, "total_associate_billed": 16938.0, "total_partner_writeoff": 0.0, "total_associate_writeoff": 0.0, "avg_matter_cost": 1633.625, "total_hours": 159.9, "partner_hours": 76.3, "associate_hours": 68.0, "partner_writeoff_hours": 0.0, "associate_writeoff_hours": 0.0, "total_matters": 24.0, "avg_duration_days": 31.708333333333332}, 
  {"year_quarter": 2015.1, "partner_rate": 282.1917, "associate_rate": 257.3797, "non_lawyer_rate": 75.0, "paralegal_rate": 75.0, "total_billed": 41345.0, "total_partner_billed": 20600.0, "total_associate_billed": 19792.5, "total_partner_writeoff": 0.0, "total_associate_writeoff": 0.0, "avg_matter_cost": 1476.6071, "total_hours": 162.6, "partner_hours": 73.0, "associate_hours": 76.9, "partner_writeoff_hours": 0.0, "associate_writeoff_hours": 0.0, "total_matters": 28.0, "avg_duration_days": 34.357142857142854}, 
  {"year_quarter": 2015.2, "partner_rate": 282.6903, "associate_rate": 253.9419, "non_lawyer_rate": null, "paralegal_rate": null, "total_billed": 46756.0, "total_partner_billed": 22276.0, "total_associate_billed": 24480.0, "total_partner_writeoff": 0.0, "total_associate_writeoff": 0.0, "avg_matter_cost": 1612.2758, "total_hours": 175.2, "partner_hours": 78.8, "associate_hours": 96.4, "partner_writeoff_hours": 0.0, "associate_writeoff_hours": 0.0, "total_matters": 29.0, "avg_duration_days": 23.413793103448278}, 
  {"year_quarter": 2015.3, "partner_rate": 285.9459, "associate_rate": 248.744, "non_lawyer_rate": 75.0, "paralegal_rate": 75.0, "total_billed": 53969.5, "total_partner_billed": 22218.0, "total_associate_billed": 31391.5, "total_partner_writeoff": 0.0, "total_associate_writeoff": 0.0, "avg_matter_cost": 1798.9833, "total_hours": 208.7, "partner_hours": 77.7, "associate_hours": 126.2, "partner_writeoff_hours": 0.0, "associate_writeoff_hours": 0.0, "total_matters": 30.0, "avg_duration_days": 32.0}, 
  {"year_quarter": 2015.4, "partner_rate": 289.4849, "associate_rate": 262.1193, "non_lawyer_rate": null, "paralegal_rate": null, "total_billed": 46088.5, "total_partner_billed": 26980.0, "total_associate_billed": 19108.5, "total_partner_writeoff": 0.0, "total_associate_writeoff": 0.0, "avg_matter_cost": 1536.2833, "total_hours": 166.1, "partner_hours": 93.2, "associate_hours": 72.9, "partner_writeoff_hours": 0.0, "associate_writeoff_hours": 0.0, "total_matters": 30.0, "avg_duration_days": 31.433333333333334}, 
  {"year_quarter": 2016.1, "partner_rate": 294.1356, "associate_rate": 263.1419, "non_lawyer_rate": 91.6666, "paralegal_rate": 91.6666, "total_billed": 65948.5, "total_partner_billed": 26884.0, "total_associate_billed": 38734.5, "total_partner_writeoff": 0.0, "total_associate_writeoff": 0.0, "avg_matter_cost": 1998.4393, "total_hours": 242.2, "partner_hours": 91.4, "associate_hours": 147.2, "partner_writeoff_hours": 0.0, "associate_writeoff_hours": 0.0, "total_matters": 33.0, "avg_duration_days": 35.484848484848484}, 
  {"year_quarter": 2016.2, "partner_rate": 297.1669, "associate_rate": 261.7757, "non_lawyer_rate": 75.0, "paralegal_rate": 75.0, "total_billed": 45780.5, "total_partner_billed": 21188.0, "total_associate_billed": 24397.5, "total_partner_writeoff": 0.0, "total_associate_writeoff": 0.0, "avg_matter_cost": 1346.4852, "total_hours": 167.1, "partner_hours": 71.3, "associate_hours": 93.2, "partner_writeoff_hours": 0.0, "associate_writeoff_hours": 0.0, "total_matters": 34.0, "avg_duration_days": 34.970588235294116}, 
  {"year_quarter": 2016.3, "partner_rate": 299.6685, "associate_rate": 262.0585, "non_lawyer_rate": 100.0, "paralegal_rate": 100.0, "total_billed": 80921.5, "total_partner_billed": 47018.0, "total_associate_billed": 33543.5, "total_partner_writeoff": 0.0, "total_associate_writeoff": 0.0, "avg_matter_cost": 2235.3194, "total_hours": 288.5, "partner_hours": 156.9, "associate_hours": 128.0, "partner_writeoff_hours": 0.0, "associate_writeoff_hours": 0.0, "total_matters": 38.0, "avg_duration_days": 38.3421052631579}, 
  {"year_quarter": 2016.4, "partner_rate": 300.0, "associate_rate": 264.1537, "non_lawyer_rate": 100.0, "paralegal_rate": 100.0, "total_billed": 191696.0, "total_partner_billed": 104310.0, "total_associate_billed": 86616.0, "total_partner_writeoff": 0.0, "total_associate_writeoff": 0.0, "avg_matter_cost": 4121.4, "total_hours": 683.3, "partner_hours": 347.7, "associate_hours": 327.9, "partner_writeoff_hours": 0.0, "associate_writeoff_hours": 0.0, "total_matters": 44.0, "avg_duration_days": 43.77272727272727}, 
  {"year_quarter": 2017.1, "partner_rate": 287.5378, "associate_rate": 258.3355, "non_lawyer_rate": 80.1365, "paralegal_rate": 100.0, "total_billed": 276736.25, "total_partner_billed": 123555.0, "total_associate_billed": 147018.75, "total_partner_writeoff": 0.0, "total_associate_writeoff": 0.0, "avg_matter_cost": 5795.767, "total_hours": 1075.7, "partner_hours": 429.7, "associate_hours": 569.1, "partner_writeoff_hours": 0.0, "associate_writeoff_hours": 0.0, "total_matters": 48.0, "avg_duration_days": 52.208333333333336}, 
  {"year_quarter": 2017.2, "partner_rate": 288.6714, "associate_rate": 250.4745, "non_lawyer_rate": 80.1837, "paralegal_rate": 100.0, "total_billed": 279460.5, "total_partner_billed": 125803.0, "total_associate_billed": 145150.0, "total_partner_writeoff": 0.0, "total_associate_writeoff": 0.0, "avg_matter_cost": 4497.351, "total_hours": 1121.4, "partner_hours": 435.8, "associate_hours": 579.5, "partner_writeoff_hours": 0.0, "associate_writeoff_hours": 0.0, "total_matters": 53.0, "avg_duration_days": 57.56603773584906}, 
  {"year_quarter": 2017.3, "partner_rate": 288.8658, "associate_rate": 248.9074, "non_lawyer_rate": 86.8772, "paralegal_rate": 100.0, "total_billed": 352052.25, "total_partner_billed": 161476.0, "total_associate_billed": 176276.25, "total_partner_writeoff": 0.0, "total_associate_writeoff": 0.0, "avg_matter_cost": 6595.2784, "total_hours": 1431.8, "partner_hours": 559.0, "associate_hours": 708.2, "partner_writeoff_hours": 0.0, "associate_writeoff_hours": 0.0, "total_matters": 51.0, "avg_duration_days": 53.72549019607843}, 
  {"year_quarter": 2017.4, "partner_rate": 284.9884, "associate_rate": 244.3568, "non_lawyer_rate": 84.0965, "paralegal_rate": 100.0, "total_billed": 376431.25, "total_partner_billed": 185385.0, "total_associate_billed": 180946.25, "total_partner_writeoff": 0.0, "total_associate_writeoff": 0.0, "avg_matter_cost": 6799.1576, "total_hours": 1511.1, "partner_hours": 650.5, "associate_hours": 740.5, "partner_writeoff_hours": 0.0, "associate_writeoff_hours": 0.0, "total_matters": 54.0, "avg_duration_days": 54.648148148148145}, 
  {"year_quarter": 2018.1, "partner_rate": 287.3172, "associate_rate": 238.3921, "non_lawyer_rate": 82.9454, "paralegal_rate": 100.0, "total_billed": 498145.0, "total_partner_billed": 216120.0, "total_associate_billed": 269550.0, "total_partner_writeoff": 0.0, "total_associate_writeoff": 0.0, "avg_matter_cost": 8599.8295, "total_hours": 2033.3, "partner_hours": 752.2, "associate_hours": 1130.7, "partner_writeoff_hours": 0.0, "associate_writeoff_hours": 0.0, "total_matters": 53.0, "avg_duration_days": 58.698113207547166}, 
  {"year_quarter": 2018.2, "partner_rate": 283.2617, "associate_rate": 238.4676, "non_lawyer_rate": 78.5404, "paralegal_rate": 97.5332, "total_billed": 423047.5, "total_partner_billed": 211030.0, "total_associate_billed": 201147.5, "total_partner_writeoff": 0.0, "total_associate_writeoff": 0.0, "avg_matter_cost": 7298.141, "total_hours": 1726.9, "partner_hours": 745.0, "associate_hours": 843.5, "partner_writeoff_hours": 0.0, "associate_writeoff_hours": 0.0, "total_matters": 52.0, "avg_duration_days": 52.17307692307692}, 
  {"year_quarter": 2018.3, "partner_rate": 285.5736, "associate_rate": 235.0283, "non_lawyer_rate": 76.0015, "paralegal_rate": 99.4854, "total_billed": 443500.0, "total_partner_billed": 201615.0, "total_associate_billed": 232020.0, "total_partner_writeoff": 0.0, "total_associate_writeoff": 0.0, "avg_matter_cost": 8845.9375, "total_hours": 1823.0, "partner_hours": 706.0, "associate_hours": 987.2, "partner_writeoff_hours": 0.0, "associate_writeoff_hours": 0.0, "total_matters": 53.0, "avg_duration_days": 53.867924528301884}, 
  {"year_quarter": 2018.4, "partner_rate": 288.4977, "associate_rate": 232.2851, "non_lawyer_rate": 89.3092, "paralegal_rate": 97.826, "total_billed": 350083.75, "total_partner_billed": 193005.0, "total_associate_billed": 153006.25, "total_partner_writeoff": 0.0, "total_associate_writeoff": 0.0, "avg_matter_cost": 6463.2692, "total_hours": 1373.3, "partner_hours": 669.0, "associate_hours": 658.7, "partner_writeoff_hours": 0.0, "associate_writeoff_hours": 0.0, "total_matters": 53.0, "avg_duration_days": 54.320754716981135}, 
  {"year_quarter": 2019.1, "partner_rate": 277.5042, "associate_rate": 244.1897, "non_lawyer_rate": 99.8016, "paralegal_rate": 99.8016, "total_billed": 456243.5, "total_partner_billed": 242955.0, "total_associate_billed": 203727.5, "total_partner_writeoff": 0.0, "total_associate_writeoff": 0.0, "avg_matter_cost": 3473.125, "total_hours": 1805.6, "partner_hours": 875.5, "associate_hours": 834.3, "partner_writeoff_hours": 0.0, "associate_writeoff_hours": 0.0, "total_matters": 69.0, "avg_duration_days": 51.89855072463768}, 
  {"year_quarter": 2019.2, "partner_rate": 285.7892, "associate_rate": 244.2124, "non_lawyer_rate": 99.2399, "paralegal_rate": 99.2399, "total_billed": 402902.5, "total_partner_billed": 206940.0, "total_associate_billed": 186822.5, "total_partner_writeoff": 0.0, "total_associate_writeoff": 0.0, "avg_matter_cost": 2061.5, "total_hours": 1581.2, "partner_hours": 724.1, "associate_hours": 765.0, "partner_writeoff_hours": 0.0, "associate_writeoff_hours": 0.0, "total_matters": 65.0, "avg_duration_days": 51.76923076923077}], 
  "error": null
};