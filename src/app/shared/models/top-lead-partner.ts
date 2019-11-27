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
    height: 300,
    type: 'pie',
    borderWidth: 0,
    marginLeft: 120,
    marginTop: 10,
    spacingTop: 0,
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
    headerFormat: null,
    pointFormat: '<div style="width:250px;background-color:#f9b362;font-color:#fff;"><div><b>{series.name}</b><br /></div>' +
      '<div class="mb10">{point.name}</div></div>' +
      '<div>Spend</div></div>' +
      '<div class="mb10">${point.total_billed:,.0f}</div></div>' +
      '<div>Practice Area</div></div>' +
      '<div class="mb10">{point.top_practice}</div></div>'
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      colors: ['#9D02FE', '#6F00FF', '#4000FF', '#1102FF', '#0F1FFF', '#0C4CFF', '#037BFF', '#00AAFF', '#00C1FF', '#00D9FE'],
      dataLabels: {
        enabled: false
      },
     showInLegend: true
    }
  },
  legend: {
    show: true,
    align: 'left',
    verticalAlign: 'top',
    layout: 'vertical',
    x: 0,
    y: 15,
    useHTML: true,
    symbolHeight: .001,
    symbolWidth: .001,
    symbolRadius: .001,
    /* tslint:disable */
    labelFormatter: function() {
      const bgcolor = this.options.visible===false ? "#ccc" : this.color;
      return '<div>' +
        '<span class="hc-partner-badge" style="color:#FFF; background-color: ' + bgcolor + ';"> ' + this.name +  ' </span>' +
        '</div>';
    },
    /* tslint:enable */
    itemMarginBottom: 0
  },
  series: [{
    name: 'Lead Partners',
    colorByPoint: true,
    data: []
  }]

};
