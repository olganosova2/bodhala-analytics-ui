export enum YoYMetricTypes {
  Rate = 'rate',
  Spend = 'spend',
  Increase = 'increase'
}

export interface IYoyRateIncreaseRaw {
  total_billed: number;
  total_afa: number;
  total_spend: number;
  total_hours: number;
  effective_rate: number;
  bh_lawfirm_id: number;
  firm_name: string;
  bh_classification: string;
  year: number;
}
export interface IYoYFirmsAndClassifications {
  firm_name: string;
  bh_classification: string;
}
