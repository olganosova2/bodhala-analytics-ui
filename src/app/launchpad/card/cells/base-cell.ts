import {Input, Output, EventEmitter, Directive} from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from '../../../shared/services/common.service';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class BaseCell {
  constructor(public router: Router,
              public commonServ: CommonService) {
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
