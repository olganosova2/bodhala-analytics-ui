import { Input, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';

export class BaseCell {
  constructor(public router: Router) {
  }
  @Input()
  data: any;

  @Input()
  column: any;

  @Output()
  changed: EventEmitter<any> = new EventEmitter();

  @Output()
  clicked: EventEmitter<any> = new EventEmitter();

}
