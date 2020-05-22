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
