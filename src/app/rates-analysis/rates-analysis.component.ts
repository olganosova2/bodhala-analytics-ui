import {Component, OnInit} from '@angular/core';
import {CommonService, IClient} from '../shared/services/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, ConfirmModalComponent, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {AgGridService} from 'bodhala-ui-elements';
import {Subscription} from 'rxjs';
import {GridOptions} from 'ag-grid-community';
import {MatDialog} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import {IRateBenchmark, moneyFormatter, percentFormatter, COST_IMPACT_GRADES} from '../rates-analysis/rates-analysis.model';
import { RatesAnalysisService } from './rates-analysis.service';

@Component({
  selector: 'bd-rates-analysis',
  templateUrl: './rates-analysis.component.html',
  styleUrls: ['./rates-analysis.component.scss']
})
export class RatesAnalysisComponent implements OnInit {
  pendingRequest: Subscription;
  pendingRequestDelete: Subscription;
  clientRateBenchmarks: Array<any> = [];
  paginationPageSize: number = 10;
  gridOptions: GridOptions;
  savedState: any;
  sideBarConfig: any;
  defaultColumn: any;
  defaultState: any;
  firstLoad: boolean = true;
  gridApi: any;

  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public userService: UserService,
              public commonServ: CommonService,
              public utilService: UtilService,
              public dialog: MatDialog,
              public agGridService: AgGridService,
              public ratesService: RatesAnalysisService) {
    this.commonServ.pageTitle = 'Client Rate Benchmarks';
  }

  ngOnInit(): void {
    this.defaultColumn = this.agGridService.getDefaultColumn();
    this.sideBarConfig = this.agGridService.getDefaultSideBar();
    this.savedState = this.agGridService.getSavedState('RateBenchmarksGrid');
    this.gridOptions = this.agGridService.getDefaultGridOptions();
    this.initColumns();
    this.getClientRateBenchmarks();
  }

  initColumns(): void {
    this.gridOptions.columnDefs = [
      {headerName: 'Firm', field: 'firm_name', ...this.defaultColumn, width: 190, filter: 'text'},
      {headerName: 'Practice Area', field: 'smart_practice_area', ...this.defaultColumn},
      {headerName: 'Year', field: 'year', ...this.defaultColumn, width: 75, cellStyle: {fontFamily: 'Roboto'}},
      {headerName: 'Cost Impact', field: 'cost_impact', ...this.defaultColumn, cellRenderer: this.costImpactCellRenderer.bind(this)},
      {headerName: 'Historical Cost Impact', field: 'year', ...this.defaultColumn, width: 165, cellRenderer: this.historicalCostRenderer.bind(this)},
      {headerName: 'Average Assoc. Rate', field: 'associate_rate', ...this.defaultColumn, cellRenderer: this.agGridService.roundCurrencyCellRenderer, width: 105},
      {headerName: 'Assoc. +/- Per Hour', field: 'assoc_lower_diff', ...this.defaultColumn, width: 210, cellRenderer: this.associateRateDiffRenderer.bind(this)},
      {headerName: 'Average Partner Rate', field: 'partner_rate', ...this.defaultColumn, cellRenderer: this.agGridService.roundCurrencyCellRenderer, width: 95},
      {headerName: 'Partner +/- Per Hour', field: 'partner_lower_diff', ...this.defaultColumn, width: 210, cellRenderer: this.partnerRateDiffRenderer.bind(this)},
      {cellRenderer: this.viewCellRenderer,  ...this.defaultColumn, width: 100, suppressMenu: true,  onCellClicked: this.view.bind(this)},
    ];
  }

  getClientRateBenchmarks(): void {
    this.pendingRequest = this.httpService.makeGetRequest('getRateBenchmarks').subscribe(
      (data: any) => {
        this.clientRateBenchmarks = data.result || [];
        this.clientRateBenchmarks = this.clientRateBenchmarks.sort(this.utilService.dynamicSort('-created_on'));
        const pipe = new DatePipe('en-US');
        for (const report of this.clientRateBenchmarks) {
          report.created_on = pipe.transform(report.created_on, 'shortDate');
        }
        this.processData();
        this.loadGrid();
      }
    );
  }

  loadGrid(): void {
    if (!this.gridOptions.api) {
      return;
    }
    if (this.firstLoad) {
      this.defaultState = this.gridOptions.columnApi.getColumnState();
      this.firstLoad = false;
    }
    this.gridOptions.api.setRowData(this.clientRateBenchmarks);
    this.agGridService.restoreGrid(this.savedState, this.gridOptions);
  }

  processData(): void {
    for (const bm of this.clientRateBenchmarks) {
      // still need to determine how cost impact severity is calculated (Certain % of spend?)
      bm.cost_impact = 'TBD';
      bm.partner_rate = 0;
      bm.associate_rate = 0;
      if (bm.firm_data) {
        if (bm.firm_data.length > 0) {
          let tempFirmData = bm.firm_data[0];
          tempFirmData = tempFirmData[0];
          bm.firm_data = tempFirmData;
          if (tempFirmData !== undefined  && tempFirmData !== null) {
            bm.associate_rate = tempFirmData.avg_associate_rate;
            bm.partner_rate = tempFirmData.avg_partner_rate;
            bm.blended_rate = tempFirmData.blended_rate;
            bm.total_atty_hours = tempFirmData.total_atty_hours;
            bm.total_atty_billed = tempFirmData.total_atty_billed;
          } else {
            bm.associate_rate = null;
            bm.partner_rate = null;
            bm.blended_rate = null;
            bm.total_atty_hours = null;
            bm.total_atty_billed = null;
          }

        }
      }

      if (bm.associate_market_data) {
        if (bm.associate_market_data.length > 0) {
          bm.associate_market_data = bm.associate_market_data[0];
          if (bm.associate_rate >= bm.associate_market_data.associate_hi) {
            bm.assoc_lower_diff = bm.associate_rate - bm.associate_market_data.associate_hi;
            bm.assoc_upper_diff = bm.associate_rate - bm.associate_market_data.associate_lo;
            bm.assoc_lower_diff_pct = bm.assoc_lower_diff / bm.associate_market_data.associate_hi;
            bm.assoc_upper_diff_pct = bm.assoc_upper_diff / bm.associate_market_data.associate_lo;
            bm.assoc_within_range = false;
          } else if (bm.associate_rate <= bm.associate_market_data.associate_lo) {
            bm.assoc_lower_diff = bm.associate_rate - bm.associate_market_data.associate_lo;
            bm.assoc_upper_diff = bm.associate_rate - bm.associate_market_data.associate_hi;
            bm.assoc_lower_diff_pct = bm.assoc_lower_diff / bm.associate_rate;
            bm.assoc_upper_diff_pct = bm.assoc_upper_diff / bm.associate_rate;
            bm.assoc_within_range = false;
          } else {
            bm.assoc_within_range = true;
          }
        }
      }
      if (bm.partner_market_data) {
        if (bm.partner_market_data.length > 0) {
          bm.partner_market_data = bm.partner_market_data[0];
          if (bm.partner_rate >= bm.partner_market_data.partner_hi) {
            bm.partner_lower_diff = bm.partner_rate - bm.partner_market_data.partner_hi;
            bm.partner_upper_diff = bm.partner_rate - bm.partner_market_data.partner_lo;
            bm.partner_lower_diff_pct = bm.partner_lower_diff / bm.partner_market_data.partner_hi;
            bm.partner_upper_diff_pct = bm.partner_upper_diff / bm.partner_market_data.partner_lo;
            bm.partner_within_range = false;
          } else if (bm.partner_rate <= bm.partner_market_data.partner_lo) {
            bm.partner_lower_diff = bm.partner_rate - bm.partner_market_data.partner_lo;
            bm.partner_upper_diff = bm.partner_rate - bm.partner_market_data.partner_hi;
            bm.partner_lower_diff_pct = bm.partner_lower_diff / bm.partner_market_data.partner_lo;
            bm.partner_upper_diff_pct = bm.partner_upper_diff / bm.partner_market_data.partner_hi;
            bm.partner_within_range = false;
          } else {
            bm.partner_within_range = true;
          }
        }
      }

      if (bm.blended_market_data) {
        if (bm.blended_market_data.length > 0) {
          bm.blended_market_data = bm.blended_market_data[0];
          if (bm.firm_data !== undefined && bm.firm_data !== null) {
            const costImpactResult = this.ratesService.calculateHistoricalCostImpact(bm.firm_data, bm.blended_market_data);
            bm.blended_rate_lower_diff = costImpactResult.blended_rate_lower_diff;
            bm.blended_rate_upper_diff = costImpactResult.blended_rate_upper_diff;
            bm.blended_rate_lower_diff_pct = costImpactResult.blended_rate_lower_diff_pct;
            bm.blended_rate_upper_diff_pct = costImpactResult.blended_rate_upper_diff_pct;
            bm.cost_impact = costImpactResult.cost_impact;
            bm.blended_within_range = costImpactResult.blended_within_range;
          } else {
            bm.blended_rate_lower_diff = null;
            bm.blended_rate_upper_diff = null;
            bm.blended_rate_lower_diff_pct = null;
            bm.blended_rate_upper_diff_pct = null;
            bm.cost_impact = null;
            bm.blended_within_range = null;
          }
        }
      }
    }
  }

  saveGridConfig(evt: any): void {
    const state = evt;
    this.agGridService.saveState('RateBenchmarksGrid', this.gridOptions);
  }

  associateRateDiffRenderer(params: any): string {
    let result = '';
    if (params.value !== null) {
      if (params.data.assoc_within_range) {
        result = 'Within range (' + moneyFormatter.format(params.data.associate_market_data.associate_lo) + ' - ' + moneyFormatter.format(params.data.associate_market_data.associate_hi) + ')';
      } else if (params.data.assoc_lower_diff_pct < 0 && params.data.assoc_upper_diff_pct < 0) {
        result = '<span class="rate-span" style="color: #3EDB73; font-family: Roboto Bold; font-size: 12px;">-' + moneyFormatter.format((params.data.assoc_lower_diff * -1)) + ' - ' + moneyFormatter.format((params.data.assoc_upper_diff * -1)) + '</span>' +
                  '<span class="pct-span" style="background: #3EDB73; margin-left: 0.5em; font-family: Roboto; font-size: 12px; border-radius: 17px; width: 82px; padding: 8px 8px; color: white;">' + percentFormatter.format((params.data.assoc_lower_diff_pct * -1)) + ' - ' + percentFormatter.format((params.data.assoc_upper_diff_pct * -1)) + '  <em class="fa fa-arrow-down" style="color: white;"></em</span>';
      } else if (params.data.assoc_upper_diff_pct >= 0 && params.data.assoc_upper_diff_pct < 0.2) {
        result = '<span class="rate-span" style="color: #FF8B4A; font-family: Roboto Bold; font-size: 12px;">+' + moneyFormatter.format(params.data.assoc_lower_diff) + ' - ' + moneyFormatter.format(params.data.assoc_upper_diff) + '</span>' +
                  '<span class="pct-span" style="background: #FF8B4A; margin-left: 0.5em; font-family: Roboto; font-size: 12px; border-radius: 17px; width: 82px; padding: 8px 8px; color: white;">' + percentFormatter.format(params.data.assoc_lower_diff_pct) + ' - ' + percentFormatter.format(params.data.assoc_upper_diff_pct) + '  <em class="fa fa-arrow-up" style="color: white;"></em</span>';
      } else if (params.data.assoc_upper_diff_pct >= 0.2) {
        result = '<span class="rate-span" style="color: #FE3F56; font-family: Roboto Bold; font-size: 12px;">+' + moneyFormatter.format(params.data.assoc_lower_diff) + ' - ' + moneyFormatter.format(params.data.assoc_upper_diff) + '</span>' +
                  '<span class="pct-span" style="background: #FE3F56; margin-left: 0.5em; font-family: Roboto; font-size: 12px; border-radius: 17px; width: 82px; padding: 8px 8px; color: white;">' + percentFormatter.format(params.data.assoc_lower_diff_pct) + ' - ' + percentFormatter.format(params.data.assoc_upper_diff_pct) + '  <em class="fa fa-arrow-up" style="color: white;"></em</span>';
      }
    }
    return result;
  }

  partnerRateDiffRenderer(params: any): string {
    let result = '';
    if (params.value !== null) {
      if (params.data.partner_within_range) {
        result = 'Within range (' + moneyFormatter.format(params.data.partner_market_data.partner_lo) + ' - ' + moneyFormatter.format(params.data.partner_market_data.partner_hi) + ')';
      } else if (params.data.partner_lower_diff_pct < 0 && params.data.partner_upper_diff_pct < 0) {
        result = '<span class="rate-span" style="color: #3EDB73; font-family: Roboto Bold; font-size: 12px;">-' + moneyFormatter.format((params.data.partner_lower_diff * -1)) + ' - ' + moneyFormatter.format((params.data.partner_upper_diff * -1)) + '</span>' +
                  '<span class="pct-span" style="background: #3EDB73; margin-left: 0.5em; font-family: Roboto; font-size: 12px; border-radius: 17px; width: 82px; padding: 8px 8px; color: white;">' + percentFormatter.format((params.data.partner_lower_diff_pct * -1)) + ' - ' + percentFormatter.format((params.data.partner_upper_diff_pct * -1)) + '  <em class="fa fa-arrow-down" style="color: white;"></em</span>';
      } else if (params.data.partner_upper_diff_pct >= 0 && params.data.partner_upper_diff_pct < 0.2) {
        result = '<span class="rate-span" style="color: #FF8B4A; font-family: Roboto Bold; font-size: 12px;">+' + moneyFormatter.format(params.data.partner_lower_diff) + ' - ' + moneyFormatter.format(params.data.partner_upper_diff) + '</span>' +
                  '<span class="pct-span" style="background: #FF8B4A; margin-left: 0.5em; font-family: Roboto; font-size: 12px; border-radius: 17px; width: 82px; padding: 8px 8px; color: white;">' + percentFormatter.format(params.data.partner_lower_diff_pct) + ' - ' + percentFormatter.format(params.data.partner_upper_diff_pct) + '  <em class="fa fa-arrow-up" style="color: white;"></em</span>';
      } else if (params.data.partner_upper_diff_pct >= 0.2) {
        result = '<span class="rate-span" style="color: #FE3F56; font-family: Roboto Bold; font-size: 12px;">+' + moneyFormatter.format(params.data.partner_lower_diff) + ' - ' + moneyFormatter.format(params.data.partner_upper_diff) + '</span>' +
                  '<span class="pct-span" style="background: #FE3F56; margin-left: 0.5em; font-family: Roboto; font-size: 12px; border-radius: 17px; width: 82px; padding: 8px 8px; color: white;">' + percentFormatter.format(params.data.partner_lower_diff_pct) + ' - ' + percentFormatter.format(params.data.partner_upper_diff_pct) + '  <em class="fa fa-arrow-up" style="color: white;"></em</span>';
      }
    }
    return result;
  }

  costImpactCellRenderer(params: any): string {
    let result = '';
    if (params.value !== null) {
      const color = COST_IMPACT_GRADES[params.data.cost_impact];
      if (params.data.blended_rate_lower_diff < 0 && params.data.blended_rate_upper_diff < 0) {
        result = '<div style="height: 24px; border-radius: 16px; padding: 0.5em; font-family: Roboto; font-size: 12px; color: white; display: flex; justify-content: center; align-items: center; margin-top: 12px; width: 72px; background: #3EDB73;">' + params.data.cost_impact + '</div>';
      } else {
        result = '<div style="height: 24px; border-radius: 16px; padding: 0.5em; font-family: Roboto; font-size: 12px; color: white; display: flex; justify-content: center; align-items: center; margin-top: 12px; width: ' + color.width + '; background: ' + color.color + ';">' + params.data.cost_impact + '</div>';
      }
    }
    return result;
  }

  historicalCostRenderer(params: any): string {
    let result = '';
    // round to nearest 10,000
    if (params.value !== null) {
      if (params.data.blended_rate_lower_diff >= 10000) {
        params.data.blended_rate_lower_diff = Math.ceil(params.data.blended_rate_lower_diff / 10000) * 10000;
      } else {
        params.data.blended_rate_lower_diff = Math.ceil(params.data.blended_rate_lower_diff / 1000) * 1000;
      }
      if (params.data.blended_rate_upper_diff >= 10000) {
        params.data.blended_rate_upper_diff = Math.ceil(params.data.blended_rate_upper_diff / 10000) * 10000;
      } else {
        params.data.blended_rate_upper_diff = Math.ceil(params.data.blended_rate_upper_diff / 1000) * 1000;
      }
      const color = COST_IMPACT_GRADES[params.data.cost_impact];
      if (params.data.blended_within_range) {
        result = '<span style="font-family: Roboto Bold; font-size: 12px; color: ' + color.color + ';">~' + moneyFormatter.format(params.data.blended_rate_lower_diff) + '</span>';
      } else if (params.data.blended_rate_upper_diff < 0 && params.data.blended_rate_lower_diff < 0) {
        result = '<span style="font-family: Roboto Bold; font-size: 12px; color: #3EDB73;">~' + moneyFormatter.format((params.data.blended_rate_lower_diff * -1)) + ' - ' + moneyFormatter.format((params.data.blended_rate_upper_diff * -1)) + '</span>';
      } else if (params.data.blended_rate_upper_diff > 0 && params.data.blended_rate_lower_diff > 0) {
        result = '<span style="font-family: Roboto Bold; font-size: 12px; color: ' + color.color + ';">~' + moneyFormatter.format(params.data.blended_rate_lower_diff) + ' - ' + moneyFormatter.format(params.data.blended_rate_upper_diff) + '</span>';
      }
    }

    return result;
  }

  viewCellRenderer() {
    const value = '<button mat-flat-button type="button" style="border: none; background-color: #E9F1F4; border-radius: 99px; height: 22px; width: 60px; margin-top: 19%; display: flex; flex-direction: row; justify-content: center; align-items: center; font-size: 12px;">View<i class="fa fa-chevron-right" style="padding-left: 6px; font-weight: 400;"></i></button>';
    return value;
  }

  view(row: any): void {
    this.router.navigate(['/analytics-ui/rate-benchmarking/view/', row.data.id]);
  }


}
