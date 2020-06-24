import {Component, Input, OnInit} from '@angular/core';
import {ISpendOverviewItem} from '../../executive-summary.model';

@Component({
  selector: 'bd-es-total-item',
  templateUrl: './es-total-item.component.html',
  styleUrls: ['./es-total-item.component.scss']
})
export class EsTotalItemComponent implements OnInit {
  @Input() isLastCell: boolean = false;
  @Input() item: ISpendOverviewItem;
  @Input() includeExpenses: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
