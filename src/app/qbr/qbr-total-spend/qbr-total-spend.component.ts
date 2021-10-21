import { Component, OnInit, Input } from '@angular/core';
import {IQbrMetric, QbrType} from '../qbr-model';

@Component({
  selector: 'bd-qbr-total-spend',
  templateUrl: './qbr-total-spend.component.html',
  styleUrls: ['../qbr-css.scss', './qbr-total-spend.component.scss']
})
export class QbrTotalSpendComponent implements OnInit {
  @Input() qbrType: QbrType;
  @Input() totalSpendMetric: Array<IQbrMetric>;
  constructor() { }

  ngOnInit(): void {
  }

}
