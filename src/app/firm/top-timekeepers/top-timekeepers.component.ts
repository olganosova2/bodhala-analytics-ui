import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IFirm, ITimekeeper} from '../firm.model';
import {Subscription} from 'rxjs';
import {HttpService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import {CommonService} from '../../shared/services/common.service';

@Component({
  selector: 'bd-top-timekeepers',
  templateUrl: './top-timekeepers.component.html',
  styleUrls: ['./top-timekeepers.component.scss']
})
export class TopTimekeepersComponent implements OnInit, OnDestroy {
  timekeepers: Array<ITimekeeper> = [];
  helpText: string = 'Hourly rates for each timekeeper display the most current rate for the time period selected.';
  @Input() firmId: number;
  @Input() firm: IFirm;
  pendingRequest: Subscription;
  constructor(private httpService: HttpService,
              public commonServ: CommonService,
              public filtersService: FiltersService) { }

  ngOnInit() {
    this.getTimekeepers();
  }

  getTimekeepers(): void {
    const params = this.filtersService.getCurrentUserCombinedFilters();
    const arr = [];
    arr.push(this.firmId.toString());
    params.firms = JSON.stringify(arr);
    this.pendingRequest = this.httpService.makeGetRequest('getTopTimekeepers', params).subscribe(
      (data: any) => {
        this.timekeepers = data.result;
      }
    );
  }
  goToView(): void {
    window.location.href = '/#/app/client-dashboard/timekeepers?firmId=' + this.firmId.toString();
  }
  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }
}
