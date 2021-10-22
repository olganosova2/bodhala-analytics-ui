import {baseColumnChartOptions} from '../shared/models/base-chart';

export enum QbrType {
  YoY = 'YoY',
  QoQAdjacent = 'QoQAdjacent',
  QoQAnnual = 'QoQAnnual'
}
export interface IQbrMetric {
  label: string;
  direction: number;
  percent: number;
  amount: number;
  amountToCompare?: number;
  icon?: string;
  addInfo?: string;
}
export interface IQbrMetricRow {
  label: string;
  metrics: Array<IQbrMetric>;
}
export interface IQbrReport {
  id: 4;
  start_date: string;
  end_date: string;
  report_type: QbrType;
  created_by: number;
  created_on: string;
  title: string;
  status: string;
  filters: {
    name: string;
    filters: Array<any>;
  };
  querystring: any;
  chosen_metrics: any;
}
export interface IPayloadDates {
   startDate: string;
   endDate: string;
   comparisonStartDate: string;
   comparisonEndDate: string;
}
export interface IPayloadQuarterDates {
  firstQuarter: string;
  secondQuarter: string;
  thirdQuarter: string;
  fourthQuarter: string;
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
      colors: ['#00D1FF', '#FF632C',  '#FFC327', '#cccccc'],
      dataLabels: {
        enabled: true,
        color: 'black',
        format: '<b>{point.percentage:.0f} %</b>',
        distance: -50,
        style: {
          fontSize: 18,
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

const metricsColumnESOptions = {
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
      colors: [ '#FFC327', '#000000', '#00D1FF', '#FF650F'],
      dataLabels: {
        enabled: false
      },
      showInLegend: true,
      borderRadiusTopLeft: '50%',
      borderRadiusTopRight: '50%'
    }
  },
  xAxis: [{
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
    name: 'Current',
    colorByPoint: true,
    data: []
  },
    {
      name: 'Previous',
      colorByPoint: true,
      data: []
    }]
};

const metricsColumnOptions = {
  chart: {
    type: 'column',
    spacingTop: 10,
    width: 800,
    height: 380,
  },
  legend: {
    show: false,
    enabled: false
  },
  plotOptions: {
    column: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: false
      },
      showInLegend: true,
      borderRadiusTopLeft: '50%',
      borderRadiusTopRight: '50%'
    }
  },
  xAxis: [{
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
    name: 'Current',
    colorByPoint: true,
    color: '#FFC327',
    data: []
  },
    {
      name: 'Previous',
      colorByPoint: true,
      color: '#000000',
      data: []
    }]
};

export interface IReport {
  id: number;
  bh_client_id: number;
  report_type: string;
  status: string;
  title: string;
  filters: JSON;
  chosen_metrics: JSON;
}

export const metricsRightChartESOptions = {...baseColumnChartOptions, ...metricsColumnESOptions};
export const metricsRightChartOptions = {...baseColumnChartOptions, ...metricsColumnOptions};
