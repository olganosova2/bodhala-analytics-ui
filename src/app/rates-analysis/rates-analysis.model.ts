export const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0
});

export const percentFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0
});

export interface IRateBenchmark {
  id: number;
  bh_client_id?: number;
  bh_lawfirm_id?: number;
  smart_practice_area: string;
  year: number;
  peers: Array<string>;
  created_by?: string;
  created_on?: string;
  deleted_by?: string;
  deleted_on?: string;
  modified_by?: string;
  modified_on?: string;
};

export const smartPracticeAreas = [
  {label: 'Banking & Credit', value: 'Banking & Credit'},
  {label: 'Bankruptcy', value: 'Bankruptcy'},
  {label: 'Capital Markets', value: 'Capital Markets'},
  {label: 'Energy', value: 'Energy'},
  {label: 'Funds', value: 'Funds'},
  {label: 'General/Other', value: 'General/Other'},
  {label: 'Health Care', value: 'Health Care'},
  {label: 'IP', value: 'IP'},
  {label: 'Labor & Employment', value: 'Labor & Employment'},
  {label: 'Litigation', value: 'Litigation'},
  {label: 'M&A', value: 'M&A'},
  {label: 'Real Estate', value: 'Real Estate'},
];

export const peerFirmMapping = {};

