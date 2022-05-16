import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../../shared/services/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {AgGridService} from 'bodhala-ui-elements';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {GridOptions} from 'ag-grid-community';
import { RatesAnalysisService } from '../../rates-analysis.service';
import { IRateBenchmark, INamedTimekeepersRateBM } from '../../rates-analysis.model';

@Component({
  selector: 'bd-named-tk-analysis',
  templateUrl: './named-tk-analysis.component.html',
  styleUrls: ['./named-tk-analysis.component.scss']
})
export class NamedTkAnalysisComponent implements OnInit {
  pendingRequest: Subscription;
  benchmarkId: number;
  benchmark: IRateBenchmark;
  practiceArea: string;
  firmName: string;
  firmId: number;
  year: number;
  peerFirms: Array<string>;
  firmYearData: any;
  marketAverageData: any;
  internalData: any;
  overallSpendData: any;
  loaded: boolean = false;
  cluster: number;
  numPartnerTiers: number;
  totalHours: string;
  namedTKs: Array<INamedTimekeepersRateBM> = [];
  paginationPageSize: number = 10;
  gridOptions: GridOptions;
  savedState: any;
  sideBarConfig: any;
  defaultColumn: any;
  defaultState: any;

  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public userService: UserService,
              public commonServ: CommonService,
              public utilService: UtilService,
              public agGridService: AgGridService,
              public dialog: MatDialog,
              public ratesService: RatesAnalysisService) {
    this.commonServ.pageTitle = 'View Rate Analysis';
    setTimeout(() => {
    this.commonServ.pageSubtitle = this.firmName;
    });
  }

  ngOnInit(): void {
    this.defaultColumn = this.agGridService.getDefaultColumn();
    this.sideBarConfig = this.agGridService.getDefaultSideBar();
    this.savedState = this.agGridService.getSavedState('RateIncreasesGrid');
    this.gridOptions = this.agGridService.getDefaultGridOptions();
    this.initColumns();
    if (history.state.data) {
      if (history.state.data.bm) {
        this.benchmark = history.state.data.bm;
      }
      if (history.state.data.cluster) {
        this.cluster = history.state.data.cluster;
      }
      if (history.state.data.firmYear) {
        this.firmYearData = history.state.data.firmYear;
        this.firmName = this.firmYearData.name;
        this.totalHours = this.firmYearData.total_atty_hours;
      }
      if (history.state.data.internal) {
        this.internalData = history.state.data.internal;
      }
      if (history.state.data.market) {
        this.marketAverageData = history.state.data.market;
      }
      if (history.state.data.totalSpend) {
        this.overallSpendData = history.state.data.totalSpend;
      }
      if (history.state.data.numTiers) {
        this.numPartnerTiers = history.state.data.numTiers;
      }
      if (history.state.data.peerFirms) {
        this.peerFirms = history.state.data.peerFirms;
      }
      this.firmId = this.benchmark.bh_lawfirm_id;
      this.practiceArea = this.benchmark.smart_practice_area;
      this.year = this.benchmark.year;
      const ix = this.peerFirms.findIndex(p => p === this.firmName);
      if (ix >= 0) {
        this.peerFirms.splice(ix, 1);
      }
      this.getNamedTKData();
      this.loaded = true;
    } else {
      this.route.paramMap.subscribe(async params => {
        this.benchmarkId = Number(params.get('id'));
        const result = await this.ratesService.getBenchmark(this.benchmarkId);
        this.firmName = result.firm_name;
        this.benchmark = result.benchmark;
        this.firmId = this.benchmark.bh_lawfirm_id;
        this.practiceArea = this.benchmark.smart_practice_area;
        this.year = this.benchmark.year;
        const ix = result.peer_firms.findIndex(p => p === this.firmName);
        this.peerFirms = [];
        if (ix >= 0) {
          result.peer_firms.splice(ix, 1);
        }
        if (result.peer_firms) {
          let counter = 0;
          for (const firm of result.peer_firms) {
            if ((firm.length + counter) < 110) {
              this.peerFirms.push(firm);
            }
            counter += firm.length;
          }
        }
        const rateAnalysisData = await this.ratesService.getRateAnalysisData(this.benchmark);

        if (rateAnalysisData.result.firm_data) {
          if (rateAnalysisData.result.firm_data.length > 0) {
            this.firmYearData = rateAnalysisData.result.firm_data[0];
            this.firmYearData = this.firmYearData[0];
            this.firmName = this.firmYearData.name;
            this.totalHours = this.firmYearData.total_atty_hours;
          }
        }
        if (rateAnalysisData.result.overall_spend) {
          this.overallSpendData = rateAnalysisData.result.overall_spend;
        }
        if (rateAnalysisData.result.cluster) {
          this.cluster = rateAnalysisData.result.cluster;
        }
        if (rateAnalysisData.result.num_tiers) {
          this.numPartnerTiers = rateAnalysisData.result.num_tiers;
        }
        this.getNamedTKData();
        this.loaded = true;
      });
    }
  }

  initColumns(): void {
    this.gridOptions.columnDefs = [
      {headerName: 'Last Name', field: 'last_name', ...this.defaultColumn,  filter: 'agTextColumnFilter', floatingFilter: true},
      {headerName: 'First Name', field: 'first_name', ...this.defaultColumn,  filter: 'agTextColumnFilter', floatingFilter: true},
      {headerName: 'Bodhala TK Classification', field: 'tk_classification', ...this.defaultColumn,  filter: 'agTextColumnFilter', floatingFilter: true},
      {headerName: 'Office Location', field: 'office_location', ...this.defaultColumn,  filter: 'agTextColumnFilter', floatingFilter: true, hide: true},
      {headerName: 'Graduation Date', field: 'graduation_date', ...this.defaultColumn,  filter: 'agTextColumnFilter', floatingFilter: true, hide: true},
      {headerName: 'Avg Effective Rate', field: 'avg_effective_rate',  cellRenderer: this.agGridService.roundToTwoCurrencyCellRenderer, ...this.defaultColumn },
      {headerName: 'Avg Billed Rate', field: 'avg_billed_rate',  cellRenderer: this.agGridService.roundToTwoCurrencyCellRenderer, ...this.defaultColumn },

      {headerName: 'Market Range', field: 'market_range',  cellRenderer: this.agGridService.roundToTwoCurrencyCellRenderer, ...this.defaultColumn },
      {headerName: '+/- Market Avg', field: 'market_range', cellRenderer: this.marketAvgDiffRenderer, ...this.defaultColumn },

      {headerName: 'Internal Avg Rate', field: 'internal_avg_rate',  cellRenderer: this.agGridService.roundToTwoCurrencyCellRenderer, ...this.defaultColumn },
      {headerName: '+/- Internal Avg', field: 'internal_avg_diff', cellRenderer: this.internalRateDiffRenderer, ...this.defaultColumn },

      {headerName: 'Firm Avg Rate', field: 'firm_avg_rate', ...this.defaultColumn },
      {headerName: '+/- Firm Rate', field: 'internal_avg_rate',  cellRenderer: this.firmRateDiffRenderer, ...this.defaultColumn },

      {headerName: '# of Hours Worked', field: 'total_hours_final',  cellRenderer: this.agGridService.roundToTwoCurrencyCellRenderer, ...this.defaultColumn },
      {headerName: 'Total Billed', field: 'total_billed_final',  cellRenderer: this.agGridService.roundToTwoCurrencyCellRenderer, ...this.defaultColumn },
      {headerName: '# Matters', field: 'num_matters', ...this.defaultColumn }
    ];
  }

  getNamedTKData(): void {
    const params = {
      pa: this.benchmark.smart_practice_area,
      firm: this.benchmark.bh_lawfirm_id,
      yyyy: this.benchmark.year,
    };
    this.pendingRequest = this.httpService.makeGetRequest('getRateBMNamedTKData', params).subscribe(
      (data: any) => {
        if (!data.result) {
          return;
        }
        console.log("DATA: ", data)
      },
      err => {
        return {error: err};
      }
    );
  }

  marketAvgDiffRenderer(): string {
    return '';
  }

  internalRateDiffRenderer(): string {
    return '';
  }

  firmRateDiffRenderer(): string {
    return '';
  }

  saveGridConfig(evt: any): void {
    const state = evt;
    this.agGridService.saveState('NamedTKsGrid', this.gridOptions);
  }

}
