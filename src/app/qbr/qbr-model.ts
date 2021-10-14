export interface IQbrMetric {
  label: string;
  directionQoQ: number;
  directionYoY: number;
  percentQoQ: number;
  percentYoY: number;
  amount: number;
  amountToCompare?: number;
  icon?: string;
}
export const qbrPieChartOptions = {
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
      colors: ['#FF632C', '#00D1FF', '#cccccc'],
      dataLabels: {
        enabled: true,
        color: 'black',
        format: '<b>{point.percentage:.0f} %</b>',
        distance: -50,
        style: {
          fontSize: 20,
          textOutline: false
        }
      }
    },
    series: {
    }
  },
  legend: {
    enabled: false
  }
};
