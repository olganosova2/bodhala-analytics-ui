import { baseColumnChartOptions } from './base-chart';

export interface IBlockBillingTimekeeper {
  timekeeper_id: string;
  name: string;
  total_billed: number;
  total_block_billed: number;
}

export interface IBlockBillingFirms {
  law_firm_id: string;
  law_firm: string;
  total_billed: number;
  total_block_billed: number;
  total_billed_by_lawyers: number;
  pct_block_billed: number;
  lead_partners: Array<IBlockBillingTimekeeper>;
  name: string;
  y: number;
}



const tooltipTemplate = `
<div class="highcharts-tooltip">
<div class="mb10 font-bold">
  {point.law_firm}
</div>
<div>Spend</div>
<div class="mb10">\${point.value:,.0f}</div>
<div>% of Total Spend</div>
<div class="mb10">{point.percent:.2f}%</div>`;

const chartOptions = {
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
    },
    labels: {
      /* tslint:disable */
      formatter: function() {
        return this.value + '%';
      }
    }
  }],
  series: [{
    name: null,
    colorByPoint: true,
    data: []
  }]
};
export const blockBillerChart = { ...baseColumnChartOptions, ...chartOptions };


