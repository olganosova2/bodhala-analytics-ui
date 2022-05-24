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
  juniorPartnerData: any;
  midPartnerData: any;
  seniorPartnerData: any;
  juniorAssociateData: any;
  midAssociateData: any;
  seniorAssociateData: any;
  firmPartnerJuniorRate: number;
  firmPartnerMidRate: number;
  firmPartnerSeniorRate: number;
  firmAssocJuniorRate: number;
  firmAssocMidRate: number;
  firmAssocSeniorRate: number;

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
        this.numTiers = history.state.data.numTiers;
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
        console.log("rateAnalysisData: ", rateAnalysisData)
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
          this.numTiers = rateAnalysisData.result.num_tiers;
        }
        this.getNamedTKData();
        this.loaded = true;
      });
    }
  }

  initColumns(): void {
    this.gridOptions.columnDefs = [
      {headerName: 'Timekeeper Name', field: 'timekeeper_name', ...this.defaultColumn,  filter: 'agTextColumnFilter', floatingFilter: true},
      {headerName: 'Bodhala TK Classification', field: 'classification', ...this.defaultColumn,  filter: 'agTextColumnFilter', floatingFilter: true},
      {headerName: 'Original TK Classification', field: 'bh_classification', ...this.defaultColumn,  filter: 'agTextColumnFilter', floatingFilter: true, hide: true},
      {headerName: 'Office Location', field: 'office_location', ...this.defaultColumn,  filter: 'agTextColumnFilter', floatingFilter: true, hide: true},
      {headerName: 'Graduation Date', field: 'graduation_date', ...this.defaultColumn,  filter: 'agTextColumnFilter', floatingFilter: true, hide: true},
      {headerName: 'Avg Effective Rate', field: 'rate',  cellRenderer: this.agGridService.roundCurrencyCellRenderer, ...this.defaultColumn, floatingFilter: true },
      {headerName: 'Avg Billed Rate', field: 'avg_billed_rate',  cellRenderer: this.agGridService.roundCurrencyCellRenderer, ...this.defaultColumn, floatingFilter: true },

      {headerName: 'Market Range', field: 'market_range', ...this.defaultColumn, floatingFilter: true },
      {headerName: '+/- Market Avg', field: 'market_range_diff', cellRenderer: this.marketAvgDiffRenderer, ...this.defaultColumn },

      {headerName: 'Internal Avg Rate', field: 'internal_rate',  cellRenderer: this.agGridService.roundCurrencyCellRenderer, ...this.defaultColumn, floatingFilter: true },
      {headerName: '+/- Internal Avg', field: 'internal_rate_diff', cellRenderer: this.internalRateDiffRenderer, ...this.defaultColumn },

      {headerName: 'Firm Avg Rate', field: 'firm_avg_rate', ...this.defaultColumn, floatingFilter: true, cellRenderer: this.agGridService.roundCurrencyCellRenderer },
      {headerName: '+/- Firm Rate', field: 'firm_diff',  cellRenderer: this.firmRateDiffRenderer, ...this.defaultColumn },

      {headerName: '# of Hours Worked', field: 'total_hours_final', cellRenderer: this.agGridService.roundNumberCellRenderer, ...this.defaultColumn, floatingFilter: true },
      {headerName: 'Total Billed', field: 'total_billed_final', cellRenderer: this.agGridService.roundCurrencyCellRenderer, ...this.defaultColumn, floatingFilter: true },
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

  getNamedTKData(): void {
    const params = {
      pa: this.benchmark.smart_practice_area,
      firm: this.benchmark.bh_lawfirm_id,
      yyyy: this.benchmark.year,
      numPartnerTiers: this.numTiers
    };
    this.pendingRequest = this.httpService.makeGetRequest('getRateBMNamedTKData', params).subscribe(
      (data: any) => {
        console.log("data: ", data);
        if (!data.result) {
          return;
        }
        if (data.result.partner_market_internal) {
          this.juniorPartnerData = data.result.partner_market_internal.filter(p => p.seniority === 'Junior');
          if (this.juniorPartnerData.length > 0) {
            this.juniorPartnerData = this.juniorPartnerData[0];
          }
          this.midPartnerData = data.result.partner_market_internal.filter(p => p.seniority === 'Mid-Level');
          if (this.midPartnerData.length > 0) {
            this.midPartnerData = this.midPartnerData[0];
          }
          this.seniorPartnerData = data.result.partner_market_internal.filter(p => p.seniority === 'Senior');
          if (this.seniorPartnerData.length > 0) {
            this.seniorPartnerData = this.seniorPartnerData[0];
          }
        }
        if (data.result.associate_market_internal) {
          this.juniorAssociateData = data.result.associate_market_internal.filter(p => p.seniority === 'Junior');
          if (this.juniorAssociateData.length > 0) {
            this.juniorAssociateData = this.juniorAssociateData[0];
          }
          this.midAssociateData = data.result.associate_market_internal.filter(p => p.seniority === 'Mid-Level');
          if (this.midAssociateData.length > 0) {
            this.midAssociateData = this.midAssociateData[0];
          }
          this.seniorAssociateData = data.result.associate_market_internal.filter(p => p.seniority === 'Senior');
          if (this.seniorAssociateData.length > 0) {
            this.seniorAssociateData = this.seniorAssociateData[0];
          }
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
        this.processPartnerData(data.result.partners);
        this.processAssociateData(data.result.associates);
        console.log("DATA: ", data)
        this.namedTKs.sort((a, b) => (a.last_name > b.last_name) ? 1 : -1);
        console.log("this.namedTKs: ", this.namedTKs)
        this.buildGrid();
      },
      err => {
        return {error: err};
      }
    );
  }

  processPartnerData(partnerData: Array<any>): void {
    for (let partner of partnerData) {
      if (partner.total_billed_final === null) {
        partner.total_billed_final = partner.total_billed;
      }
      if (partner.total_hours_final === null) {
        partner.total_hours_final = partner.total_hours;
      }
      partner.classification = this.determinePartnerClassification(partner);
      if (partner.classification === 'Junior Partner') {
        partner.firm_avg_rate = this.firmPartnerJuniorRate;
        const firm_diff = partner.rate - partner.firm_avg_rate;
        partner.firm_diff = firm_diff / partner.rate;
        if (this.juniorPartnerData.market_num_firms >= 3) {
          partner.market_range = moneyFormatter.format(this.juniorPartnerData.market_partner_rate_lo) + ' - ' + moneyFormatter.format(this.juniorPartnerData.market_partner_rate_hi);

          if (partner.rate >= this.juniorPartnerData.market_partner_rate_lo && partner.rate <= this.juniorPartnerData.market_partner_rate_hi) {
            partner.within_market_range = true;
          } else {
            partner.within_market_range = false;
            const lower_diff = partner.rate - this.juniorPartnerData.market_partner_rate_lo;
            const upper_diff = partner.rate - this.juniorPartnerData.market_partner_rate_hi;
            partner.market_lower_diff = lower_diff / partner.rate;
            partner.market_upper_diff = upper_diff / partner.rate;
          }
        } else {
          partner.market_range = '--';
          partner.market_lower_diff = null;
          partner.market_upper_diff = null;
        }
        if (this.juniorPartnerData.internal_num_firms >= 3) {
          partner.internal_rate = this.juniorPartnerData.internal_avg_associate_rate;
          const diff = partner.rate - partner.internal_rate;
          partner.internal_rate_diff = diff / partner.rate;
        } else {
          partner.internal_rate = '--';
          partner.internal_rate_diff = null;
        }

      } else if (partner.classification === 'Mid-level Partner') {
        partner.firm_avg_rate = this.firmPartnerMidRate;
        const firm_diff = partner.rate - partner.firm_avg_rate;
        partner.firm_diff = firm_diff / partner.rate;
        if (this.midPartnerData.market_num_firms >= 3) {
          partner.market_range = moneyFormatter.format(this.midPartnerData.market_partner_rate_lo) + ' - ' + moneyFormatter.format(this.midPartnerData.market_partner_rate_hi);
          if (partner.rate >= this.midPartnerData.market_partner_rate_lo && partner.rate <= this.midPartnerData.market_partner_rate_hi) {
            partner.within_market_range = true;
          } else {
            partner.within_market_range = false;
            const lower_diff = partner.rate - this.midPartnerData.market_partner_rate_lo;
            const upper_diff = partner.rate - this.midPartnerData.market_partner_rate_hi;
            partner.market_lower_diff = lower_diff / partner.rate;
            partner.market_upper_diff = upper_diff / partner.rate;
          }
        } else {
          partner.market_range = '--';
          partner.market_lower_diff = null;
          partner.market_upper_diff = null;
        }
        if (this.midPartnerData.internal_num_firms >= 3) {
          partner.internal_rate = this.midPartnerData.internal_avg_associate_rate;
          const diff = partner.rate - partner.internal_rate;
          partner.internal_rate_diff = diff / partner.rate;
        } else {
          partner.internal_rate = '--';
          partner.internal_rate_diff = null;
        }
      } else if (partner.classification === 'Senior Partner') {
        partner.firm_avg_rate = this.firmPartnerSeniorRate;
        const firm_diff = partner.rate - partner.firm_avg_rate;
        partner.firm_diff = firm_diff / partner.rate;
        if (this.seniorPartnerData.market_num_firms >= 3) {
          partner.market_range = moneyFormatter.format(this.seniorPartnerData.market_partner_rate_lo) + ' - ' + moneyFormatter.format(this.seniorPartnerData.market_partner_rate_hi);

          if (partner.rate >= this.seniorPartnerData.market_partner_rate_lo && partner.rate <= this.seniorPartnerData.market_partner_rate_hi) {
            partner.within_market_range = true;
          } else {
            partner.within_market_range = false;
            const lower_diff = partner.rate - this.seniorPartnerData.market_partner_rate_lo;
            const upper_diff = partner.rate - this.seniorPartnerData.market_partner_rate_hi;
            partner.market_lower_diff = lower_diff / partner.rate;
            partner.market_upper_diff = upper_diff / partner.rate;
          }
        } else {
          partner.market_range = '--';
          partner.market_lower_diff = null;
          partner.market_upper_diff = null;
        }
        if (this.seniorPartnerData.internal_num_firms >= 3) {
          partner.internal_rate = this.seniorPartnerData.internal_avg_associate_rate;
          const diff = partner.rate - partner.internal_rate;
            partner.internal_rate_diff = diff / partner.rate;
        } else {
          partner.internal_rate = '--';
          partner.internal_rate_diff = null;
        }
      }
      // console.log("PARTNER: ", partner)
      partner.timekeeper_name = partner.last_name + ', ' + partner.first_name;
      this.namedTKs.push(partner);
    }
  }

  processAssociateData(associateData: Array<any>): void {
    for (let associate of associateData) {

      if (associate.total_billed_final === null) {
        associate.total_billed_final = associate.total_billed;
      }
      if (associate.total_hours_final === null) {
        associate.total_hours_final = associate.total_hours;
      }
      if (associate.predicted_seniority < 4) {
        associate.classification = 'Junior Associate';
        associate.firm_avg_rate = this.firmAssocJuniorRate;
        const firm_diff = associate.rate - associate.firm_avg_rate;
        associate.firm_diff = firm_diff / associate.rate;
        if (this.juniorAssociateData.market_num_firms >= 3) {
          associate.market_range = moneyFormatter.format(this.juniorAssociateData.market_associate_rate_lo) + ' - ' + moneyFormatter.format(this.juniorAssociateData.market_associate_rate_hi);

          if (associate.rate >= this.juniorAssociateData.market_associate_rate_lo && associate.rate <= this.juniorAssociateData.market_associate_rate_hi) {
            associate.within_market_range = true;
          } else {
            associate.within_market_range = false;
            const lower_diff = associate.rate - this.juniorAssociateData.market_associate_rate_lo;
            const upper_diff = associate.rate - this.juniorAssociateData.market_associate_rate_hi;
            associate.market_lower_diff = lower_diff / associate.rate;
            associate.market_upper_diff = upper_diff / associate.rate;
          }

        } else {
          associate.market_range = '--';
          associate.market_lower_diff = null;
          associate.market_upper_diff = null;
        }
        if (this.juniorAssociateData.internal_num_firms >= 3) {
          associate.internal_rate = this.juniorAssociateData.internal_avg_associate_rate;
          const diff = associate.rate - associate.internal_rate;
          associate.internal_rate_diff = diff / associate.rate;
        } else {
          associate.internal_rate = '--';
          associate.internal_rate_diff = null;
        }

      } else if (associate.predicted_seniority >= 4 && associate.predicted_seniority < 7) {
        associate.classification = 'Mid-level Associate';
        associate.firm_avg_rate = this.firmAssocMidRate;
        const firm_diff = associate.rate - associate.firm_avg_rate;
        associate.firm_diff = firm_diff / associate.rate;
        if (this.midAssociateData.market_num_firms >= 3) {
          associate.market_range = moneyFormatter.format(this.midAssociateData.market_associate_rate_lo) + ' - ' + moneyFormatter.format(this.midAssociateData.market_associate_rate_hi);

          if (associate.rate >= this.midAssociateData.market_associate_rate_lo && associate.rate <= this.midAssociateData.market_associate_rate_hi) {
            associate.within_market_range = true;
          } else {
            associate.within_market_range = false;
            const lower_diff = associate.rate - this.midAssociateData.market_associate_rate_lo;
            const upper_diff = associate.rate - this.midAssociateData.market_associate_rate_hi;
            associate.market_lower_diff = lower_diff / associate.rate;
            associate.market_upper_diff = upper_diff / associate.rate;
          }

        } else {
          associate.market_range = '--';
          associate.market_lower_diff = null;
          associate.market_upper_diff = null;
        }
        if (this.midAssociateData.internal_num_firms >= 3) {
          associate.internal_rate = this.midAssociateData.internal_avg_associate_rate;
          const diff = associate.rate - associate.internal_rate;
          associate.internal_rate_diff = diff / associate.rate;
        } else {
          associate.internal_rate = '--';
          associate.internal_rate_diff = null;
        }
      } else if (associate.predicted_seniority >= 7) {
        associate.classification = 'Senior Associate';
        associate.firm_avg_rate = this.firmAssocSeniorRate;
        const firm_diff = associate.rate - associate.firm_avg_rate;
        associate.firm_diff = firm_diff / associate.rate;
        if (this.seniorAssociateData.market_num_firms >= 3) {
          associate.market_range = moneyFormatter.format(this.seniorAssociateData.market_associate_rate_lo) + ' - ' + moneyFormatter.format(this.seniorAssociateData.market_associate_rate_hi);
          if (associate.rate >= this.seniorAssociateData.market_associate_rate_lo && associate.rate <= this.seniorAssociateData.market_associate_rate_hi) {
            associate.within_market_range = true;
          } else {
            associate.within_market_range = false;
            const lower_diff = associate.rate - this.seniorAssociateData.market_associate_rate_lo;
            const upper_diff = associate.rate - this.seniorAssociateData.market_associate_rate_hi;
            associate.market_lower_diff = lower_diff / associate.rate;
            associate.market_upper_diff = upper_diff / associate.rate;
          }
        } else {
          associate.market_range = '--';
          associate.market_lower_diff = null;
          associate.market_upper_diff = null;
        }
        if (this.seniorAssociateData.internal_num_firms >= 3) {
          associate.internal_rate = this.seniorAssociateData.internal_avg_associate_rate;
          const diff = associate.rate - associate.internal_rate;
          associate.internal_rate_diff = diff / associate.rate;
        } else {
          associate.internal_rate = '--';
          associate.internal_rate_diff = null;
        }
      }
      // console.log("ASSOC: ", associate)
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
    console.log("PARAMS: ", params)
    let result = '';
    if (params.value === null) {
      result = 'N/A';
    } else {
      if (params.data.within_market_range) {
        result = '<span class="pct-span" style="background: #FFC327; font-family: Roboto; font-size: 12px; border-radius: 17px; width: 82px; padding: 8px 8px; color: white;">Rate is within range</span>';
      } else {
        if (params.data.market_lower_diff < 0 && params.data.market_upper_diff < 0) {
          result = '<span class="pct-span" style="background: #3EDB73; margin-left: 0.5em; font-family: Roboto; font-size: 12px; border-radius: 17px; width: 82px; padding: 8px 8px; color: white;">' + percentFormatter.format(params.data.market_lower_diff * -1) + ' - ' + percentFormatter.format(params.data.market_upper_diff * -1)  + '<em class="fa fa-arrow-down" style="color: white;"></em></span>';
        } else if (params.data.market_lower_diff > 0 && params.data.market_upper_diff > 0 && params.data.market_upper_diff < 0.2) {
          result = '<span class="pct-span" style="background: #FF8B4A; margin-left: 0.5em; font-family: Roboto; font-size: 12px; border-radius: 17px; width: 82px; padding: 8px 8px; color: white;">' + percentFormatter.format(params.data.market_upper_diff) + ' - ' + percentFormatter.format(params.data.market_lower_diff)  + '<em class="fa fa-arrow-up" style="color: white;"></em></span>';
        } else if (params.data.market_lower_diff > 0 && params.data.market_upper_diff > 0 && params.data.market_upper_diff >= 0.2) {
          result = '<span class="pct-span" style="background: #FE3F56; margin-left: 0.5em; font-family: Roboto; font-size: 12px; border-radius: 17px; width: 82px; padding: 8px 8px; color: white;">' + percentFormatter.format(params.data.market_upper_diff) + ' - ' + percentFormatter.format(params.data.market_lower_diff)  + '<em class="fa fa-arrow-up" style="color: white;"></em></span>';
        }

        // result = '<span class="rate-span" style="color: #FE3F56; font-family: Roboto Bold; font-size: 12px;">+' + moneyFormatter.format(params.data.assoc_lower_diff) + ' - ' + moneyFormatter.format(params.data.assoc_upper_diff) + '</span>'
      }

    }
    return result;
  }

  // Render the cell that shows internal +/-
  internalRateDiffRenderer(params): string {
    let result = '';
    if (params.value === null) {
      result = 'N/A';
    } else {
      if (params.value < 0) {
        result = '<span class="pct-span" style="background: #3EDB73; margin-left: 0.5em; font-family: Roboto; font-size: 12px; border-radius: 17px; width: 82px; padding: 8px 8px; color: white;">' + percentFormatter.format((params.value * -1)) + '<em class="fa fa-arrow-down" style="color: white;"></em></span>';
      } else if (params.value > 0 && params.value < 0.2) {
        result = '<span class="pct-span" style="background: #FF8B4A; margin-left: 0.5em; font-family: Roboto; font-size: 12px; border-radius: 17px; width: 82px; padding: 8px 8px; color: white;">' + percentFormatter.format((params.value)) + '<em class="fa fa-arrow-up" style="color: white;"></em></span>';
      } else if (params.value > 0.2) {
        result = '<span class="pct-span" style="background: #FE3F56; margin-left: 0.5em; font-family: Roboto; font-size: 12px; border-radius: 17px; width: 82px; padding: 8px 8px; color: white;">' + percentFormatter.format((params.value)) + '<em class="fa fa-arrow-up" style="color: white;"></em></span>';
      }
    }
    return result;
  }

  // Render the cell that shows firm avg rate +/-
  firmRateDiffRenderer(params): string {
    let result = '';
    if (params.value === null) {
      result = 'N/A';
    } else {
      if (params.value < 0) {
        result = '<span class="pct-span" style="background: #3EDB73; margin-left: 0.5em; font-family: Roboto; font-size: 12px; border-radius: 17px; width: 82px; padding: 8px 8px; color: white;">' + percentFormatter.format((params.value * -1)) + '<em class="fa fa-arrow-down" style="color: white;"></em></span>';
      } else if (params.value > 0 && params.value < 0.2) {
        result = '<span class="pct-span" style="background: #FF8B4A; margin-left: 0.5em; font-family: Roboto; font-size: 12px; border-radius: 17px; width: 82px; padding: 8px 8px; color: white;">' + percentFormatter.format((params.value)) + '<em class="fa fa-arrow-up" style="color: white;"></em></span>';
      } else if (params.value > 0.2) {
        result = '<span class="pct-span" style="background: #FE3F56; margin-left: 0.5em; font-family: Roboto; font-size: 12px; border-radius: 17px; width: 82px; padding: 8px 8px; color: white;">' + percentFormatter.format((params.value)) + '<em class="fa fa-arrow-up" style="color: white;"></em></span>';
      } else if (params.value === 0) {
        result = '<span class="pct-span" style="background: #3EDB73; margin-left: 0.5em; font-family: Roboto; font-size: 12px; border-radius: 17px; width: 82px; padding: 8px 8px; color: white;">' + percentFormatter.format((params.value)) + '</span>';
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
    this.router.navigate(['/analytics-ui/rate-benchmarking/view/', this.benchmark.id]);
  }

  goToTKPage(): void {
    const detailData = {
      firmYear: this.firmYearData,
      bm: this.benchmark,
      totalSpend: this.overallSpendData,
      market: this.marketAverageData,
      // internal: this.internalYearData,
      cluster: this.cluster,
      numTiers: this.numTiers,
      peerFirms: this.peerFirms
    };
    this.router.navigate(['/analytics-ui/rate-benchmarking/view/detail/', this.benchmark.id],
    {state:
      {
        data: detailData
      }
    });
  }

  saveGridConfig(evt: any): void {
    const state = evt;
    this.agGridService.saveState('NamedTKsGrid', this.gridOptions);
  }

}
