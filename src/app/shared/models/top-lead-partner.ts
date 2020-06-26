import {basePieChartOptions} from './base-chart';
import { NumberFilter } from 'ag-grid-community';

export interface ITopLeadPartner {
  id: string;
  name: string;
  img_url: string;
  seniority: string;
  total_billed: number;
  total_expenses: number;
  firm_id: number;
  firm: string;
  total_matters: number;
  top_practice: string;
  top_matter_id: string;
  top_matter_name: string;
  top_matter_total: number;
  top_matter: {
    id: string;
    name: string;
    total_billed: number;
  };
  y: number;
}

const leadPartnerAdditionalOptions = {
  tooltip : {
    useHTML: true,
    shared: true,
    backgroundColor: 'white',
    headerFormat: null,
    padding: 0,
    pointFormat: '<div class="highcharts-tooltip">' +
      '<div class="mb10">{point.name}</div>' +
      '<div>Spend</div>' +
      '<div class="mb10">${point.total_billed:,.0f}</div>' +
      '<div>Practice Area</div>' +
      '<div class="mb10">{point.top_practice}</div></div>'
    },
    series: [{
      name: 'Top Lead Partners',
      colorByPoint: true,
      data: []
    }]
};
export const leadPartnerChartOptions = { ... basePieChartOptions, ... leadPartnerAdditionalOptions };

