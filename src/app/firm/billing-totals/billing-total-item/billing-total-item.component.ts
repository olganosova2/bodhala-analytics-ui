import {Component, Input, OnInit} from '@angular/core';
import {IBillingTotalItem} from '../../firm.model';
import {FiltersService} from '../../../shared/services/filters.service';

@Component({
  selector: 'bd-billing-total-item',
  templateUrl: './billing-total-item.component.html',
  styleUrls: ['./billing-total-item.component.scss']
})
export class BillingTotalItemComponent implements OnInit {
  @Input() isLastCell: boolean = false;
  @Input() item: IBillingTotalItem;

  constructor(public filtersService: FiltersService) {
  }

  ngOnInit() {
    console.log("ITEM: ", this.item);
  }

}
