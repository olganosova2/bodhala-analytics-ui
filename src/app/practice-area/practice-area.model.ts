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

export interface IPracticeArea {
    client_matter_type: string;
    // rank: number;
    // url: string;
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
    synonym_primary_id: number;
    json_config: string;
    logo_url: string;
    tags: Array<ITag>;
    yearly_stats: Array<any>;
}

export interface IFirmData {
    id: string;
    name: string;
    total_billed: number;
    per_of_spend: number;
    total_billed_all?: number;
}

export interface IPracticeAreaData {
    percent_partners: number;
    percent_associates: number;
    num_locations: number;
    num_attorneys_range: string;
    firmographic_leverage: number;
    url: string;
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

export interface ILeadPartner {
    id: string;
    firm_id?: number;
    name: string;
    firm: string;
    lawfirm_id: number;
    total: number;
    total_billed: number;
    total_afa: number;
    bpi: string;
    associate_hours: number;
    partner_hours: number;
    associate_billed: number;
    partner_billed: number;
    associate_writeoff: number;
    associate_writeoff_hours: number;
    partner_writeoff: number;
    partner_writeoff_hours: number;

}

export const paTrendChart = {
    chart: {
      type: 'line',
      width: 800,
      // height: 600,
      marginLeft: null,
      marginRight: 10,
      marginTop: 15,
      spacingTop: 10,
      zoomType: false,
    },
    exporting: {   enabled: false  },
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
          result = formatter.format(this.y);
        } else if (this.series.yAxis.axisTitle.textStr === 'dollars') {
          result = moneyFormatter.format(this.y);
        } else if (this.series.yAxis.axisTitle.textStr === 'percent') {
          result = formatter.format(this.y) + '%';
        } else {
          result = formatter.format(this.y);
        }
        return result;
      }
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
      name: 'Practice Area',
     // color: '#FF0000',
      data: []
    }, {
      name: 'Average',
      color: '#000',
      data: []
    }]
  };

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

export const spendByMonthOptions = { ... lineChartOptions, ...spendByMonthChartAdditionalOptions};



