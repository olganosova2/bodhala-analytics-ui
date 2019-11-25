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
}

export const leadPartnerChartOptions = {
  chart: {
    type: 'pie',
    borderWidth: 0,
    marginLeft: 100,
    spacingBottom: 15,
    spacingLeft: 10,
    spacingRight: 10,
  },
  credits: {
    enabled: false
  },
  title: {text: ''},
  tooltip: {
    useHTML: true,
    shared: true,
    /* tslint:disable */
    formatter: function() {
      let result = '<div style="width:250px;background-color: #f9b362;font-color:#fff;"><div><b>' + this.series.name + '</b><br /></div>';
      result += '<div class="mb10">' +  this.point.name + '</div></div>';
      result += '<div>Spend</div></div>';
      result += '<div class="mb10">$' + Math.round(this.point.total_billed * 100) / 100  + '</div></div>';
      result += '<div>Practice Area</div></div>';
      result += '<div class="mb10">' +  this.point.top_practice + '</div></div>';
      return result;
    }
    /* tslint:enable */
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      colors: ['#2748C2', '#1D70C2', '#26B8C2', '#26C277', '#84C2B9'],
      dataLabels: {
        enabled: false,
        // format: '<b>{point.name}</b>: {point.percentage:.1f} %'
      },
      showInLegend: true
    }
  },
  series: [{
    name: 'Lead Partners',
    colorByPoint: true,
    data: []
  }]

};
