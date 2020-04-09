import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'bd-bodhala-chart-legend',
  templateUrl: './bodhala-chart-legend.component.html',
  styleUrls: ['./bodhala-chart-legend.component.scss']
})
export class BodhalaChartLegendComponent implements OnInit {
  @Input() label: string;
  @Input() color: string;
  constructor() { }

  ngOnInit() {
  }

}
