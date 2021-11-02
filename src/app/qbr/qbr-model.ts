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
  matterName?: string;
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
export interface IReport {
  id: number;
  bh_client_id: number;
  report_type: string;
  status: string;
  title: string;
  filters: JSON;
  chosen_metrics: JSON;
  start_date?: string;
  end_date?: string;
  created_by?: string;
  created_on?: string;
  querystring?: JSON;
}
export interface IQbrDashboard {
  id: number;
  reportPeriod: string;
  comparisonPeriod: string;
  qbrType: string;
  created_on: string;
  practiceAreas: Array<string>;
  firms: Array<string>;
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
        // format: '<b>{point.percentage:.0f} %</b>',
        formatter() {
          let per = this.percentage;
          if (per > 5) {
            per = Math.round(per );
            return  per + '%';
          }
          return null;
        },
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
const tkHoursPasAdditionalOptions = {
  chart: {
    height: 200,
    width: 200,
    type: 'pie',
    marginLeft: null,
    spacingTop: 0,
    spacingBottom: 0,
    marginRight: 0,
    spacingLeft: 0,
    spacingRight: 0,
  },
  plotOptions: {
    pie: {
      pie: {
        size: '100%'
      },
      colors: ['#00D1FF', '#FF632C', '#cccccc'],
      dataLabels: {
        enabled: true,
        color: 'black',
        // format: '<b>{point.percentage:.0f} %</b>',
        formatter() {
          let per = this.percentage;
          if (per > 5) {
            per = Math.round(per );
            return  per + '%';
          }
          return null;
        },
        distance: -25,
        style: {
          fontSize: 12,
          textOutline: false
        }
      }
    },
    series: {}
  },
  tooltip : { enabled: false },
  series: [{
    name: 'Timekeeper Hours',
    colorByPoint: true,
    data: []
  }]
};
const matterChartsAdditionalOptions = {
  chart: {
    height: 310,
    width: 310,
    type: 'pie',
    marginLeft: null,
    spacingTop: 20
  },
  tooltip : { enabled: false },
  series: [{
    name: 'Top Matter',
    colorByPoint: true,
    data: []
  }]
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
    labels: {
      style: {
        fontSize: '16px',
        color: '#8A8A8A'
      },
      format: '${value}' // The $ is literally a dollar unit
    },
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
    name: 'Previous',
    colorByPoint: true,
    data: []
  },
    {
      name: 'Current',
      colorByPoint: true,
      data: []
    }]
};

const metricsColumnOptions = {
  chart: {
    type: 'column',
    spacingTop: 10,
    width: 800,
    height: 420,
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
    },
    series: {
      pointWidth: 25,
      groupPadding: 0.3
    }
  },
  xAxis: [{
    labels: {
      enabled: false
    }
  }],
  yAxis: [{
    labels: {
      style: {
        fontSize: '16px',
        color: '#8A8A8A'
      },
      format: '${value}' // The $ is literally a dollar unit
    },
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
    type: 'column',
    name: 'Current',
    color: '#FFC327',
    data: []
  },
    {
      type: 'column',
      name: 'Previous',
      color: '#000000',
      data: []
    }]
};

const metricsBBOptions = {
  chart: {
    type: 'column',
    spacingTop: 10,
    width: 300,
    height: 360,
  },
  legend: {
    symbolHeight: 12,
    symbolWidth: 12,
    symbolRadius: 6,
    align: 'center'
  },
  plotOptions: {
    column: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        crop: false,
        overflow: 'none',
        style: {
          fontSize: '20px'
        },
        pointFormat: '{point.y:,.0f}%'
      },
      showInLegend: true,
      borderRadiusTopLeft: '50%',
      borderRadiusTopRight: '50%'
    },
    series: {
      pointWidth: 40,
      groupPadding: 0.2
    }
  },
  xAxis: [{
    labels: {
      enabled: false
    }
  }],
  yAxis: [{
    max: 50,
    labels: {
      style: {
        fontSize: '12px',
        color: '#8A8A8A'
      },
      format: '{value}%' // The $ is literally a dollar unit
    },
    title: {
      enabled: false,
      text: undefined
    }
  }],
  tooltip: {
    headerFormat: null,
    pointFormat: '{series.name}: <b>{point.y:,.0f}%</b><br/>',
  },
  series: [{
    color: '#FFC327',
    data: []
  },
    {
      color: '#000000',
      data: []
    }]
};

export const metricsRightChartESOptions = {...baseColumnChartOptions, ...metricsColumnESOptions};
export const metricsRightChartOptions =  {...baseColumnChartOptions, ...metricsColumnOptions};
export const metricsBBPasChartOptions =  {...baseColumnChartOptions, ...metricsBBOptions};
export const tkHoursPasChartOptions = { ... qbrPieChartOptions, ... tkHoursPasAdditionalOptions};
export const matterChartOptions = { ... qbrPieChartOptions, ... matterChartsAdditionalOptions};
// matterChartsAdditionalOptions
