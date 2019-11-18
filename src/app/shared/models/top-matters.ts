export interface ITopMatter {
  id: string;
  name: string;
  client_matter_type: string;
  total_spend: number;
  total_expenses: number;
  hours: number;
  days_since: number;
  matter_closedate: string;
  lead_partner_id: string;
  lead_partner_name: string;
  bio_image_url?: string;
}
