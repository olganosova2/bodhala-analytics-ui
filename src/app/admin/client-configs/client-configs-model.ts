export interface IEntityConfig {
  id: number;
  org_id?: number;
  client_id?: number;
  user_id?: number;
  description: string;
  name: string;
  value: number;
  json_config: string;
  json_config_parsed?: string;
  created_by?: string;
  created_on?: string;
  deleted_by?: string;
  deleted_on?: string;
  modified_by?: string;
  modified_on?: string;
}
