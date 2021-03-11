import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import 'brace';
import 'brace/mode/json';

import {IEntityConfig} from '../client-configs-model';
import {IClient} from '../../../shared/services/common.service';
import {Subscription} from 'rxjs';
import {HttpService} from 'bodhala-ui-common';

@Component({
  selector: 'bd-add-edit-config',
  templateUrl: './add-edit-config.component.html',
  styleUrls: ['./add-edit-config.component.scss']
})
export class AddEditConfigComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  errorMessage: any;
  config: IEntityConfig;
  client: IClient;
  allConfigs: Array<IEntityConfig> = [];
  distinctNames: Array<string> = [];
  filteredNames: Array<string> = [];
  constructor(public dialogRef: MatDialogRef<AddEditConfigComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private httpService: HttpService) { }

  ngOnInit(): void {
    this.config = Object.assign({}, this.data.config);
    this.config.json_config_parsed = JSON.stringify(this.config.json_config, null, 2);
    this.client = Object.assign({}, this.data.client);
    this.allConfigs = this.data.records;
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
    this.pendingRequest = this.httpService.makeGetRequest<IEntityConfig>('getClientDistinctConfigNames').subscribe(
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
    const params = Object.assign({}, this.config);
    this.pendingRequest = this.httpService.makePostRequest('saveClientConfig', params).subscribe(
      (data: any) => {
        const updConfig = data.result;
        if (updConfig) {
          this.dialogRef.close(updConfig);
        }
      },
      err => {
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
    if (this.config.id || !evt) {
      return;
    }
    this.filteredNames = [];
    for (const name of this.distinctNames) {
      if (name.startsWith(evt)) {
        this.filteredNames.push(name);
      }
    }
  }
  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }
}
