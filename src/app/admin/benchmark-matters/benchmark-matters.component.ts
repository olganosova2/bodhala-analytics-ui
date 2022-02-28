import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {ConfirmModalComponent, HttpService, MessagingService, UserService, UtilService} from 'bodhala-ui-common';
import {MatterAnalysisService} from '../../matters/matter-executive-summary/matter-analysis.service';
import {IClient, IClientMatter, IInsight, ISummary} from '../insights/models';
import {defaultBmMatterJson, IBmMatters, IBmSetupType, IMatterBmConfig} from './model';
import {CommonService} from '../../shared/services/common.service';
import {BM_MATTER_CONFIG_NAME, BM_MATTER_GENERIC_CONFIG_NAME} from '../../shared/services/config';
import * as config from '../../shared/services/config';
import {IEntityConfig} from '../client-configs/client-configs-model';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'bd-benchmark-matters',
  templateUrl: './benchmark-matters.component.html',
  styleUrls: ['./benchmark-matters.component.scss']
})
export class BenchmarkMattersComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  errorMessage: any;
  successText: string;
  pendingRequestMatters: Subscription;
  selectedClient: IClient;
  clientBmConfig: IEntityConfig;
  similarityScore: number = 0;
  bmSetupType: IBmSetupType;
  displayMatters: Array<any> = [];
  filteredNames: Array<IClientMatter> = [];
  selectedMatter: IClientMatter;
  constructor(private httpService: HttpService,
              public matterAnalysisService: MatterAnalysisService,
              public messageService: MessagingService,
              public commonServ: CommonService,
              private util: UtilService,
              public dialog: MatDialog,
              public userService: UserService) {
    this.commonServ.pageTitle = 'Matter Benchmarking';
  }

  ngOnInit(): void {
    this.bmSetupType = IBmSetupType.SelectedMatters;
  }
  getClientBmData(client: IClient): void {
    this.clearClient();
    this.selectedClient = client;
    const params = {clientId: this.selectedClient.bh_client_id, orgId: this.selectedClient.org_id, configName: BM_MATTER_CONFIG_NAME};
    this.pendingRequest = this.httpService.makeGetRequest<IInsight>('getBenchmarkMattersConfig', params).subscribe(
      (data: any) => {
        if (data && data.result) {
          this.processBmConfig(data.result.config);
        }
        let hasSmartPA = false;
        if (data && data.result && data.result.enabled) {
          if (data.result.enabled.value && (data.result.enabled.value.startsWith('Smart') || data.result.enabled.value.startsWith('Both'))) {
            hasSmartPA = true;
          }
        }
        if (!hasSmartPA) {
          this.selectedClient.missingSmartPA = true;
        }
      }
    );
  }
  processBmConfig(cfg: IEntityConfig): void {
    if (!cfg) {
      this.clientBmConfig = Object.assign({}, this.createNewBmConfig());
    } else {
      this.clientBmConfig = Object.assign({}, cfg);
      if (this.clientBmConfig.json_config && this.clientBmConfig.json_config.matters) {
        if (this.clientBmConfig.json_config.matters.length > 0) {
          this.getMattersData();
        } else {
          this.bmSetupType = IBmSetupType.AllMatters;
        }
      }
    }
  }
  getMattersData(): void {
    const params = {clientId: this.selectedClient.bh_client_id, matters: JSON.stringify(this.clientBmConfig.json_config.matters), score: 0};
    this.pendingRequestMatters = this.httpService.makeGetRequest<IBmMatters>('getBenchmarkMatters', params).subscribe(
      (data: any) => {
          this.displayMatters = data.result;
          this.displayMatters = this.displayMatters.sort(this.util.dynamicSort('client_matter_id'));
      }
    );
  }
  loadMatters(value: string): void {
    if (!value || value.length < 3) {
      this.filteredNames = [];
      return;
    }
    value = value.replace('(', '');
    value = value.replace(')', '');
    const params = { clientId: this.selectedClient.bh_client_id.toString(), typeahead: value, limit: 50};
    this.pendingRequest = this.httpService.makeGetRequest<IClientMatter>('getMatterListByClient', params).subscribe(
      (data: any) => {
        let records = data.result || [];
        const alreadyExistingMatters = new Set(this.clientBmConfig.json_config.matters);
        records = records.filter((name) => {
          return !alreadyExistingMatters.has(name.id);
        });
        this.filteredNames = records;
      }
    );
  }
  clearClient(): void {
    this.selectedClient = null;
    this.clientBmConfig = null;
    this.displayMatters = [];
    this.similarityScore = 0;
    this.errorMessage = null;
    this.successText = null;
    this.bmSetupType = IBmSetupType.SelectedMatters;
    this.filteredNames = [];
    this.selectedMatter = null;
  }
  createNewBmConfig(): IEntityConfig {
    const json = Object.assign({}, defaultBmMatterJson);
    const result = {
      id: null,
      description: 'Config to select matters for a client to benchmark',
      name: BM_MATTER_CONFIG_NAME,
      value: 0,
      client_id: this.selectedClient.bh_client_id,
      user_id: null,
      org_id: null,
      client_name: null,
      json_config: json};
    return result;
  }
  selectMatter(evt: MatAutocompleteSelectedEvent): void {
    if (evt.option.value && evt.option.value.id) {
      this.errorMessage = null;
      const params = { clientId: this.selectedClient.bh_client_id, matterId: evt.option.value.id };
      this.pendingRequest = this.httpService.makeGetRequest('checkBenchmarkMatterEligibility', params).subscribe(
        (data: any) => {
          if (data.error) {
            this.errorMessage = data.error;
            return;
          }
          if (data.result && data.result.internal_matters && data.result.internal_matters.length > 0) {
            this.selectedMatter = Object.assign({}, evt.option.value);
          }
        }
      );

    }
  }
  getOptionText(option) {
    return option ? option.name : null;
  }
  selectAll(): void {
    this.clientBmConfig.json_config = Object.assign({}, defaultBmMatterJson);
    this.saveClientConfig(1);
  }
  addMatter(): void {
    this.clientBmConfig.json_config.matters.push(this.selectedMatter.id);
    this.saveClientConfig(2);
  }
  saveClientConfig(option: number): void {
    this.successText = null;
    this.errorMessage = null;
    const params = Object.assign({}, this.clientBmConfig);
    this.pendingRequest = this.httpService.makePostRequest('saveClientConfig', params).subscribe(
      (data: any) => {
        const updConfig = data.result;
        if (updConfig) {
         this.successText = 'Settings have been saved successfully';
         this.selectedMatter = null;
         if (option === 1) {
           this.displayMatters = [];
         } else {
           this.getMattersData();
         }
        }
        if (data.error) {
          this.errorMessage = data.error;
        }
      }
    );

  }
  delete(matter: IBmMatters): void {
    const modalConfig = {...config.confirmDialogConfig, data: {title: 'Confirm Delete', item: 'matter'}};
    const dialogRef = this.dialog.open(ConfirmModalComponent, {...modalConfig});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const ix = this.clientBmConfig.json_config.matters.indexOf(matter.client_matter_id);
        if (ix >= 0) {
          this.clientBmConfig.json_config.matters.splice(ix, 1);
          this.saveClientConfig(2);
        }
      }
    });
  }
  changeTab(evt: any): void {
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
    if (this.pendingRequestMatters) {
      this.pendingRequestMatters.unsubscribe();
    }
  }


}
