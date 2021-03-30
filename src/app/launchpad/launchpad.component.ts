import {Component, OnInit, HostListener, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { LaunchPadService } from './launchpad.service';
import { FiltersService } from '../shared/services/filters.service';
import {DatePipe} from '@angular/common';
import { columns } from './launchpad.model';
import {AppStateService, UtilService} from 'bodhala-ui-common';
import {CommonService} from '../shared/services/common.service';
import {UserService} from 'bodhala-ui-common';
import {ExecutiveSummaryComponent} from './executive-summary/executive-summary.component';

@Component({
  selector: 'bd-launchpad',
  templateUrl: './launchpad.component.html',
  styleUrls: ['./launchpad.component.scss']
})
export class LaunchpadComponent implements OnInit, OnDestroy {
  pageName = 'app.client-dashboard.launchpad';
  selectedTabIndex: number = 0;
  @ViewChild('launchpad')
  container: ElementRef;
  excludeFilters = ['dates'];

  @ViewChild('insights', { read: ElementRef })
  insights: ElementRef;

  cards: Array<any> = []; // cards;
  requests = {};
  columns = columns;
  @ViewChild(ExecutiveSummaryComponent) executiveSummaryTablesComp: ExecutiveSummaryComponent;

  constructor(
    public filtersService: FiltersService,
    private launchPadService: LaunchPadService,
    public appStateService: AppStateService,
    public userService: UserService,
    public commonServ: CommonService,
    private datePipe: DatePipe
    ) {
    this.cards = this.launchPadService.configureCards();
    this.commonServ.pageTitle = 'Launchpad';
    commonServ.pageSubtitle = '';
  }

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.requests = this.launchPadService.fetchData();
  }

  onCardLoaded() {
  }
  onClick(item) {
  }
  receiveMessage(event) {
    this.filtersService.setCurrentUserFilters();
    this.load();
  }
  changeTab(evt): void {
    this.selectedTabIndex = evt.index;

  }
  refreshExecutiveSummaryData(evt): void {
    this.executiveSummaryTablesComp.refreshData();

  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
  }
}

