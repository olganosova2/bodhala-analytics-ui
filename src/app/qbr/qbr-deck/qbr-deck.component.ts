import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../shared/services/common.service';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import {QbrService} from '../qbr.service';
import {IPayloadDates, IQbrReport, QbrType} from '../qbr-model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'bd-qbr-deck',
  templateUrl: './qbr-deck.component.html',
  styleUrls: ['../qbr-css.scss', './qbr-deck.component.scss']
})
export class QbrDeckComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  pendingRequestQbr: Subscription;
  qbrType: QbrType = QbrType.YoY;
  qbr: IQbrReport;
  qbrId: number;
  selectedTabIndex: number = 4;
  cardTitle: string;
  totalSpend: number = 0;
  practiceAreaSetting: string;
  qbrData: any;
  queryString: string;
  includeExpenses: boolean;
  reportDates: IPayloadDates;
  currentPAs: Array<any> = [];
  cardNum: number = 14;
  zoom: boolean = true;
  @ViewChild('tabGroup') tabGroup;
  constructor(private route: ActivatedRoute,
              public commonServ: CommonService,
              public appStateService: AppStateService,
              public userService: UserService,
              private httpService: HttpService,
              public filtersService: FiltersService,
              public qbrService: QbrService,
              public router: Router,
              public utilService: UtilService) {
      this.commonServ.pageTitle = 'View QBR';
      this.commonServ.pageSubtitle = 'Executive Summary';
      this.practiceAreaSetting = this.commonServ.getClientPASetting();
      this.cardTitle = this.userService.currentUser.client_info.org.name + ' QBR';
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {  this.qbrId = params.qbrId; });
    if (this.qbrId) {
      this.getQbr();
    }
  }
  getQbr(): void {
    const params = { report: this.qbrId};
    this.pendingRequest = this.httpService.makeGetRequest('getClientQBR', params).subscribe(
      (data: any) => {
        if (data.result) {
          this.qbr = data.result;
          this.qbrType = this.qbr.report_type;
          if (this.qbr.querystring && this.qbr.querystring.expenses) {
            this.includeExpenses = this.qbr.querystring.expenses === 'true';
            this.queryString = this.qbr.querystring;
          }
          this.getQbrData();
        }
      }
    );
  }
  getQbrData(): void {
    const dates = this.qbrService.formatPayloadDates(this.qbr.start_date, this.qbr.report_type);
    this.reportDates = dates;
    const payload = {
      startDate: dates.startDate,
      endDate: dates.endDate,
      client: this.userService.currentUser.client_info.id,
      comparisonStartDate: dates.comparisonStartDate,
      comparisonEndDate: dates.comparisonEndDate,
      paSetting: this.practiceAreaSetting,
    };
    const params = { ... this.qbr.querystring, ... payload };
    this.pendingRequest = this.httpService.makeGetRequest('getClientQBRData', params).subscribe(
      (data: any) => {
        if (data && data.result) {
          const response = data.result;
          if (response && response.report_timeframe_metrics) {
            if (response.report_timeframe_top_pas && response.report_timeframe_top_pas.length > 2) {
              response.report_timeframe_top_pas = response.report_timeframe_top_pas.slice(0, 2);
            }
            this.qbrData = response;
            const currentTotal = this.includeExpenses ? this.qbrData.report_timeframe_metrics.total_spend_including_expenses : this.qbrData.report_timeframe_metrics.total_spend;
            this.totalSpend = currentTotal.total;
            this.currentPAs = Object.assign([], this.qbrData.report_timeframe_top_pas) || [];
          }
        }
      }
    );
  }
  changeTab(evt): void {
    this.commonServ.pageSubtitle = evt.tab.textLabel;
    this.selectedTabIndex = evt.index;
  }
  export(): void {
    const tabsLength = this.tabGroup._allTabs.length;
    const activeTab = this.tabGroup.selectedIndex;
    const divId = (tabsLength - activeTab === 1) ? 'exportAll' : 'exportPage';
    this.commonServ.generatePDFQbr(this.cardTitle, divId);
  }
  goBack(): void {
    this.router.navigate(['/analytics-ui/qbrs/dashboard']);
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
    if (this.pendingRequestQbr) {
      this.pendingRequestQbr.unsubscribe();
    }
  }

}
