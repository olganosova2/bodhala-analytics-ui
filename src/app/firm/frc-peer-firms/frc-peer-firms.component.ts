import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {CommonService} from '../../shared/services/common.service';
import {FrcServiceService, IMetricDisplayData, IPeerFirms, MOCK_PEER_FIRMS} from './frc-service.service';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {FiltersService} from '../../shared/services/filters.service';
import {FiltersService as ElementsFiltersService} from 'bodhala-ui-elements';
import {barTkPercentOptions} from './frc-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {VisibleKeyMetricsComponent} from './visible-key-metrics/visible-key-metrics.component';
import {MatDialog} from '@angular/material/dialog';
import {FrcNotesComponent} from './frc-notes/frc-notes.component';
import {IUiAnnotation} from '../../shared/components/annotations/model';
import {SavedReportsModalComponent} from '../saved-reports-modal/saved-reports-modal.component';
import * as _moment from 'moment';

const moment = _moment;

@Component({
  selector: 'bd-frc-peer-firms',
  templateUrl: './frc-peer-firms.component.html',
  styleUrls: ['./frc-peer-firms.component.scss']
})
export class FrcPeerFirmsComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  firmId: number; // = 292;
  firm: any;
  peerFirmsNames: Array<string> = [];
  allFirms: Array<any> = [];
  frcData: Array<IPeerFirms> = [];
  summaryData: IPeerFirms;
  internalData: IPeerFirms;
  internalRecords: Array<IPeerFirms> = [];
  frcMetrics: Array<IMetricDisplayData> = [];
  summaryMetrics: Array<IMetricDisplayData> = [];
  keyMetrics: Array<IMetricDisplayData> = [];
  chartMetricData: Array<IMetricDisplayData> = [];
  note: IUiAnnotation;
  notes: Array<IUiAnnotation> = [];
  savedReports: Array<any> = [];
  url: string;
  frcCardSaved: boolean = false;
  filterSet: any;
  excludeFilters: Array<string> = [];
  pageName: string = 'analytics-ui/frc-peer-firms/';
  pageType: string = 'FRC';
  noFirmsSelected: boolean = false;
  isLoaded: boolean = true;
  hideFirms: boolean = false;
  selectedFilters: Array<any> = [];
  percentOfTotal: number = 0;
  rank: number = 1;
  otherFirms: boolean = false;
  chart: any;
  options: any = Object.assign({}, barTkPercentOptions);
  @ViewChild('chartDiv') chartDiv: ElementRef<HTMLElement>;


  constructor(private httpService: HttpService,
              private route: ActivatedRoute,
              public router: Router,
              public commonServ: CommonService,
              public frcService: FrcServiceService,
              public userService: UserService,
              public dialog: MatDialog,
              public matDialog: MatDialog,
              public appStateService: AppStateService,
              public filtersService: FiltersService,
              public elemFiltersService: ElementsFiltersService
  ) {
    this.commonServ.pageTitle = 'Firm Report Cards';
    this.commonServ.pageSubtitle = 'Comparison Firms Report';
    this.selectedFilters = this.frcService.formatAppliedFilters();
    if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras.state) {
      this.noFirmsSelected = false;
      this.filterSet = this.router.getCurrentNavigation().extras.state.filterSet;
      this.selectedFilters = this.frcService.formatHistoricalAppliedFilters(this.filterSet);
    }
  }

  ngOnInit(): void {

    this.url = this.commonServ.formatPath(window.location.pathname);
    this.route.paramMap.subscribe(params => {
      this.firmId = Number(params.get('id'));
      if (!this.filterSet) {
        this.setUpFilters();
      }
      this.getPeerFirmsData();
      this.getAnnotations();
    });
  }

  setUpFilters(): void {
    this.noFirmsSelected = false;
    this.filterSet = this.filtersService.getCurrentUserCombinedFilters();
  }

  getPeerFirmsData(): void {
    this.summaryData = null;
    this.frcMetrics = [];
    this.summaryMetrics = [];
    this.keyMetrics = [];
    this.chartMetricData = [];
    this.peerFirmsNames = [];
    this.isLoaded = false;
    const params = Object.assign({}, this.filterSet);
    let arr = [];
    arr.push(this.firmId);
    if (this.filterSet.firms) {
      arr = arr.concat(JSON.parse(this.filterSet.firms));
      params.firms = JSON.stringify(arr);
    }
    if (this.frcService.customReport) {
      params.customFirmId = this.firmId;
    }
    this.pendingRequest = this.httpService.makeGetRequest('getFRCKeyMetrics', params).subscribe(
      (data: any) => {
        this.isLoaded = true;
        if (data.result && data.result.length > 0) {
          this.frcService.processExpenses(data.result);
          this.checkSavedReports();
          this.frcData = data.result || [];
          let found = this.frcData.find(e => e.bh_lawfirm_id === this.firmId);
          if (!found) {
            found = this.frcService.createEmptySingleFirmData();
          }
          this.calculateRankAndPercent();
          this.summaryData = Object.assign({}, found);
          this.firm = Object.assign({}, found);
          this.commonServ.pageSubtitle = 'Comparison Firms Report > ' + this.firm.firm_name;
          this.frcService.calculateSingleFirmData(this.summaryData);
          this.internalRecords = this.frcData.filter(e => e.bh_lawfirm_id !== this.firmId) || [];
          this.peerFirmsNames = this.internalRecords.map(e => e.firm_name);
          this.formatPeerNames();
          this.internalData = this.frcService.calculatePeersData(this.internalRecords);
          const originals = this.frcService.calculatePeersData(this.frcData);
          this.frcMetrics = this.frcService.buildMetrics(this.summaryData, this.internalData, this.frcData);
          this.summaryMetrics = this.frcMetrics.filter(e => e.keyMetric === false);
          this.keyMetrics = this.frcMetrics.filter(e => e.keyMetric === true);
          this.chartMetricData = this.frcService.formatPercentOfTkWorked(this.summaryData, this.internalData);
        }
      }
    );
  }

  refreshData(evt: any): void {
    this.setUpFilters();
    this.getPeerFirmsData();
    this.selectedFilters = this.frcService.formatAppliedFilters();
  }

  calculateRankAndPercent(): void {
    let total = 0;
    const found =  this.frcData.find(e => e.bh_lawfirm_id === this.firmId);
    for (const rec of this.frcData) {
      total += rec.total_billed;
    }
    if (found) {
      this.rank = this.frcData.indexOf(found);
      this.rank ++;
      this.percentOfTotal = found.total_billed / (total || 1);
    }
  }

  formatPeerNames(): void {
      if (this.peerFirmsNames.length > 15) {
        this.peerFirmsNames = this.peerFirmsNames.slice(0, 15);
        this.peerFirmsNames.push('....');
      }
  }

  saveInstance(chartInstance): void {
    this.chart = chartInstance;

    this.chart.series[3].setData(this.getPercentOfHoursWorkedChartData(this.chartMetricData, 0));
    this.chart.series[2].setData(this.getPercentOfHoursWorkedChartData(this.chartMetricData, 1));
    this.chart.series[1].setData(this.getPercentOfHoursWorkedChartData(this.chartMetricData, 2));
    this.chart.series[0].setData(this.getPercentOfHoursWorkedChartData(this.chartMetricData, 3));
    this.chart.xAxis[0].categories = [this.firm.firm_name, 'Comparison Firms'];
    this.chart.xAxis[0].redraw();
    this.chart.redraw();

    setTimeout(() => {
      this.resizeChart();
    });
  }

  resizeChart(): void {
    const width = this.chartDiv.nativeElement.offsetWidth - 40;
    const height = 250;

    if (!this.chart || width <= 0) {
      return;
    }
    this.chart.setSize(width, height, false);
  }

  getPercentOfHoursWorkedChartData(chartMetricData: Array<IMetricDisplayData>, index: number): Array<number> {
    const result = [];
    result.push(chartMetricData[index].actual);
    result.push(chartMetricData[index].firms);
    return result;
  }

  goBack(): void {
    history.back();
  }

  viewSavedReports(): void {
    const dialogConfig = {
      width: '60vw',
    };
    const modalConfig = {...dialogConfig, data: Object.assign([], this.savedReports)};
    const dialogRef = this.matDialog.open(SavedReportsModalComponent, {...modalConfig, disableClose: false});

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      if (result.deletedId) {
        this.checkSavedReports();
        return;
      }
      if (result.exportedData && result.exportedData.filter_set) {
        this.selectedFilters = this.frcService.formatHistoricalAppliedFilters(result.exportedData.filter_set);
        this.filterSet = Object.assign({}, result.exportedData.filter_set);
        this.noFirmsSelected = false;
        if (!this.filterSet.firms || this.filterSet.firms.lenght === 0) {
          this.noFirmsSelected = true;
        }
        this.getPeerFirmsData();
      }
    });
  }

  getAnnotations(): void {
    this.notes = [];
    const params = {
      userId: this.userService.currentUser.id,
      url: this.url,
      clientId: this.userService.currentUser.client_info_id,
      uiId: null
    };
    this.pendingRequest = this.httpService.makeGetRequest<IUiAnnotation>('getAnnotations', params).subscribe(
      (data: any) => {
        this.notes = data.result || [];
        if (this.notes.length > 0) {
          this.note = this.notes[0];
        }
      }
    );
  }

  checkSavedReports(): void {
    this.savedReports = [];
    const params = {} as any;
    const arr = [];
    if (this.firmId) {
      arr.push(this.firmId.toString());
      params.firmId = JSON.stringify(arr);
    }
    this.pendingRequest = this.httpService.makeGetRequest('getSavedExports', params).subscribe(
      (data: any) => {
        this.savedReports = (data.result || []).filter(e => e.page_name.includes('Firm Report Card'));
        for (const rep of this.savedReports) {
          if (this.firm) {
            rep.firm_name = this.firm.firm_name;
          }
        }
      }
    );
  }

  addNotes(mode: string): void {
    const packaged = {firmId: this.firmId, action: mode, note: this.note};
    const dialogConfig = {
      height: '400px',
      width: '60vw',
    };
    const modalConfig = {...dialogConfig, data: Object.assign([], packaged)};
    const dialogRef = this.dialog.open(FrcNotesComponent, {...modalConfig, disableClose: false});

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.note = result;
      if (this.note.deleted_on) {
        this.note = null;
      }
    });
  }

  saveFrc(): void {
    this.commonServ.saveReport(this.firmId, this.filterSet).subscribe(
      (data: any) => {
        if (data && data.result) {
          this.checkSavedReports();
          this.frcCardSaved = true;
        }
      }
    );
  }

  export(): void {
    this.commonServ.pdfLoading = true;
    const exportName = this.firm.firm_name + '- Comparison Firms Report';

    setTimeout(() => {
      this.commonServ.generatePdfOuter(exportName, 'frcDiv', null);
    }, 200);
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
