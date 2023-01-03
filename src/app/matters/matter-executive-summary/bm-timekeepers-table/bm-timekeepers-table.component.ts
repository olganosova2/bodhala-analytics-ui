import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import {BMSetupType, INamedTimekeepersBM} from '../model';
import {IHeaderColumn} from '../../../shared/services/common.service';
import {YoyRateIncreaseService} from '../../../savings-calculator/yoy-rate-increase/yoy-rate-increase.service';
import {FiltersService} from '../../../shared/services/filters.service';
import {UtilService} from 'bodhala-ui-common';
import {MatterAnalysisService} from '../matter-analysis.service';

@Component({
  selector: 'bd-bm-timekeepers-table',
  templateUrl: './bm-timekeepers-table.component.html',
  styleUrls: ['../matter-executive-summary.component.scss', './bm-timekeepers-table.component.scss']
})
export class BmTimekeepersTableComponent implements OnInit, AfterViewInit {
  columns: Array<IHeaderColumn> = [];
  @Input() page: string;
  @Input() totalHours: number = 0;
  @Input() timekeepers: Array<INamedTimekeepersBM> = [];

  constructor(public matterAnalysisService: MatterAnalysisService,
              public filtersService: FiltersService,
              public utilService: UtilService) { }

  ngOnInit(): void {
    this.formatTableColumns();
  }

  ngAfterViewInit(): void {
  }

  formatTableColumns(): void {
    this.columns.push({ label: 'Last Name', field: 'last_name', direction: null});
    this.columns.push({ label: 'First Name', field: 'first_name', direction: null});
    this.columns.push({ label: 'Classification', field: 'bodhala_classification'});
    this.columns.push({ label: 'Avg Rate', field: 'avg_rate', direction: null});
    this.columns.push({ label: '# Hours Worked', field: 'total_hours_billed',  direction: -1});
    this.columns.push({ label: 'Total Spend', field: 'total_billed', direction: null});
    this.columns.push({ label: '% of Total Work', field: 'percent_of_work', direction: null});
  }
  sort(column: IHeaderColumn): void {
    for (const col of this.columns) {
      if (col.field !== column.field) {
        col.direction = null;
      }
    }
    for (const tk of this.timekeepers) {
      tk.percent_of_work = this.matterAnalysisService.getPercentOfWork(tk.total_hours_billed, this.totalHours);
    }
    const direction = column.direction < 0 ? '-' : '';
    this.timekeepers = this.timekeepers.sort(this.utilService.dynamicSort(direction + column.field));
  }

}
