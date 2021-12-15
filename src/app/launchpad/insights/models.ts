export enum IInsightType {
  BB = 'BB',
  BPI = 'BPI',
  IQ = 'IQ'
}
export interface IInsight {
  id: number;
  client_id: any;
  insight_type: string;
  title: string;
  description: string;
  client_matter_id?: string;
  is_enabled: boolean;
  created_on: string;
  created_by: string;
  modified_on: string;
  modified_by: string;
  deleted_on: string;
  deleted_by: string;
}
