import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../../shared/services/common.service';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../../shared/services/filters.service';
import {MatDialog} from '@angular/material/dialog';
import {MatterAnalysisService} from '../matter-analysis.service';
import {Subscription} from 'rxjs';
import {BMSetupType, IMatterOverview} from '../model';
import {IBmMatters} from '../../../admin/benchmark-matters/model';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'bd-matter-benchmarking-landing',
  templateUrl: './matter-benchmarking-landing.component.html',
  styleUrls: ['../matter-executive-summary.component.scss', './matter-benchmarking-landing.component.scss']
})
export class MatterBenchmarkingLandingComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  userBMSetup: BMSetupType;
  selectedByAdminMatters: Array<string> = [];
  selectedByAdminSmartPAs: Array<string> = [];
  smartPAs: Array<SelectItem> = [];
  smartPA: SelectItem[];
  matters: Array<IMatterOverview> = [];

  constructor(private route: ActivatedRoute,
              public commonServ: CommonService,
              public appStateService: AppStateService,
              public userService: UserService,
              private httpService: HttpService,
              public filtersService: FiltersService,
              public utilService: UtilService,
              public matterAnalysisService: MatterAnalysisService) {
    this.commonServ.pageTitle = 'Practice Area Overview';
  }

  ngOnInit(): void {
    this.checkConfig();
    // this.getBMEligibleMattersByPA();
  }
  checkConfig(): void {
    if (this.userService.config !== undefined) {
      if (this.userService.config && this.userService.config['benchmarks.matter.config']) {
        const configs = this.userService.config['benchmarks.matter.config'].configs || [];
        if (configs.length > 0) {
          const json = configs[0].json_config;
          if (json.hideButton === 1) {
            return;
          }
          if (json.matters && json.matters.length > 0) {
            this.userBMSetup = BMSetupType.SelectedMatters;
            this.selectedByAdminMatters = Object.assign([], json.matters);
            this.getSelectedMattersData();
            return;
          }
          if (json.smartPAs && json.smartPAs.length > 0) {
            this.userBMSetup = BMSetupType.SmartPAs;
            this.selectedByAdminSmartPAs = Object.assign([], json.smartPAs);
            this.smartPAs = this.formatSmartDD(json.smartPAs);
            return;
          }
          this.userBMSetup = BMSetupType.AllMatters;
          this.getSmartPAs();
        }
      }
    }
  }
  getSelectedMattersData(): void {
    const params = {clientId: this.userService.currentUser.client_info.id, matters: JSON.stringify(this.selectedByAdminMatters)};
    this.pendingRequest = this.httpService.makeGetRequest<IBmMatters>('getClientBMMatters', params).subscribe(
      (data: any) => {
        if (!data.result  || data.error) {
          return;
        }
        this.matters = Object.assign([], data.result);
        for (const rec of this.matters) {
          rec.total_billed = this.filtersService.includeExpenses ? rec.total_billed + rec.total_expenses : rec.total_billed;
          this.matterAnalysisService.processLandingMatter(rec);
        }
      }
    );
  }
  getSmartPAs(): void {
    const params = {clientId: this.userService.currentUser.client_info.id };
    this.pendingRequest = this.httpService.makeGetRequest('getPracticeAreasListByClient', params).subscribe(
      (data: any) => {
        if (!data.result || !data.result.bodhala) {
          return;
        }
        this.smartPAs = this.formatSmartDD(data.result.bodhala);
      }
    );
  }
  formatSmartDD(pas: Array<string>): Array<SelectItem> {
    const result = [];
    result.push( {value: null, label: '--Select--'});
    for (const pa of pas) {
      result.push( {value: pa, label: pa});
    }
    return result;
  }
  getBMEligibleMattersByPA(evt: SelectItem): void {
    if (!evt.value) {
      return;
    }
    const params = {
      clientId: this.userService.currentUser.client_info.id,
      smartPa: evt.value, // 'Real Estate', // 'Capital Markets',
      orderBy: 'total_billed desc'
    };
    this.pendingRequest = this.httpService.makeGetRequest('getBMEligibleMattersByPA', params).subscribe(
      (data: any) => {
        if (!data.result  || data.error) {
          return;
        }
        this.matters = Object.assign([], data.result);
        for (const rec of this.matters) {
          rec.total_billed = this.filtersService.includeExpenses ? rec.total_billed + rec.total_expenses : rec.total_billed;
          this.matterAnalysisService.processLandingMatter(rec);
        }
      }
    );
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
