export interface IWorkDistribution {
  year: string;
  bh_classification: string;
  sub_total_spend: number;
  sub_total_hours: number;
  total_spend: number;
  total_hours: number;
  total_spend_per?: number;
  total_hours_per?: number;
  effective_rate: number;
}
