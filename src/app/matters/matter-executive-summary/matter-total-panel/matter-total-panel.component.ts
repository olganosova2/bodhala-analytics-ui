import {Component, Input, OnInit} from '@angular/core';
import {IMatterTotalsPanel} from '../model';
import {Router} from '@angular/router';

@Component({
  selector: 'bd-matter-total-panel',
  templateUrl: './matter-total-panel.component.html',
  styleUrls: ['./matter-total-panel.component.scss']
})
export class MatterTotalPanelComponent implements OnInit {
  @Input() metric: IMatterTotalsPanel;
  @Input() isAdmin: boolean = false;
  @Input() matterId: string;
  constructor(public router: Router) { }

  ngOnInit(): void {
  }
}
