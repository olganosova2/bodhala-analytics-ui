import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpService, UserService} from 'bodhala-ui-common';
import {Subscription} from 'rxjs';
import {IFirm} from '../firm.model';
import {DiscountPaTypes, discountsChart, DiscountsService, IDiscount, IDiscountsTable, IPracticeAreaInvoice, mockFirmDiscounts} from './discounts.service';
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
  tableData: Array<IDiscountsTable> = [];
  discounts: Array<IDiscount> = [];
  subTotalAmtInvoices: number = 0;
  subTotalInvoices: number = 0;
  practiceAreasInvoices: Array<IPracticeAreaInvoice> = [];
  constructor(public dialogRef: MatDialogRef<FirmDiscountsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private httpService: HttpService,
              public userService: UserService,
              private filtersService: FiltersService,
              public discountServ: DiscountsService) { }

  ngOnInit(): void {
    this.firm = Object.assign({}, this.data.firm);
    this.discountsConfig = Object.assign({}, this.data.config);
    if (this.discountsConfig && this.discountsConfig.discount_pa_type) {
       this.getDiscountsAndPAs();
     }

  }
  getDiscountsAndPAs(): void {
    const params = this.filtersService.getCurrentUserCombinedFilters();
    const arr = [];
    arr.push(this.firm.id.toString());
    params.firms = JSON.stringify(arr);
    params.firmId = this.firm.id;
    params.discountType = this.discountsConfig.discount_pa_type;
    this.pendingRequest = this.httpService.makeGetRequest('getDiscountsByClientPAs', params).subscribe(
      (data: any) => {
        this.discounts = data.result.discounts || [];
        this.practiceAreasInvoices = data.result.practice_areas || [];
        if (this.practiceAreasInvoices.length > 0) {
          this.subTotalAmtInvoices = this.discountServ.calculateSubTotalWithInvoices(this.practiceAreasInvoices);
          this.subTotalInvoices = this.discountServ.calculateSubTotalInvoices(this.practiceAreasInvoices);
          this.tableData = this.discountServ.calculateTableData(this.discounts, this.practiceAreasInvoices);
          this.setUpChartOptions();
        }
      },
      err => {
        this.errorMessage = err;
      }
    );
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
