import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CommonService} from '../../../shared/services/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {IClientMatter} from '../../../admin/insights/models';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../../shared/services/filters.service';
import {MatDialog} from '@angular/material/dialog';
import {MatterAnalysisService} from '../matter-analysis.service';
import {Subscription} from 'rxjs';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'bd-matter-title-bar',
  templateUrl: './matter-title-bar.component.html',
  styleUrls: ['./matter-title-bar.component.scss']
})
export class MatterTitleBarComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  firms: Array<any> = [];
  firmId: number;
  firm: IClientMatter;
  @Input() matterId: string;
  @Input() title: string;
  @Input() index: number;
  @Output() firmSelected: EventEmitter<any> = new EventEmitter<number>();
  @Output() singleFirmLoaded: EventEmitter<any> = new EventEmitter<number>();

  constructor(public commonServ: CommonService,
              public router: Router,
              private route: ActivatedRoute,
              public appStateService: AppStateService,
              public userService: UserService,
              private httpService: HttpService,
              public filtersService: FiltersService,
              public dialog: MatDialog,
              public utilService: UtilService,
              public matterAnalysisService: MatterAnalysisService) {
  }

  ngOnInit(): void {
    this.loadFirms();
  }

  loadFirms(): void {
    const mattersArr = [];
    mattersArr.push(this.matterId);
    const params = {client_id: this.userService.currentUser.client_info_id, filter_name: 'firms', matters: JSON.stringify(mattersArr)};
    this.pendingRequest = this.httpService.makeGetRequest<IClientMatter>('getFirmsForMatter', params).subscribe(
      (data: any) => {
        this.firms = data.result || [];
        this.firms.unshift({id: null, name: '-All-'});
        if (this.firms.length === 1) {
          this.firm = this.firms[0];
          this.firmId = Number(this.firm.id);
          this.singleFirmLoaded.emit(this.firmId);
        }
      }
    );

  }

  filterByFirm(evt: any): void {
    if (evt.value && evt.value.id) {
      this.firmId = Number(this.firm.id);
      this.firmSelected.emit(this.firmId);
    }
  }

  export(): void {
    this.commonServ.pdfLoading = true;
    const exportName = 'Matter Overview';

    setTimeout(() => {
      this.commonServ.generatePdfOuter(exportName, 'matterAnalysis', null);
    }, 200);
  }

  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
