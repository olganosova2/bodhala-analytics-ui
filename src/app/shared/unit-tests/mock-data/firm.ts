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