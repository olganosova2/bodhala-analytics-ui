import {Component, Input, OnInit} from '@angular/core';
import {IBillingTotalItem, IBillingTotalItemReportCard} from '../../firm.model';
import {FiltersService} from '../../../shared/services/filters.service';

@Component({
  selector: 'bd-billing-total-item',
  templateUrl: './billing-total-item.component.html',
  styleUrls: ['./billing-total-item.component.scss']
})
export class BillingTotalItemComponent implements OnInit {
  @Input() isLastCell: boolean = false;
  @Input() item: IBillingTotalItem;
  @Input() itemRC: IBillingTotalItemReportCard;
  @Input() includeExpenses: boolean = false;
  @Input() reportCardItem: boolean = false;

  constructor(public filtersService: FiltersService) {
  }

  ngOnInit() {
  }

}
