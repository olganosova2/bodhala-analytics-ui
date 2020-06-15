import {Component, Input, OnInit} from '@angular/core';
import {IBillingTotalItem} from '../../practice-area.model';
import {FiltersService} from '../../../shared/services/filters.service';

@Component({
  selector: 'bd-billing-total-item-pa',
  templateUrl: './billing-total-item-pa.component.html',
  styleUrls: ['./billing-total-item-pa.component.scss']
})
export class BillingTotalItemPaComponent implements OnInit {
  @Input() isLastCell: boolean = false;
  @Input() item: IBillingTotalItem;
  @Input() includeExpenses: boolean = false;

  constructor(public filtersService: FiltersService) { }

  ngOnInit() {
  }

}
