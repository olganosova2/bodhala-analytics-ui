export interface IEntityConfig {
  id: number;
  org_id?: number;
  client_id?: number;
  client_name?: string;
  user_id?: number;
  email?: string;
  user_name?: string;
  description: string;
  name: string;
  value?: any;
  json_config?: any;
  json_config_parsed?: string;
  created_by?: string;
  created_on?: string;
  deleted_by?: string;
  deleted_on?: string;
  modified_by?: string;
  modified_on?: string;
}
