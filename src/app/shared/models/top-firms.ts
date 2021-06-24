import {basePieChartOptions} from './base-chart';

export interface ITopFirm {
  id: string;
  firm_name: string;
  firm_logo_url: string;
  total_billed: number;
  total_afa_closed: number;
  total_expenses: number;
  total_billed_all: number;
  total_expenses_all: number;
  total_matters: number;
  total_percent: number;
  name: string;
  y: number;
}
const firmAdditionalOptions = {
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
      '<div>% of Total Spend</div>' +
      '<div class="mb10">{point.total_percent:.2f}%</div>'
  },
  series: [{
    name: 'Top Firms',
    colorByPoint: true,
    data: []
  }]
};
export const firmsChartOptions = { ... basePieChartOptions, ... firmAdditionalOptions };


