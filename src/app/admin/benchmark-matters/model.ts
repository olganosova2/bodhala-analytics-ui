export interface IMatterBmConfig {
  matters: Array<string>;
}

export interface IBmMatters {
  total_billed: number;
  total_expenses: number;
  total_hours_billed: number;
  client_matter_id: string;
  matter_name: string;
  bh_lawfirm_id: number;
  firm_name: string;
  client_matter_type?: string;
  smart_pa: string;
}
export enum IBmSetupType {
  AllMatters = 'AllMatters',
  SelectedMatters = 'SelectedMatters'
}

export const defaultBmMatterJson =  { matters: []};

// const generalConfigMapping = [
//   056130-0000060 056130-0000067  056130-0000069 056130-0000087 056130-0000207
