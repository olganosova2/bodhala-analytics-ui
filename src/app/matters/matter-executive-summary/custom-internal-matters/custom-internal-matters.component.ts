import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {ICustomInternalMatters, IInternalMatter} from '../model';
import {HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {Router} from '@angular/router';
import {IClientMatter} from '../../../admin/insights/models';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';


@Component({
  selector: 'bd-custom-internal-matters',
  templateUrl: './custom-internal-matters.component.html',
  styleUrls: ['./custom-internal-matters.component.scss']
})
export class CustomInternalMattersComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  internalMatters: Array<IInternalMatter> = [];
  originalInternalMatters: Array<IInternalMatter> = [];
  matterId: string;
  matters: Array<any> = [];
  url: string;
  selectedMatter: IClientMatter;
  filteredNames: Array<IClientMatter> = [];
  customMattersConfig: ICustomInternalMatters;

  constructor(public userService: UserService,
              private httpService: HttpService,
              public router: Router,
              public utilService: UtilService,
              public dialogRef: MatDialogRef<CustomInternalMattersComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.matterId = this.data.matterId;
    this.internalMatters = this.data.internalMatters;
    this.matters = Object.assign([], this.data.matters);
    this.url = this.router.url;
    this.getCustomInternalMatters();
  }
  getCustomInternalMatters(): void {
    const params = {client_id: this.userService.currentUser.client_info.id, matter_id: this.matterId};
    this.pendingRequest = this.httpService.makeGetRequest('getCustomInternalMatters', params).subscribe(
      (data: any) => {
        if (data && data.result) {
          this.customMattersConfig = data.result;
        } else {
          this.customMattersConfig = this.createEmptyConfig();
        }
      }
    );
  }
  createEmptyConfig(): ICustomInternalMatters {
    let matterIds = this.matters.map(e => e.id);
    matterIds = [...new Set(matterIds)];
    return {
      id: null,
      bh_client_id: this.userService.currentUser.client_info.id,
      client_matter_id: this.matterId,
      matters: matterIds
    };
  }
  loadMatters(value: string): void {
    if (!value || value.length < 3) {
      this.filteredNames = [];
      return;
    }
    value = value.replace('(', '');
    value = value.replace(')', '');
    const params = { clientId: this.userService.currentUser.client_info.id, typeahead: value, limit: 50};
    this.pendingRequest = this.httpService.makeGetRequest<IClientMatter>('getMatterListByClient', params).subscribe(
      (data: any) => {
        let records = data.result || [];
        const alreadyExistingMatters = new Set(this.customMattersConfig.matters);
        records = records.filter((name) => {
          return !alreadyExistingMatters.has(name.id);
        });
        this.filteredNames = records;
      }
    );
  }
  addMatter(): void {
    this.matters.push(this.selectedMatter);
    this.customMattersConfig.matters.push(this.selectedMatter.id);
    this.selectedMatter = null;
  }
  reset(): void {
    const params = { id: this.customMattersConfig.id};
    this.pendingRequest = this.httpService.makeDeleteRequest('deleteBMCustomInternalMatters', params).subscribe(
      (data: any) => {
        if (data && data.result) {
          this.dialogRef.close();
          this.router.navigateByUrl('/', {skipLocationChange: true})
            .then(() => this.router.navigateByUrl(this.url));

        }
      }
    );
  }
  selectMatter(evt: MatAutocompleteSelectedEvent): void {
    if (evt.option.value && evt.option.value.id) {
      this.selectedMatter = Object.assign({}, evt.option.value);
    }
  }
  save(): void {
    const params = this.customMattersConfig;
    this.pendingRequest = this.httpService.makePostRequest('saveBMCustomInternalMatters', params).subscribe(
      (data: any) => {
        if (data && data.result) {
          this.dialogRef.close();
          this.router.navigateByUrl('/', {skipLocationChange: true})
            .then(() => this.router.navigateByUrl(this.url));

        }
      }
    );
  }
  delete(matter: any): void {
    this.matters = this.matters.filter(e => e.id !== matter.id);
    let matterIds = this.matters.map(e => e.id);
    matterIds = [...new Set(matterIds)];
    this.customMattersConfig.matters = Object.assign([], matterIds);
  }
  getOptionText(option) {
    return option ? option.name : null;
  }
  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
