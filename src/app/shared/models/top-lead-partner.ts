export interface ITopLeadPartner {
  id: string;
  name: string;
  img_url: string;
  seniority: string;
  total_billed: number;
  total_expenses: number;
  firm_id: number;
  firm: string;
  total_matters: number;
  top_practice: string;
  top_matter_id: string;
  top_matter_name: string;
  top_matter_total: number;
  top_matter: {
    id: string;
    name: string;
    total_billed: number;
  };
  y: number;
  total_spend_formatted: string;
}
export const leadPartnerChartOptions = {
  chart: {
    type: 'pie',
    width: 800,
    borderWidth: 0,
    marginLeft: 100,
    spacingBottom: 15,
    spacingLeft: 10,
    spacingRight: 10,
  },
  credits: {
    enabled: false
  },
  title: {text: null},
  tooltip: {
    useHTML: true,
    shared: true,
    backgroundColor: '#fff',
    /* tslint:disable */
    formatter: function() {
      let result = '<div><div class="pb10">' +  this.point.name + '</div>';
      result += '<div class="font-bold">Spend</div>';
      result += '<div class="mb10">' + this.point.total_spend_formatted  + '</div>';
      result += '<div class="font-bold">Practice Area</div>';
      result += '<div class="mb10">' +  this.point.top_practice + '</div>';
      result += '<div class="font-bold">Matter</div>';
      result += '<div class="mb10">' +  this.point.top_matter_name + '</div></div>';
      return result;
    }
    /* tslint:enable */
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      size: 250,
      colors: ['#2748C2', '#1D70C2', '#26B8C2', '#26C277', '#84C2B9'],
      dataLabels: {
        enabled: false,
        // format: '<b>{point.name}</b>: {point.percentage:.1f} %'
      },
     showInLegend: true
    }
  },
  legend: {
    show: true,
    align: 'left',
    verticalAlign: 'top',
    layout: 'vertical',
    width: '40%',
    x: 0,
    y: 0,
    padding: 3,
    itemMarginTop: 5,
    itemMarginBottom: 5,
    itemStyle: {
      fontSize: '14px',
      fontWeight: 'normal',
      color: '#888'
    },
    useHtml: true,
    /* tslint:disable */
    labelFormatter: function () {
      let result = '<span class="mb20">' +  this.name + '</span>';
      return result;
    },
    /* tslint:enable */
  },
  series: [{
    name: 'Lead Partners',
    colorByPoint: true,
    data: []
  }]

};
