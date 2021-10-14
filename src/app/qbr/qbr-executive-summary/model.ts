import {qbrPieChartOptions} from '../qbr-model';
import {baseColumnChartOptions} from '../../shared/models/base-chart';

const chartSize = 270;
const columnChartSize =  300;
const executiveSummaryAdditionalOptions = {
  chart: {
    height: chartSize,
    width: chartSize,
    type: 'pie',
    marginLeft: null,
    spacingTop: 10
  },
  tooltip : { enabled: false },
  series: [{
    name: 'Executive Summary',
    colorByPoint: true,
    data: []
  }]
};
export const executiveSummaryChartOptions = { ... qbrPieChartOptions, ... executiveSummaryAdditionalOptions };

const chartRightOptions = {
  tooltip : {
    enabled: false
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

export const metricsRightChartOptions = {...baseColumnChartOptions, ...chartRightOptions};

