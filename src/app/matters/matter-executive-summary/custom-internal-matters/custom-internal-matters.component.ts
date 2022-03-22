import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {ICustomInternalMatters, IInternalMatter} from '../model';
import {HttpService, UserService} from 'bodhala-ui-common';
import {Router} from '@angular/router';


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
  customMattersConfig: ICustomInternalMatters;

  constructor(public userService: UserService,
              private httpService: HttpService,
              public router: Router,
              public dialogRef: MatDialogRef<CustomInternalMattersComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.matterId = this.data.matterId;
    this.internalMatters = this.data.internalMatters;
    this.matters = this.data.matters;
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
    const matterIds = this.matters.map(e => e.id);
    return {
      id: null,
      bh_client_id: this.userService.currentUser.client_info.id,
      client_matter_id: this.matterId,
      matters: matterIds
    };
  }
  save(): void {
    const params = this.customMattersConfig;
    this.pendingRequest = this.httpService.makePostRequest('saveBMCustomInternalMatters', params).subscribe(
      (data: any) => {
        if (data && data.result) {
          this.dialogRef.close();
          this.router.navigateByUrl('/', {skipLocationChange: true})
            .then(() => this.router.navigate([this.url]));

        }
      }
    );
  }
  delete(matter: any): void {
    this.matters = this.matters.filter(e => e.id !== matter.id);
    this.customMattersConfig.matters = this.matters.map(e => e.id);
  }
  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
