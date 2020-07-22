import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {FiltersService} from '../shared/services/filters.service';
import {CommonService} from '../shared/services/common.service';
import {Subscription} from 'rxjs';
import {IMetric, SavingsCalculatorService} from './savings-calculator.service';
import {SavingsWidgetComponent} from './savings-widget/savings-widget.component';

@Component({
  selector: 'bd-savings-calculator',
  templateUrl: './savings-calculator.component.html',
  styleUrls: ['./savings-calculator.component.scss']
})
export class SavingsCalculatorComponent implements OnInit, OnDestroy {
  errorMessage: any;
  pendingRequest: Subscription;
  calcData: any;
  grandTotal: number = 0;
  bbData: Array<any> = [];
  bbPercent: number = 0;
  bbTotal: number = 0;
  bbSavings: number;
  isLoading: boolean = false;
  currentYear: number = 0;
  metrics: Array<IMetric> = [];
  pageName: string = 'app.client-dashboard.savings-calculator';
  @ViewChild(SavingsWidgetComponent, {static: false}) bbWidget: SavingsWidgetComponent;

  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public filtersService: FiltersService,
              public userService: UserService,
              public savingsService: SavingsCalculatorService,
              public commonServ: CommonService) {
    this.commonServ.pageTitle = 'Savings Calculator';
  }

  ngOnInit() {
    this.getSavingsCalculator(null);
  }
  getSavingsCalculator(evt: any): void {
    this.grandTotal = 0;
    this.isLoading = true;
    const params = this.filtersService.getCurrentUserCombinedFilters();
    this.pendingRequest = this.httpService.makeGetRequest('getSavingsCalculator', params).subscribe(
      (data: any) => {
      if (data.result) {
        this.calcData = data.result;
        this.formatData();
        this.isLoading = false;
      }
      },
      err => {
        this.errorMessage = err;
        this.isLoading = false;
      }
    );
  }
  formatData(): void {
    this.bbData = this.calcData.bb_percent || [];
    if (this.bbData.length > 0) {
      this.bbPercent = Math.round(this.bbData[this.currentYear].bbp);
      this.bbTotal = this.bbData[this.currentYear].total_block_billed;
      setTimeout(() => {
        this.bbWidget.setUpDefaults();
      });
    }
  }
  updateTotals(evt: number): void {
      this.bbSavings = evt;
      this.calculateGrandTotal();
  }
  calculateGrandTotal(): void {
    this.grandTotal = this.bbSavings;
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }
}
