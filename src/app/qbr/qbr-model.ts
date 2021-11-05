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
  keyTrendsLabel?: string;
  format?: string;
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
  modified_on?: string;
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
  filters: any;
  chosen_metrics: any;
  start_date?: string;
  end_date?: string;
  created_by?: string;
  created_on?: string;
  querystring?: any;
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
export interface IChoosenMetrics {
  total_spend: boolean;
  partner_hourly_cost: boolean;
  associate_hourly_cost: boolean;
  block_billing_percent: boolean;
  partner_hours_percent: boolean;
  associate_hours_percent: boolean;
  blended_rate: boolean;
  bodhala_price_index: boolean;
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


export const metricsRightChartOptions = {...baseColumnChartOptions, ...metricsColumnOptions};
export const metricsRightChartESOptions = {...baseColumnChartOptions, ...metricsColumnESOptions};
export const metricsBBPasChartOptions =  {...baseColumnChartOptions, ...metricsBBOptions};
export const tkHoursPasChartOptions = { ... qbrPieChartOptions, ... tkHoursPasAdditionalOptions};
export const matterChartOptions = { ... qbrPieChartOptions, ... matterChartsAdditionalOptions};
// matterChartsAdditionalOptions


export const recommendationPlaceholderMapping = {
  'Increase Discounts': {
    id: 1,
    opportunity_placeholder: 'Obtain greater relationship and practice area discounts to reduce net effective rates.',
    why_it_matters_placeholder: 'All firms are willing to negotiate discounts based on relationship, practice area or volume and these discounts can be highly impactful for managing legal spend.',
    action_placeholder: '1. Evaluate current discount and ask for increase\n 2. ensure firms are required to obtain agreement before attempting to increase rates or decrease discounts'
  },
  'Prevent Rate Increases': {
    id: 2,
    opportunity_placeholder: 'Freeze billing rates YoY or hold down rate increases to below 2-3%',
    why_it_matters_placeholder: 'Holding down rate increases is an essential tool to reduce legal fees and ensure you\'re paying appropriate rates to your firms',
    action_placeholder: '1. Review net effective rates YoY\n2. Identify any proposed or actual rate increases\n3. Negotiate with firms top prevent rate increases'
  },
  'Associate Work Allocation': {
    id: 3,
    opportunity_placeholder: 'Client should aim to increase or maintain associate work allocation at 60 percent or more of all attorney hours.',
    why_it_matters_placeholder: 'Allocating work to associates reduces costs and associates are the appropriate attorney level for most attorney work, save for complex/strategic work warranting partner involvement',
    action_placeholder: '1. Evaluate associate percentage of hours worked \n2. Ensure associates are doing work you consider to be routine or straightforward \n3. Communicate expectations to [ Firm ] '
  },
  'Partner Work Allocation': {
    id: 4,
    opportunity_placeholder: 'Client should aim to decrease high partner percentage of work on matters at [Firms] to ensure the lowest cost timekeeper qualified is performing the work.',
    why_it_matters_placeholder: 'There is significant savings to be achieved when partners push the work down to their associate colleagues.',
    action_placeholder: '1. Evaluate partner percentage of hours worked \n2. Ensure partner percentage is kept below 40% and aim to keep patner work on matters at [Firms] to ensure the lowest cost timekeeper qualified is performing the work \n3. Communicate expectations to [ Firm ]'
  },
  'Decrease Block Billing': {
    id: 5,
    opportunity_placeholder: '',
    why_it_matters_placeholder: 'Limiting block billing practices results in more accurate timekeeping and reduces inflationary billing practices.',
    action_placeholder: '1. Review percentage of block billing \n2. Pay [ Firm ] a reduced amount for block billed work \n3. Communicate to firms the requirement that block billing above 20% of time is not acceptable.'
  },
  'Shift Work to Other Firms': {
    id: 6,
    opportunity_placeholder: 'Significant savings are available when comparing the efficiency of your firms and moving work to more cost-effective firms.',
    why_it_matters_placeholder: 'While focus on rates and work allocation can be effective, firm selection offers even greater savings opportunities.',
    action_placeholder: '1. Identify lower-cost firms who can take on more work\n2. Provide work, where appropriate, to best available lower-cost firms, instead of higher-cost firms'
  },
  'Custom Recommendation': {
    id: 7,
    opportunity_placeholder: '',
    why_it_matters_placeholder: '',
    action_placeholder: ''
  }
};

export const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0
});
export const formatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 1,
  minimumFractionDigits: 1
});


export const DEFAULT_CHOSEN_METRICS = {
  partner_hourly_cost: true,
  associate_hourly_cost: true,
  total_spend: true,
  partner_hours_percent: true,
  associate_hours_percent: true,
  block_billing_percent: true,
  blended_rate: false,
  bodhala_price_index: false
};

