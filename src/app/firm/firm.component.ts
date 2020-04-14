import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../shared/services/common.service';
import {Subscription} from 'rxjs';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {FiltersService} from '../shared/services/filters.service';
import {IFirm, IFirmData} from './firm.model';
import {BillingTotalsComponent} from './billing-totals/billing-totals.component';
import {TopTimekeepersComponent} from './top-timekeepers/top-timekeepers.component';
import {TopMattersComponent} from './top-matters/top-matters.component';
import {SpendByMonthComponent} from './spend-by-month/spend-by-month.component';
import {DiversityComponent} from './diversity/diversity.component';
import {ScoreTrendComponent} from './score-trend/score-trend.component';
import {UtbmsComponent} from './utbms/utbms.component';

@Component({
  selector: 'bd-firm',
  templateUrl: './firm.component.html',
  styleUrls: ['./firm.component.scss']
})
export class FirmComponent implements OnInit, OnDestroy {
  errorMessage: any;
  firmId: string;
  firm: IFirm;
  pageName: string = 'app.client-dashboard.firm-detail';
  excludeFilters = ['firms', 'treshold'];
  firmData: IFirmData;
  rightColsCount: number = 12;
  helpText: string = 'The data points included below show current firmographic information on this law firm';
  pendingRequest: Subscription;
  pendingRequestFirm: Subscription;
  @ViewChild(BillingTotalsComponent, {static: false}) billingTotals: BillingTotalsComponent;
  @ViewChild(TopTimekeepersComponent, {static: false}) topTKs: TopTimekeepersComponent;
  @ViewChild(TopMattersComponent, {static: false}) topMatters: TopMattersComponent;
  @ViewChild(SpendByMonthComponent, {static: false}) spendByMonth: SpendByMonthComponent;
  @ViewChild(DiversityComponent, {static: false}) diversity: DiversityComponent;
  @ViewChild(UtbmsComponent, {static: false}) utbms: UtbmsComponent;
  @ViewChild(ScoreTrendComponent, {static: false}) scoreAndTrend: ScoreTrendComponent;

  constructor(private route: ActivatedRoute,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public filtersService: FiltersService,
              public userService: UserService,
              public commonServ: CommonService) {
    this.commonServ.pageTitle = 'Firms';
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.firmId = params.get('id');
      this.loadFirm();
      this.getFirmData();
    });
  }

  loadFirm(): void {
    const params = {id: this.firmId};
    this.pendingRequestFirm = this.httpService.makeGetRequest('getFirm', params).subscribe(
      (data: any) => {
        const firms = data.result;
        if (firms && firms.length > 0) {
          this.firm = firms[0];
          this.commonServ.pageSubtitle = this.firm.name;
        }
      },
      err => {
        this.errorMessage = err;
      }
    );
  }

  getFirmData(): void {
    const params = {firmId: this.firmId};
    this.pendingRequest = this.httpService.makeGetRequest('getFirmographicInfo', params).subscribe(
      (data: any) => {
        this.firmData = data.result;
        this.rightColsCount = this.firmData !== null && this.firmData.num_attorneys_range !== null ? 9 : 12;
      },
      err => {
        this.errorMessage = err;
      }
    );
  }

  refreshData(evt: any): void {
    this.billingTotals.loadTotals();
    this.topTKs.getTimekeepers();
    this.topMatters.getMatters();
    this.spendByMonth.getSpendByMonth();
    if (this.diversity && this.userService.hasEntitlement('data.analytics.diversity')) {
      this.diversity.getDiversity();
    }
    if (this.utbms && this.userService.hasEntitlement('analytics.utbms.codes')) {
      this.utbms.getUTBMS();
    }
  }

  toggleExpenses(): void {
    this.filtersService.includeExpenses = !this.filtersService.includeExpenses;
    localStorage.setItem('include_expenses_' + this.userService.currentUser.id.toString(), this.filtersService.includeExpenses.toString());
    this.billingTotals.formatItems();
    this.topMatters.processMatters();
    this.spendByMonth.renderChart();
  }

  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
    if (this.pendingRequestFirm) {
      this.pendingRequestFirm.unsubscribe();
    }
  }

}
