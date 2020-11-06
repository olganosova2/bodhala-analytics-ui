import {IBenchmarkRate} from '../benchmarks/model';

export interface IFirmWithGroupId {
  firm_name: string;
  bh_lawfirm_id: number;
  group_id: number;
  total_billed: number;
}
export interface IBMPracticeArea {
  name: string;
  hasRates: boolean;
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

