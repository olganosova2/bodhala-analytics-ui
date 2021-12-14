export const MOCK_INSIGHT_TEXT = 'Enim aliquet odio ipsum risus dictum nisl id amet, interdum. Convallis neque accumsan sapien tellus lobortis mauris. Suscipit elit commodo nunc, aliquet eu, accumsan, egestas diam egestas. Magna vestibulum ultrices leo quisque tellus vel. Sed cursus ut vel viverra diam ornare posuere phasellus.<br/><br/>Ultrices ut blandit in suspendisse duis ullamcorper urna, arcu, ornare. Vel tortor laoreet tincidunt venenatis. Habit ant at vitae pretium in praesent volutpat. Orci velit nunc, vel id sit quis suscipit non. Sapien sed massa lectus a augue amet, sollicitudin viverra. Lobortis euismod tempus hendrerit consequat pellentesque semper id elementum, arcu. Et potenti in interdum tincidunt. ';

export interface IMatterExecSummary {
  matter_name: string;
  total_billed: number;
  total_hours_billed: number;
  partner_billed: number;
  associate_billed: number;
  other_billed: number;
  partner_hours: number;
  associate_hours: number;
  avg_partner_rate: number;
  avg_associate_rate: number;
}
export interface IMatterTotalsMetric {
 label: string;
 amount: number;
 increase?: number;
 direction?: number;
 format?: string;
 icon?: string;
}
export interface IMatterTotalsPanel {
  titleMetric: IMatterTotalsMetric;
  subMetrics: Array<IMatterTotalsMetric>;
}
export interface IMatterDocument {
  client_matter_id: string;
  canonical: string;
  category: string;
  entity_type: string;
  total_cost: number;
  total_hours: number;
  avg_rate: number;
  partners: number;
  associates: number;
  partner_hours: number;
  tk_id: string;
  first_name: string;
  last_name: string;
  bh_classification: string;
  tk_total_cost: number;
  tk_total_hours: number;
  tk_avg_rate: number;
  tk_level: Array<string>;
  partner_id: string;
  partner_first_name: string;
  partner_last_name: string;
  partner_total_cost: number;
  partner_total_hours: number;
  partner_avg_rate: number;
  total_doc_cost_all: number;
  total_doc_hours_all: number;
}
