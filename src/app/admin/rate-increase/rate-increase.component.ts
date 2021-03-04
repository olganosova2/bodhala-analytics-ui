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
  avgIncrease: number;
  lastYearIncrease: number;
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
              public benchmarkServ: BenchmarkService) { }

  ngOnInit(): void {
    this.defaultColumn = this.agGridService.getDefaultColumn();
    this.sideBarConfig = this.agGridService.getDefaultSideBar();
    this.savedState = this.agGridService.getSavedState('RateIncreses');
    this.gridOptions = this.agGridService.getDefaultGridOptions();
    this.initColumns();
    // this.getClients();
    // this.getRates();
  }
  initColumns(): void {
    this.gridOptions.columnDefs = [
      {headerName: 'Client', field: 'name', ...this.defaultColumn,  filter: 'text', flex: 1},
      {headerName: 'Client ID', field: 'id', ...this.defaultColumn},
      {headerName: '3-Yr Ave', field: 'avgIncrease',  cellRenderer: this.agGridService.roundToPercentNumberCellRenderer, ...this.defaultColumn },
      {headerName: 'Last Increase', field: 'lastYearIncrease',  cellRenderer: this.agGridService.roundToPercentNumberCellRenderer, ...this.defaultColumn },
    ];
  }
  getRates(): void {
    const params = { clientId: 190, numberOfYears: 3};
    this.pendingRequest = this.httpService.makeGetRequest('getEffectiveRatesForAllClients', params).subscribe(
    // this.pendingRequest = this.httpService.makeGetRequest('getEffectiveRates', params).subscribe(
      (data: any) => {
        // const yearsRecords = data.result || [];
        // this.calculateRates(yearsRecords, 'AIG', 190);
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
    const tkClassificationsProcessed = [];
    for (const key of Object.keys(tkClassifications)) {
      if (key === 'partner' || key === 'associate') {
        tkClassificationsProcessed.push(this.savCalcService.createClassificationDynamic(key, records));
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
    this.agGridService.saveState('RateIncreses', this.gridOptions);
  }

  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }
}
