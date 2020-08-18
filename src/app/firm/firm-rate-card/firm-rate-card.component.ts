import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../shared/services/common.service';
import {forkJoin, Observable, Subscription} from 'rxjs';
import * as _moment from 'moment';
import * as config from '../../shared/services/config';
const moment = _moment;
import {HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {IFirm} from '../firm.model';
import {FiltersService} from '../../shared/services/filters.service';

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
  pendingRequestFirm: Subscription;
  pendingRequestPAs: Subscription;
  pendingRequestSummary: Subscription;
  practiceAreas: Array<string> = [];
  enddate: string;
  startdate: string;
  showToTop: boolean = false;
  otherFirms: boolean = false;
  percentOfTotal: number;
  rank: number;
  selectedSavedFilterName: string = null;
  logoUrl: string;

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
              public router: Router,
              private userService: UserService) {
    this.commonServ.pageTitle = 'Firms > Report Card';
    this.logoUrl = this.formatLogoUrl(this.userService.currentUser.client_info.org.logo_url);
  }

  ngOnInit() {
    const dates = this.filtersService.parseLSDateString();
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
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequestPAs) {
      this.pendingRequestPAs.unsubscribe();
    }
  }

}
