import {Component, Input, OnInit} from '@angular/core';
import {IBillingTotalItem} from '../../firm.model';

@Component({
  selector: 'bd-billing-total-item',
  templateUrl: './billing-total-item.component.html',
  styleUrls: ['./billing-total-item.component.scss']
})
export class BillingTotalItemComponent implements OnInit {
  @Input() item: IBillingTotalItem;
  @Input() includeExpenses: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

}
