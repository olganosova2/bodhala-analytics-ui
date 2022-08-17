import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {CommonService} from '../../../shared/services/common.service';
import {FrcServiceService, IFRCTimekeeper} from '../frc-service.service';
import {FiltersService} from '../../../shared/services/filters.service';
import {Subscription} from 'rxjs';
import {MatterAnalysisService} from '../../../matters/matter-executive-summary/matter-analysis.service';

@Component({
  selector: 'bd-frc-timekeepers',
  templateUrl: './frc-tables.component.html',
  styleUrls: ['./frc-tables.component.scss']
})
export class FrcTablesComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  pendingRequestSmartPAs: Subscription;
  pendingRequestMatters: Subscription;
  @Input() filterSet: any;
  @Input() firmId: number;
  timekeepers: Array<IFRCTimekeeper> = [];
  smartPAs: Array<any> = [];
  matters: Array<any> = [];
  isSmartPA: boolean = false;
  mattersLoaded: boolean = true;

  constructor( private httpService: HttpService,
               public commonServ: CommonService,
               public frcService: FrcServiceService,
               public userService: UserService,
               public appStateService: AppStateService,
               public matterAnalysisService: MatterAnalysisService,
               public utilService: UtilService,
               public filtersService: FiltersService) { }

  ngOnInit(): void {
    const strSmartPAs = this.commonServ.getClientPASetting();
    this.isSmartPA = strSmartPAs === 'Smart Practice Areas' || strSmartPAs === 'Both';
    this.getMatters();
    this.getTimekeepers();
    this.getSmartPAs();
  }
  getSmartPAs(): void {
    const params = { ... this.getParams(), ... {bodhalaPAs: this.isSmartPA }};
    this.pendingRequest = this.httpService.makeGetRequest('getPracticeArea', params).subscribe(
      (data: any) => {
        if (data.result && data.result.length > 0) {
          this.smartPAs = (data.result || []).sort(this.utilService.dynamicSort('-total_billed'));
          this.frcService.processTotalSpend(this.smartPAs);
          const totalHours = this.frcService.processTotals(this.smartPAs, 'total_hours');
          const totalSpend = this.frcService.processTotals(this.smartPAs, 'total_billed');
          for (const rec of this.smartPAs) {
            rec.percent_of_hours = this.frcService.getPercentOfWork(rec.total_hours, totalHours);
            rec.percent_of_spend = this.frcService.getPercentOfWork(rec.total_billed, totalSpend);
          }
        }
      }
    );

  }
  getMatters(): void {
    this.mattersLoaded = false;
    this.pendingRequest = this.httpService.makeGetRequest<IFRCTimekeeper>('getSpendByMatterTable', this.getParams()).subscribe(
      (data: any) => {
        this.mattersLoaded = true;
        if (data.result && data.result.length > 0) {
          this.matters = data.result || [];
          this.processMatters(this.matters);
        }
      }
    );

  }
  getTimekeepers(): void {
    this.pendingRequest = this.httpService.makeGetRequest<IFRCTimekeeper>('getFRCTimekeepers', this.getParams()).subscribe(
      (data: any) => {
        if (data.result && data.result.length > 0) {
         this.timekeepers = data.result || [];
         this.matterAnalysisService.processTks(this.timekeepers);
        }
      }
    );

  }
  getParams(): any {
    const params = Object.assign({}, this.filterSet);
    const arr = [];
    if (this.firmId) {
      arr.push(this.firmId.toString());
      params.firms = JSON.stringify(arr);
    }
    if (params.peerFirms) {
      delete params.peerFirms;
    }
    return params;
  }
  processMatters(matters: Array<any>): void {
    for (const rec of this.matters) {
      rec.matter_cost = rec.total_billed + rec.total_afa;
      rec.matter_cost_including_expenses = rec.total_billed + rec.total_afa + rec.total_expenses;
      rec.matter_cost = this.filtersService.includeExpenses ? rec.matter_cost_including_expenses : rec.matter_cost;
      rec.total_billed_and_afa = rec.total_billed + rec.total_afa;
      if (rec.total_hours > 0 && rec.total_hours !== null) {
        rec.partner_hours_per = (rec.partner_hours / rec.total_hours) * 100;
        rec.associate_hours_per = (rec.associate_hours / rec.total_hours) * 100;
        const othersHours = rec.total_hours - rec.partner_hours - rec.associate_hours;
        rec.others_hours_per = (othersHours / rec.total_hours) * 100;
      } else {
        rec.partner_hours_per = 0;
        rec.associate_hours_per = 0;
        rec.others_hours_per = 0;
      }
      this.formamMatterPercentOfWork(rec);
      const clientPa = rec.client_matter_type && rec.client_matter_type.length > 0 ? rec.client_matter_type[0] : 'N/A';
      rec.practice_area = this.isSmartPA ? rec.bodhala_practice_area : clientPa;
    }
    this.matters = this.matters.sort(this.utilService.dynamicSort('-matter_cost')).slice(0, 5);
  }
  formamMatterPercentOfWork(rec: any): void {
    rec.staffing_leverage = Math.round(rec.partner_hours_per) + '% Partner / ' + Math.round(rec.associate_hours_per) + '% Associate / ' + Math.round(rec.others_hours_per) + '% Other';
  }
  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
    if (this.pendingRequestSmartPAs) {
      this.pendingRequestSmartPAs.unsubscribe();
    }
    if (this.pendingRequestMatters) {
      this.pendingRequestMatters.unsubscribe();
    }
  }

}
