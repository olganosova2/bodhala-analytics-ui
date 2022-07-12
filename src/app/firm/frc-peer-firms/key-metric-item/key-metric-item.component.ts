import {Component, Input, OnInit} from '@angular/core';
import {IMetricDisplayData} from '../frc-service.service';

@Component({
  selector: 'bd-key-metric-item',
  templateUrl: './key-metric-item.component.html',
  styleUrls: ['./key-metric-item.component.scss']
})
export class KeyMetricItemComponent implements OnInit {
  @Input() isLastCell: boolean = false;
  @Input() item: IMetricDisplayData;

  constructor() { }

  ngOnInit(): void {
  }

}
