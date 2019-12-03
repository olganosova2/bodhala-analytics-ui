import {basePieChartOptions} from './base-chart';

export interface IInvoiceIQ {
  id: number;
  name: string;
  report_name: string;
  total_billed: number;
  total_expenses: number;
  y: number;
}

const iiqAdditionalOptions = {
  tooltip : {
    useHTML: true,
    shared: true,
    backgroundColor: 'white',
    headerFormat: null,
    padding: 0,
    pointFormat: '<div class="highcharts-tooltip">' +
      '<div class="mb10">{point.report_name}</div>' +
      '<div>Spend</div>' +
      '<div class="mb10">${point.total_billed:,.0f}</div></div>'
    },
    series: [{
      name: 'Invoice IQ Report',
      colorByPoint: true,
      data: []
    }]
};
export const iqReportPieChartOptions = { ... basePieChartOptions, ... iiqAdditionalOptions };

