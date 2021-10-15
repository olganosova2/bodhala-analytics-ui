
export interface IReport {
  id: number;
  bh_client_id: number;
  report_type: string;
  status: string;
  title: string;
  filters: JSON;
  chosen_metrics: JSON;
}
