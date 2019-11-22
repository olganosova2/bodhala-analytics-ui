export interface ITopMatter {
  id: string;
  name: string;
  client_matter_type: string;
  total_spend: number;
  total_expenses: number;
  lead_partner_name: string | Array<string>;
  bio_image_url: string | Array<string>;
  multiple_partners?: string;
}
