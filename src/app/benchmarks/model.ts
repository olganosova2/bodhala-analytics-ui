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
  id: number;
  name: string;
  tier: string;
  practice_area?: string;
  peers: Array<string>;
  rates: IBenchmarkRate;
}
export interface IBenchmarkOverviewRow {
  id?: number;
  name: string;
  status: string;
  street?: number;
  low?: number;
  high?: number;
  avg_associate_rate: number;
  associate_delta: number;
  avg_partner_rate: number;
  partner_delta: number;
  tier: string;
  avg_practice_area_discount: number;
  avg_yoy_rate_increase: number;
  peers?: Array<string>;
  rates?: IBenchmarkRate;
  childrenRates: Array<IBenchmarkOverviewRow>;
  isExpanded?: boolean;
  isChild?: boolean;
  nonEmptyAssociate?: number;
  nonEmptyPartner?: number;
  highestChildrenRate?: number;
}
export enum RateStatuses  {
  Poor = 'Poor',
  Fair = 'Fair',
  Excellent = 'Excellent'
}
