import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpService, UserService} from 'bodhala-ui-common';
import {Subscription} from 'rxjs';
import {IFirm} from '../firm.model';
import {discountsChart, DiscountsService, IDiscountsTable, mockFirmDiscounts, mockFirmDiscountsTable} from './discounts.service';
import {FiltersService} from '../../shared/services/filters.service';

@Component({
  selector: 'bd-firm-discounts',
  templateUrl: './firm-discounts.component.html',
  styleUrls: ['./firm-discounts.component.scss']
})
export class FirmDiscountsComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  errorMessage: any;
  chart: any = {};
  options: any;
  chartData: any;
  firm: IFirm;
  discountsConfig: any;
  tableData: Array<IDiscountsTable> = mockFirmDiscounts;
  dataForTable = mockFirmDiscountsTable;
  constructor(public dialogRef: MatDialogRef<FirmDiscountsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private httpService: HttpService,
              public userService: UserService,
              private filtersService: FiltersService,
              public discountServ: DiscountsService) { }

  ngOnInit(): void {
    this.firm = Object.assign({}, this.data.firm);
    this.discountsConfig = Object.assign({}, this.data.discountsConfig);
    // this.discountServ.calculateTableData(this.tableData);
    this.setUpChartOptions();
  }
  setUpChartOptions(): void {
    this.options = Object.assign({}, discountsChart);
    this.discountServ.buildDiscountsChartData(this.options, this.tableData, this.firm);
  }
  saveInstance(chartInstance): void {
    this.chart = chartInstance;
  }
  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
