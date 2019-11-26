export const basePieChartOptions = {
  chart: {
    height: 300,
    width: null,
    type: 'pie',
    marginLeft: null
  },
  credits: {
    enabled: false
  },
  title: {text: null},
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      // colors: ['#2748C2', '#1D70C2', '#26B8C2', '#26C277', '#84C2B9'],
      colors: ['#1950A0', '#2660B3', '#316CC3', '#3C7BD3', '#4887E2', '#4F97E4', '#51A9DA', '#52BBD1', '#55CEC7', '#54DABA'],
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
        '<span class="hc-partner-badge" style="color:#FFF; background-color: ' + this.color + ';"> ' + this.name +  ' </span>' +
        '</div>';
    },
    /* tslint:enable */
    itemMarginBottom: 0
  }
};
