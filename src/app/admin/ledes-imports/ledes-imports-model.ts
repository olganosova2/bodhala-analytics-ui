export interface ILedesImport {
  id: number;
  client_id?: number;
  client_name?: string
  firms?: number[];
  firm_names?: string[];
  name: string;
  value?: any;
  num_failed?: number;
  num_imported?: number;
  created_by?: string;
  created_on?: string;
  deleted_by?: string;
  deleted_on?: string;
  modified_by?: string;
  modified_on?: string;
}
