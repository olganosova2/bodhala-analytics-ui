import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import 'brace';
import 'brace/mode/json';

import {IEntityConfig} from '../client-configs-model';
import {IClient} from '../../../shared/services/common.service';

@Component({
  selector: 'bd-add-edit-config',
  templateUrl: './add-edit-config.component.html',
  styleUrls: ['./add-edit-config.component.scss']
})
export class AddEditConfigComponent implements OnInit {
  config: IEntityConfig;
  client: IClient;
  constructor(public dialogRef: MatDialogRef<AddEditConfigComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.config = Object.assign({}, this.data.config);
    this.config.json_config_parsed = JSON.stringify(this.config.json_config);
    this.client = Object.assign({}, this.data.client);
  }
  validateForm(): boolean {
    return (!this.config.name);
  }

  saveConfig(): void {

  }
}
