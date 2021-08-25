import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IFirm} from '../firm.model';
import {Subscription} from 'rxjs';
import {HttpService, UserService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import {ITopMatter} from '../../shared/models/top-matters';
import {IPracticeArea} from '../../practice-area/practice-area.model';

@Component({
  selector: 'bd-top-matters',
  templateUrl: './top-matters.component.html',
  styleUrls: ['./top-matters.component.scss']
})
export class TopMattersComponent implements OnInit, OnDestroy {
  matters: Array<ITopMatter> = [];
  @Input() practiceArea: IPracticeArea;
  @Input() firmId: number;
  @Input() firm: IFirm;
  @Input() bodhalaPA: boolean;
  pendingRequest: Subscription;

  constructor(private httpService: HttpService,
              public filtersService: FiltersService,
              public userService: UserService) {
  }

  ngOnInit() {
    this.getMatters();
  }

  getMatters(): void {
    const params = this.filtersService.getCurrentUserCombinedFilters();
    const arr = [];
    // arr.push(this.firmId.toString());
    // params.firms = JSON.stringify(arr);
    if (this.firmId) {
      arr.push(this.firmId.toString());
      params.firms = JSON.stringify(arr);
    }
    if (this.practiceArea) {
      arr.push(this.practiceArea.client_matter_type);
      if (this.bodhalaPA === true) {
        params.bdPracticeAreas = JSON.stringify(arr);
      } else {
        params.practiceAreas = JSON.stringify(arr);
      }
    }
    this.pendingRequest = this.httpService.makeGetRequest('getTopMattersForFirm', params).subscribe(
      (data: any) => {
        this.matters = data.result || [];
        this.matters = this.matters.slice(0, 10);
        this.processMatters();
      }
    );
  }

  processMatters(): void {
    let savedMatters = localStorage.getItem('updated_matters_' + this.userService.currentUser.id.toString());
    if (savedMatters) {
      savedMatters = JSON.parse(savedMatters);
    }
    for (const rec of this.matters) {
      rec.sum = this.filtersService.includeExpenses ? rec.total_spend + rec.total_expenses : rec.total_spend;
      if (savedMatters !== undefined && savedMatters !== null) {
        const savedName = savedMatters[rec.id];
        if (savedName !== undefined) {
          rec.name = savedName;
        }
      }
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
