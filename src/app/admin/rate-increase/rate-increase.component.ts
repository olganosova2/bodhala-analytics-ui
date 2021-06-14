import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {CommonService, IClient} from '../../shared/services/common.service';
import {AgGridService} from 'bodhala-ui-elements';
import {BenchmarkService} from '../../benchmarks/benchmark.service';
import {Subscription} from 'rxjs';
import {GridOptions} from 'ag-grid-community';
import {IRateIncreaseData, SavingsCalculatorService, tkClassifications} from '../../savings-calculator/savings-calculator.service';
export interface IClientRateIncreases {
  id: number;
  name: string;
  avgIncrease?: number;
  lastYearIncrease?: number;
  partnerAvgIncrease?: number;
  associateAvgIncrease?: number;
  partnerLastIncrease?: number;
  associateLastIncrease?: number;
}
@Component({
  selector: 'bd-rate-increase',
  templateUrl: './rate-increase.component.html',
  styleUrls: ['./rate-increase.component.scss']
})
export class RateIncreaseComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  pendingRequestClients: Subscription;
  errorMessage: any;
  clients: Array<IClient> = [];
  rateIncreases: Array<IClientRateIncreases> = [];
  paginationPageSize: number = 10;
  gridOptions: GridOptions;
  savedState: any;
  sideBarConfig: any;
  defaultColumn: any;
  totalRecords: number = 0;
  gridHeight: number = 629;
  defaultState: any;
  firstLoad: boolean = true;
  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public savCalcService: SavingsCalculatorService,
              public userService: UserService,
              public commonServ: CommonService,
              public utilService: UtilService,
              public agGridService: AgGridService,
              public benchmarkServ: BenchmarkService) {
    this.commonServ.pageTitle = 'Rate Increase';
  }

  ngOnInit(): void {
    this.defaultColumn = this.agGridService.getDefaultColumn();
    this.sideBarConfig = this.agGridService.getDefaultSideBar();
    this.savedState = this.agGridService.getSavedState('RateIncreasesGrid');
    this.gridOptions = this.agGridService.getDefaultGridOptions();
    this.initColumns();
  }
  initColumns(): void {
    this.gridOptions.columnDefs = [
      {headerName: 'Client', field: 'name', ...this.defaultColumn,  filter: 'agTextColumnFilter', flex: 1, floatingFilter: true},
      {headerName: 'Client ID', field: 'id', ...this.defaultColumn, floatingFilter: true},
      {headerName: '3-Yr Avg Parner', field: 'partnerAvgIncrease',  cellRenderer: this.agGridService.roundToPercentNumberCellRenderer, ...this.defaultColumn },
      {headerName: 'Last Year Partner', field: 'partnerLastIncrease',  cellRenderer: this.agGridService.roundToPercentNumberCellRenderer, ...this.defaultColumn },
      {headerName: '3-Yr Avg Associate', field: 'associateAvgIncrease',  cellRenderer: this.agGridService.roundToPercentNumberCellRenderer, ...this.defaultColumn },
      {headerName: 'Last Year Associate', field: 'associateLastIncrease',  cellRenderer: this.agGridService.roundToPercentNumberCellRenderer, ...this.defaultColumn },
      {headerName: '3-Yr Avg', field: 'avgIncrease',  cellRenderer: this.agGridService.roundToPercentNumberCellRenderer, ...this.defaultColumn },
      {headerName: 'Last Year', field: 'lastYearIncrease',  cellRenderer: this.agGridService.roundToPercentNumberCellRenderer, ...this.defaultColumn },
    ];
  }
  getRates(): void {
    const params = { clientId: 190, numberOfYears: 3};
    this.pendingRequest = this.httpService.makeGetRequest('getEffectiveRatesForAllClients', params).subscribe(
      (data: any) => {
        const clients = data.result || [];
        for (const client of clients) {
          this.calculateRates(client.rates, client.org_name, client.bh_client_id);
        }
        this.loadGrid();
      },
      err => {
        this.errorMessage = err;
      }
    );
  }
  calculateRates(records: Array<IRateIncreaseData>, clientName: string, clientId: number): any {
    const record = {} as IClientRateIncreases;
    record.partnerAvgIncrease = 0;
    record.partnerLastIncrease = 0;
    record.associateLastIncrease = 0;
    record.associateLastIncrease = 0;
    const tkClassificationsProcessed = [];
    for (const key of Object.keys(tkClassifications)) {
      if (key === 'partner' || key === 'associate') {
        const processed = this.savCalcService.createClassificationDynamic(key, records);
        tkClassificationsProcessed.push(processed);
        const propNameAvg = key + 'AvgIncrease';
        const propNameLast = key + 'LastIncrease';
        record[propNameAvg] = processed.avgRateIncrease * 100 || 0;
        record[propNameLast] = processed.lastYearRateIncrease * 100 || 0;
      }
    }
    record.avgIncrease = this.savCalcService.calculateOrigIncreaseRatePercent(tkClassificationsProcessed, true);
    record.lastYearIncrease = this.savCalcService.calculateOrigIncreaseRatePercent(tkClassificationsProcessed, false);
    record.name = clientName;
    record.id = clientId;
    this.rateIncreases.push(record);
  }
  loadGrid(): void {
    if (!this.gridOptions.api) {
      return;
    }
    if (this.firstLoad) {
      this.defaultState = this.gridOptions.columnApi.getColumnState();
      this.firstLoad = false;
    }
    this.gridOptions.api.setRowData(this.rateIncreases);
    this.agGridService.restoreGrid(this.savedState, this.gridOptions);
  }
  saveGridConfig(evt: any): void {
    const state = evt;
    this.agGridService.saveState('RateIncreasesGrid', this.gridOptions);
  }

  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }
}
