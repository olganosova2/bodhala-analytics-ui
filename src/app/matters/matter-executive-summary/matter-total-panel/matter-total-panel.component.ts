import {Component, Input, OnInit} from '@angular/core';
import {IMatterTotalsPanel} from '../model';

@Component({
  selector: 'bd-matter-total-panel',
  templateUrl: './matter-total-panel.component.html',
  styleUrls: ['./matter-total-panel.component.scss']
})
export class MatterTotalPanelComponent implements OnInit {
  @Input() metric: IMatterTotalsPanel;
  @Input() isAdmin: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
