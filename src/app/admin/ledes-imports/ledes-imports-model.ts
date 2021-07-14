export interface ILedesImport {
  id: number;
  client_id?: number;
  client_name?: string
  firms?: number[];
  firm_names?: string[];
  data?: any[];
  name: string;
  value?: any;
  num_failed_uploads?: number;
  num_imported_uploads?: number;
  num_failed_ingests?: number;
  num_imported_ingests?: number;
  created_by?: string;
  created_on?: string;
  deleted_by?: string;
  deleted_on?: string;
  modified_by?: string;
  modified_on?: string;
}
