import {AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {IUiAnnotation} from '../model';
import {HttpService, UserService, UtilService, ConfirmModalComponent} from 'bodhala-ui-common';
import {Subscription} from 'rxjs';
import * as _moment from 'moment';
import * as config from '../../../services/config';
import {CommonService} from '../../../services/common.service';

const moment = _moment;

@Component({
  selector: 'bd-annotaions-modal',
  templateUrl: './annotaions-modal.component.html',
  styleUrls: ['./annotaions-modal.component.scss']
})
export class AnnotaionsModalComponent implements OnInit, OnDestroy, AfterViewInit {
  pendingRequest: Subscription;
  url: string;
  uiId: string;
  newNote: IUiAnnotation;
  notes: Array<IUiAnnotation> = [];
  masterList: Array<IUiAnnotation> = [];
  quillConfig: any = config.quillConfig;
  isPublicDefault: boolean = false;
  showToBottom: boolean = false;
  @ViewChild('topHeader') topHeader: ElementRef<HTMLElement>;
  @ViewChild('bottomClose') bottomClose: ElementRef<HTMLElement>;
  @ViewChild('modalDiv') modalDiv: ElementRef<HTMLElement>;

  constructor(public userService: UserService,
              private httpService: HttpService,
              public utilService: UtilService,
              public commonServ: CommonService,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<AnnotaionsModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.url = this.commonServ.formatPath(window.location.pathname);
    this.notes = Object.assign([], this.data.notes);
    this.uiId = this.data.uiId;
    this.isPublicDefault = this.data.isPublicDefault;
    this.newNote = Object.assign({}, this.createNewNote());
    this.masterList = this.notes.map(x => Object.assign({}, x));
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.checkShowToBottom();
    });
  }
  setEditMode(note: IUiAnnotation): void {
    note.editMode = true;
  }
  addNote(): void {
    const params = this.newNote;
    this.saveNote(params);
  }
  editNote(note: IUiAnnotation): void {
    const params = note;
    this.saveNote(params);
  }
  deleteNote(note: IUiAnnotation): void {
    const params = note;
    params.deleted_on = moment().format('YYYY-MM-DD HH:mm:ss');
    params.deleted_by = this.userService.currentUser.id;
    this.saveNote(params);
  }
  cancelEdit(note: IUiAnnotation): void {
    const found = this.masterList.find(e => e.id === note.id);
    if (found) {
      note = this.utilService.shallowCopy(note, found);
    }
    note.editMode = false;
    note.dropDownOpened = false;
  }
  setPublic(note: IUiAnnotation): void {
    const params = note;
    this.saveNote(params);
  }
  saveNote(params: IUiAnnotation): void {
    const isNew =  !params.id;
    this.pendingRequest = this.httpService.makePostRequest<IUiAnnotation>('getAnnotations', params).subscribe(
      (data: any) => {
        const responseObj = data.result;
        if (responseObj) {
          responseObj.editMode = false;
          if (isNew) {
            const newNote =  Object.assign({}, responseObj);
            newNote.first_name = this.userService.currentUser.first_name;
            newNote.last_name = this.userService.currentUser.last_name;
            this.notes.unshift(newNote);
            this.masterList.unshift(newNote);
            this.newNote = Object.assign({}, this.createNewNote());
            this.scrollToId(this.topHeader.nativeElement);
          } else if (params.deleted_on) {
            const edited = this.notes.find(e => e.id === params.id);
            const ix = this.notes.indexOf(edited);
            this.notes.splice(ix, 1);
          } else {
            const edited = this.masterList.find(e => e.id === params.id);
            const ix = this.masterList.indexOf(edited);
            if (ix >= 0) {
              this.masterList[ix] = this.utilService.shallowCopy(this.masterList[ix], responseObj);
            }
            params.editMode = false;
            params.dropDownOpened = false;
          }
        }
      }
    );
  }
  createNewNote(): IUiAnnotation {
    return {
      id: null,
      client_id: this.userService.currentUser.client_info_id,
      user_id: this.userService.currentUser.id,
      url: this.uiId ? '' : this.url,
      ui_id: this.uiId ? this.uiId : null,
      notes: '',
      is_public: this.isPublicDefault,
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
  scrollToId(el: HTMLElement): void {
    el.scrollIntoView();
  }
  checkShowToBottom(): void {
    const modalHeight = window.innerHeight * 0.9;
    const modalContentHeight = this.modalDiv.nativeElement.offsetHeight;
    if (modalContentHeight - 200 > modalHeight) {
      this.showToBottom = true;
    }
  }
  onClickedOutside(event: any, note: IUiAnnotation): void {
    note.dropDownOpened = false;
  }
  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }
}
