export interface IRecommendationReport {
  id: number;
  bh_client_id: number;
  title: string;
  recommendations: IRecommendation[];
  created_on: string;
  created_by: string;
  modified_on: string;
  modified_by: string;
  deleted_on: string;
  deleted_by: string;
}
export interface IRecommendation {
  id: number;
  report_id: number;
  type_id: number;
  bh_lawfirm_id: number;
  comment: string;
  title: string;
  year: number;
  practice_area: string;
  is_smart_practice_area: boolean;
  discount_type: string;
  recommended_discount_pct_lower_range: number;
  recommended_discount_pct_upper_range: number;
  current_discount_pct: number;
  spend_increase_pct: number;
  rate_increase_pct: number;
  desired_rate_increase_pct: number;
  previous_firm_ids: number[];
  recommended_firm_ids: number[];
  previous_firm_names: string[];
  recommended_firm_names: string[];
  desired_partner_pct_of_hours_worked: number;
  desired_associate_pct_of_hours_worked: number;
  desired_paralegal_pct_of_hours_worked: number;
  desired_block_billing_pct: number;
  created_on: string;
  created_by: string;
  modified_on: string;
  modified_by: string;
  deleted_on: string;
  deleted_by: string;
  selected_type: string;
  firm_name: string;
}
