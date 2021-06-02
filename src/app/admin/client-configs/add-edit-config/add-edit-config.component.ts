import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import 'brace';
import 'brace/mode/json';

import {IEntityConfig} from '../client-configs-model';
import {IClient} from '../../../shared/services/common.service';
import {Subscription} from 'rxjs';
import {HttpService} from 'bodhala-ui-common';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

@Component({
  selector: 'bd-add-edit-config',
  templateUrl: './add-edit-config.component.html',
  styleUrls: ['./add-edit-config.component.scss']
})
export class AddEditConfigComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  pendingRequestConfigName: Subscription;
  errorMessage: any;
  config: IEntityConfig;
  sampleConfig: IEntityConfig;
  possibleValues: Array<string> = [];
  client: IClient;
  allConfigs: Array<IEntityConfig> = [];
  distinctNames: Array<string> = [];
  filteredNames: Array<string> = [];
  filteredValues: Array<string> = [];
  inProgress: boolean = false;

  constructor(public dialogRef: MatDialogRef<AddEditConfigComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.config = Object.assign({}, this.data.config);
    this.config.json_config_parsed = JSON.stringify(this.config.json_config, null, 2);
    this.client = Object.assign({}, this.data.client);
    this.allConfigs = this.data.records || [];
    this.getDistinctNames();
  }

  validateForm(): boolean {
    const isValid = true;
    if (!this.config.name) {
      return false;
    }
    if (!this.config.json_config_parsed) {
      this.config.json_config = null;
      return true;
    }
    try {
      this.config.json_config = JSON.parse(this.config.json_config_parsed);
    } catch (e) {
      return false;
    }
    return isValid;
  }

  getDistinctNames(): void {
    this.pendingRequest = this.httpService.makeGetRequest<string>('getClientDistinctConfigNames').subscribe(
      (data: any) => {
        this.distinctNames = data.result;
      },
      err => {
        this.errorMessage = err;
      }
    );
  }

  saveConfig(): void {
    if (this.checkDuplicates()) {
      return;
    }
    this.inProgress = true;
    const params = Object.assign({}, this.config);
    this.pendingRequest = this.httpService.makePostRequest('saveClientConfig', params).subscribe(
      (data: any) => {
        const updConfig = data.result;
        if (updConfig) {
          this.inProgress = false;
          this.dialogRef.close(updConfig);
        }
      },
      err => {
        this.inProgress = false;
        this.errorMessage = err;
      }
    );
  }

  checkDuplicates(): boolean {
    let isDupe = false;
    let dupe = null;
    if (!this.config.id) { // new
      dupe = this.allConfigs.find(e => e.name === this.config.name && (e.value === this.config.value || (!e.value && !this.config.value)));
    } else {
      dupe = this.allConfigs.find(e => e.id !== this.config.id && e.name === this.config.name && (e.value === this.config.value || (!e.value && !this.config.value)));
    }
    if (dupe) {
      isDupe = true;
    }
    return isDupe;
  }

  filterNames(evt: string): void {
    if (this.config.id) {
      return;
    }
    if (!this.config.name) {
      this.filteredNames = this.distinctNames;
      return;
    }
    this.filteredNames = [];
    for (const name of this.distinctNames) {
      if (name.startsWith(evt)) {
        this.filteredNames.push(name);
      }
    }
  }
  filterValues(evt: string): void {
    if (this.config.id) {
      return;
    }
    if (!this.config.value) {
      this.filteredValues = this.possibleValues || [];
      return;
    }
    this.filteredValues = [];
    for (const name of this.possibleValues) {
      if (name.startsWith(evt)) {
        this.filteredValues.push(name);
      }
    }
  }

  getConfigByName(evt: MatAutocompleteSelectedEvent): void {
    const configName = evt.option.value;
    const params = {config_name: configName};
    this.sampleConfig = null;
    this.possibleValues = [];
    this.filteredValues = [];
    this.pendingRequestConfigName = this.httpService.makeGetRequest<IEntityConfig>('getConfigByName', params).subscribe(
      (data: any) => {
        const configs = data.result || [];
        if (configs && configs.length > 0) {
          this.formatSampleConfig(configs);
        }
      },
      err => {
        this.errorMessage = err;
      }
    );
  }

  formatSampleConfig(configs: Array<IEntityConfig>): void {
    this.sampleConfig = Object.assign({}, configs[0]);
    this.config.name = configs[0].name;
    this.config.value = configs[0].value;
    this.config.description = configs[0].description;
    this.config.json_config_parsed = JSON.stringify(configs[0].json_config, null, 2);
    if (configs.length > 1) {
      this.config.value = null;
      for (const config of configs) {
        if (this.possibleValues.indexOf(config.value) < 0) {
          this.possibleValues.push(config.value);
        }
      }
    }
  }

  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
    if (this.pendingRequestConfigName) {
      this.pendingRequestConfigName.unsubscribe();
    }
  }
}
