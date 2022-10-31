import {basePieChartOptions} from '../shared/models/base-chart';
import * as Highcharts from 'highcharts';

const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2
});
const formatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2
});

export interface ITag {
  modified_on: string;
  deleted_on: string;
  created_on: string;
  created_by: string;
  active: boolean;
  name: string;
  modified_by: string;
  deleted_by: string;
  description: string;
  type: string;
  id: number;
}

export interface IFirm {
  id: number;
  name: string;
  rank: number;
  url: string;
  active: boolean;
  boutique: string;
  crawl_id: number;
  crawlable: string;
  is_javascript: boolean;
  is_sitemap: boolean;
  is_proxy_crawl: boolean;
  bio_config_file: string;
  news_config_file: string;
  leverage: number;
  average_partner_rate: number;
  average_associate_rate: number;
  estimated_number_lawyers: number;
  rate_source: string;
  letterhead: boolean;
  synonym_primary_id: number;
  json_config: string;
  logo_url: string;
  lawfirm_harvest: string;
  tags: Array<ITag>;
  yearly_stats: Array<any>;
}

export interface IBillingTotalItem {
  icon: string;
  svg?: string;
  total: number;
  total_expenses?: number;
  name: string;
  format?: string;
  lastCell?: boolean;
}

export interface IBillingTotalItemReportCard {
  icon: string;
  svg?: string;
  total: any;
  total_expenses?: number;
  avg: number;
  diff: number;
  name: string;
  format?: string;
  lastCell?: boolean;
}

export interface ITimekeeper {
  id: string;
  name: string;
  seniority: string;
  bio_image_url: string;
  firm: string;
  lawfirm_id: number;
  total: number;
  total_billed: number;
  total_afa: number;
  current_rate: number;
}

export interface IFirmData {
  percent_partners: number;
  percent_associates: number;
  num_locations: number;
  num_attorneys_range: string;
  firmographic_leverage: number;
  url: string;
  cluster?: string;
}

export interface IDiversityData {
  percentFemale: number;
  percentFemalePartners: number;
  industryFemale: number;
  similarFemale: number;
  percentEthnic: number;
  percentEthnicPartners: number;
  industryEthnic: number;
  similarEthnic: number;
}

export interface IUTBMSData {
  activitydata: any[];
  taskdata: any[];
}

export interface ITaxonomyData {
  phasedata: any[];
  subphasedata: any[];
}

export const lineChartOptions = {
  chart: {
    type: 'line',
    marginLeft: null,
    marginRight: 10,
    marginTop: 10,
    spacingTop: 10,
    zoomType: false
  },
  exporting: {
    enabled: true
  },
  credits: {
    enabled: false
  },
  title: {text: null},
  plotOptions: {
    series: {
      events: {
        click(event) {
          const x = event;
        }
      }
    }
  },
  tooltip: {
    headerFormat: '<b></b><br>',
    pointFormat: '{point.x: %b %Y}: ${point.y:,.2f}'
  },
  xAxis: {
    type: 'datetime',
    dateTimeLabelFormats: {
      month: '%b %Y',
      year: '%b'
    },
    title: {
      text: 'Date'
    }

  },
  yAxis: {
    min: 0,
    title: {
      text: '$ (dollars)'
    }

  },
  series: []
};

export const spendByMonthChartAdditionalOptions = {
  plotOptions: {
    series: {
      events: {
        click(event) {
          const x = event;
        }
      }
    }
  },
  tooltip: {
    headerFormat: '<b></b><br>',
    pointFormat: '{point.x: %b %Y}: ${point.y:,.2f}'
  },
  xAxis: {
    type: 'datetime',
    dateTimeLabelFormats: {
      month: '%b %Y',
      year: '%b'
    },
    title: {
      text: 'Date'
    }

  },
  yAxis: {
    min: 0,
    title: {
      text: '$ (dollars)'
    }

  },
  series: [{
    showInLegend: false,
    name: '',
    data: []
  }]
};

export const trendChart = {
  chart: {
    type: 'line',
    width: 800,
    height: 600,
    marginLeft: null,
    marginRight: 10,
    marginTop: 15,
    spacingTop: 10,
    zoomType: false,
  },
  exporting: {   enabled: true  },
  credits: { enabled: false },
  title: { text: null },
  tooltip: {
    headerFormat: '<b></b><br>',
    pointFormat: '{point.x: %Y}: {point.y:,.2f}'
  },
  xAxis: {
    type: 'datetime',
    dateTimeLabelFormats: {
      month: '%Y',
      year: '%Y'
    }
  },
  yAxis: {
    title: {
      text: 'Avg'
    }
  },
  legend: {
    layout: 'horizontal',
    align: 'right',
    verticalAlign: 'top'
  },
  plotOptions: {
    line: {
      colors: ['#9D02FE', '#6F00FF'],
    },
    series: {
      label: {
        connectorAllowed: false
      }
    }
  },
  series: [{
    name: 'Firm',
   // color: '#FF0000',
    data: []
  }, {
    name: 'Peer Firm Avg.',
    color: '#000',
    data: []
  }]
};
export const spendByQuarterChartAdditionalOptions = {
  chart: {
    type: 'line',
    width: 800,
    height: 600,
    marginLeft: null,
    marginRight: 10,
    marginTop: 15,
    spacingTop: 10,
    zoomType: false,
  },
  exporting: {   enabled: true  },
  credits: { enabled: false },
  title: { text: null },
  tooltip: {
    formatter() {
      let quarterNumber = '';
      if (Highcharts.dateFormat('%b', this.x, true) === 'Jan') {
        quarterNumber = 'Q1';
      } else if (Highcharts.dateFormat('%b', this.x, true) === 'Apr') {
        quarterNumber = 'Q2';
      } else if (Highcharts.dateFormat('%b', this.x, true) === 'Jul') {
        quarterNumber = 'Q3';
      }  else if (Highcharts.dateFormat('%b', this.x, true) === 'Oct') {
        quarterNumber = 'Q4';
      }
      let result = '';
      if (this.series.yAxis.axisTitle.textStr === 'Avg. Days') {
        result = (Highcharts.dateFormat('%Y', this.x, true)) + ' ' + quarterNumber + ': ' + formatter.format(this.y);
      } else if (this.series.yAxis.axisTitle.textStr === 'Dollars') {
        result = (Highcharts.dateFormat('%Y', this.x, true)) + ' ' + quarterNumber + ': ' + moneyFormatter.format(this.y);
      } else if (this.series.yAxis.axisTitle.textStr === 'Percent') {
        result = (Highcharts.dateFormat('%Y', this.x, true)) + ' ' + quarterNumber + ': ' + formatter.format(this.y) + '%';
      } else {
        result = (Highcharts.dateFormat('%Y', this.x, true)) + ' ' + quarterNumber + ': ' + formatter.format(this.y);
      }
      return result;
    }
  },
  xAxis: {
    type: 'datetime',
    units: [
      ['year', [1]]
    ],
    dateTimeLabelFormats: {
      month: '%Y',
      year: '%Y'
    },
  },
  yAxis: {
    title: {
      text: 'Avg'
    }
  },
  legend: {
    layout: 'horizontal',
    align: 'right',
    verticalAlign: 'top'
  },
  plotOptions: {
    series: {
      color: '#FF8B4A',
      label: {
        connectorAllowed: false
      }
    }
  },
  series: [{
    name: 'Firm',
    // color: '#FF0000',
    data: []
  }]
};
export const pieDonut = {
  chart: {
    type: 'pie',
    height: 140,
    width: 200,
    spacing: [0, 0, 0, 0],
    margin: [0, 0, 0, 0]

  },
  exporting: {
    enabled: true
  },
  plotOptions: {
    pie: {
      shadow: false,
      center: ['50%', '50%'],
      animation: {
        duration: 2000
      },
      dataLabels: {
        verticalAlign: 'top',
        distance: 20,
        y: -10,
        style: {
          width: '200px'
        }
      }
    }
  },
  tooltip: {
    shared: true,
    useHTML: true,
    formatter() {
      return '<div>' + this.key + ':<b> ' + Math.round(this.percentage * 10) / 10 + '%</b></div>';
    }
  },
  title: {
    text: null
  },
  credits: {enabled: false},
  series: []
};

export const utbmsPieDonut = {
  chart: {
    type: 'pie',
    height: 400,
    width: 720,
    spacing: [0, 0, 0, 0],
    margin: [0, 0, 0, 0]

  },
  exporting: {
    enabled: true
  },
  plotOptions: {
    pie: {
      shadow: false,
      center: ['50%', '50%'],
      animation: {
        duration: 2000
      },
      dataLabels: {
        verticalAlign: 'top',
        distance: 20,
        y: -10,
        style: {
          width: '200px'
        }
      }
    }
  },
  tooltip: {
    shared: true,
    useHTML: true,
    formatter() {
      return '<div>' + this.key + ':<b> ' + Math.round(this.percentage * 10) / 10 + '%</b></div>' + '<div>Total Hours: ' + Intl.NumberFormat().format(Math.round(this.point.y)) + '</div><div>Total Billed: $' + Intl.NumberFormat('us-US', {minimumFractionDigits: 0, maximumFractionDigits: 0}).format(this.point.total_billed) + ' </div>';
    }
  },
  title: {
    text: 'Raw/Inaccurate Data'
  },
  credits: {enabled: false},
  series: []
};

export const taxonomyPieDonut = {
  chart: {
    type: 'pie',
    height: 400,
    width: 720,
    spacing: [0, 0, 0, 0],
    margin: [0, 0, 0, 0]

  },
  exporting: {
    enabled: true
  },
  plotOptions: {
    pie: {
      shadow: false,
      center: ['50%', '50%'],
      animation: {
        duration: 2000
      },
      dataLabels: {
        verticalAlign: 'top',
        distance: 20,
        y: -10,
        style: {
          width: '200px'
        }
      }
    }
  },
  tooltip: {
    shared: true,
    useHTML: true,
    formatter() {
      return '<div>' + this.key + ':<b> ' + Math.round(this.percentage * 10) / 10 + '%</b></div>' + '<div>Total Hours: ' + Intl.NumberFormat().format(Math.round(this.point.y)) + '</div><div>Total Billed: $' + Intl.NumberFormat('us-US', { minimumFractionDigits: 0, maximumFractionDigits: 0}).format(this.point.total_billed) + '</div>';
    }
  },
  title: {
    text: 'Bodhala AI Phase Taxonomy'
  },
  credits: {enabled: false},
  series: []
};

export const genderAdditionalOptions = {
  series: [{
    name: 'Female',
    data: [],
    size: '60%',
    dataLabels: {
      enabled: false
    }
  }, {
    name: 'Female Partners',
    data: [],
    size: '80%',
    innerSize: '60%',
    dataLabels: {
      enabled: false
    }
  }]
};
export const minorityAdditionalOptions = {
  series: [{
    name: 'All Minority Attorneys',
    data: [],
    size: '60%',
    dataLabels: {
      enabled: false
    }
  }, {
    name: 'Minority Partners',
    data: [],
    size: '80%',
    innerSize: '60%',
    dataLabels: {
      enabled: false
    }
  }]
};
export const UTBMSAdditionalOptions = {
  series: [{
    name: 'Task',
    data: [],
    size: '60%'
  },
  {
    name: 'Activity',
    data: [],
    size: '70%',
    innerSize: '60%',
    dataLabels: {
        enabled: false
    }
  }]
};
export const taxonomyAdditionalOptions = {
  series: [{
    name: 'Task',
    data: [],
    size: '60%'
  },
  {
    name: 'Activity',
    data: [],
    size: '70%',
    innerSize: '60%',
    dataLabels: {
        enabled: false
    }
  }]
};

export const yearOverYearChartOptions = {
  tooltip: {
    formatter() {
      const quarterNumber = '';
      let result = '';
      if (this.series.yAxis.axisTitle.textStr === 'Avg. Days') {
        result = (Highcharts.dateFormat('%Y', this.x, true)) + quarterNumber + ': ' + formatter.format(this.y);
      } else if (this.series.yAxis.axisTitle.textStr === 'Dollars') {
        result = (Highcharts.dateFormat('%Y', this.x, true)) + quarterNumber + ': ' + moneyFormatter.format(this.y);
      } else if (this.series.yAxis.axisTitle.textStr === 'Percent') {
        result = (Highcharts.dateFormat('%Y', this.x, true)) + quarterNumber + ': ' + formatter.format(this.y) + '%';
      } else {
        result = (Highcharts.dateFormat('%Y', this.x, true)) + quarterNumber + ': ' + formatter.format(this.y);
      }
      return result;
    }
  }
};


export const spendByMonthOptions = { ... lineChartOptions, ...spendByMonthChartAdditionalOptions};
export const spendByQuarterOptions = { ... lineChartOptions, ...spendByQuarterChartAdditionalOptions};
export const spendByYearOptions = { ... lineChartOptions, ...spendByQuarterChartAdditionalOptions, ... yearOverYearChartOptions};
export const genderChartOptions = {...pieDonut, ...genderAdditionalOptions};
export const minorityChartOptions = {...pieDonut, ...minorityAdditionalOptions};
export const UTBMSChartOptions = {...utbmsPieDonut, ...UTBMSAdditionalOptions};
export const taxonomyChartOptions = {...taxonomyPieDonut, ...taxonomyAdditionalOptions};

