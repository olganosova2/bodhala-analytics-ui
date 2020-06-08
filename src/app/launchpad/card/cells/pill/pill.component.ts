import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ICell } from '../cell.interface';
import { BaseCell } from '../base-cell';
import {CommonService} from '../../../../shared/services/common.service';
import {Router} from '@angular/router';

@Component({
  selector: 'bd-pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.scss']
})
export class PillComponent extends BaseCell implements OnInit, ICell {
  constructor(public router: Router, public commonServ: CommonService) {
    super(router, commonServ);
  }
  ngOnInit() {
  }

}
