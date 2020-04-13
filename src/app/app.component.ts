import {Component, OnDestroy} from '@angular/core';
import { Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';

import {AppStateService, TimeoutModalComponent, UtilService} from 'bodhala-ui-common';
import {MessagingService} from 'bodhala-ui-common';
import {HttpService} from 'bodhala-ui-common';
import * as config from './shared/services/config';
import { environment } from '../environments/environment';
import {KEEP_ALIVE_SEC} from './shared/services/config';
import {Title} from '@angular/platform-browser';
import {MatDialog} from '@angular/material';
import {Keepalive} from '@ng-idle/keepalive';
import {FiltersService} from './shared/services/filters.service';
import {CommonService} from './shared/services/common.service';

@Component({
  selector: 'bd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'bodhala-analytics-ui';
  progress: boolean = false;
  pendingRequest: Subscription;
  errorMessage: any;
  private saveInterval: any;
  ieVersion: string = '';

  constructor(public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public messageService: MessagingService,
              private titleService: Title,
              public utilService: UtilService,
              public filtersService: FiltersService,
              private idle: Idle,
              private keepalive: Keepalive,
              public commonServ: CommonService,
              public dialog: MatDialog) {
    this.httpService.callInProgress.subscribe(value => {
      this.progress = value ? value : false;
    });
    this.filtersService.setCurrentUserFilters();
    this.httpService.callInProgress.subscribe(value => {
      this.progress = value ? value : false;
    });
    this.ieVersion = this.utilService.getIEVersion();
    titleService.setTitle(config.uiTitleString);
    idle.setIdle(environment.IDLE_KEEPALIVE_CONFIG.timeOutSeconds);
    idle.setTimeout(environment.IDLE_KEEPALIVE_CONFIG.keepaliveSeconds);
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    idle.onIdleEnd.subscribe(() => {
      titleService.setTitle(config.uiTitleString);
    });
    idle.onTimeout.subscribe(() => {
      this.appStateService.redirectToLogin();
    });
    idle.onIdleStart.subscribe(() => {
      this.openDialog();
    });

    this.resetIdle();

    this.saveInterval = setInterval(() => {
      this.keepAlive();
    }, KEEP_ALIVE_SEC);

  }
  resetIdle() {
    this.idle.watch();
  }
  openDialog() {
    const dialogRef = this.dialog.open(TimeoutModalComponent, {... config.timeoutDialogConfig});

    dialogRef.afterClosed().subscribe(result => {
      if (result && !result.expired) {
        // keepalive call
        this.keepAlive();
        this.resetIdle();
      } else {
        this.appStateService.redirectToLogin();
      }
    });
  }
  keepAlive(): void {
    this.pendingRequest = this.httpService.makeGetRequest( 'keepAlive' ).subscribe(
      (data: any) => {
      },
      err => {
        this.errorMessage = err;
      }
    );
  }
  close(): void {
    this.ieVersion = '';
  }
  onActivate(evt): void {
    window.scroll(0, 0);
  }
  ngOnDestroy() {
    if (this.saveInterval) {
      clearInterval(this.saveInterval);
    }
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }
}
