import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IFirm} from '../firm.model';
import {Subscription} from 'rxjs';
import {HttpService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';

@Component({
  selector: 'bd-top-matters',
  templateUrl: './top-matters.component.html',
  styleUrls: ['./top-matters.component.scss']
})
export class TopMattersComponent implements OnInit, OnDestroy {
  errorMessage: any;
  matters: Array<any> = [];
  @Input() firmId: number;
  @Input() firm: IFirm;
  pendingRequest: Subscription;
  constructor(private httpService: HttpService,
              public filtersService: FiltersService) { }

  ngOnInit() {
    this.getMatters();
  }
  getMatters(): void {
    const params = this.filtersService.getCurrentUserCombinedFilters();
    const arr = [];
    arr.push(this.firmId.toString());
    params.firms = JSON.stringify(arr);
    this.pendingRequest = this.httpService.makeGetRequest('getTopMatters', params).subscribe(
      (data: any) => {
        this.matters = data.result;
      },
      err => {
        this.errorMessage = err;
      }
    );
  }
  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
