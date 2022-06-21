import { Component, Input, OnInit } from '@angular/core';
import {CommonService} from '../../../shared/services/common.service';
import {AppStateService, UserService, UtilService} from 'bodhala-ui-common';
import {AgGridService} from 'bodhala-ui-elements';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { RatesAnalysisService } from '../../rates-analysis.service';
import { EditFirmsModalComponent } from './edit-firms-modal/edit-firms-modal.component';

@Component({
  selector: 'bd-comparison-firms',
  templateUrl: './comparison-firms.component.html',
  styleUrls: ['./comparison-firms.component.scss']
})
export class ComparisonFirmsComponent implements OnInit {
  @Input() panelFirms: Array<any>;
  @Input() marketFirms: Array<any>;
  @Input() benchmark: any;
  displayedPanelFirms: Array<string> = [];
  displayedMarketFirms: Array<string> = [];

  constructor(
    public appStateService: AppStateService,
    public userService: UserService,
    public commonServ: CommonService,
    public utilService: UtilService,
    public dialog: MatDialog,
    public agGridService: AgGridService,
    public ratesService: RatesAnalysisService) {}

  ngOnInit(): void {
    let counter = 0;
    if (this.panelFirms) {
      for (const firm of this.panelFirms) {
        if ((firm.name.length + counter) < 57) {
          this.displayedPanelFirms.push(firm.name);
          counter += firm.name.length;
        }
      }
    }

    counter = 0;
    if (this.marketFirms) {
      for (const firm of this.marketFirms) {
        if ((firm.name.length + counter) < 60) {
          this.displayedMarketFirms.push(firm.name);
          counter += firm.name.length;
        }
      }
    }
  }

  openFirmsModal() {
    const dialogRef = this.dialog.open(EditFirmsModalComponent, {
      data: {
        benchmark: this.benchmark,
        panelFirms: this.panelFirms
      },
      height: '85%',
      width: '1600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
        return;
      }
    });
  }
}
