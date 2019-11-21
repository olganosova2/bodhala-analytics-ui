import { EventEmitter } from '@angular/core';

export interface ICell {
  data: any;
  column: any;
  clicked: EventEmitter<any>;
  changed: EventEmitter<any>;
}
