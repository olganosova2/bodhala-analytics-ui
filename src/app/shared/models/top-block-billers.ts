import { baseColumnChartOptions } from './base-chart';

const tooltipTemplate = `
<div class="highcharts-tooltip">
<div class="mb10 font-bold">
  {point.law_firm}
</div>
<div>Spend</div>
<div class="mb10">\${point.y:,.0f}</div>
<div>% of Total Spend</div>
<div class="mb10">{point.percent:.2f}%</div>`;

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
    outside: true,
    positioner: (labelWidth, labelHeight, point) => {
      const tooltipX = point.plotX;
      const tooltipY = point.plotY + 100;
      return {
          x: tooltipX,
          y: tooltipY
      };
    }
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
export const blockBillerChart = { ...baseColumnChartOptions, ...chartOptions };


