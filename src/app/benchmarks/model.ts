export interface IBenchmarkMetrics {
  client_rate: number;
  high: number;
  low: number;
  practice_area_discount: number;
  street: number;
  yoy_rate_increase: number;
}

export interface IBenchmarkRate {
  junior_associate: IBenchmarkMetrics;
  mid_associate: IBenchmarkMetrics;
  senior_associate: IBenchmarkMetrics;
  junior_partner: IBenchmarkMetrics;
  mid_partner: IBenchmarkMetrics;
  senior_partner: IBenchmarkMetrics;
}

export interface IBenchmark {
  name: string;
  tier: string;
  peers: Array<string>;
  rates: IBenchmarkRate;
}
export interface IBenchmarkOverviewRow {
  firm_id?: number;
  firm_name: string;
  status: string;
  avg_associate_rate: number;
  associate_delta: number;
  avg_partner_rate: number;
  partner_delta: number;
  tier: string;
  avg_practice_area_discount: number;
  avg_yoy_rate_increase: number;
}
