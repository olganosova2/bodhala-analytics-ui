import {Component, Input, OnInit} from '@angular/core';
import {IActiveSpend} from '../../../shared/models/active-spend';

@Component({
  selector: 'bd-active-spend',
  templateUrl: './active-spend.component.html',
  styleUrls: ['./active-spend.component.scss']
})
export class ActiveSpendComponent implements OnInit {
  @Input()
  spendData: IActiveSpend;
  constructor() { }

  ngOnInit() {
  }

}
