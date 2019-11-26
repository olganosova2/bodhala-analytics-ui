export interface IPractice {
  firm_id: number;
  firm_name: string;
  firm_total: number;
  matter_id: string;
  matter_name: string;
  matter_total: number;
  practice_area: string;
  total_billed: number;
  total_expenses: number;
  y: number;
}
export const practicePieChartOptions = {
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
      '<div class="mb10">{point.practice_area}</div></div>' +
      '<div>Spend</div></div>' +
      '<div class="mb10">${point.total_billed:,.0f}</div></div>' +
      '<div>Top Firm</div></div>' +
      '<div class="mb10">{point.firm_name}</div></div>' +
      '<div>Top Matter</div></div>' +
      '<div class="mb10">{point.matter_name}</div></div>'
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      colors: ['#2748C2', '#1D70C2', '#26B8C2', '#26C277', '#84C2B9'],
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
        '<span class="hc-partner-badge" style="color:#FFF; background-color: ' + bgcolor + ';"> ' + this.practice_area +  ' </span>' +
        '</div>';
    },
    /* tslint:enable */
    itemMarginBottom: 0
  },
  series: [{
    name: 'Practice Area',
    colorByPoint: true,
    data: []
  }]

};
