import {Component, ElementRef, HostListener,  OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../shared/services/common.service';
import {forkJoin, Observable, Subscription, Subject} from 'rxjs';
import * as _moment from 'moment';
import * as config from '../../shared/services/config';
const moment = _moment;
const _MS_PER_DAY = 1000 * 60 * 60 * 24;
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {IFirm, taxonomyChartOptions} from '../firm.model';
import {FiltersService} from '../../shared/services/filters.service';
import {MatDialog} from '@angular/material/dialog';
import {SavedReportsModalComponent} from '../saved-reports-modal/saved-reports-modal.component';

import {AnnotationsComponent} from '../../shared/components/annotations/annotations.component';
import {IUiAnnotation} from '../../shared/components/annotations/model';
import {SpendTrendChartComponent} from './spend-trend-chart/spend-trend-chart.component';

@Component({
  selector: 'bd-firm-rate-card',
  templateUrl: './firm-rate-card.component.html',
  styleUrls: ['./firm-rate-card.component.scss']
})
export class FirmRateCardComponent implements OnInit, OnDestroy {
  firmId: string;
  firm: IFirm;
  selectedPracticeArea: string = '';
  errorMessage: any;
  pendingRequest: Subscription;
  pendingRequestFirm: Subscription;
  pendingRequestPAs: Subscription;
  pendingRequestSummary: Subscription;
  practiceAreas: Array<string> = [];
  enddate: string;
  startdate: string;
  reportCardStartDate: string;
  reportCardEndDate: string;
  comparisonStartDate: string;
  comparisonEndDate: string = '2019-09-25';
  formattedComparisonStartDate: string;
  formattedComparisonEndDate: string;
  showToTop: boolean = false;
  savedReportsAvailable: boolean = false;
  savedReports: Array<any> = [];
  otherFirms: boolean = false;
  comparing: boolean = false;
  percentOfTotal: number;
  rank: number;
  selectedSavedFilterName: string = null;
  logoUrl: string;
  notes: Array<IUiAnnotation> = [];
  selectedTabIndex: number = 0;
  pageName: string = 'analytics-ui/firm/report-card/';
  pageType: string = 'Firm Report Card';
  excludeFilters = ['firms', 'threshold', 'matters', 'practice areas', 'internal'];
  @ViewChild(SpendTrendChartComponent) spendTrendChart: SpendTrendChartComponent;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const pageScroll = window.pageYOffset;
    if (pageScroll > 500) {
      this.showToTop = true;
    } else {
      this.showToTop = false;
    }
  }

  constructor(public commonServ: CommonService,
              private route: ActivatedRoute,
              private httpService: HttpService,
              public filtersService: FiltersService,
              public utilServ: UtilService,
              public userService: UserService,
              public router: Router,
              public matDialog: MatDialog,
              public appStateService: AppStateService) {
    this.commonServ.pageTitle = 'Firms > Report Card';
    this.logoUrl = this.formatLogoUrl(this.userService.currentUser.client_info.org.logo_url);
  }

  async ngOnInit() {
    const dates = this.filtersService.parseLSDateString();
    this.reportCardStartDate = dates.startdate;
    this.reportCardEndDate = dates.enddate;
    this.enddate = moment(dates.enddate).format('MMM DD, YYYY');
    this.startdate = moment(dates.startdate).format('MMM DD, YYYY');
    this.selectedSavedFilterName = localStorage.getItem('saved_filter_' + this.userService.currentUser.id.toString());
    const paramsLS = this.filtersService.parseLSQueryString();
    if (paramsLS.firms !== null && paramsLS.firms !== undefined) {
      this.otherFirms = true;
    }
    this.route.paramMap.subscribe(params => {
      this.firmId = params.get('id');
      this.initFirm();
      this.loadPAs();
    });
    this.matDialog.closeAll();
    await this.checkSavedReports();
  }

  initFirm(): void {
    this.loadFirm().subscribe(data => {
      let totalSpend = 1;
      if (this.otherFirms === false) {
        if (data[0].result) {
          const firms = data[0].result || [];
          if (firms.length > 0) {
            totalSpend = firms[0].total_billed_all || 1;
            // tslint:disable-next-line:prefer-for-of
            for (let ix = 0; ix < firms.length; ix++) {
              if (firms[ix].id.toString() === this.firmId) {
                this.rank = ix + 1;
              }
           }
            this.rank = this.rank ? this.rank : -1;
          }
        }
        if (data[1].result) {
          if (data[1].result) {
            const firms = data[1].result || [];
            if (firms.length > 0) {
              this.commonServ.pageSubtitle = firms[0].firm_name;
              this.firm = firms[0];
              this.percentOfTotal = firms[0].total_billed / totalSpend;
            }
          }
        }
      } else {

        if (data[0].result) {
          const firms = data[0].result || [];
          if (firms.length > 0) {
            totalSpend = firms[0].total_billed_all || 1;
            // tslint:disable-next-line:prefer-for-of
            for (let ix = 0; ix < firms.length; ix++) {
              if (firms[ix].id.toString() === this.firmId) {
                this.rank = ix + 1;
              }
           }
            this.rank = this.rank ? this.rank : -1;
          }
        }
        if (data[1].result) {
          if (data[1].result) {
            const firms = data[1].result || [];
            if (firms.length > 0) {
              // this conditional handles for the case when the firm RC being viewed is not in the saved filter firms list
              if (this.rank < 0) {
                totalSpend += firms[0].total_billed;
                const otherFirms = data[0].result || [];
                const currentFirm = firms[0];
                otherFirms.push(currentFirm);

                const spendPercentage = [];
                for (const tempFirm of otherFirms) {
                  spendPercentage.push([tempFirm.id, tempFirm.total_billed]);
                }
                spendPercentage.sort((a, b) =>  b[1] - a[1]);
                for (let i = 0; i < spendPercentage.length; i++) {
                  if (spendPercentage[i][0].toString() === this.firmId) {
                    this.rank = i + 1;
                  }
                }
                this.rank = this.rank ? this.rank : -1;
              }
              this.commonServ.pageSubtitle = firms[0].firm_name;
              this.firm = firms[0];
              this.percentOfTotal = firms[0].total_billed / totalSpend;
            }
          }
        }
      }

    }, err => {
      this.errorMessage = err;
    });
  }

  loadFirm(): Observable<any> {
    const params = this.filtersService.getCurrentUserCombinedFilters();
    const response1 = this.httpService.makeGetRequest('getTopFirms', params);
    const arr = [];
    arr.push(this.firmId.toString());
    params.firms = JSON.stringify(arr);
    const response2 = this.httpService.makeGetRequest('getTopFirms', params);
    return forkJoin([response1, response2]);
  }

  loadPAs(): void {
    this.practiceAreas = [];
    const combined = this.filtersService.getCurrentUserCombinedFilters();
    const arr = [];
    arr.push(this.firmId.toString());
    combined.firms = JSON.stringify(arr);
    const params = {...combined, filter_name: 'practiceAreas', limit: 100};
    this.pendingRequestPAs = this.httpService.makeGetRequest('getOptionsForFilter', params).subscribe(
      (data: any) => {
        this.practiceAreas.push(this.selectedPracticeArea);
        let pas = data.result.map(e => e.id) || [];
        pas = pas.sort();
        this.practiceAreas = [...this.practiceAreas, ...pas];
      },
      err => {
        this.errorMessage = err;
      }
    );
  }

  checkSavedReports(): Promise<Subscription> {
    const params = this.filtersService.getCurrentUserCombinedFilters();
    const arr = [];
    if (this.firmId) {
      arr.push(this.firmId.toString());
      params.firmId = JSON.stringify(arr);
    }
    return new Promise((resolve, reject) => {
      return this.httpService.makeGetRequest('getSavedExports', params).subscribe(
        (data: any) => {
          if (!data.result) {
            return;
          }
          this.savedReportsAvailable = true;
          this.savedReports = data.result;
          resolve();
        }
      );
    });
  }

  async showSavedReports(): Promise<void> {
    await this.checkSavedReports();
    this.matDialog.open(SavedReportsModalComponent, {
      data: this.savedReports
    });
  }

  export(): void {
      this.commonServ.pdfLoading = true;
      setTimeout(() => {
        this.commonServ.generatePdfOuter(this.commonServ.pageSubtitle + ' Rate Card', 'pdfDiv', this.firmId);
        this.checkSavedReports();
      }, 200);
  }

  editReportCard(): void {
    this.router.navigate(['/analytics-ui/firm/', this.firmId]);
  }
  goToTop(): void {
    window.scroll(0, 0);
  }
  formatLogoUrl(url: string): string {
    let result = '';
    if (!url) {
      return result;
    }
    const ix = url.indexOf('/img/clients/');
    if (config.IS_LOCAL) {
      result = config.HOST + url.substring(ix);
    } else {
      result = 'https://' + window.location.host + url.substring(ix);
    }
    return result;
  }
  loadNotes(notes: Array<IUiAnnotation>): void {
    this.notes = Object.assign([], notes);
  }
  refreshData(evt: any): void {
    this.commonServ.changeReportCardFilters(true);
    this.commonServ.changeReportCardStartDate(this.reportCardStartDate);
    this.commonServ.changeReportCardEndDate(this.reportCardEndDate);
    this.spendTrendChart.getSpendByQuarter();
    const params = this.filtersService.getCurrentUserCombinedFilters();
    const startDate = params.startdate;
    const endDate = params.enddate;
    this.formattedComparisonStartDate = moment(startDate).format('MMM DD, YYYY');
    this.formattedComparisonEndDate = moment(endDate).format('MMM DD, YYYY');

  }
  getCompareDates(dates): void {
    let startDate = dates.startdate;
    let endDate = dates.enddate;
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    let comparisonStartDateTemp = new Date(this.comparisonEndDate);
    let daysDiff = Math.floor((Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) - Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()) ) /(_MS_PER_DAY));
    comparisonStartDateTemp.setDate(comparisonStartDateTemp.getDate() - daysDiff);
    this.comparisonStartDate = comparisonStartDateTemp.toISOString().slice(0, 10);
    this.formattedComparisonStartDate = moment(this.comparisonStartDate).format('MMM DD, YYYY');
    this.formattedComparisonEndDate = moment(this.comparisonEndDate).format('MMM DD, YYYY');
  }
  changeTab(evt): void {
    this.selectedTabIndex = evt.index;
    if (this.selectedTabIndex === 1) {
      const dates = this.filtersService.parseLSDateString();
      this.getCompareDates(dates);
    }
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequestPAs) {
      this.pendingRequestPAs.unsubscribe();
    }
  }

}
