import {baseColumnChartOptions} from './base-chart';

export interface IActiveSpendRecord {
  total_spend: number;
  total_expenses: number;
  month: string;
  y: number;
}
export interface IActiveSpend {
  data: Array<IActiveSpendRecord>;
  total_spend: number;
  active_spend?: number;
  total_expenses: number;
  percent?: number;
}
export const additionalActiveSpendOptions = {
  chart: {
    type: 'column',
    height: 320
  },
  xAxis: {
    type: 'category',
    labels: {
      rotation: -45,
      style: {
        fontSize: '11px'
      }
    },
    title: {
      text: 'Date'
    }
  },
  yAxis: {
    min: 0,
    title: {
      text: '$ (dollars)'
    }
  },
  legend: {
    enabled: false
  },
  tooltip: {
    pointFormat: '<b class="mb10">${point.y:,.0f}</b>'
  },
  series: [{
    name: 'Active Spend',
    data: []
  }]
};
export const activeSpendChart = { ...baseColumnChartOptions, ...additionalActiveSpendOptions };


