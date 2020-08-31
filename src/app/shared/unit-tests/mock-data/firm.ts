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