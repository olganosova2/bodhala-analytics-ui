import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import { Subscription} from 'rxjs';
import {Router} from '@angular/router';
import { Location } from '@angular/common';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';

import {AppStateService, TimeoutModalComponent, UserService, UtilService} from 'bodhala-ui-common';
import {MessagingService} from 'bodhala-ui-common';
import {HttpService} from 'bodhala-ui-common';
import * as config from './shared/services/config';
import { environment } from '../environments/environment';
import {KEEP_ALIVE_SEC} from './shared/services/config';
import {Title} from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import {Keepalive} from '@ng-idle/keepalive';
import {FiltersService} from './shared/services/filters.service';
import {CommonService} from './shared/services/common.service';
import {TopTimekeepersComponent} from './firm/top-timekeepers/top-timekeepers.component';
import {LeftSideBarComponent} from 'bodhala-ui-elements';

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
  @ViewChild(LeftSideBarComponent) leftSidenav: TopTimekeepersComponent;

  constructor(public router: Router,
              private location: Location,
              private httpService: HttpService,
              public appStateService: AppStateService,
              private titleService: Title,
              public utilService: UtilService,
              public filtersService: FiltersService,
              private idle: Idle,
              private keepalive: Keepalive,
              public commonServ: CommonService,
              public userService: UserService,
              public dialog: MatDialog) {

    const path = this.location.path();
    if (path === '/launchpad' || path === '') {
      this.router.navigateByUrl('/analytics-ui/analytics.html');
    }
    this.appStateService.loadRoutes(config.ROUTES);
    if (!this.userService.currentUser.isAdmin) {
      this.filtersService.setCurrentUserFilters();
    }
    this.httpService.callInProgress.subscribe(value => {
      setTimeout(() => {
        this.progress = value ? value : false;
      });
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
      this.appStateService.redirectToLogout();
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
        this.appStateService.redirectToLogout();
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
  onActivate(evt): void {
    window.scroll(0, 0);
  }
  navigateFromMenu(evt: any): void {
    const found = this.appStateService.appRoutes.find(e => e.name === evt.state.sref);
    if (found && found.routePath) {
      const route = found.routePath;
      this.router.navigate([route]);
      return;
    }
    if (!evt.state.href) {
      return;
    }
    const result = '/' + evt.state.href;
    window.location.href = result;
    return;
  }
  onDoubleClick(evt: any): void {
    const style = evt.target.style;
    if (style.backgroundColor) {
      style.backgroundColor = null;
    } else {
      style.backgroundColor = '#FED8B1';
    }
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
