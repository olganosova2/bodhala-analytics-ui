import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'bd-top-partners-chart',
  templateUrl: './top-partners-chart.component.html',
  styleUrls: ['./top-partners-chart.component.scss']
})
export class TopPartnersChartComponent implements OnInit {
  options: any = {};

  constructor() {
    this.options = {
      chart: {
        type: 'pie',
        // type: 'scatter',
        borderWidth: 0,
        //   plotBorderWidth: 1,
        marginLeft: 100,
        spacingBottom: 15,
        spacingTop: 40,
        spacingLeft: 10,
        spacingRight: 10,
      },
      credits: {
        enabled: false
      },
      title: {text: 'simple chart'},
      tooltip: {
        useHTML: true,
        shared: true,
        /* tslint:disable */
        formatter: function() {
          let result = '<div style="width:250px;background-color: #f9b362;font-color:#fff;"><div><b>' + this.series.name + '</b><br /></div>';
          result += '<div>' +  this.point.total1 + ' $</div></div>';
          return result;
        }
        /* tslint:enable */
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          },
          showInLegend: true
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
          name: 'Chrome',
          y: 61.41,
          total1: 100
          // sliced: true,
          // selected: true
        }, {
          name: 'Internet Explorer',
          y: 11.84,
          total1: 200
        }, {
          name: 'Firefox',
          y: 10.85,
          total1: 300
        }, {
          name: 'Edge',
          y: 4.67,
          total1: 400
        }, {
          name: 'Safari',
          y: 4.18,
          total1: 500
        }, {
          name: 'Sogou Explorer',
          y: 1.64,
          total1: 600
        }
        ]
      }]

    };
  }

  ngOnInit() {
  }

}
