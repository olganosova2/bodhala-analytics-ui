import { Injectable } from '@angular/core';

export enum IClientPA {
  client = 'Client Practice Areas',
  smart = 'Smart Practice Areas'
}
export interface ICirpMatterSummary {
  client_matter_type: string;
  smart_pa: string;
  client_matter_id: string;
  matter_name: string;
  line_item_date: string;
  total: number;
  expenses: number;
}
export interface ISpecialty {
  id: number;
  value: string;
  is_primary: boolean;
}
export interface ICirpTimekeeper {
  id: string;
  name: string;
  seniority: string;
  bio_image_url: string;
  profile_uuid: string;
  firm: string;
  lawfirm_id: number;
  total: number;
  total_billed: number;
  atty_billed: number;
  atty_hours: number;
  total_afa: number;
  current_rate: number;
  total_hours_billed: number;
  total_block_billed: number;
  block_billing_percent: number;
  effective_rate: number;
  last_of_month: number;
  total_matters: number;
  closed_matters: number;
  matter_cost_closed: number;
  total_afa_closed: number;
  spend_percent?: number;
  specialty: Array<ISpecialty>;
}
@Injectable({
  providedIn: 'root'
})
export class CirpService {

  constructor() { }
}
