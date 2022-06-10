import {Component, OnInit} from '@angular/core';
import {CommonService, IClient} from '../../shared/services/common.service';
import {Router} from '@angular/router';
import {AppStateService, ConfirmModalComponent, HttpService, MessageType, MessagingService, UserService, UtilService} from 'bodhala-ui-common';
import {AgGridService} from 'bodhala-ui-elements';
import {Subscription} from 'rxjs';
import {GridOptions} from 'ag-grid-community';
import {MatDialog} from '@angular/material/dialog';
import {FRESH_DESK_ARTICLES, SAVINGS_CALCULATOR_CONFIG} from '../../shared/services/config';
import { DatePipe } from '@angular/common';
import {confirmDialogConfig} from '../../shared/services/config';
import {IRateBenchmark} from '../../rates-analysis/rates-analysis.model';
import {AddRateBenchmarkComponent} from './add-rate-benchmark/add-rate-benchmark.component';
import { RateInsightModalComponent } from './rate-insight-modal/rate-insight-modal.component';
import { PeerFirmsModalComponent } from './peer-firms-modal/peer-firms-modal.component';

@Component({
  selector: 'bd-admin-rate-benchmarks',
  templateUrl: './admin-rate-benchmarks.component.html',
  styleUrls: ['./admin-rate-benchmarks.component.scss']
})
export class AdminRateBenchmarksComponent implements OnInit {
  pendingRequest: Subscription;
  pendingRequestDelete: Subscription;
  selectedClient: IClient;
  clientRateBenchmarks: Array<any> = [];
  paginationPageSize: number = 10;
  gridOptions: GridOptions;
  savedState: any;
  sideBarConfig: any;
  defaultColumn: any;
  defaultState: any;
  firstLoad: boolean = true;
  gridApi: any;

  constructor(
    public router: Router,
    private httpService: HttpService,
    public appStateService: AppStateService,
    public userService: UserService,
    public commonServ: CommonService,
    public utilService: UtilService,
    public dialog: MatDialog,
    public agGridService: AgGridService,
    public messageService: MessagingService) {
      this.commonServ.pageTitle = 'Manage Client Rate Benchmarks';
  }

  ngOnInit(): void {
    this.defaultColumn = this.agGridService.getDefaultColumn();
    this.sideBarConfig = this.agGridService.getDefaultSideBar();
    this.savedState = this.agGridService.getSavedState('ClientConfigsGrid');
    this.gridOptions = this.agGridService.getDefaultGridOptions();
    this.initColumns();
  }

  initColumns(): void {
    this.gridOptions.columnDefs = [
      {headerName: 'ID', field: 'id', ...this.defaultColumn},
      {headerName: 'Firm', field: 'firm_name', ...this.defaultColumn,  filter: 'text', flex: 1},
      {headerName: 'Smart Practice Area', field: 'smart_practice_area', ...this.defaultColumn, flex: 1},
      {headerName: 'Year', field: 'year', ...this.defaultColumn, flex: 1},
      {headerName: 'Created On', field: 'created_on', ...this.defaultColumn,  filter: 'text', flex: 1},
      {headerName: 'Add Recommendations', field: 'created_on', ...this.defaultColumn,  filter: 'text', flex: 1, cellRenderer: this.editActionCellRenderer, onCellClicked: this.openRecommendationModal.bind(this)},
      {headerName: 'View/Modify Comparison Peer Firms', ...this.defaultColumn, flex: 1, cellRenderer: this.editActionCellRenderer, onCellClicked: this.openPeerFirmsModal.bind(this)},
      {headerName: 'Delete', cellRenderer: this.deleteCellRenderer,  ...this.defaultColumn, width: 100, suppressMenu: true,  onCellClicked: this.openDeleteDialog.bind(this)},
    ];
  }

  openRecommendationModal(bm): void {
    const dialogRef = this.dialog.open(RateInsightModalComponent, {
      data: {
        benchmark: bm.data,
        client: this.selectedClient
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
    });
  }

  openPeerFirmsModal(bm): void {
    const dialogRef = this.dialog.open(PeerFirmsModalComponent, {
      data: {
        benchmark: bm.data,
        client: this.selectedClient
      },
      height: '80%',
      width: '1600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        this.getClientRateBenchmarks();
        return;
      }
    });
  }

  loadClientRateBenchmarks(client: IClient): void {
    this.selectedClient = client;
    if (this.selectedClient) {
      this.getClientRateBenchmarks();
      this.commonServ.pageSubtitle = this.selectedClient.org_name;
    }
  }

  getClientRateBenchmarks(): void {
    const params = { clientId: this.selectedClient.bh_client_id };
    this.pendingRequest = this.httpService.makeGetRequest('getRateBenchmarksAdmin', params).subscribe(
      (data: any) => {
        this.clientRateBenchmarks = data.result || [];
        this.clientRateBenchmarks = this.clientRateBenchmarks.sort(this.utilService.dynamicSort('-created_on'));
        const pipe = new DatePipe('en-US');
        for (const report of this.clientRateBenchmarks) {
          report.created_on = pipe.transform(report.created_on, 'shortDate');
        }
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

  saveGridConfig(evt: any): void {
    const state = evt;
    // this.agGridService.saveState('ClientConfigsGrid', this.gridOptions);
  }

  openModal(item: any): void {
    const packaged = { config: Object.assign({}, item), records: this.clientRateBenchmarks};
    const modalConfig = {...SAVINGS_CALCULATOR_CONFIG.detailsDialogConfig, data: Object.assign([], packaged)};
    const dialogRef = this.dialog.open(AddRateBenchmarkComponent, {...modalConfig, disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      if (!item.id) {
        this.getClientRateBenchmarks();
      } else if (result) {
        const rowNode = this.gridApi.getRowNode(item.id);
        rowNode.setData(result);
      }
    });

  }
  addNew(): void {
    const newItem = this.createNewBenchmark();
    this.openModal(newItem);
  }
  createNewBenchmark(): IRateBenchmark {
    return { id: null, bh_client_id: this.selectedClient.bh_client_id, bh_lawfirm_id: null, year: null, smart_practice_area: null, peers: [], created_on: null, created_by: null,
              modified_by: null, modified_on: null, deleted_by: null, deleted_on: null, market_avg_firms: null};
  }

  deleteCellRenderer() {
    const value = '<button mat-flat-button type="button" style="width: 60px; border: none; background-color: #e1e2e3;"><em class="icon-trash"></em></button>';
    return value;
  }

  editActionCellRenderer() {
    const value = '<button mat-flat-button type="button" style="width: 60px; border: none; background-color: #e1e2e3;"><em class="icon-note"></em></button>';
    return value;
  }

  openDeleteDialog(item: any): void {
    const modalConfig = {...confirmDialogConfig, data: {title: 'Confirm Delete', item: 'rate benchmark'}};
    const dialogRef = this.dialog.open(ConfirmModalComponent, {...modalConfig, disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRateBenchmark(item.data);
      }
    });

  }

  deleteRateBenchmark(item: any): void {
    const params = { id: item.id};
    this.pendingRequestDelete = this.httpService.makeDeleteRequest('deleteRateBenchmark', params).subscribe(
      (data: any) => {
        const deleted = data.result;
        if (deleted) {
          this.getClientRateBenchmarks();
        }
      }
    );
  }

}
