import { Component, OnInit, Input } from '@angular/core';
import {IQbrMetric, QbrType} from '../qbr-model';

@Component({
  selector: 'bd-qbr-generic-metric',
  templateUrl: './qbr-generic-metric.component.html',
  styleUrls: ['../qbr-css.scss', './qbr-generic-metric.component.scss']
})
export class QbrGenericMetricComponent implements OnInit {
  @Input() qbrType: QbrType;
  @Input() item: IQbrMetric;
  @Input() secondRow: boolean;
  @Input() multipleRows: boolean;
  @Input() index: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
