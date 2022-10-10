import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../../shared/services/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {AgGridService} from 'bodhala-ui-elements';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {GridOptions} from 'ag-grid-community';
import { RatesAnalysisService } from '../../rates-analysis.service';
import { IRateBenchmark, INamedTimekeepersRateBM, moneyFormatter, percentFormatter } from '../../rates-analysis.model';

@Component({
  selector: 'bd-named-tk-analysis',
  templateUrl: './named-tk-analysis.component.html',
  styleUrls: ['./named-tk-analysis.component.scss']
})
export class NamedTkAnalysisComponent implements OnInit {
  pendingRequest: Subscription;
  benchmarkId: number;
  benchmark: IRateBenchmark;
  practiceArea: Array<string> = [];
  firmName: string;
  firmId: number;
  year: Array<number> = [];
  firmYearData: any;
  overallSpendData: any;
  loaded: boolean = false;
  cluster: number;
  numTiers: number;
  totalHours: string;
  namedTKs: Array<INamedTimekeepersRateBM> = [];
  paginationPageSize: number = 10;
  gridHeight: number = 629;
  gridOptions: GridOptions;
  savedState: any;
  sideBarConfig: any;
  defaultColumn: any;
  defaultState: any;
  juniorPartnerMarketData: any;
  midPartnerMarketData: any;
  seniorPartnerMarketData: any;
  juniorPartnerInternalData: any;
  midPartnerInternalData: any;
  seniorPartnerInternalData: any;
  juniorAssociateMarketData: any;
  midAssociateMarketData: any;
  seniorAssociateMarketData: any;
  juniorAssociateInternalData: any;
  midAssociateInternalData: any;
  seniorAssociateInternalData: any;
  firmPartnerJuniorRate: number;
  firmPartnerMidRate: number;
  firmPartnerSeniorRate: number;
  firmAssocJuniorRate: number;
  firmAssocMidRate: number;
  firmAssocSeniorRate: number;
  marketAvgFirms: Array<any>;
  internalFirms: Array<any>;
  lastUpdated: string;

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
      // flag for whether we need to pull all data for page (market avg, internal, firm data), or
      // not, in which case that data was passed from the granularity page
      let needAllData = false;
      if (history.state.data.overviewPage) {
        if (history.state.data.overviewPage === true) {
          needAllData = true;
        }
      }
      if (history.state.data.bm) {
        this.benchmark = history.state.data.bm;
      }
      if (history.state.data.cluster) {
        this.cluster = history.state.data.cluster;
      }
      if (history.state.data.numTiers) {
        this.numTiers = history.state.data.numTiers;
      }
      if (history.state.data.firmYear) {
        this.firmYearData = history.state.data.firmYear;
        this.firmName = this.firmYearData.name;
      }
      if (history.state.data.associateJuniorMarket) {
        this.juniorAssociateMarketData = history.state.data.associateJuniorMarket;
      }
      if (history.state.data.associateMidMarket) {
        this.midAssociateMarketData = history.state.data.associateMidMarket;
      }
      if (history.state.data.associateSeniorMarket) {
        this.seniorAssociateMarketData = history.state.data.associateSeniorMarket;
      }
      if (history.state.data.associateJuniorInternal) {
        this.juniorAssociateInternalData = history.state.data.associateJuniorInternal;
      }
      if (history.state.data.associateMidInternal) {
        this.midAssociateInternalData = history.state.data.associateMidInternal;
      }
      if (history.state.data.associateSeniorInternal) {
        this.seniorAssociateInternalData = history.state.data.associateSeniorInternal;
      }
      if (history.state.data.marketFirms) {
        this.marketAvgFirms = history.state.data.marketFirms;
      }
      if (history.state.data.panel) {
        this.internalFirms = history.state.data.panel;
      }
      if (history.state.data.partnerMarket) {
        const junior = history.state.data.partnerMarket.filter(p => p.seniority === 'Junior');
        if (junior.length > 0) {
          this.juniorPartnerMarketData = junior[0];
        }
        const mid = history.state.data.partnerMarket.filter(p => p.seniority === 'Mid-Level');
        if (mid.length > 0) {
          this.midPartnerMarketData = mid[0];
        }
        const senior = history.state.data.partnerMarket.filter(p => p.seniority === 'Senior');
        if (senior.length > 0) {
          this.seniorPartnerMarketData = senior[0];
        }
      }
      if (history.state.data.partnerInternal) {
        const junior = history.state.data.partnerInternal.filter(p => p.seniority === 'Junior');
        if (junior.length > 0) {
          this.juniorPartnerInternalData = junior[0];
        }
        const mid = history.state.data.partnerInternal.filter(p => p.seniority === 'Mid-Level');
        if (mid.length > 0) {
          this.midPartnerInternalData = mid[0];
        }
        const senior = history.state.data.partnerInternal.filter(p => p.seniority === 'Senior');
        if (senior.length > 0) {
          this.seniorPartnerInternalData = senior[0];
        }
      }
      if (history.state.data.firmPartnerData) {
        if (history.state.data.firmPartnerData.junior_rate) {
          this.firmPartnerJuniorRate = history.state.data.firmPartnerData.junior_rate;
        }
        if (history.state.data.firmPartnerData.mid_rate) {
          this.firmPartnerMidRate = history.state.data.firmPartnerData.mid_rate;
        }
        if (history.state.data.firmPartnerData.senior_rate) {
          this.firmPartnerSeniorRate = history.state.data.firmPartnerData.senior_rate;
        }
      }
      if (history.state.data.firmAssociateData) {
        if (history.state.data.firmAssociateData.junior_rate) {
          this.firmAssocJuniorRate = history.state.data.firmAssociateData.junior_rate;
        }
        if (history.state.data.firmAssociateData.mid_rate) {
          this.firmAssocMidRate = history.state.data.firmAssociateData.mid_rate;
        }
        if (history.state.data.firmAssociateData.senior_rate) {
          this.firmAssocSeniorRate = history.state.data.firmAssociateData.senior_rate;
        }
      }
      if (history.state.data.numTiers) {
        this.numTiers = history.state.data.numTiers;
      }
      this.firmId = this.benchmark.bh_lawfirm_id;
      this.practiceArea = this.benchmark.smart_practice_area;
      this.year = this.benchmark.year;
      this.year.sort();
      if (this.benchmark.modified_on === null) {
        this.lastUpdated = this.benchmark.created_on;
      } else {
        this.lastUpdated = this.benchmark.modified_on;
      }
      this.getNamedTKData(needAllData);
      this.loaded = true;
    } else {

      this.route.paramMap.subscribe(async params => {
        this.benchmarkId = Number(params.get('id'));
        const result = await this.ratesService.getBenchmark(this.benchmarkId);
        this.firmName = result.firm_name;
        this.benchmark = result.benchmark;
        if (this.benchmark.market_avg_firms) {
          this.marketAvgFirms = this.benchmark.market_avg_firms;
        } else {
          this.marketAvgFirms = result.market_firms;
        }
        if (this.benchmark.internal_firms) {
          this.internalFirms = this.benchmark.internal_firms;
        } else {
          this.internalFirms = result.internal_firms;
        }
        this.firmId = this.benchmark.bh_lawfirm_id;
        this.practiceArea = this.benchmark.smart_practice_area;

        this.year = this.benchmark.year;
        this.year.sort();

        if (this.benchmark.modified_on === null) {
          this.lastUpdated = this.benchmark.created_on;
        } else {
          this.lastUpdated = this.benchmark.modified_on;
        }
        this.numTiers = result.num_tiers;
        this.getNamedTKData(true);
        this.loaded = true;
      });
    }

  }

  initColumns(): void {
    this.gridOptions.columnDefs = [
      {headerName: 'Timekeeper Name', field: 'timekeeper_name', ...this.defaultColumn,  filter: 'agTextColumnFilter', floatingFilter: true, width: 150},
      {headerName: 'Bodhala TK Classification', field: 'classification', ...this.defaultColumn,  filter: 'agTextColumnFilter', floatingFilter: true, width: 150},
      {headerName: 'Original TK Classification', field: 'bh_classification', ...this.defaultColumn,  filter: 'agTextColumnFilter', floatingFilter: true, hide: true},
      {headerName: 'Office Location', field: 'office_location', ...this.defaultColumn,  filter: 'agTextColumnFilter', floatingFilter: true, hide: true},
      {headerName: 'Graduation Date', field: 'graduation_date', ...this.defaultColumn,  filter: 'agTextColumnFilter', floatingFilter: true, hide: true},
      {headerName: 'Avg Effective Rate', field: 'rate',  cellRenderer: this.agGridService.roundCurrencyCellRenderer, ...this.defaultColumn, floatingFilter: true, width: 100 },
      {headerName: 'Avg Billed Rate', field: 'avg_billed_rate',  cellRenderer: this.agGridService.roundCurrencyCellRenderer, ...this.defaultColumn, floatingFilter: true, width: 100 },

      {headerName: 'Market Range', field: 'market_range', ...this.defaultColumn, floatingFilter: true, width: 135  },
      {headerName: '+/- Market Avg', field: 'market_lower_diff', cellRenderer: this.marketAvgDiffRenderer, ...this.defaultColumn, width: 145},

      {headerName: 'Panel Avg Rate', field: 'internal_rate',  cellRenderer: this.agGridService.roundCurrencyCellRenderer, ...this.defaultColumn, floatingFilter: true, width: 100 },
      {headerName: '+/- Panel Avg', field: 'internal_rate_diff', cellRenderer: this.rateDiffRenderer, ...this.defaultColumn },

      {headerName: 'Firm Avg Rate', field: 'firm_avg_rate', ...this.defaultColumn, floatingFilter: true, cellRenderer: this.agGridService.roundCurrencyCellRenderer, width: 100 },
      {headerName: '+/- Firm Rate', field: 'firm_diff',  cellRenderer: this.rateDiffRenderer, ...this.defaultColumn },

      {headerName: '# of Hours Worked', field: 'total_hours_final', cellRenderer: this.agGridService.roundToOneNumberCellRenderer, ...this.defaultColumn, floatingFilter: true },
      {headerName: 'Total Billed', field: 'total_billed_final', cellRenderer: this.agGridService.roundToTwoCurrencyCellRenderer, ...this.defaultColumn, floatingFilter: true },
      {headerName: '# Matters', field: 'num_matters', ...this.defaultColumn, floatingFilter: true }
    ];
  }

  buildGrid(): void {
    if (!this.gridOptions.api) {
      return;
    }
    this.gridOptions.api.setRowData(this.namedTKs);
    this.agGridService.restoreGrid(this.savedState, this.gridOptions);
  }

  getNamedTKData(getMarketInternalData: boolean): void {
    const firmParam = [];
    const paParam = [];
    paParam.push(this.benchmark.smart_practice_area);
    firmParam.push(this.benchmark.bh_lawfirm_id.toString());
    let getMarketDataByCluster = true;
    let marketFirms = null;
    if (this.benchmark.market_avg_firms !== null) {
      getMarketDataByCluster = false;
      marketFirms = this.benchmark.market_avg_firms.map(value => value.id);
    }

    let getInternalDataByCluster = true;
    let internalFirms = null;
    if (this.benchmark.internal_firms !== null) {
      getInternalDataByCluster = false;
      internalFirms = this.benchmark.internal_firms.map(value => value.id);
    }

    const params = {
      bmId: this.benchmark.id,
      pa: this.benchmark.smart_practice_area,
      firm: this.benchmark.bh_lawfirm_id,
      yyyy: this.benchmark.year,
      numPartnerTiers: this.numTiers,
      miData: getMarketInternalData,
      firms: JSON.stringify(firmParam),
      bdPracticeAreas: JSON.stringify(paParam),
      getMarketByCluster: getMarketDataByCluster,
      market_firms: marketFirms,
      getInternalByCluster: getInternalDataByCluster,
      internal_firms: internalFirms
    };
    this.pendingRequest = this.httpService.makeGetRequest('getRateBMNamedTKData', params).subscribe(
      (data: any) => {

        if (!data.result) {
          return;
        }

        if (data.result.market_internal) {
          this.juniorAssociateMarketData = {
            market_associate_rate_hi: data.result.market_internal.junior_associate_market_hi,
            market_associate_rate_lo: data.result.market_internal.junior_associate_market_lo,
            market_num_firms: data.result.market_internal.junior_associate_market_num_firms
          };
          this.midAssociateMarketData = {
            market_associate_rate_hi: data.result.market_internal.mid_associate_market_hi,
            market_associate_rate_lo: data.result.market_internal.mid_associate_market_lo,
            market_num_firms: data.result.market_internal.mid_associate_market_num_firms
          };
          this.seniorAssociateMarketData = {
            market_associate_rate_hi: data.result.market_internal.senior_associate_market_hi,
            market_associate_rate_lo: data.result.market_internal.senior_associate_market_lo,
            market_num_firms: data.result.market_internal.senior_associate_market_num_firms
          };
          this.juniorAssociateInternalData = {
            internal_num_firms: data.result.market_internal.junior_associate_internal_num_firms,
            internal_avg_associate_rate: data.result.market_internal.junior_associate_internal
          };
          this.midAssociateInternalData = {
            internal_num_firms: data.result.market_internal.mid_associate_internal_num_firms,
            internal_avg_associate_rate: data.result.market_internal.mid_associate_internal
          };
          this.seniorAssociateInternalData = {
            internal_num_firms: data.result.market_internal.senior_associate_internal_num_firms,
            internal_avg_associate_rate: data.result.market_internal.senior_associate_internal
          };

          this.juniorPartnerMarketData = {
            market_partner_rate_hi: data.result.market_internal.junior_partner_market_hi,
            market_partner_rate_lo: data.result.market_internal.junior_partner_market_lo,
            market_num_firms: data.result.market_internal.junior_partner_market_num_firms
          };
          this.midPartnerMarketData = {
            market_partner_rate_hi: data.result.market_internal.mid_partner_market_hi,
            market_partner_rate_lo: data.result.market_internal.mid_partner_market_lo,
            market_num_firms: data.result.market_internal.mid_partner_market_num_firms
          };
          this.seniorPartnerMarketData = {
            market_partner_rate_hi: data.result.market_internal.senior_partner_market_hi,
            market_partner_rate_lo: data.result.market_internal.senior_partner_market_lo,
            market_num_firms: data.result.market_internal.senior_partner_market_num_firms
          };
          this.juniorPartnerInternalData = {
            internal_avg_partner_rate: data.result.market_internal.junior_partner_internal,
            internal_num_firms: data.result.market_internal.junior_partner_internal_num_firms
          };
          this.midPartnerInternalData = {
            internal_avg_partner_rate: data.result.market_internal.mid_partner_internal,
            internal_num_firms: data.result.market_internal.mid_partner_internal_num_firms
          };
          this.seniorPartnerInternalData = {
            internal_avg_partner_rate: data.result.market_internal.senior_partner_internal,
            internal_num_firms: data.result.market_internal.senior_partner_internal_num_firms
          };
        }
        if (data.result.firm_partner) {
          if (data.result.firm_partner.length > 0) {
            this.firmPartnerJuniorRate = data.result.firm_partner[0].junior_rate;
            this.firmPartnerMidRate = data.result.firm_partner[0].mid_rate;
            this.firmPartnerSeniorRate = data.result.firm_partner[0].senior_rate;
          }
        }
        if (data.result.firm_associate) {
          if (data.result.firm_associate.length > 0) {
            this.firmAssocJuniorRate = data.result.firm_associate[0].junior_rate;
            this.firmAssocMidRate = data.result.firm_associate[0].mid_rate;
            this.firmAssocSeniorRate = data.result.firm_associate[0].senior_rate;
          }
        }
        if (data.result.firm_data) {
          if (data.result.firm_data.length > 0) {
            this.firmYearData = data.result.firm_data[0];
            this.firmYearData = this.firmYearData[0];
          }
        }
        if (data.result.cluster) {
          this.cluster = data.result.cluster;
        }
        this.processPartnerData(data.result.partners);
        this.processAssociateData(data.result.associates);
        this.namedTKs.sort((a, b) => (b.total_billed > a.total_billed) ? 1 : -1);
        this.buildGrid();
      },
      err => {
        return {error: err};
      }
    );
  }

  processPartnerData(partnerData: Array<any>): void {
    for (const partner of partnerData) {
      partner.bh_classification = 'Partner';
      if (partner.total_billed_final === null) {
        partner.total_billed_final = partner.total_billed;
      }
      if (partner.total_hours_final === null) {
        partner.total_hours_final = partner.total_hours;
      }
      partner.classification = this.determinePartnerClassification(partner);
      if (partner.classification === 'Junior Partner') {
        partner.firm_avg_rate = this.firmPartnerJuniorRate;
        const firmDiff = partner.rate - partner.firm_avg_rate;
        partner.firm_diff = firmDiff / partner.firm_avg_rate;
        if (this.juniorPartnerMarketData) {
          if (this.juniorPartnerMarketData.market_num_firms >= 3) {
            partner.market_range = moneyFormatter.format(this.juniorPartnerMarketData.market_partner_rate_lo) + ' - ' + moneyFormatter.format(this.juniorPartnerMarketData.market_partner_rate_hi);

            if (partner.rate >= this.juniorPartnerMarketData.market_partner_rate_lo && partner.rate <= this.juniorPartnerMarketData.market_partner_rate_hi) {
              partner.within_market_range = true;
              partner.market_lower_diff = null;
              partner.market_upper_diff = null;
            } else {
              partner.within_market_range = false;
              const lowerDiff = partner.rate - this.juniorPartnerMarketData.market_partner_rate_lo;
              const upperDiff = partner.rate - this.juniorPartnerMarketData.market_partner_rate_hi;
              partner.market_lower_diff = lowerDiff / this.juniorPartnerMarketData.market_partner_rate_lo;
              partner.market_upper_diff = upperDiff / this.juniorPartnerMarketData.market_partner_rate_hi;
            }
          } else {
            partner.market_range = '--';
            partner.market_lower_diff = null;
            partner.market_upper_diff = null;
          }
        } else {
          partner.market_range = '--';
          partner.market_lower_diff = null;
          partner.market_upper_diff = null;
        }
        if (this.juniorPartnerInternalData) {
          if (this.juniorPartnerInternalData.internal_num_firms >= 1) {
            partner.internal_rate = this.juniorPartnerInternalData.internal_avg_partner_rate;
            const diff = partner.rate - partner.internal_rate;
            partner.internal_rate_diff = diff / this.juniorPartnerInternalData.internal_avg_partner_rate;
          } else {
            partner.internal_rate = '--';
            partner.internal_rate_diff = null;
          }
        } else {
          partner.internal_rate = '--';
          partner.internal_rate_diff = null;
        }
      } else if (partner.classification === 'Mid-level Partner') {
        partner.firm_avg_rate = this.firmPartnerMidRate;
        const firmDiff = partner.rate - partner.firm_avg_rate;
        partner.firm_diff = firmDiff / partner.firm_avg_rate;
        if (this.midPartnerMarketData) {
          if (this.midPartnerMarketData.market_num_firms >= 3) {
            partner.market_range = moneyFormatter.format(this.midPartnerMarketData.market_partner_rate_lo) + ' - ' + moneyFormatter.format(this.midPartnerMarketData.market_partner_rate_hi);
            if (partner.rate >= this.midPartnerMarketData.market_partner_rate_lo && partner.rate <= this.midPartnerMarketData.market_partner_rate_hi) {
              partner.within_market_range = true;
              partner.market_lower_diff = null;
              partner.market_upper_diff = null;
            } else {
              partner.within_market_range = false;
              const lowerDiff = partner.rate - this.midPartnerMarketData.market_partner_rate_lo;
              const upperDiff = partner.rate - this.midPartnerMarketData.market_partner_rate_hi;
              partner.market_lower_diff = lowerDiff / this.midPartnerMarketData.market_partner_rate_lo;
              partner.market_upper_diff = upperDiff / this.midPartnerMarketData.market_partner_rate_hi;
            }
          } else {
            partner.market_range = '--';
            partner.market_lower_diff = null;
            partner.market_upper_diff = null;
          }
        } else {
          partner.market_range = '--';
          partner.market_lower_diff = null;
          partner.market_upper_diff = null;
        }
        if (this.midPartnerInternalData) {
          if (this.midPartnerInternalData.internal_num_firms >= 1) {
            partner.internal_rate = this.midPartnerInternalData.internal_avg_partner_rate;
            const diff = partner.rate - partner.internal_rate;
            partner.internal_rate_diff = diff / this.midPartnerInternalData.internal_avg_partner_rate;
          } else {
            partner.internal_rate = '--';
            partner.internal_rate_diff = null;
          }
        } else {
          partner.internal_rate = '--';
          partner.internal_rate_diff = null;
        }
      } else if (partner.classification === 'Senior Partner') {
        partner.firm_avg_rate = this.firmPartnerSeniorRate;
        const firmDiff = partner.rate - partner.firm_avg_rate;
        partner.firm_diff = firmDiff / partner.firm_avg_rate;
        if (this.seniorPartnerMarketData) {
          if (this.seniorPartnerMarketData.market_num_firms >= 3) {
            partner.market_range = moneyFormatter.format(this.seniorPartnerMarketData.market_partner_rate_lo) + ' - ' + moneyFormatter.format(this.seniorPartnerMarketData.market_partner_rate_hi);

            if (partner.rate >= this.seniorPartnerMarketData.market_partner_rate_lo && partner.rate <= this.seniorPartnerMarketData.market_partner_rate_hi) {
              partner.within_market_range = true;
              partner.market_lower_diff = null;
              partner.market_upper_diff = null;
            } else {
              partner.within_market_range = false;
              const lowerDiff = partner.rate - this.seniorPartnerMarketData.market_partner_rate_lo;
              const upperDiff = partner.rate - this.seniorPartnerMarketData.market_partner_rate_hi;
              partner.market_lower_diff = lowerDiff / this.seniorPartnerMarketData.market_partner_rate_lo;
              partner.market_upper_diff = upperDiff / this.seniorPartnerMarketData.market_partner_rate_hi;
            }
          } else {
            partner.market_range = '--';
            partner.market_lower_diff = null;
            partner.market_upper_diff = null;
          }
        } else {
          partner.market_range = '--';
          partner.market_lower_diff = null;
          partner.market_upper_diff = null;
        }
        if (this.seniorPartnerInternalData) {
          if (this.seniorPartnerInternalData.internal_num_firms >= 1) {
            partner.internal_rate = this.seniorPartnerInternalData.internal_avg_partner_rate;
            const diff = partner.rate - partner.internal_rate;
            partner.internal_rate_diff = diff / this.seniorPartnerInternalData.internal_avg_partner_rate;
          } else {
            partner.internal_rate = '--';
            partner.internal_rate_diff = null;
          }
        } else {
          partner.internal_rate = '--';
          partner.internal_rate_diff = null;
        }
      }
      partner.timekeeper_name = partner.last_name + ', ' + partner.first_name;
      this.namedTKs.push(partner);
    }
  }

  processAssociateData(associateData: Array<any>): void {
    for (const associate of associateData) {
      associate.bh_classification = 'Associate';

      if (associate.total_billed_final === null) {
        associate.total_billed_final = associate.total_billed;
      }
      if (associate.total_hours_final === null) {
        associate.total_hours_final = associate.total_hours;
      }
      if (associate.predicted_seniority < 4) {
        associate.classification = 'Junior Associate';
        associate.firm_avg_rate = this.firmAssocJuniorRate;
        const firmDiff = associate.rate - associate.firm_avg_rate;
        associate.firm_diff = firmDiff / associate.firm_avg_rate;

        if (this.juniorAssociateMarketData) {
          if (this.juniorAssociateMarketData.market_num_firms >= 3) {
            associate.market_range = moneyFormatter.format(this.juniorAssociateMarketData.market_associate_rate_lo) + ' - ' + moneyFormatter.format(this.juniorAssociateMarketData.market_associate_rate_hi);
            if (associate.rate >= this.juniorAssociateMarketData.market_associate_rate_lo && associate.rate <= this.juniorAssociateMarketData.market_associate_rate_hi) {
              associate.within_market_range = true;
              associate.market_lower_diff = null;
              associate.market_upper_diff = null;
            } else {
              associate.within_market_range = false;
              const lowerDiff = associate.rate - this.juniorAssociateMarketData.market_associate_rate_lo;
              const upperDiff = associate.rate - this.juniorAssociateMarketData.market_associate_rate_hi;
              associate.market_lower_diff = lowerDiff / this.juniorAssociateMarketData.market_associate_rate_lo;
              associate.market_upper_diff = upperDiff / this.juniorAssociateMarketData.market_associate_rate_hi;
            }
          } else {
            associate.market_range = '--';
            associate.market_lower_diff = null;
            associate.market_upper_diff = null;
          }
        } else {
          associate.market_range = '--';
          associate.market_lower_diff = null;
          associate.market_upper_diff = null;
        }

        if (this.juniorAssociateInternalData) {
          if (this.juniorAssociateInternalData.internal_num_firms >= 1) {
            associate.internal_rate = this.juniorAssociateInternalData.internal_avg_associate_rate;
            const diff = associate.rate - associate.internal_rate;
            associate.internal_rate_diff = diff / this.juniorAssociateInternalData.internal_avg_associate_rate;
          } else {
            associate.internal_rate = '--';
            associate.internal_rate_diff = null;
          }
        } else {
          associate.internal_rate = '--';
          associate.internal_rate_diff = null;
        }
      } else if (associate.predicted_seniority >= 4 && associate.predicted_seniority < 7) {
        associate.classification = 'Mid-level Associate';
        associate.firm_avg_rate = this.firmAssocMidRate;
        const firmDiff = associate.rate - associate.firm_avg_rate;
        associate.firm_diff = firmDiff / associate.firm_avg_rate;

        if (this.midAssociateMarketData) {
          if (this.midAssociateMarketData.market_num_firms >= 3) {
            associate.market_range = moneyFormatter.format(this.midAssociateMarketData.market_associate_rate_lo) + ' - ' + moneyFormatter.format(this.midAssociateMarketData.market_associate_rate_hi);

            if (associate.rate >= this.midAssociateMarketData.market_associate_rate_lo && associate.rate <= this.midAssociateMarketData.market_associate_rate_hi) {
              associate.within_market_range = true;
              associate.market_lower_diff = null;
              associate.market_upper_diff = null;
            } else {
              associate.within_market_range = false;
              const lowerDiff = associate.rate - this.midAssociateMarketData.market_associate_rate_lo;
              const upperDiff = associate.rate - this.midAssociateMarketData.market_associate_rate_hi;
              associate.market_lower_diff = lowerDiff / this.midAssociateMarketData.market_associate_rate_lo;
              associate.market_upper_diff = upperDiff / this.midAssociateMarketData.market_associate_rate_hi;
            }
          } else {
            associate.market_range = '--';
            associate.market_lower_diff = null;
            associate.market_upper_diff = null;
          }
        } else {
          associate.market_range = '--';
          associate.market_lower_diff = null;
          associate.market_upper_diff = null;
        }

        if (this.midAssociateInternalData) {
          if (this.midAssociateInternalData.internal_num_firms >= 1) {
            associate.internal_rate = this.midAssociateInternalData.internal_avg_associate_rate;
            const diff = associate.rate - associate.internal_rate;
            associate.internal_rate_diff = diff / this.midAssociateInternalData.internal_avg_associate_rate;
          } else {
            associate.internal_rate = '--';
            associate.internal_rate_diff = null;
          }
        } else {
          associate.internal_rate = '--';
          associate.internal_rate_diff = null;
        }
      } else if (associate.predicted_seniority >= 7) {
        associate.classification = 'Senior Associate';
        associate.firm_avg_rate = this.firmAssocSeniorRate;
        const firmDiff = associate.rate - associate.firm_avg_rate;
        associate.firm_diff = firmDiff / associate.firm_avg_rate;
        if (this.seniorAssociateMarketData) {
          if (this.seniorAssociateMarketData.market_num_firms >= 3) {
            associate.market_range = moneyFormatter.format(this.seniorAssociateMarketData.market_associate_rate_lo) + ' - ' + moneyFormatter.format(this.seniorAssociateMarketData.market_associate_rate_hi);
            if (associate.rate >= this.seniorAssociateMarketData.market_associate_rate_lo && associate.rate <= this.seniorAssociateMarketData.market_associate_rate_hi) {
              associate.within_market_range = true;
              associate.market_lower_diff = null;
              associate.market_upper_diff = null;
            } else {
              associate.within_market_range = false;
              const lowerDiff = associate.rate - this.seniorAssociateMarketData.market_associate_rate_lo;
              const upperDiff = associate.rate - this.seniorAssociateMarketData.market_associate_rate_hi;
              associate.market_lower_diff = lowerDiff / this.seniorAssociateMarketData.market_associate_rate_lo;
              associate.market_upper_diff = upperDiff / this.seniorAssociateMarketData.market_associate_rate_hi;
            }
          } else {
            associate.market_range = '--';
            associate.market_lower_diff = null;
            associate.market_upper_diff = null;
          }
        } else {
          associate.market_range = '--';
          associate.market_lower_diff = null;
          associate.market_upper_diff = null;
        }
        if (this.seniorAssociateInternalData) {
          if (this.seniorAssociateInternalData.internal_num_firms >= 1) {
            associate.internal_rate = this.seniorAssociateInternalData.internal_avg_associate_rate;
            const diff = associate.rate - associate.internal_rate;
            associate.internal_rate_diff = diff / this.seniorAssociateInternalData.internal_avg_associate_rate;
          } else {
            associate.internal_rate = '--';
            associate.internal_rate_diff = null;
          }
        }
      }
      associate.timekeeper_name = associate.last_name + ', ' + associate.first_name;
      this.namedTKs.push(associate);
    }
  }

  determinePartnerClassification(partner: any): string {
    let seniority = '';
    if (partner.predicted_seniority_tier === 1 && this.numTiers === 2) {
      seniority = 'Junior Partner';
    } else if (partner.predicted_seniority_tier === 2 && this.numTiers === 2) {
      seniority = 'Senior Partner';
    } else if (partner.predicted_seniority_tier === 1 && this.numTiers === 3) {
      seniority = 'Junior Partner';
    } else if (partner.predicted_seniority_tier === 2 && this.numTiers === 3) {
      seniority = 'Mid-level Partner';
    } else if (partner.predicted_seniority_tier === 3 && this.numTiers === 3) {
      seniority = 'Senior Partner';
    } else if (partner.predicted_seniority_tier === 1 && this.numTiers === 4) {
      seniority = 'Junior Partner';
    } else if (partner.predicted_seniority_tier === 2 && this.numTiers === 4) {
      seniority = 'Mid-level Partner';
    } else if (partner.predicted_seniority_tier === 3 && this.numTiers === 4) {
      seniority = 'Mid-level Partner';
    } else if (partner.predicted_seniority_tier === 4 && this.numTiers === 4) {
      seniority = 'Senior Partner';
    }
    return seniority;
  }

  // Render the cell that shows market avg +/-
  marketAvgDiffRenderer(params): string {
    let result = '';
    if ((params.value === null || isNaN(params.value)) && !params.node.data.within_market_range) {
      result = '<div style="text-align: center;">--</div>';
    } else {
      if (params.node.data.within_market_range) {
        result = '<div style="text-align: center;"><span class="pct-span" style="background: #FFC327; font-family: Roboto; font-size: 12px; border-radius: 17px; width: 82px; padding: 4px 8px; color: white;">Rate is within range</span></div>';
      } else {
        if (params.node.data.market_lower_diff < 0 && params.node.data.market_upper_diff < 0) {
          result = '<div style="text-align: center;"><span class="pct-span" style="background: #3EDB73; font-family: Roboto; font-size: 12px; border-radius: 17px; width: 82px; padding: 4px 8px; color: white;">' + percentFormatter.format(params.node.data.market_lower_diff * -1) + ' - ' + percentFormatter.format(params.node.data.market_upper_diff * -1)  + '<em class="fa fa-arrow-down" style="color: white; padding-left: 5px;"></em></span></div>';
        } else if (params.node.data.market_lower_diff > 0 && params.node.data.market_upper_diff > 0 && params.node.data.market_upper_diff < 0.2) {
          result = '<div style="text-align: center;"><span class="pct-span" style="background: #FF8B4A; font-family: Roboto; font-size: 12px; border-radius: 17px; width: 82px; padding: 4px 8px; color: white;">' + percentFormatter.format(params.node.data.market_upper_diff) + ' - ' + percentFormatter.format(params.node.data.market_lower_diff)  + '<em class="fa fa-arrow-up" style="color: white; padding-left: 5px;"></em></span></div>';
        } else if (params.node.data.market_lower_diff > 0 && params.node.data.market_upper_diff > 0 && params.node.data.market_upper_diff >= 0.2) {
          result = '<div style="text-align: center;"><span class="pct-span" style="background: #FE3F56; font-family: Roboto; font-size: 12px; border-radius: 17px; width: 82px; padding: 4px 8px; color: white;">' + percentFormatter.format(params.node.data.market_upper_diff) + ' - ' + percentFormatter.format(params.node.data.market_lower_diff)  + '<em class="fa fa-arrow-up" style="color: white; padding-left: 5px;"></em></span></div>';
        }
      }
    }
    return result;
  }

  // Render the cell that shows rate +/-
  rateDiffRenderer(params): string {
    let result = '';
    if (params.value === null || isNaN(params.value)) {
      result = '--';
    } else {
      if (params.value < 0) {
        result = '<span class="pct-span" style="background: #3EDB73; font-family: Roboto; font-size: 12px; border-radius: 17px; width: 82px; padding: 4px 8px; color: white;">' + percentFormatter.format((params.value * -1)) + '<em class="fa fa-arrow-down" style="color: white; padding-left: 5px;"></em></span>';
      } else if (params.value > 0 && params.value < 0.2) {
        result = '<span class="pct-span" style="background: #FF8B4A; font-family: Roboto; font-size: 12px; border-radius: 17px; width: 82px; padding: 4px 8px; color: white;">' + percentFormatter.format(params.value) + '<em class="fa fa-arrow-up" style="color: white; padding-left: 5px;"></em></span>';
      } else if (params.value > 0.2) {
        result = '<span class="pct-span" style="background: #FE3F56; font-family: Roboto; font-size: 12px; border-radius: 17px; width: 82px; padding: 4px 8px; color: white;">' + percentFormatter.format(params.value) + '<em class="fa fa-arrow-up" style="color: white; padding-left: 5px;"></em></span>';
      }
    }
    return result;
  }

  changePageSize(evt: any): void {
    this.paginationPageSize = evt.value;
    this.gridOptions.api.paginationSetPageSize(this.paginationPageSize);
    setTimeout(() => {
      this.gridHeight = this.agGridService.setGridHeight(this.namedTKs, this.paginationPageSize);
    });
  }

  goToOverviewPage(): void {
    if (this.loaded) {
      this.router.navigate(['/analytics-ui/rate-benchmarking/view/', this.benchmark.id]);
    }
  }

  goToTKPage(): void {
    if (this.loaded) {
      const detailData = {
        firmYear: this.firmYearData,
        bm: this.benchmark,
        totalSpend: this.overallSpendData,
        // internal: this.internalYearData,
        firmName: this.firmName,
        cluster: this.cluster,
        numTiers: this.numTiers,
        panel: this.internalFirms,
        marketFirms: this.marketAvgFirms
      };
      this.router.navigate(['/analytics-ui/rate-benchmarking/view/detail/', this.benchmark.id],
      {state:
        {
          data: detailData
        }
      });
    }
  }

  export(): void {
    this.commonServ.pdfLoading = true;
    let exportName = '';
    if (this.userService.currentUser.client_info.org.name !== null) {
      exportName = this.userService.currentUser.client_info.org.name + ' Rate BM (Named TKs) - ' + this.firmName + ' - ' + this.benchmark.smart_practice_area;
    } else {
      exportName = 'Rate Benchmark';
    }
    setTimeout(() => {
      this.commonServ.generatePdfRateBM(exportName, 'exportDiv');
    }, 200);
  }

  // including these duplicated functions (from export-button component in bodhala-ui/elements)
  // here so we can export the named TKs grid as XLSX/CSV from the download button in this component
  cellCallback(params): string {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    });
    let cellVal = params.value;
    if (cellVal === undefined) {
      return;
    }
    if (params.column.colDef.cellRenderer && params.column.colDef.cellRenderer !== 'agGroupCellRenderer' && params.column.colDef.cellRenderer !== 'btnRenderer') {
      cellVal = params.column.colDef.cellRenderer(params);
    }
    if (typeof(cellVal) === 'string') {
      if (cellVal.includes('href') || cellVal.includes('cursor: pointer') || cellVal.includes('margin-top') || cellVal.includes('background-color: yellow')) {
        cellVal = params.value;
      }
      if (cellVal.includes('span')) {
        cellVal = formatter.format(params.value);
      }
    }
    if (params.column.colId === 'market_lower_diff') {
      if ((params.value === null || isNaN(params.value)) && !params.node.data.within_market_range) {
        cellVal = '--';
      } else {
        if (params.node.data.within_market_range) {
          cellVal = 'Rate is within range';
        } else {
          if (params.node.data.market_lower_diff < 0 && params.node.data.market_upper_diff < 0) {
            cellVal = percentFormatter.format(params.node.data.market_lower_diff) + ' - ' + percentFormatter.format(params.node.data.market_upper_diff);
          } else if (params.node.data.market_lower_diff > 0 && params.node.data.market_upper_diff > 0 && params.node.data.market_upper_diff < 0.2) {
            cellVal = percentFormatter.format(params.node.data.market_upper_diff) + ' - ' + percentFormatter.format(params.node.data.market_lower_diff);
          } else if (params.node.data.market_lower_diff > 0 && params.node.data.market_upper_diff > 0 && params.node.data.market_upper_diff >= 0.2) {
            cellVal = percentFormatter.format(params.node.data.market_upper_diff) + ' - ' + percentFormatter.format(params.node.data.market_lower_diff);
          }
        }
      }
    }
    if (params.column.colId === 'internal_rate_diff' || params.column.colId === 'firm_diff') {
      if (params.value === null || isNaN(params.value)) {
        cellVal = '--';
      } else {
        if (params.value < 0) {
          cellVal = percentFormatter.format(params.value);
        } else if (params.value > 0 && params.value < 0.2) {
          cellVal = percentFormatter.format(params.value);
        } else if (params.value > 0.2) {
          cellVal = percentFormatter.format(params.value);
        } else if (params.value === 0) {
          cellVal = percentFormatter.format(params.value);
        }
      }
    }
    return cellVal;
  }

  gridExport(type: string): void {
    let name = document.getElementsByClassName('page_description')[0].textContent;
    name = name.trim();
    if (type === 'csv') {
      name += '.csv';
      const params = {
        fileName: name,
        processCellCallback: this.cellCallback
      };
      this.gridOptions.api.exportDataAsCsv(params);
    } else if (type === 'xlsx') {
      name += '.xlsx';
      const params = {
        fileName: name,
        processCellCallback: this.cellCallback
      };
      this.gridOptions.api.exportDataAsExcel(params);
    }
  }

  saveGridConfig(evt: any): void {
    const state = evt;
    this.agGridService.saveState('NamedTKsGrid', this.gridOptions);
  }

  goBack(): void {
    this.router.navigate(['/analytics-ui/rate-benchmarking/']);
  }

}
