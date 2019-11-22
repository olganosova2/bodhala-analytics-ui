import { Input, Output, EventEmitter } from '@angular/core';

export class BaseCell {
  @Input()
  data: any;

  @Input()
  column: any;

  @Output()
  changed: EventEmitter<any> = new EventEmitter();

  @Output()
  clicked: EventEmitter<any> = new EventEmitter();
}