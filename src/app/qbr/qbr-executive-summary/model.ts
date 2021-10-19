import {qbrPieChartOptions} from '../qbr-model';
import {baseColumnChartOptions} from '../../shared/models/base-chart';

const chartSize = 310;
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



