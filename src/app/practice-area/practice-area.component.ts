import {Component, OnDestroy, OnInit, ViewChild, ɵCompiler_compileModuleSync__POST_R3__} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../shared/services/common.service';
import {Subscription} from 'rxjs';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {FiltersService} from '../shared/services/filters.service';
import {IPracticeArea, IPracticeAreaData} from './practice-area.model';
import {BillingTotalsComponent} from '../firm/billing-totals/billing-totals.component';
import {SpendByMonthComponent} from '../firm/spend-by-month/spend-by-month.component';
import {TopMattersComponent} from '../firm/top-matters/top-matters.component';
import {ScoreTrendComponent} from '../firm/score-trend/score-trend.component';
import {DiversityComponent} from '../firm/diversity/diversity.component';
import {UtbmsComponent} from '../firm/utbms/utbms.component';
import {PaTopFirmsComponent} from './pa-top-firms/pa-top-firms.component';
import {PaTopLeadPartnersComponent} from './pa-top-lead-partners/pa-top-lead-partners.component';


@Component({
  selector: 'bd-practice-area',
  templateUrl: './practice-area.component.html',
  styleUrls: ['./practice-area.component.scss']
})
export class PracticeAreaComponent implements OnInit, OnDestroy {
  errorMessage: any;
  clientMatterType: string;
  practiceArea: IPracticeArea;
  pageName: string = 'app.client-dashboard.practice-area-detail';
  pageType: string = 'Practice Areas';
  excludeFilters = ['practice areas', 'threshold'];
  practiceAreaData: IPracticeAreaData;
  rightColsCount: number = 12;
  pendingRequest: Subscription;
  pendingRequestPracticeArea: Subscription;
  @ViewChild(BillingTotalsComponent) billingTotals: BillingTotalsComponent;
  @ViewChild(SpendByMonthComponent) spendByMonth: SpendByMonthComponent;
  @ViewChild(TopMattersComponent) topMatters: TopMattersComponent;
  @ViewChild(ScoreTrendComponent) scoreTrend: ScoreTrendComponent;
  @ViewChild(DiversityComponent) diversity: DiversityComponent;
  @ViewChild(UtbmsComponent) utbms: UtbmsComponent;

  @ViewChild(PaTopLeadPartnersComponent) topLeadPartners: PaTopLeadPartnersComponent;
  @ViewChild(PaTopFirmsComponent) topFirms: PaTopFirmsComponent;

  constructor(private route: ActivatedRoute,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public filtersService: FiltersService,
              public userService: UserService,
              public commonServ: CommonService) {
    this.commonServ.pageTitle = 'Practice Areas';
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.clientMatterType = params.get('client_matter_type');
      this.loadPracticeArea();
    });
  }

  loadPracticeArea(): void {
    const params = {client_matter_type: this.clientMatterType};
    this.pendingRequestPracticeArea = this.httpService.makeGetRequest('getPracticeArea', params).subscribe(
      (data: any) => {
        const practiceAreas = data.result;
        if (practiceAreas && practiceAreas.length > 0) {
          for (const pa of practiceAreas) {
            if (pa.client_matter_type === this.clientMatterType) {
              this.practiceArea = pa;
              this.commonServ.pageSubtitle = this.clientMatterType;
            }
          }
        }
      },
      err => {
        this.errorMessage = err;
      }
    );
  }

  refreshData(evt: any): void {
    this.billingTotals.loadTotals();
    this.topLeadPartners.getLeadPartners();
    this.topMatters.getMatters();
    this.spendByMonth.getSpendByMonth();
    this.topFirms.getTopFirms();
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
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
    if (this.pendingRequestPracticeArea) {
      this.pendingRequestPracticeArea.unsubscribe();
    }
  }
}
