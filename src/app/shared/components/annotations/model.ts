export interface IUiAnnotation {
  id: number;
  client_id: number;
  user_id: number;
  url: string;
  ui_id: string;
  notes: string;
  is_public: boolean;
  json_config: any;
  deleted_on: string;
  deleted_by: string;
  created_on?: string;
  created_by?: string;
  modified_on?: string;
  modified_by?: string;
  editMode?: boolean;
  first_name?: string;
  last_name?: string;
}
