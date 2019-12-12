import { baseColumnChartOptions } from './base-chart';

export interface ITopAverageMatter {
  firm_id: number;
  matter_id: string;
  firm_name: string;
  matter_name: string;
  timekeeper_name: string;
  blended_rate: number;
  // graph
  category?: string;
  y?: number;
}

const tooltipTemplate = `
  <div class="highcharts-tooltip">
    <div class="mb10 font-bold">{point.firm_name}</div>
    <div>Matter</div>
    <div class="mb10">{point.matter_name}</div>
    <div>Blended Rate</div>
    <div class="mb10">\${point.blended_rate:.2f}</div>
  </div>`;

const chartOptions = {
  chart: {
    type: 'column',
    spacingTop: 10,
    spacingLeft: 15,
    reflow: true,
    width: null,
    height: 320
  },
  tooltip : {
    useHTML: true,
    shared: true,
    backgroundColor: 'white',
    headerFormat: null,
    padding: 0,
    pointFormat: tooltipTemplate,
    outside: true
  },
  legend: {
    show: false,
    enabled: false
  },
  xAxis: [{
    title: {
      enabled: false,
      text: undefined
    }
  }],
  yAxis: [{
    title: {
      enabled: false,
      text: undefined
    }
  }],
  series: [{
    name: null,
    colorByPoint: true,
    data: []
  }]
};

export const mattersByHighestAverageRateChartOptions = {...baseColumnChartOptions, ...chartOptions};
