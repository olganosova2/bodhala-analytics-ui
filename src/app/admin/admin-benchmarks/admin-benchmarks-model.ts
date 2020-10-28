import {IBenchmarkRate} from '../../benchmarks/model';

export const AG_GRID_NAME = 'Benchmarks';
export interface IBenchmarkPracticeArea {
  benchmark_id: number;
  id: number;
  name: string;
  peers: Array<string>;
  rates: IBenchmarkRate;
}
export interface IAdminBenchmark {
  client: string;
  client_id: number;
  firm_id: number;
  firm: string;
  id: number;
  practice_areas: Array<IBenchmarkPracticeArea>;
  year: number;
}
