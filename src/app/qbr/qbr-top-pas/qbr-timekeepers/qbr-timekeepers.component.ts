import {Component, Input, OnInit} from '@angular/core';
import {IQbrMetric, QbrType} from '../../qbr-model';

@Component({
  selector: 'bd-qbr-timekeepers',
  templateUrl: './qbr-timekeepers.component.html',
  styleUrls: ['../../qbr-css.scss', './qbr-timekeepers.component.scss']
})
export class QbrTimekeepersComponent implements OnInit {
  @Input() metrics: Array<IQbrMetric> = [];
  @Input() qbrType: QbrType;
  @Input() size: string = 'lg';
  @Input() totalSpend: number = 0;
  @Input() showColumns: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
