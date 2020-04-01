export interface ITag {
  modified_on: string;
  deleted_on: string;
  created_on: string;
  created_by: string;
  active: boolean;
  name: string;
  modified_by: string;
  deleted_by: string;
  description: string;
  type: string;
  id: number;
}
export interface IFirm  {
  id: number;
  name: string;
  rank: string;
  url: string;
  active: boolean;
  boutique: string;
  crawl_id: number;
  crawlable: string;
  is_javascript: boolean;
  is_sitemap: boolean;
  is_proxy_crawl: boolean;
  bio_config_file: string;
  news_config_file: string;
  leverage: number;
  average_partner_rate: number;
  average_associate_rate: number;
  estimated_number_lawyers: number;
  rate_source: string;
  letterhead: boolean;
  synonym_primary_id: number;
  json_config: string;
  logo_url: string;
  lawfirm_harvest: string;
  tags: Array<ITag>;
  yearly_stats: Array<any>;
}
export interface IBillingTotalItem {
  icon: string;
  total: number;
  total_expenses?: number;
  name: string;
  format?: string;
}
export interface ITimekeeper {
  id: string;
  name: string;
  seniority: string;
  bio_image_url: string;
  firm: string;
  lawfirm_id: number;
  total: number;
  total_billed: number;
  total_afa: number;
  current_rate: number;
}
