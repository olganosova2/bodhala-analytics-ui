export enum ChartType {
  Hours = 'Hours',
  Spend = 'Spend'
}
export enum TkChartType {
  All = 'All Timekeepers',
  PartnersOnly = 'Partners Only'
}
export interface IDiversityData {
  gender?: string;
  ethnicity?: string;
  total_billed?: number;
  total_afa?: number;
  total_spend: number;
  total_hours: number;
  partner_billed: number;
  partner_hours: number;
  sort?: number;
}
export const diversityChartOptions = {
  chart: {
    type: 'pie',
    width: 400,
    height: 250,
    marginLeft: null,
    marginRight: 10,
    marginTop: 5,
    spacingTop: 5
  },
  credits: {
    enabled: false
  },
  title: {
    text: null
  },
  tooltip: {
    pointFormat: '<b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
    point: {
      valueSuffix: '%'
    }
  },
  plotOptions: {
    pie: {

      // size: 150,
      allowPointSelect: true,
      cursor: 'pointer',
      colors: ['#cccccc', '#7cb5ec',  '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'],
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
      }
    }
  },
  series: [
    { name: '',
      colorByPoint: true,
      data: []
    }]
};
// export const diversityChartOptionsSmall = {
//   chart: {
//     width: 400

