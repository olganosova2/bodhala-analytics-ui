import {Component, OnDestroy, ViewChild} from '@angular/core';
import { Subscription} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';
import { Location } from '@angular/common';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';

import {AppStateService, TimeoutModalComponent, UserService, UtilService} from 'bodhala-ui-common';
import {HttpService} from 'bodhala-ui-common';
import * as config from './shared/services/config';
import { environment } from '../environments/environment';
import {Title} from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import {Keepalive} from '@ng-idle/keepalive';
import {FiltersService} from './shared/services/filters.service';
import {CommonService} from './shared/services/common.service';
import {LeftSideBarComponent} from 'bodhala-ui-elements';

declare const gtag: any;

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
  @ViewChild(LeftSideBarComponent) leftSidenav: LeftSideBarComponent;

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

    // this.saveInterval = setInterval(() => {
    //   this.keepAlive();
    // }, KEEP_ALIVE_SEC);

    this.addGAScript();
    // track page views
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('event', 'page_view',
          {
            page_path: event.urlAfterRedirects
          }
        );
       }
    });
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
  addGAScript(): void {
    // register googletagmanager
    if (environment.gaAccount) {
      const gaScript = document.createElement('script');
      gaScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
      `;
      document.head.prepend(gaScript);
      const gTagManagerScript = document.createElement('script');
      gTagManagerScript.async = true;
      gTagManagerScript.src = `https://www.googletagmanager.com/gtag/js?id=${environment.gaAccount}`;
      document.head.prepend(gTagManagerScript);
      gtag('config', environment.gaAccount, { send_page_view: false });
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
