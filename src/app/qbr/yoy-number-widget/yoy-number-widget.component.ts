import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bd-yoy-number-widget',
  templateUrl: './yoy-number-widget.component.html',
  styleUrls: ['./yoy-number-widget.component.scss']
})
export class YoyNumberWidgetComponent implements OnInit {
  @Input() increase: number;
  @Input() direction: number = 0;
  @Input() label: string;
  @Input() size: string = 'lg';
  @Input() light: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
