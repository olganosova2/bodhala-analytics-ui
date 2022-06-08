export const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0
});

export const percentFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0
});

export const formatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
  minimumFractionDigits: 0
});

export interface IRateBenchmark {
  id: number;
  bh_client_id?: number;
  bh_lawfirm_id?: number;
  smart_practice_area: string;
  year: number;
  peers: Array<string>;
  created_by?: string;
  created_on?: string;
  deleted_by?: string;
  deleted_on?: string;
  modified_by?: string;
  modified_on?: string;
}

export interface INamedTimekeepersRateBM {
  first_name: string;
  last_name: string;
  classification: string;
  grad_date: string;
  office_location: string;
  avg_effective_rate: number;
  avg_billed_rate: number;
  total_hours: number;
  total_billed: number;
  num_matters: number;
}

export const smartPracticeAreas = [
  {label: 'Banking & Credit', value: 'Banking & Credit'},
  {label: 'Bankruptcy', value: 'Bankruptcy'},
  {label: 'Capital Markets', value: 'Capital Markets'},
  {label: 'Energy', value: 'Energy'},
  {label: 'Funds', value: 'Funds'},
  {label: 'General/Other', value: 'General/Other'},
  {label: 'Health Care', value: 'Health Care'},
  {label: 'IP', value: 'IP'},
  {label: 'Labor & Employment', value: 'Labor & Employment'},
  {label: 'Litigation', value: 'Litigation'},
  {label: 'M&A', value: 'M&A'},
  {label: 'Real Estate', value: 'Real Estate'},
];

export const peerFirmMapping = [
  [
    'Skadden, Arps, Slate, Meagher & Flom',
    'Gibson, Dunn & Crutcher',
    'Sullivan & Cromwell',
    'Ropes & Gray',
    'Paul, Weiss, Rifkind, Wharton & Garrison',
    'Proskauer Rose'],
  [
    'DLA Piper',
    'Baker & McKenzie',
    'Latham & Watkins',
    'Kirkland & Ellis',
    'Jones Day',
    'Sidley Austin'
  ],
  [
    'McDermott Will & Emery',
    'King & Spalding',
    'O\'Melveny & Myers',
    'Winston & Strawn',
    'Arnold & Porter',
    'Baker Botts',
  ],
  [
    'Nixon Peabody',
    'Faegre, Drinker, Biddle & Reath',
    'Pepper Hamilton',
    'Kelley, Drye & Warren',
    'Allen, Matkins, Leck, Gamble, Mallory & Natsis',
    'Shipman & Goodwin',
  ],
  [
    'Kilpatrick Townsend & Stockton',
    'Fenwick & West',
    'Day Pitney',
    'Dickinson Wright',
    'Warner, Norcross & Judd',
    'Brooks Kushman P.C.',
  ],
  [
    'Reed Smith',
    'Alston & Bird',
    'Perkins Coie',
    'Holland & Knight',
    'BakerHostetler',
    'Akerman LLP',
  ],
  [
    'Shook, Hardy & Bacon',
    'Irell & Manella',
    'McCarter & English',
    'Phelps Dunbar',
    'Robinson & Cole',
    'Wilson, Elser, Moskowitz, Edelman & Dicker'
  ]
];

export const COST_IMPACT_GRADES = {
  NONE: {color: '#3EDB73', width: '48px'},
  LOW: {color: '#FFC327', width: '42px'},
  MODERATE: {color: '#FF8B4A', width: '78px'},
  HIGH: {color: '#FE3F56', width: '48px'},
  POSITIVE: {color: '#3EDB73', width: '78px'}
};

export const rateBenchmarkingPieChartOptions = {
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
      colors: ['#00D1FF', '#cccccc'],
      dataLabels: {
        enabled: false,
        // color: 'black',
        // // format: '<b>{point.percentage:.0f} %</b>',
        // formatter() {
        //   let per = this.percentage;
        //   if (per > 5) {
        //     per = Math.round(per );
        //     return  per + '%';
        //   }
        //   return null;
        // },
        // distance: -50,
        // style: {
        //   fontSize: 18,
        //   textOutline: false
        // }
      }
    },
    series: {}
  },
  legend: {
    enabled: false
  }
};
const chartSize = 115;

const additionalOptions = {
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
export const rateBenchmarkingChartOptions = { ... rateBenchmarkingPieChartOptions, ... additionalOptions };
