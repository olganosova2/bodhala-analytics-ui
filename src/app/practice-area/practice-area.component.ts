import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../shared/services/common.service';
import {Subscription} from 'rxjs';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {FiltersService} from '../shared/services/filters.service';
import {IPracticeArea, IPracticeAreaData} from './practice-area.model';
import {BillingTotalsPaComponent} from './billing-totals-pa/billing-totals-pa.component';
import {PaSpendByMonthComponent} from './pa-spend-by-month/pa-spend-by-month.component';



@Component({
  selector: 'bd-practice-area',
  templateUrl: './practice-area.component.html',
  styleUrls: ['./practice-area.component.scss']
})
export class PracticeAreaComponent implements OnInit {
  errorMessage: any;
  clientMatterType: string;
  practiceArea: IPracticeArea;
  pageName: string = 'app.client-dashboard.practice-area-detail';
  pageType: string = 'Practice Areas';
  excludeFilters = ['practice areas', 'threshold'];
  practiceAreaData: IPracticeAreaData;
  rightColsCount: number = 12;
  pendingRequest: Subscription;
  pendingRequestFirm: Subscription;
  @ViewChild(BillingTotalsPaComponent, {static: false}) paBillingTotals: BillingTotalsPaComponent;
  @ViewChild(PaSpendByMonthComponent, {static: false}) paSpendByMonth: PaSpendByMonthComponent;


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
    this.pendingRequestFirm = this.httpService.makeGetRequest('getPracticeArea', params).subscribe(
      (data: any) => {
        const practiceAreas = data.result;
        if (practiceAreas && practiceAreas.length > 0) {
          for (let pa of practiceAreas) {
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
    this.paBillingTotals.loadTotals();
    // this.topTKs.getTimekeepers();
    // this.topMatters.getMatters();
    this.paSpendByMonth.getSpendByMonth();
    // if (this.diversity && this.userService.hasEntitlement('data.analytics.diversity')) {
    //   this.diversity.getDiversity();
    // }
    // if (this.utbms && this.userService.hasEntitlement('analytics.utbms.codes')) {
    //   this.utbms.getUTBMS();
    // }
  }





  toggleExpenses(): void {
    this.filtersService.includeExpenses = !this.filtersService.includeExpenses;
    localStorage.setItem('include_expenses_' + this.userService.currentUser.id.toString(), this.filtersService.includeExpenses.toString());
    //REPLACE THESE WITH FUNCTION CALLS ON PA PAGE
    // this.billingTotals.formatItems();
    // this.topMatters.processMatters();
    // this.spendByMonth.renderChart();
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
