import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
import {MatDialog} from '@angular/material/dialog';
import {SAVINGS_CALCULATOR_CONFIG} from '../shared/services/config';
import {FirmDiscountsComponent} from './firm-discounts/firm-discounts.component';
import {IUiAnnotation} from '../shared/components/annotations/model';
import {DiversityChartsComponent} from './diversity-charts/diversity-charts.component';


@Component({
  selector: 'bd-firm',
  templateUrl: './firm.component.html',
  styleUrls: ['./firm.component.scss']
})
export class FirmComponent implements OnInit, AfterViewInit, OnDestroy {
  firmId: string;
  firm: IFirm;
  pageName: string = 'app.client-dashboard.firm-detail';
  pageType: string = 'Firms';
  excludeFilters = ['firms', 'treshold'];
  firmData: IFirmData;
  rightColsCount: number = 12;
  helpText: string = 'The data points included below show current firmographic information on this law firm';
  pendingRequest: Subscription;
  pendingRequestFirm: Subscription;
  discountsConfig: any;
  notes: Array<IUiAnnotation> = [];
  @ViewChild(BillingTotalsComponent) billingTotals: BillingTotalsComponent;
  @ViewChild(TopTimekeepersComponent) topTKs: TopTimekeepersComponent;
  @ViewChild(TopMattersComponent) topMatters: TopMattersComponent;
  @ViewChild(SpendByMonthComponent) spendByMonth: SpendByMonthComponent;
  @ViewChild(DiversityChartsComponent) diversityCharts: DiversityChartsComponent;
  @ViewChild(UtbmsComponent) utbms: UtbmsComponent;
  @ViewChild(ScoreTrendComponent) scoreAndTrend: ScoreTrendComponent;

  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public filtersService: FiltersService,
              public userService: UserService,
              public dialog: MatDialog,
              public commonServ: CommonService) {
    this.commonServ.pageTitle = 'Firms';
  }

  ngOnInit() {
    this.checkDiscountsPermission();
    this.route.paramMap.subscribe(params => {
      this.firmId = params.get('id');
      this.loadFirm();
      this.getFirmData();
    });
  }
  ngAfterViewInit() {
    setTimeout(() => {
      if (this.diversityCharts && this.userService.hasEntitlement('data.analytics.diversity')) {
        this.diversityCharts.load();
      }
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
      }
    );
  }

  getFirmData(): void {
    const params = {firmId: this.firmId};
    this.pendingRequest = this.httpService.makeGetRequest('getFirmographicInfo', params).subscribe(
      (data: any) => {
        this.firmData = data.result;
        this.rightColsCount = this.firmData !== null && this.firmData.num_attorneys_range !== null ? 9 : 12;
      }
    );
  }

  refreshData(evt: any): void {
    this.billingTotals.loadTotals();
    this.topTKs.getTimekeepers();
    this.topMatters.getMatters();
    this.spendByMonth.getSpendByMonth();
    this.scoreAndTrend.ngOnInit();

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
  viewReportCard(): void {
    this.router.navigate(['/analytics-ui/firm/report-card/', this.firmId]);
  }
  openDiscounts(): void {
    const packaged = { firm: this.firm, config: this.discountsConfig};
    const modalConfig = {...SAVINGS_CALCULATOR_CONFIG.detailsDialogConfig, data: Object.assign([], packaged)};
    const dialogRef = this.dialog.open(FirmDiscountsComponent, {...modalConfig, disableClose: false });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  checkDiscountsPermission(): void {
    const configDiscount = this.userService.config['analytics.discounts'];
    if (configDiscount) {
      const configs = configDiscount.configs || [];
      if (configs.length > 0) {
        this.discountsConfig = configs[0].json_config;
      }
    }
  }
  loadNotes(notes: Array<IUiAnnotation>): void {
    this.notes = Object.assign([], notes);
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
    if (this.pendingRequestFirm) {
      this.pendingRequestFirm.unsubscribe();
    }
  }
}
