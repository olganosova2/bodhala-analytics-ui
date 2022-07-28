import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../../shared/services/common.service';
import {FrcServiceService, IMetricDisplayData, IPeerFirms, MetricType, MetricTypeComparison, MetricTypeTrends, MOCK_PEER_FIRMS} from '../frc-service.service';
import {MatDialog} from '@angular/material/dialog';
import {FiltersService} from '../../../shared/services/filters.service';
import {Subscription} from 'rxjs';
import {IUiAnnotation} from '../../../shared/components/annotations/model';
import {DatesPickerComponent} from 'bodhala-ui-elements';
import {SavedReportsModalComponent} from '../../saved-reports-modal/saved-reports-modal.component';
import * as _moment from 'moment';

const moment = _moment;

@Component({
  selector: 'bd-frc-trends',
  templateUrl: './frc-trends.component.html',
  styleUrls: ['../frc-peer-firms.component.scss', './frc-trends.component.scss']
})
export class FrcTrendsComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  firmId: number;
  firm: IPeerFirms;
  peerFirmsNames: Array<string> = [];
  frcData: Array<IPeerFirms> = [];
  summaryData: IPeerFirms;
  internalData: IPeerFirms;
  internalRecords: Array<IPeerFirms> = [];
  summaryMetrics: Array<IMetricDisplayData> = [];
  keyMetrics: Array<IMetricDisplayData> = [];
  chartMetricData: Array<IMetricDisplayData> = [];
  note: IUiAnnotation;
  notes: Array<IUiAnnotation> = [];
  savedReports: Array<any> = [];
  url: string;
  frcCardSaved: boolean = false;
  filterSet: any = {};
  dpFilter: any;
  metrics: any = MetricTypeTrends;
  excludeFilters: Array<string> = ['firms'];
  pageName: string = 'analytics-ui/frc-trends/';
  compareStartDate: string;
  compareEndDate: string;
  isLoaded: boolean = false;
  @ViewChild('dpDates') dpDates: DatesPickerComponent;

  constructor(private httpService: HttpService,
              private route: ActivatedRoute,
              public commonServ: CommonService,
              public frcService: FrcServiceService,
              public userService: UserService,
              public dialog: MatDialog,
              public matDialog: MatDialog,
              public appStateService: AppStateService,
              public filtersService: FiltersService) {
    this.commonServ.pageTitle = 'Firm Report Card';
    this.commonServ.pageSubtitle = 'Trends Analysis Report';
  }

  ngOnInit(): void {
    this.url = this.commonServ.formatPath(window.location.pathname);
    this.route.paramMap.subscribe(params => {
      this.firmId = Number(params.get('id'));
      this.setUpFilters();
      this.getComparisonFirmsData();
    });
  }
  setUpFilters(): void {
    this.filterSet = this.filtersService.getCurrentUserCombinedFilters();
    const compaStartdate = moment(this.filterSet.startdate).add(-1, 'years').format('YYYY-MM-DD');
    const compaEnddate = moment(this.filterSet.enddate).add(-1, 'years').format('YYYY-MM-DD');
    this.dpFilter =  Object.assign({}, this.commonServ.formatDatesPickerFilter(compaStartdate, compaEnddate));
    this.compareStartDate = compaStartdate;
    this.compareEndDate = compaEnddate;
  }

  getComparisonFirmsData(): void {
    this.isLoaded = false;
    this.summaryData = null;
    this.keyMetrics = [];
    const params = this.filtersService.getCurrentUserCombinedFilters();
    const arr = [];
    if (this.firmId) {
      arr.push(this.firmId);
      params.firms = JSON.stringify(arr);
    }
    params.compareStartDate = this.compareStartDate;
    params.compareEndDate = this.compareEndDate;
    this.pendingRequest = this.httpService.makeGetRequest('getComparisonFRCKeyMetrics', params).subscribe(
      (data: any) => {
        this.isLoaded = true;
        // this.checkSavedReports();
        if (data.result) {
          if (data.result.report_timeframe && data.result.report_timeframe.length > 0) {
            this.summaryData = Object.assign({}, data.result.report_timeframe[0]);
            this.firm = Object.assign({}, data.result.report_timeframe[0]);
          }else{
            this.summaryData = this.frcService.createEmptySingleFirmData();
          }
          this.frcService.calculateSingleFirmData(this.summaryData);

          if (data.result.comparison_timeframe && data.result.comparison_timeframe.length > 0) {
            this.internalData = Object.assign({}, data.result.comparison_timeframe[0]);
          }else{
            this.internalData = this.frcService.createEmptySingleFirmData();
          }
          this.frcService.calculateSingleFirmData(this.internalData);

          const frcMetrics = this.frcService.buildMetrics(this.summaryData, this.internalData, []);
          for (const metricName of Object.keys(this.metrics)) {
            if (typeof MetricType[metricName] !== 'string') {
              continue;
            }
            const prop = this.metrics[metricName];
            const found = frcMetrics.find(e => e.fieldName === prop);
            if (found) {
              this.keyMetrics.push(found);
            }
          }
        }
      }
    );

  }
  refreshData(evt: any): void {
    this.filterSet = this.filtersService.getCurrentUserCombinedFilters();
    this.getComparisonFirmsData();
  }
  goBack(): void {

  }
  export(): void {
    this.commonServ.pdfLoading = true;
    const exportName = this.firm.firm_name + '- Trends Analysis';

    setTimeout(() => {
      this.commonServ.generatePdfOuter(exportName, 'frcDiv', null);
    }, 200);
  }
  viewSavedReports(): void {
    const dialogConfig =  {
      width: '60vw',
    };
    const modalConfig = {...dialogConfig, data: Object.assign([], this.savedReports)};
    const dialogRef = this.matDialog.open(SavedReportsModalComponent, {...modalConfig, disableClose: false });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      if (result.deletedId) {
        this.checkSavedReports();
        return;
      }
      if (result.exportedData && result.exportedData.filter_set) {
        this.filterSet = Object.assign({}, result.exportedData.filter_set);
        this.getComparisonFirmsData();
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
  checkSavedReports(): void {
    this.savedReports = [];
    const params = {} as any;
    const arr = [];
    if (this.firmId) {
      arr.push(this.firmId.toString());
      params.firmId = JSON.stringify(arr);
    }
    this.pendingRequest = this.httpService.makeGetRequest<IUiAnnotation>('getSavedExports', params).subscribe(
      (data: any) => {
        this.savedReports = ( data.result || []).filter( e => e.page_name === this.commonServ.getPageId());
        for (const rep of this.savedReports) {
          if (this.firm) {
            rep.firm_name = this.firm.firm_name;
          }
        }
      }
    );
  }
  setUpCompareDates(): void {
    this.compareEndDate = moment(this.dpDates.selectedEndDate).format('YYYY-MM-DD');
    this.compareStartDate = moment(this.dpDates.selectedStartDate).format('YYYY-MM-DD');
    this.getComparisonFirmsData();
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
