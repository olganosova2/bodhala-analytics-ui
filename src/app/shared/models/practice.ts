import {basePieChartOptions} from './base-chart';

export interface IPractice {
  name: string;
  firm_id: number;
  firm_name: string;
  firm_total: number;
  matter_id: string;
  matter_name: string;
  matter_total: number;
  practice_area: string;
  total_billed: number;
  total_expenses: number;
  y: number;
}

const practiceAdditionalOptions = {
  tooltip : {
    useHTML: true,
    shared: true,
    backgroundColor: 'white',
    headerFormat: null,
    padding: 0,
    pointFormat: '<div class="highcharts-tooltip">' +
      '<div class="mb10">{point.practice_area}</div>' +
      '<div>Spend</div>' +
      '<div class="mb10">${point.total_billed:,.0f}</div>' +
      '<div>Top Firm</div>' +
      '<div class="mb10">{point.firm_name}</div>' +
      '<div>Top Matter</div>' +
      '<div class="mb10">{point.matter_name}</div></div>'
    },
    series: [{
      name: 'Practice Areas',
      colorByPoint: true,
      data: []
    }]
};
export const practicePieChartOptions = { ... basePieChartOptions, ... practiceAdditionalOptions };

