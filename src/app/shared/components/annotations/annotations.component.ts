import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {FiltersService} from '../../services/filters.service';
import {CommonService} from '../../services/common.service';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {AnnotaionsModalComponent} from './annotaions-modal/annotaions-modal.component';
import {IUiAnnotation} from './model';

export const NOTES_DIALOG_CONFIG = {
    height: '90vh',
    width: '80vw',
};

@Component({
  selector: 'bd-annotations',
  templateUrl: './annotations.component.html',
  styleUrls: ['./annotations.component.scss']
})
export class AnnotationsComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  parameters: any;
  notes: Array<IUiAnnotation> = [];
  url: string;
  @Input() isPublicDefault: boolean = false;
  @Input() uiId: string;
  @Output() notesUpdated: EventEmitter<Array<IUiAnnotation>> = new EventEmitter<Array<IUiAnnotation>>();

  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public dialog: MatDialog,
              public appStateService: AppStateService,
              public filtersService: FiltersService,
              public userService: UserService,
              public commonServ: CommonService) {
  }

  ngOnInit(): void {
    this.processUrl();
    this.getAnnotations();
  }

  processUrl(): void {
    this.url = this.commonServ.formatPath(window.location.pathname);
  }

  getAnnotations(): void {
    this.notes = [];
    const params = {
      userId: this.userService.currentUser.id,
      url: this.uiId ? '' : this.url,
      clientId: this.userService.currentUser.client_info_id,
      uiId: this.uiId ? this.uiId : null
    };
    this.pendingRequest = this.httpService.makeGetRequest<IUiAnnotation>('getAnnotations', params).subscribe(
      (data: any) => {
        this.notes = data.result || [];
        this.notesUpdated.emit(this.notes);
      }
    );
  }

  viewNotes(): void {
    const dialogParams = { notes: Object.assign([], this.notes), uiId: this.uiId, isPublicDefault: this.isPublicDefault};
    const modalConfig = {...NOTES_DIALOG_CONFIG, data: dialogParams};
    const dialogRef = this.dialog.open(AnnotaionsModalComponent, {...modalConfig, disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      this.notes  = Object.assign([], result);
      this.notesUpdated.emit(this.notes);
    });
  }
  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
