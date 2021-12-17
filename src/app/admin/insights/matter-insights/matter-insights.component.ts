import {Component, Input, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import {HttpService, UserService} from 'bodhala-ui-common';
import {IClientMatter, IClient, IInsight} from '../models';
import {Subscription} from 'rxjs';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {IEntityConfig} from '../../client-configs/client-configs-model';
import {IMatterExecSummary, IMatterTotalsPanel} from '../../../matters/matter-executive-summary/model';
import {MatterAnalysisService} from '../../../matters/matter-executive-summary/matter-analysis.service';

@Component({
  selector: 'bd-matter-insights',
  templateUrl: './matter-insights.component.html',
  styleUrls: ['./matter-insights.component.scss']
})
export class MatterInsightsComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  @Input() matters: Array<IClientMatter> = [];
  filteredNames: Array<IClientMatter> = [];
  matterId: string;
  matterName: string;
  summaryData: IMatterExecSummary;
  totalPanels: Array<IMatterTotalsPanel> = [];
  @Input() selectedClientId: number;
  @Output() matterSelected: EventEmitter<IInsight> = new EventEmitter<IInsight>();

  constructor(private httpService: HttpService,
              public matterAnalysisService: MatterAnalysisService,
              public userService: UserService) { }

  ngOnInit(): void {
    // this.loadMatters();
  }
  loadMatters(): void {
    const params = { clientId: this.selectedClientId.toString()};
    this.pendingRequest = this.httpService.makeGetRequest<IClientMatter>('getMatterListByClient', params).subscribe(
      (data: any) => {
        this.matters = data.result;
      }
    );
  }
  filterMatters(evt: string): void {
    if (!evt) {
      this.filteredNames = [];
    }
    this.filteredNames = this.matters.filter(e => e.name.toLowerCase().startsWith(evt.toLowerCase()) || e.id.toLowerCase().startsWith(evt.toLowerCase())) || [];
  }
  getMatterByName(evt: MatAutocompleteSelectedEvent): void {
    if (evt.option.value && evt.option.value.id) {
      this.matterId = evt.option.value.id;
      this.matterName = evt.option.value.name;
      this.getMatterSummary();
      this.getMatterInsight();
    }
  }
  getMatterSummary(): void {
    const params = { client_id: this.selectedClientId, matter_id: this.matterId};
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
    const params = {client_id: this.selectedClientId, matter_id: this.matterId};
    this.pendingRequest = this.httpService.makeGetRequest<IInsight>('getAdminMatterInsight', params).subscribe(
      (data: any) => {
        if (data.result) {
          this.matterSelected.emit(data.result);
        }
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
  }
  getMatterId(): string {
    return this.matterId;
  }
  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
