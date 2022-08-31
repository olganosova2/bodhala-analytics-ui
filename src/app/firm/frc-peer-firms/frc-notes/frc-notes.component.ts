import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AppStateService, ConfirmModalComponent, HttpService, UserService} from 'bodhala-ui-common';
import {CommonService} from '../../../shared/services/common.service';
import {FrcServiceService} from '../frc-service.service';
import {FiltersService} from '../../../shared/services/filters.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import * as config from '../../../shared/services/config';
import * as _moment from 'moment';
import {IUiAnnotation} from '../../../shared/components/annotations/model';
import {Subscription} from 'rxjs';

const moment = _moment;

@Component({
  selector: 'bd-frc-notes',
  templateUrl: './frc-notes.component.html',
  styleUrls: ['./frc-notes.component.scss']
})
export class FrcNotesComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  action: string;
  firmId: number;
  note: IUiAnnotation;
  url: string;
  uiId: string;
  quillConfig: any = config.quillConfig;
  constructor(
    private httpService: HttpService,
    public commonServ: CommonService,
    public frcService: FrcServiceService,
    public userService: UserService,
    public appStateService: AppStateService,
    public filtersService: FiltersService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FrcNotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.action = this.data.action;
    this.firmId = this.data.firmId;
    this.url = this.commonServ.formatPath(window.location.pathname);
    this.note = this.data.note ? this.data.note : Object.assign({}, this.createNewNote());
  }
  createNewNote(): IUiAnnotation {
    return {
      id: null,
      client_id: this.userService.currentUser.client_info_id,
      user_id: this.userService.currentUser.id,
      url: this.uiId ? '' : this.url,
      ui_id: this.uiId ? this.uiId : null,
      notes: '',
      is_public: true,
      json_config: {},
      deleted_on: null,
      deleted_by: null,
      editMode: false,
      dropDownOpened: false
    };
  }
  openDialog(note: IUiAnnotation): void {
    const modalConfig = {...config.confirmDialogConfig, data: {title: 'Confirm Delete', item: 'annotation'}};
    const dialogRef = this.dialog.open(ConfirmModalComponent, {...modalConfig});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteNote(note);
      }
    });
  }
  deleteNote(note: IUiAnnotation): void {
    const params = note;
    params.deleted_on = moment().format('YYYY-MM-DD HH:mm:ss');
    params.deleted_by = this.userService.currentUser.id;
    this.saveNote(params);
  }
  saveNote(params: IUiAnnotation): void {
    const isNew =  !params.id;
    this.pendingRequest = this.httpService.makePostRequest<IUiAnnotation>('getAnnotations', params).subscribe(
      (data: any) => {
        const responseObj = data.result;
        if (this.dialogRef) {
          this.dialogRef.close(responseObj);
        }
      }
    );
  }
  validateSave(): boolean {
    if (this.note && this.note.notes) {
      return false;
    }
    return true;
  }
  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
