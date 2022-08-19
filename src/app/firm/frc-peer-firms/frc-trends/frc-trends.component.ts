import {Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../../shared/services/common.service';
import {FrcServiceService, IMetricDisplayData, IPeerFirms, MetricType, MetricTypeTrends, TrendChart, TrendsChartMode} from '../frc-service.service';
import {MatDialog} from '@angular/material/dialog';
import {FiltersService} from '../../../shared/services/filters.service';
import {Subscription} from 'rxjs';
import {IUiAnnotation} from '../../../shared/components/annotations/model';
import {DatesPickerComponent} from 'bodhala-ui-elements';
import {SavedReportsModalComponent} from '../../saved-reports-modal/saved-reports-modal.component';
import * as _moment from 'moment';
import {FrcTrendsChartComponent} from '../frc-trends-chart/frc-trends-chart.component';

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
  pageType: string = 'FRC';
  isLoaded: boolean = false;
  dialogOpened: boolean = false;
  trendsChartMode: TrendsChartMode = TrendsChartMode.YoY;
  quarterData: Array<any> = [];
  yearData: Array<any> = [];
  charts: Array<string> = [];
  @ViewChild('dpDates') dpDates: DatesPickerComponent;
  @ViewChildren(FrcTrendsChartComponent) chartPanels !: QueryList<FrcTrendsChartComponent>;

  constructor(private httpService: HttpService,
              private route: ActivatedRoute,
              public commonServ: CommonService,
              public frcService: FrcServiceService,
              public userService: UserService,
              public dialog: MatDialog,
              public matDialog: MatDialog,
              public utilServ: UtilService,
              public appStateService: AppStateService,
              public filtersService: FiltersService) {
    this.commonServ.pageTitle = 'Firm Report Cards';
    this.commonServ.pageSubtitle = 'Trends Analysis Report';
  }

  ngOnInit(): void {
    this.url = this.commonServ.formatPath(window.location.pathname);
    this.route.paramMap.subscribe(params => {
      this.firmId = Number(params.get('id'));
      this.setUpFilters(true);
      this.getComparisonFirmsData();
      this.getYearQuarterData();
      // tslint:disable-next-line:forin
      for (const item in TrendChart) {
        this.charts.push(item);
      }
    });
  }
  setUpFilters(firstLoad: boolean = false): void {
    this.filterSet = this.filtersService.getCurrentUserCombinedFilters();
    if (firstLoad) {
      const compaStartdate = moment(this.filterSet.startdate).add(-1, 'years').format('YYYY-MM-DD');
      const compaEnddate = moment(this.filterSet.enddate).add(-1, 'years').format('YYYY-MM-DD');
      this.dpFilter =  Object.assign({}, this.commonServ.formatDatesPickerFilter(compaStartdate, compaEnddate));
      this.filterSet.compareStartDate = compaStartdate;
      this.filterSet.compareEndDate = compaEnddate;
    }
  }

  getComparisonFirmsData(): void {
    this.isLoaded = false;
    this.summaryData = null;
    this.keyMetrics = [];
    const params = Object.assign({},  this.filterSet);
    const arr = [];
    if (this.firmId) {
      arr.push(this.firmId);
      params.firms = JSON.stringify(arr);
    }
    this.pendingRequest = this.httpService.makeGetRequest('getComparisonFRCKeyMetrics', params).subscribe(
      (data: any) => {
        this.isLoaded = true;
        this.checkSavedReports();
        if (data.result) {
          if (data.result.report_timeframe && data.result.report_timeframe.length > 0) {
            this.frcService.processExpenses(data.result.report_timeframe);
            this.summaryData = Object.assign({}, data.result.report_timeframe[0]);
            this.firm = Object.assign({}, data.result.report_timeframe[0]);
          }else{
            this.summaryData = this.frcService.createEmptySingleFirmData();
          }
          this.frcService.calculateSingleFirmData(this.summaryData);

          if (data.result.comparison_timeframe && data.result.comparison_timeframe.length > 0) {
            this.frcService.processExpenses(data.result.comparison_timeframe);
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
    const compStartDate = this.filterSet.compareStartDate;
    const compEndDate = this.filterSet.compareEndDate;
    this.filterSet = this.filtersService.getCurrentUserCombinedFilters();
    this.filterSet.compareStartDate = compStartDate;
    this.filterSet.compareEndDate = compEndDate;
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
    this.dialogOpened = true;
    const dialogRef = this.matDialog.open(SavedReportsModalComponent, {...modalConfig, disableClose: false });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogOpened = false;
      if (!result) {
        return;
      }
      if (result.deletedId) {
        this.checkSavedReports();
        return;
      }
      if (result.exportedData && result.exportedData.filter_set) {
        this.filterSet = Object.assign({}, result.exportedData.filter_set);
        this.dpFilter =  Object.assign({}, this.commonServ.formatDatesPickerFilter(this.filterSet.compareStartDate, this.filterSet.compareEndDate));
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
  getYearQuarterData(): void {
    const params = { clientId: this.userService.currentUser.client_info_id, firms: null};
    const arr = [];
    if (this.firmId) {
      arr.push(this.firmId);
      params.firms = JSON.stringify(arr);
    }
    this.frcService.getYearQuarterData(this.firmId).subscribe(responseList => {
      this.quarterData = responseList[0].result || [];
      this.yearData = responseList[1].result || [];
      this.quarterData = this.quarterData.sort(this.utilServ.dynamicSort('year_quarter'));
      this.yearData = this.yearData.sort(this.utilServ.dynamicSort('year'));
      this.processData(this.quarterData);
      this.processData(this.yearData);
    });
  }
  processData(records: Array<any>): void {
    for (const rec of records) {
      if (rec.total_hours > 0 && rec.total_hours !== null && rec.total_hours !== undefined) {
        rec.partner_hours_percent = (rec.partner_hours / rec.total_hours) * 100;
        rec.associate_hours_percent = (rec.associate_hours / rec.total_hours) * 100;
        rec.paralegal_hours_percent = (rec.paralegal_hours / rec.total_hours) * 100;
        rec.blended_rate = this.frcService.calcBlendedRate(rec);
      }
      rec.avg_duration_days = Math.round(rec.avg_duration_days);
    }
  }

  setUpCompareDates(): void {
    this.filterSet.compareEndDate = moment(this.dpDates.selectedEndDate).format('YYYY-MM-DD');
    this.filterSet.compareStartDate = moment(this.dpDates.selectedStartDate).format('YYYY-MM-DD');
    this.getComparisonFirmsData();
  }
  switchChartMode(): void {
    if (this.trendsChartMode === TrendsChartMode.QoQ) {
      this.trendsChartMode = TrendsChartMode.YoY;
    } else {
      this.trendsChartMode = TrendsChartMode.QoQ;
    }
    if (this.chartPanels && this.chartPanels.length > 0) {
      this.chartPanels.forEach(e => {
        setTimeout(() => {
          e.switchMode();
        });
      });
    }
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
