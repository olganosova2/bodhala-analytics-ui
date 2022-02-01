import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../../shared/services/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UtilService, GenericConfirmModalComponent} from 'bodhala-ui-common';
import {AgGridService} from 'bodhala-ui-elements';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {LedesImportsService} from '../ledes-imports.service';
import {confirmDialogConfig} from '../../../shared/services/config';


@Component({
  selector: 'bd-rerun-upload',
  templateUrl: './rerun-upload.component.html',
  styleUrls: ['./rerun-upload.component.scss']
})
export class RerunUploadComponent implements OnInit {
  pendingRequest: Subscription;
  data: any;
  clientId: number;
  etag: string;
  firmMappingError: boolean;
  firmServiceProvider: boolean = false;
  firmName: string = '';
  firmNameSearch: string = '';
  fileReUploaded: boolean = null;
  searching: boolean = false;
  firmMatches: any = null;
  firmURL: string = null;
  matchType = '';

  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public commonServ: CommonService,
              public utilService: UtilService,
              public dialog: MatDialog,
              public agGridService: AgGridService,
              public matDialog: MatDialog,
              private ledesImportsService: LedesImportsService) {
  this.commonServ.pageTitle = 'Re-run LEDES Import';
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.clientId = Number(params.get('clientId'));
    });
    this.route.queryParams.subscribe(params => {
      this.etag = params.etag;
    });
    this.getLEDESUpload();
  }

  getLEDESUpload(): void {
    const params = { etag: this.etag };
    this.pendingRequest = this.httpService.makeGetRequest('getLEDESUpload', params).subscribe(
      (data: any) => {
        if (data.result) {
          if (data.result.length > 0) {
            this.data = data.result[0];
            if (this.data.rejected_reason_PROD.includes('not find firm')) {
              this.firmMappingError = true;
            } else {
              this.firmMappingError = false;
            }
            if (this.data.adu) {
              if (this.data.adu.searched_firm) {
                this.data.firm_name = this.data.adu.searched_firm.name;
              }
            } else {
              this.data.firm_name = 'N/A';
              if (this.firmMappingError) {
                if (this.data.message_replyto !== '[]') {
                  let url = this.data.message_replyto;
                  url = url.split('@');
                  if (url.length > 1) {
                    url = url[1];
                    url = url.replace('"', '');
                    url = url.replace(']', '');
                    url = url.replace('\'', '');
                    this.firmURL = url;
                  } else {
                    url = this.data.message_sender;
                    url = url.split('@');
                    if (url.length > 1) {
                      url = url[1];
                      url = url.replace('"', '');
                      url = url.replace(']', '');
                      url = url.replace('\'', '');
                      url = url.replace('>', '');
                      this.firmURL = url;
                    }
                  }
                } else {
                  let url = this.data.message_sender;
                  url = url.split('@');
                  if (url.length > 1) {
                    url = url[1];
                    url = url.replace('"', '');
                    url = url.replace(']', '');
                    url = url.replace('\'', '');
                    url = url.replace('>', '');
                    this.firmURL = url;
                  }
                }
              }
            }
            this.ledesImportsService.data = undefined;
            this.mapMessageURLs();
          }
        }
      }
    );
  }

  mapMessageURLs(): void {
    this.data.message_recipients = this.data.message_recipients.replace('"[', '');
    this.data.message_recipients = this.data.message_recipients.replace(']"', '');

    this.data.message_replyto = this.data.message_replyto.replace('["', '');
    this.data.message_replyto = this.data.message_replyto.replace(']"', '');
  }

  openModal(): void {
    const modalConfig = {
      ...confirmDialogConfig,
      data: {title: 'Confirm Firm Creation', text: 'Please confirm that you would like to create a firm with the following name: ' + this.firmName}
    };

    const dialogRef = this.matDialog.open(GenericConfirmModalComponent, {
      ...modalConfig,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createFirm();
      }
    });
  }

  openReRunModal(modalText: string, firmId: number): void {
    const modalConfig = {
      ...confirmDialogConfig,
      data: {
        title: 'Confirm Upload Re-run',
        text: modalText
      }
    };
    const dialogRef = this.matDialog.open(GenericConfirmModalComponent, {
      ...modalConfig,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reRunUpload(firmId, this.firmName);
      }
    });
  }

  openReRunModalSearchedFirm(firm: any): void {
    const modalConfig = {
      ...confirmDialogConfig,
      data: {
        title: 'Confirm Upload Re-run',
        text: 'Please confirm that you would like to re-run the ingestion of ' + this.data.original_name +
        ', using the firm name/ID of ' + firm.name + '/' + firm.id + '.'
      }
    };
    const dialogRef = this.matDialog.open(GenericConfirmModalComponent, {
      ...modalConfig,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reRunUpload(firm.id, firm.name);
      }
    });
  }

  createFirm(): void {
    const payload = {
      name: this.firmName,
      alias: this.firmName,
      is_service_provider: this.firmServiceProvider
    };
    this.pendingRequest = this.httpService.makePostRequest('createFirm', payload).subscribe(
      (data: any) => {
        let modalText;
        if (data.result === null && data.error.includes('because it already exists')) {
          let firmId = data.error.split('id: ');
          if (firmId.length > 1) {
            firmId = firmId[1];
            firmId = firmId.split(')');
            firmId = firmId[0];
            firmId = Number(firmId);
          }
          modalText = 'The firm name you inputted already exists. Confirm that you want to re-run the ingestion of ' +
                      this.data.original_name + ', using the firm name/ID of ' + this.firmName + '/' + firmId + '.';
          this.openReRunModal(modalText, firmId);
        } else if (data.result !== null) {
          modalText = 'Please confirm that you would like to re-run the ingestion of ' + this.data.original_name +
                      ', using the firm name/ID of ' + this.firmName + '/' + data.result.id + '.';
          this.openReRunModal(modalText, data.result.id);
        }
      }
    );
  }

  findFirm(): void {
    const payload = {
      search: this.firmNameSearch
    };
    this.searching = true;
    this.pendingRequest = this.httpService.makePostRequest('findFirm', payload).subscribe(
      (data: any) => {
        this.searching = false;
        if (data.result) {
          if (data.result.match_type !== 'EXACT') {
            this.firmMatches = data.result.hits;
            if (data.result.match_type) {
              this.matchType = data.result.match_type;
            }
          } else {
            this.firmMatches = [];
            data.result.score = 1;
            this.firmMatches.push(data.result);
            this.matchType = data.result.match_type;
          }
        }
      }
    );
  }

  reRunUpload(firm: number, name: string): void {
    const params = {
      firmId: firm,
      firmName: name,
      client: this.data.client,
      etag: this.data.etag,
      firmUrl: this.firmURL
    };
    this.pendingRequest = this.httpService.makePostRequest('reuploadLedes', params).subscribe(
      (data: any) => {
        if (data.result === true) {
          this.fileReUploaded = true;
        } else {
          this.fileReUploaded = false;
        }
      }
    );
  }

}
