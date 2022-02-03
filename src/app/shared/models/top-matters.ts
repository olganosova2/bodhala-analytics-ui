import {basePieChartOptions} from './base-chart';

export interface ITopMatter {
  id: string;
  name: string;
  client_matter_type: string;
  total_spend: number;
  total_expenses: number;
  total_afa: number;
  lead_partner_id: string | Array<string>;
  lead_partner_name: string | Array<string>;
  lawfirm_id: string | Array<string>;
  bio_image_url: string | Array<string>;
  multiple_partners?: string;
  y: number;
  sum?: number;
  link_name: string;
}
const matterAdditionalOptions = {
  tooltip : {
    useHTML: true,
    shared: true,
    backgroundColor: 'white',
    headerFormat: null,
    padding: 0,
    pointFormat: '<div class="highcharts-tooltip">' +
      '<div class="mb10 font-bold">{point.name}</div>' +
      '<div>Spend</div>' +
      '<div class="mb10">${point.y:,.0f}</div>' +
      '<div>Lead Partner</div>' +
      '<div class="mb10">{point.lead_partner_name}</div>' +
      '<div>Practice Area</div>' +
      '<div class="mb10">{point.client_matter_type}</div></div>'
  },
  series: [{
    name: 'Top Matters',
    colorByPoint: true,
    data: []
  }]
};
export const mattersChartOptions = { ... basePieChartOptions, ... matterAdditionalOptions };
