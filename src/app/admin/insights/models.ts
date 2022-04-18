export enum IAdminInsightType {
  Matter = 'Matter',
  BB = 'BB',
  BPI = 'BPI',
  IQ = 'IQ',
  Blended = 'Blended',
  RateBM = 'RateBM'
}
export interface IClient {
  bh_client_id: number;
  org_name: string;
  org_id: number;
  missingSmartPA?: boolean;
}
export interface IInsight {
  id: number;
  client_id: any;
  insight_type: string;
  title: string;
  description: string;
  client_matter_id?: string;
  bh_lawfirm_id?: number;
  is_enabled: boolean;
  created_on: string;
  created_by: string;
  modified_on: string;
  modified_by: string;
  deleted_on: string;
  deleted_by: string;
}
export interface IDates {
  currentMonthEnd: string;
  currentMonthStart: string;
  yearAgoMonthEnd: string;
  yearAgoMonthStart: string;
}
export interface IBPI {
  total_partner_billed: number;
  total_associate_billed: number;
  total_partner_hours: number;
  total_associate_hours: number;
  bodhala_price_index: number;
}
export interface IInvoiceIQItem {
  total_billed: number;
  total_hours: number;
  pct_total_spend: number;
  pct_partner: number;
  id: number;
  report_name: string;
}
export interface ISummary {
  max_date: string;
  min_date: string;
  last_percent_block_billed: number;
  avg_percent_block_billed: number;
  dates: IDates;
  BPI_current: IBPI;
  BPI_last_year: IBPI;
  increaseYoY: number;
  invoiceIQ_current: Array<IInvoiceIQItem>;
  invoiceIQ_last_year: Array<IInvoiceIQItem>;
  invoiceIQ_current_disallowed?: IInvoiceIQItem;
  invoiceIQ_last_year_disallowed?: IInvoiceIQItem;
  billing_totals_current: any;
  billing_totals_last_year: any;
}
export interface IClientMatter {
  id: string;
  name: string;
}
