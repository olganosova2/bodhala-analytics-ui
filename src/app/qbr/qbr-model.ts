import {baseColumnChartOptions} from '../shared/models/base-chart';

export interface IQbrMetric {
  label: string;
  directionQoQ: number;
  directionYoY: number;
  percentQoQ: number;
  percentYoY: number;
  amount: number;
  amountToCompare?: number;
  icon?: string;
}
export interface IQbrReport {
  id: 4;
  start_date: string;
  end_date: string;
  report_type: string;
  created_by: number;
  created_on: string;
  title: string;
  status: string;
  filters: {
    name: string;
    filters: Array<any>;
  };
  chosen_metrics: any;
}

export const qbrPieChartOptions = {
  chart: {
    height: 290,
    width: null,
    type: 'pie',
    marginLeft: null,
    spacingTop: 10
  },
  credits: {
    enabled: false
  },
  title: {text: null},
  plotOptions: {
    pie: {
      colors: ['#FF632C', '#00D1FF', '#cccccc'],
      dataLabels: {
        enabled: true,
        color: 'black',
        format: '<b>{point.percentage:.0f} %</b>',
        distance: -50,
        style: {
          fontSize: 20,
          textOutline: false
        }
      }
    },
    series: {}
  },
  legend: {
    enabled: false
  }
};

const metricsColumnRightOptions = {
  chart: {
    type: 'column',
    spacingTop: 10,
    width: 800,
    height: 460,
  },
  legend: {
    show: false,
    enabled: false
  },
  plotOptions: {
    column: {
      allowPointSelect: true,
      cursor: 'pointer',
      colors: ['#FF650F', '#FFC327', '#000000', '#00D1FF'],
      dataLabels: {
        enabled: false
      },
      showInLegend: true,
      borderRadiusTopLeft: '50%',
      borderRadiusTopRight: '50%'
    }
  },
  xAxis: [{
    // title: {
    //   enabled: false,
    //   text: undefined
    // },
    labels: {
      enabled: false
    }
  }],
  yAxis: [{
    title: {
      enabled: false,
      text: undefined
    }
  }],
  tooltip: {
    headerFormat: null,
    pointFormat: '{series.name}: <b>${point.y:,.0f}</b><br/>',
  },
  series: [{
    name: 'Last',
    colorByPoint: true,
    data: []
  },
    {
      name: 'Previous',
      colorByPoint: true,
      data: []
    }]
};

export const metricsRightChartOptions = {...baseColumnChartOptions, ...metricsColumnRightOptions};
