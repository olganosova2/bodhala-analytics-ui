import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {CommonService} from '../../../shared/services/common.service';
import {FrcServiceService, IFRCTimekeeper} from '../frc-service.service';
import {FiltersService} from '../../../shared/services/filters.service';
import {Subscription} from 'rxjs';
import {TK_LEVELS_SHORT_MAP} from '../../../benchmarks/benchmark.service';
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
  @Input() startDate: string;
  @Input() endDate: string;
  @Input() firmId: number;
  timekeepers: Array<IFRCTimekeeper> = [];
  smartPAs: Array<any> = [];

  constructor( private httpService: HttpService,
               public commonServ: CommonService,
               public frcService: FrcServiceService,
               public userService: UserService,
               public appStateService: AppStateService,
               public matterAnalysisService: MatterAnalysisService,
               public utilService: UtilService,
               public filtersService: FiltersService) { }

  ngOnInit(): void {
    this.getTimekeepers();
    this.getSmartPAs();
  }
  getSmartPAs(): void {
    const strSmartPAs = this.commonServ.getClientPASetting();
    const isSmartPA = strSmartPAs === 'Smart Practice Areas' || strSmartPAs === 'Both';
    const params = { ... this.getParams(), ... {bodhalaPAs: isSmartPA }};
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
    const params = {clientId: this.userService.currentUser.client_info_id, startdate: this.startDate, enddate: this.endDate, firms: null};
    const arr = [];
    if (this.firmId) {
      arr.push(this.firmId.toString());
      params.firms = JSON.stringify(arr);
    }
    return params;
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
