import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IFirm} from '../firm.model';
import {Subscription} from 'rxjs';
import {HttpService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import {ITopMatter} from '../../shared/models/top-matters';

@Component({
  selector: 'bd-top-matters',
  templateUrl: './top-matters.component.html',
  styleUrls: ['./top-matters.component.scss']
})
export class TopMattersComponent implements OnInit, OnDestroy {
  errorMessage: any;
  matters: Array<ITopMatter> = [];
  @Input() firmId: number;
  @Input() firm: IFirm;
  pendingRequest: Subscription;

  constructor(private httpService: HttpService,
              public filtersService: FiltersService) {
  }

  ngOnInit() {
    this.getMatters();
  }

  getMatters(): void {
    const params = this.filtersService.getCurrentUserCombinedFilters();
    const arr = [];
    arr.push(this.firmId.toString());
    params.firms = JSON.stringify(arr);
    this.pendingRequest = this.httpService.makeGetRequest('getTopMattersForFirm', params).subscribe(
      (data: any) => {
        this.matters = data.result || [];
        this.matters = this.matters.slice(0, 10);
        this.processMatters();
      },
      err => {
        this.errorMessage = err;
      }
    );
  }

  processMatters(): void {
    for (const rec of this.matters) {
      rec.sum = this.filtersService.includeExpenses ? rec.total_spend + rec.total_expenses : rec.total_spend;
    }
  }

  goToView(href: string, id: string): void {
    const enc = encodeURIComponent(id);
    window.location.href = href + encodeURIComponent(enc);
  }
  formatMatterName(name: string): string {
    let result = '';
    if (!name) {
      return result;
    }
    if (name.length > 50) {
      result = name.substring(0, 50) + '...';
    } else {
      result = name;
    }
    return result;
  }

  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
