import {Component, Input, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import {HttpService, UserService} from 'bodhala-ui-common';
import {IClientMatter, IClient, IInsight} from '../models';
import {Subscription} from 'rxjs';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {IEntityConfig} from '../../client-configs/client-configs-model';
import {IMatterExecSummary, IMatterTotalsPanel} from '../../../matters/matter-executive-summary/model';
import {MatterAnalysisService} from '../../../matters/matter-executive-summary/matter-analysis.service';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'bd-matter-insights',
  templateUrl: './matter-insights.component.html',
  styleUrls: ['./matter-insights.component.scss']
})
export class MatterInsightsComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  filteredNames: Array<IClientMatter> = [];
  matterId: string;
  firm: IClientMatter;
  firmId: number;
  filteredFirms: Array<IClientMatter> = [];
  matterName: string;
  summaryData: IMatterExecSummary;
  totalPanels: Array<IMatterTotalsPanel> = [];
  @Input() selectedClientId: number;
  @Output() matterSelected: EventEmitter<IInsight> = new EventEmitter<IInsight>();

  constructor(private httpService: HttpService,
              public matterAnalysisService: MatterAnalysisService,
              public userService: UserService) { }

  ngOnInit(): void {
  }
  loadMatters(value: string): void {
    if (!value || value.length < 3) {
      this.filteredNames = [];
      this.filteredFirms = [];
      this.firm = null;
      return;
    }
    value = value.replace('(', '');
    value = value.replace(')', '');
    const params = { clientId: this.selectedClientId.toString(), typeahead: value, limit: 50};
    this.pendingRequest = this.httpService.makeGetRequest<IClientMatter>('getMatterListByClient', params).subscribe(
      (data: any) => {
        this.filteredNames = data.result;
      }
    );
  }
  loadFirms(evt: MatAutocompleteSelectedEvent): void {
    if (evt.option.value && evt.option.value.id) {
      this.matterId = evt.option.value.id;
      this.matterName = evt.option.value.name;
      const mattersArr = [];
      mattersArr.push(this.matterId);
      const params = {client_id: this.selectedClientId.toString(), filter_name: 'firms', matters: JSON.stringify(mattersArr)};
      this.pendingRequest = this.httpService.makeGetRequest<IClientMatter>('getFirmsForMatter', params).subscribe(
        (data: any) => {
          this.filteredFirms = data.result || [];
          if (this.filteredFirms.length === 1) {
            this.firm = this.filteredFirms[0];
            this.getMatterSummary();
            this.getMatterInsight();
          }
        }
      );
    }
  }
  getDataByMatterAndFirm(evt: MatSelectChange): void {
    if (evt.value && evt.value.id) {
      // this.matterId = evt.option.value.id;
      // this.matterName = evt.option.value.name;
      this.getMatterSummary();
      this.getMatterInsight();
    }
  }
  getMatterSummary(): void {
    const arrFirms = [];
    arrFirms.push(this.firm.id.toString());
    const arrMatters = [];
    arrMatters.push(this.matterId);
    const params = { client_id: this.selectedClientId, firms: JSON.stringify(arrFirms), matters: JSON.stringify(arrMatters)};
    this.pendingRequest = this.httpService.makeGetRequest<IMatterExecSummary>('getMatterExecSummary', params).subscribe(
      (data: any) => {
        if (data.result && data.result.ade_data) {
          this.summaryData = data.result.ade_data.length > 0 ? data.result.ade_data[0] : null;
          this.totalPanels = this.matterAnalysisService.buildTotalPanels(this.summaryData);
        }
      }
    );
  }
  getMatterInsight(): void {
    const params = {client_id: this.selectedClientId, matter_id: this.matterId, firm_id: this.firm.id};
    this.pendingRequest = this.httpService.makeGetRequest<IInsight>('getAdminMatterInsight', params).subscribe(
      (data: any) => {
          this.matterSelected.emit(data.result);
      }
    );
  }
  getOptionText(option) {
    return option ? option.name : null;
  }
  reset(): void {
    this.summaryData = null;
    this.totalPanels = [];
    this.matterName = null;
    this.matterId = null;
    this.firmId = null;
    this.firm = null;
    this.filteredNames = [];
    this.filteredFirms = [];
  }
  getMatterId(): string {
    return this.matterId;
  }
  getFirmId(): number {
    return this.firm ? Number(this.firm.id) : null;
  }
  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
