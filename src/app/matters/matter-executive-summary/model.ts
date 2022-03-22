import {baseColumnChartOptions} from '../../shared/models/base-chart';
const groupDistance = window.screen.width > 1440 ? 0.4 : window.screen.width > 1200 ? 0.35 : 0.25;

export const HARDCODED_MATTER_ID = '061439-00107'; // '056130-0000274'; // '149945'; //   '061439-10014'; //   '373046-00021'; // '10001320'; 056130-0000087
export const RECORDS_NUMBER_THRESHOLD = 2;

export enum MetricCardType {
  AverageRates = 'AverageRates',
  PercentOfHoursWorked = 'PercentOfHoursWorked',
  TotalHoursWorked = 'TotalHoursWorked',
  TotalSpend = 'TotalSpend',
  AverageTkOnMatter = 'AverageTkOnMatter'
}

export enum MetricGrade {
  GOOD = 'GOOD',
  FAIR = 'FAIR',
  POOR = 'POOR',
  NODATA = 'NODATA',
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
  size?: number;
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
  partner_billed?: number;
  associate_billed?: number;
  avg_rate: number;
  partners: number;
  associates: number;
  partner_hours: number;
  associate_hours?: number;
  tk_id: string;
  first_name: string;
  last_name: string;
  bh_classification: string;
  tk_total_cost: number;
  tk_total_hours: number;
  tk_avg_rate: number;
  tk_level: Array<string>;
  partner_id?: string;
  partner_first_name?: string;
  partner_last_name?: string;
  partner_total_cost?: number;
  partner_total_hours?: number;
  partner_avg_rate?: number;
  total_doc_cost_all?: number;
  total_doc_hours_all?: number;
  index?: number;
  // blended_rate?: number;
  // percent_partner_hours?: number;
  // percent_associate_hours?: number;
  // percent_other_hours?: number;
  cost_rating?: IMetricDisplayData;
  rates_rating?: IMetricDisplayData;
  staffing_rating?: IMetricDisplayData;
  hasEnoughData?: boolean;
}
export interface IMatterMarketDocument {
  bh_client_id: number;
  client_matter_id: string;
  entity: string;
  category: string;
  entity_type: string;
  total_billed: number;
  partner_billed: number;
  associate_billed: number;
  other_billed: number;
  total_hours_billed: number;
  partner_hours: number;
  associate_hours: number;
  other_hours: number;
  avg_partner_rate: number;
  avg_associate_rate: number;
  avg_other_rate: number;
  avg_rate: number;
  ade_avg_rate: number;
  blended_rate?: number;
}
export interface IMarketDocumentData {
  index: number;
  market_data: Array<IMatterMarketDocument>;
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
export interface ICustomInternalMatters {
  id: string;
  bh_client_id: number;
  client_matter_id: string;
  matters: Array<string>;
}
export interface IMatterWithNames {
  client_matter_id: string;
  matter_name: string;
  total?: number;
  expenses?: number;
  total_with_expenses?: number;
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
          }
        }
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '${point.y:,.0f}'
      },
    }
  };

export const documentsRatesOptions =
  {
    ...currencyAxisChartOptions, ...{
      plotOptions: {
        column: {
          borderWidth: 0,
          borderRadiusTopLeft: '50%',
          borderRadiusTopRight: '50%'
        },
        series: {
          pointWidth: 20,
          groupPadding: groupDistance / 1.2
        }
      }

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
