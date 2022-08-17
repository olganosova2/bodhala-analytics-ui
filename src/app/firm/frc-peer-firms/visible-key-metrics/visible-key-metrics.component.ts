import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {CommonService} from '../../../shared/services/common.service';
import {CLIENT_CONFIG_KEY_METRICS_NAME, FrcServiceService, IMetricDisplayData} from '../frc-service.service';
import {FiltersService} from '../../../shared/services/filters.service';
import {IEntityConfig} from '../../../admin/client-configs/client-configs-model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'bd-visible-key-metrics',
  templateUrl: './visible-key-metrics.component.html',
  styleUrls: ['./visible-key-metrics.component.scss']
})
export class VisibleKeyMetricsComponent implements OnInit {
  filteredMetrics: Array<IMetricDisplayData> = [];
  keyMetrics: Array<IMetricDisplayData> = [];
  savedMetrics: Array<string> = [];
  itemTopRowCount: number = 6;
  pendingRequest: Subscription;
  configId: number;
  constructor(
    private httpService: HttpService,
    public commonServ: CommonService,
    public frcService: FrcServiceService,
    public userService: UserService,
    public appStateService: AppStateService,
    public filtersService: FiltersService,
    public dialogRef: MatDialogRef<VisibleKeyMetricsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.keyMetrics = Object.assign([], data.keyMetrics);
    this.filteredMetrics = data.filteredMetrics;
    this.itemTopRowCount = Math.ceil(this.keyMetrics.length / 2);
  }

  ngOnInit(): void {
    this.getClientMetricsConfig();
  }
  save(): void {
    const params = Object.assign({}, this.createConfig());
    if (this.configId) {
      params.id = this.configId;
    }
    this.pendingRequest = this.httpService.makePostRequest('saveClientEntityConfig', params).subscribe(
      (data: any) => {
        const updConfig = data.result;
        if (updConfig) {
          this.dialogRef.close(this.filteredMetrics);
        }
      }
    );

  }
  getClientMetricsConfig(): void {
    const params = { userId: this.userService.currentUser.id, configName: CLIENT_CONFIG_KEY_METRICS_NAME};
    this.pendingRequest = this.httpService.makeGetRequest<IEntityConfig>('getConfigByNameAndUserRecent', params).subscribe(
      (data: any) => {
        if (data && data.result) {
          const records = data.result || [];
          if (records.length > 0) {
            this.configId = data.result[0].id;
          }
        }
      }
    );
  }
  validate(): boolean {
    if (this.keyMetrics.filter(e => e.selected === true).length < 2 ) {
      return true;
    }
    return false;
  }
  createConfig(): IEntityConfig {
    const json = [];
    this.filteredMetrics = [];
    for (const metric of this.keyMetrics) {
      if (metric.selected) {
        json.push(metric.fieldName);
        this.filteredMetrics.push(metric);
      }
    }
    return { id: null, description: '', name: CLIENT_CONFIG_KEY_METRICS_NAME, value: null, client_id: null, user_id: this.userService.currentUser.id, org_id: null, client_name: null, json_config: json};
  }

}
