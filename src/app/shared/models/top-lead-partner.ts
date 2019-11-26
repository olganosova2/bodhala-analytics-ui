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
    marginLeft: 100,
    marginTop: 0,
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
      colors: ['#1950A0', '#2660B3', '#316CC3', '#3C7BD3', '#4887E2', '#4F97E4', '#51A9DA', '#52BBD1', '#55CEC7', '#54DABA'],
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
    y: 20,
    useHTML: true,
    symbolHeight: .001,
    symbolWidth: .001,
    symbolRadius: .001,
    /* tslint:disable */
    labelFormatter: function() {
      return '<div>' +
        '<span class="hc-partner-badge" style="color:#FFF; background-color: ' + this.color + ';"> ' + this.name +  ' </span>' +
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
