import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../shared/services/common.service';
import {Subscription} from 'rxjs';
import {AppStateService, HttpService} from 'bodhala-ui-common';
import {FiltersService} from '../shared/services/filters.service';
import {IFirm} from './firm.model';
import {BillingTotalsComponent} from './billing-totals/billing-totals.component';
import {TopTimekeepersComponent} from './top-timekeepers/top-timekeepers.component';

@Component({
  selector: 'bd-firm',
  templateUrl: './firm.component.html',
  styleUrls: ['./firm.component.scss']
})
export class FirmComponent implements OnInit, OnDestroy {
  errorMessage: any;
  firmId: string;
  firm: IFirm;
  pageName: string = 'app.client-dashboard.firm-detail';
  excludeFilters = ['firms', 'treshold'];
  pendingRequest: Subscription;
  @ViewChild(BillingTotalsComponent, {static: false}) billingTotals: BillingTotalsComponent;
  @ViewChild(TopTimekeepersComponent, {static: false}) topTKs: TopTimekeepersComponent;
  constructor(private route: ActivatedRoute,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public filtersService: FiltersService,
              public commonServ: CommonService) {
    this.commonServ.pageTitle = 'Firms';
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.firmId = params.get('id');
      this.loadFirm();
    });
  }
  loadFirm(): void {
    const params = { id: this.firmId };
    this.pendingRequest = this.httpService.makeGetRequest('getFirm', params).subscribe(
      (data: any) => {
        const firms = data.result;
        if (firms && firms.length > 0) {
          this.firm = firms[0];
          this.commonServ.pageSubtitle = this.firm.name;
        }
      },
      err => {
        this.errorMessage = err;
      }
    );
  }
  refreshData(evt: any): void {
    this.billingTotals.loadTotals();
    this.topTKs.getTimekeepers();
  }
  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
