import { Component, OnInit, Input } from '@angular/core';
import {QbrType} from '../qbr-model';

@Component({
  selector: 'bd-yoy-number-widget',
  templateUrl: './yoy-number-widget.component.html',
  styleUrls: ['./yoy-number-widget.component.scss']
})
export class YoyNumberWidgetComponent implements OnInit {
  @Input() qbrType: QbrType = QbrType.YoY;
  @Input() increase: number;
  @Input() direction: number = 0;
  label: string;
  @Input() size: string = 'lg';
  @Input() light: boolean;
  constructor() { }

  ngOnInit(): void {
    this.label = this.qbrType === QbrType.YoY ? 'YoY' : 'QoQ';
    this.increase = Math.abs(this.increase);
  }

}
