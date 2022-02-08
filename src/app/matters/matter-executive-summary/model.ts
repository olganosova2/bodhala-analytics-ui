import {baseColumnChartOptions} from '../../shared/models/base-chart';
import * as Highcharts from 'highcharts';
const groupDistance = window.screen.width > 1440 ? 0.4 : window.screen.width > 1200 ? 0.35 : 0.25;

export const HARDCODED_MATTER_ID = '087260/834'; //  '100340'; // '087260/818'; // '373046-00021'; // '10001320';
export const HARDCODED_MARKET_MATTERS = [
  '087260/785',
  '087260/818',
  '087260/843',
  '087260/101*',
  '087260/729',
  '087260/809',
  '087260/816',
  '087260/834',
  '087260/821',
  '087260/844'
];

export enum MetricCardType {
  TotalSpend = 'TotalSpend',
  AverageRates = 'AverageRates',
  TotalHoursWorked = 'TotalHoursWorked',
  PercentOfHoursWorked = 'PercentOfHoursWorked',
  AverageTkOnMatter = 'AverageTkOnMatter'
}

export enum MetricGrade {
  GOOD = 'GOOD',
  FAIR = 'FAIR',
  POOR = 'POOR',
}

export interface IMatterExecSummary {
  matter_name?: string;
  client_matter_id?: string;
  total_billed?: number;
  total_expenses?: number;
  total_hours_billed?: number;
  partner_billed?: number;
  partner_writeoff?: number;
  associate_billed?: number;
  associate_writeoff?: number;
  other_billed?: number;
  partner_hours?: number;
  partner_writeoff_hours?: number;
  associate_hours?: number;
  associate_writeoff_hours?: number;
  other_hours?: number;
  avg_partner_rate?: number;
  avg_associate_rate?: number;
  avg_other_rate?: number;
  timekeepers?: number;
  partners?: number;
  associates?: number;
  others?: number;
  blended_rate?: number;
  percent_partner_hours?: number;
  percent_associate_hours?: number;
  percent_other_hours?: number;
}

export interface IMatterTotalsMetric {
  label: string;
  amount: number;
  increase?: number;
  direction?: number;
  format?: string;
  icon?: string;
}

export interface IMatterTotalsPanel {
  titleMetric: IMatterTotalsMetric;
  subMetrics: Array<IMatterTotalsMetric>;
}

export interface IMatterDocument {
  client_matter_id: string;
  canonical: string;
  category: string;
  entity_type: string;
  total_cost: number;
  total_hours: number;
  avg_rate: number;
  partners: number;
  associates: number;
  partner_hours: number;
  tk_id: string;
  first_name: string;
  last_name: string;
  bh_classification: string;
  tk_total_cost: number;
  tk_total_hours: number;
  tk_avg_rate: number;
  tk_level: Array<string>;
  partner_id: string;
  partner_first_name: string;
  partner_last_name: string;
  partner_total_cost: number;
  partner_total_hours: number;
  partner_avg_rate: number;
  total_doc_cost_all: number;
  total_doc_hours_all: number;
}

export interface IMetricDisplayData {
  metricType?: MetricCardType;
  fieldName?: string;
  chartLabel: string;
  tableLabel: string;
  actual: number;
  market: number;
  low?: number;
  high?: number;
  internal?: number;
  delta?: number;
  increase?: number;
  direction?: number;
  grade?: MetricGrade;
}
export interface IInternalMatter {
  sim_client_id;
  sim_matter_id;
}

export const matterColumnChartOptions = {
  chart: {
    type: 'column'
  },
  credits: {
    enabled: false
  },
  title: {
    text: null
  },
  subtitle: {
    text: null
  },
  xAxis: {
    categories: [],
    crosshair: true,
    labels: {
      style: {
        fontSize: '16px'
      }
    }
  },
  yAxis: {
    min: 0,
    title: {
      text: null
    }
  },
  legend: {
    align: 'right',
    verticalAlign: 'top',
    x: 0,
    y: 0
  },
  tooltip: {
    headerFormat: '<b>{series.name}</b><br>',
    pointFormat: '{point.y:,.0f}'
  },
  plotOptions: {
    column: {
      // pointPadding: 0.2,
      borderWidth: 0,
      borderRadiusTopLeft: '50%',
      borderRadiusTopRight: '50%'
    },
    series: {
      pointWidth: 20,
      groupPadding: groupDistance
    }
  },
  series: [{
    name: 'Actual',
    color: '#000000',
    data: []
  }, {
    name: 'Internal',
    color: '#FFC327',
    data: []
  }, {
    name: 'Market',
    color: '#00D1FF',
    data: []
  }]
};
export const currencyAxisChartOptions =
  {
    ...matterColumnChartOptions, ...{
      yAxis: {
        min: 0,
        title: {
          text: null
        },
        labels: {
          formatter() {
            const formatterInt = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            });
            return formatterInt.format(this.value);
            // if (this.value >= 1000000) {
            //   return formatterInt.format(this.value / 1000) + 'k';
            // } else {
            //   return formatterInt.format(this.value);
            // }

          }
        }
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '${point.y:,.0f}'
      },
    }
  };
export const barTkPercentOptions = {
  chart: {
    type: 'bar'
  },
  credits: {
    enabled: false
  },
  title: {
    text: null
  },
  xAxis: {
    categories: ['Actual', 'Internal', 'Market'],
    labels: {
      style: {
        fontSize: 16
      }
    }
  },
  yAxis: {
    min: 0,
    max: 100,
    tickInterval: 25,
    title: {
      text: null
    },
    labels: {
      format: '{value}%',
      style: {
        fontSize: 16
      }
    }
  },
  legend: {
    reversed: true,
    align: 'right',
    verticalAlign: 'top',
    x: 0,
    y: 0
  },
  plotOptions: {
    series: {
      stacking: 'normal',
      dataLabels: {
        enabled: true,
        // format: '{point.y:,.0f} %',
        formatter() {
          return (this.y !== 0) ? this.y + '%' : '';
        },
        style: {
          textOutline: 'none'
        }
      },
      pointWidth: 40,
      groupPadding: 0.1
    }
  },
  tooltip: {
    headerFormat: '<b>{series.name}</b><br>',
    pointFormat: '{point.y:,.0f}%'
  },
  series: [{
    name: 'Paralegal/Other',
    color: '#00D1FF',
    dataLabels: {
      color: 'black'
    },
    data: []
  }, {
    name: 'Associate',
    color: '#FFC907',
    data: []
  }, {
    name: 'Partner',
    color: '#000000',
    data: []
  }]
};






