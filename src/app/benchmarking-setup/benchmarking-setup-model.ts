import {IBenchmarkRate} from '../benchmarks/model';
import {IMetric} from '../savings-calculator/savings-calculator.service';

export interface IFirmWithGroupId {
  firm_name: string;
  bh_lawfirm_id: number;
  group_id: number;
  total_billed: number;
}
export interface IPracticeAreaDD {
  id: number;
  name: string;
}
export interface IBMPracticeArea {
  name: string;
  hasRates: boolean;
  rates?: IBenchmarkRate;
  high?: number;
  low?: number;
  peers?: Array<string>;
}
export interface IBenchmarkSetup {
  benchmark_id?: number;
  year?: string;
  firm_id: number;
  firm_name?: string;
  tier?: string;
  peers: Array<string>;
  practice_areas: Array<IBMPracticeArea>;
}
export interface IBenchmarkSetupFormatted {
  firmId: number;
  firm_name?: string;
  practice_areas: Array<string>;
}
export interface ICollectionRates {
  collection_id: number;
  title: string;
  firm_name?: string;
  collection_category_id?: number;
  display_name?: string;
  bh_classification_detail: string;
  year: number;
  current_standard_rate: number;
  practice_area_discount_pct: number;
}

