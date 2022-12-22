import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {CommonService} from '../../shared/services/common.service';
import {MatDialog} from '@angular/material/dialog';
import {AgGridService} from 'bodhala-ui-elements';
import {Subscription} from 'rxjs';

@Component({
  selector: 'bd-law-firm-duplicates',
  templateUrl: './law-firm-duplicates.component.html',
  styleUrls: ['./law-firm-duplicates.component.scss']
})
export class LawFirmDuplicatesComponent implements OnInit {
  pendingRequest: Subscription;
  apiErrors: Array<string> = [];
  exceptionError: any;
  apiResults: Array<any> = [];
  primaryId: number;
  firmIds: Array<number> = [];
  firmIdsText: string = '';
  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public userService: UserService,
              public commonServ: CommonService,
              public utilService: UtilService,
              public dialog: MatDialog,
              public agGridService: AgGridService) {
    this.commonServ.pageTitle = 'Law Firm Duplicates';
  }

  ngOnInit(): void {
  }
  cleanUpDuplicates(): void {
    if (this.firmIds.length < 1) {
      return;
    }
    this.exceptionError = null;
    this.apiErrors = [];
    this.apiResults  = [];
    const params = {primaryId: Number(this.primaryId), firmIds : this.firmIds};
    this.pendingRequest = this.httpService.makePostRequest('removeLawFirmDupes', params).subscribe(
      (data: any) => {
        if (data.error && Array.isArray(data.error) && data.error.length > 0) {
          this.apiErrors =  Object.assign([], data.error);
        }
        if (data.error && !Array.isArray(data.error)) {
          this.exceptionError =   data.error;
        }
        this.apiResults  = data.result || [];
        this.formatResults();
      }
    );
  }
  formatResults(): void {
    for (const rec of this.apiResults) {
      rec.formattedResults = [];
      if (!rec.updated_ade_records) {
        continue;
      }
      for (const key of Object.keys(rec.updated_ade_records)) {
        if (rec.updated_ade_records.hasOwnProperty(key) && rec.updated_ade_records[key] !== 0) {
          rec.formattedResults.push({table: key, count: rec.updated_ade_records[key]});
        }
      }
    }
  }
  checkInvalid(): boolean {
    this.firmIds = [];
    if (!this.firmIdsText.trim() || !this.primaryId) {
      return true;
    }
    const ids = this.firmIdsText.split(',') || [];
    for (const id of ids) {
      const currentId = id.trim();
      if (isNaN(Number(currentId)) || Number(currentId) === 0) {
        this.firmIds = [];
        return true;
      }
      this.firmIds.push(Number(currentId));
    }
    return this.firmIds.length < 1;
  }

}
