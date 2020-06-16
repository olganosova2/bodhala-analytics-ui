import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../shared/services/common.service';
import {Subscription} from 'rxjs';
import {HttpService, UtilService} from 'bodhala-ui-common';
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
  practiceAreas: Array<string> = [];
  constructor(public commonServ: CommonService,
              private route: ActivatedRoute,
              private httpService: HttpService,
              public filtersService: FiltersService,
              public utilServ: UtilService,
              public router: Router) {
    this.commonServ.pageTitle = 'Firms > Report Card';
  }
  ngOnInit() {
    this.practiceAreas.push(this.selectedPracticeArea);
    this.route.paramMap.subscribe(params => {
      this.firmId = params.get('id');
      this.loadFirm();
      this.loadPAs();
    });
  }
  loadFirm(): void {
    const params = {id: this.firmId};
    this.pendingRequestFirm = this.httpService.makeGetRequest('getFirm', params).subscribe(
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
  loadPAs(): void {
    const combined = this.filtersService.getCurrentUserCombinedFilters(true);
    const params = { ... combined,  filter_name: 'practiceAreas', limit: 100 };
    this.pendingRequestPAs = this.httpService.makeGetRequest('getOptionsForFilter', params).subscribe(
      (data: any) => {
        let pas = data.result.map(e => e.id) || [];
        pas = pas.sort();
        this.practiceAreas = [ ...this.practiceAreas, ... pas];
      },
      err => {
        this.errorMessage = err;
      }
    );
  }
  editReportCard(): void {
    this.router.navigate(['/analytics-ui/firm/', this.firmId]);
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequestFirm) {
      this.pendingRequestFirm.unsubscribe();
    }
    if (this.pendingRequestFirm) {
      this.pendingRequestPAs.unsubscribe();
    }
  }

}
