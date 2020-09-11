import {Component, Input, OnInit} from '@angular/core';
import {IBillingTotalItemReportCard} from '../../../firm.model';
import {FiltersService} from '../../../../shared/services/filters.service';

@Component({
  selector: 'bd-report-card-billing-total-item',
  templateUrl: './report-card-billing-total-item.component.html',
  styleUrls: ['./report-card-billing-total-item.component.scss']
})
export class ReportCardBillingTotalItemComponent implements OnInit {
  @Input() isLastCell: boolean = false;
  @Input() itemRC: IBillingTotalItemReportCard;
  @Input() includeExpenses: boolean = false;
  @Input() reportCardItem: boolean = false;
  @Input() comparisonItem: boolean = false;

  constructor(public filtersService: FiltersService) { }

  ngOnInit(): void {
    if (this.comparisonItem === true) {
      console.log("itemRC: ", this.itemRC);
    }
  }

}
