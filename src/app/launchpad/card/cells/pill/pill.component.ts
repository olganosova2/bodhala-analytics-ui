import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ICell } from '../cell.interface';
import { BaseCell } from '../base-cell';

@Component({
  selector: 'bd-pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.scss']
})
export class PillComponent extends BaseCell implements OnInit, ICell {

  ngOnInit() {
  }

}
