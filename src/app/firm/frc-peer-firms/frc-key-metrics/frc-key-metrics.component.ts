import { Component, OnInit, Input } from '@angular/core';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {CommonService} from '../../../shared/services/common.service';
import {FrcServiceService, IMetricDisplayData, CLIENT_CONFIG_KEY_METRICS_NAME} from '../frc-service.service';
import {FiltersService} from '../../../shared/services/filters.service';
import {SAVINGS_CALCULATOR_CONFIG} from '../../../shared/services/config';
import {VisibleKeyMetricsComponent } from '../visible-key-metrics/visible-key-metrics.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'bd-frc-key-metrics',
  templateUrl: './frc-key-metrics.component.html',
  styleUrls: ['./frc-key-metrics.component.scss']
})
export class FrcKeyMetricsComponent implements OnInit {
  itemTopRowCount: number = 6;
  filteredMetrics: Array<IMetricDisplayData> = [];
  savedMetrics: Array<string> = [];
  @Input() keyMetrics: Array<IMetricDisplayData> = [];

  constructor(private httpService: HttpService,
              public commonServ: CommonService,
              public frcService: FrcServiceService,
              public userService: UserService,
              public dialog: MatDialog,
              public appStateService: AppStateService,
              public filtersService: FiltersService) { }

  ngOnInit(): void {
    this.filteredMetrics = this.frcService.processSavedMetrics(this.keyMetrics);
    this.filterMetrics();
  }
  filterMetrics(): void {
    for (const metric of this.filteredMetrics) {
      metric.lastCell = false;
    }
    if (this.filteredMetrics.length > 5) {
      this.itemTopRowCount = Math.ceil(this.filteredMetrics.length / 2);
      this.filteredMetrics[this.itemTopRowCount - 1].lastCell = true;
      this.filteredMetrics[this.filteredMetrics.length - 1].lastCell = true;
    } else {
      this.itemTopRowCount = this.filteredMetrics.length;
      this.filteredMetrics[this.filteredMetrics.length - 1].lastCell = true;
    }
  }
  openDetails(): void {
    const packaged = { filteredMetrics: this.filteredMetrics,  keyMetrics: this.keyMetrics};
    const dialogConfig =  {
      height: '450px',
        width: '40vw',
    };
    const modalConfig = {...dialogConfig, data: Object.assign([], packaged)};
    const dialogRef = this.dialog.open(VisibleKeyMetricsComponent, {...modalConfig, disableClose: false });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.filteredMetrics = Object.assign([], result);
      this.filterMetrics();
    });
  }

}
