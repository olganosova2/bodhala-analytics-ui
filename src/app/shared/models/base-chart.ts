export const basePieChartOptions = {
  chart: {
    height: 300,
    width: null,
    type: 'pie',
    marginLeft: null,
    spacingTop: 0
  },
  credits: {
    enabled: false
  },
  title: {text: null},
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      colors: ['#9D02FE', '#6F00FF', '#4000FF', '#1102FF', '#0F1FFF', '#0C4CFF', '#037BFF', '#00AAFF', '#00C1FF', '#00D9FE'],
      dataLabels: {
        enabled: false
      },
      showInLegend: true
    },
    series: {
      events: {
        click(event) {
        const x = event;
        }
      }
    }
  },
  legend: {
    show: true,
    align: 'left',
    verticalAlign: 'top',
    layout: 'vertical',
    x: 0,
    y: 0,
    useHTML: true,
    symbolHeight: .001,
    symbolWidth: .001,
    symbolRadius: .001,
    /* tslint:disable */
    labelFormatter: function() {
      return '<div>' +
       // '<span class="hc-partner-badge" style="color:#FFF; background-color: ' + this.color + ';"> ' + this.name +  ' </span>' +
        '<span class="hc-matter-badge" style="color: ' + this.color + ';border-color: ' + this.color + ';"> ' + this.name +  ' </span>' +
        '</div>';
    },
    /* tslint:enable */
    itemMarginBottom: 0
  }
};
