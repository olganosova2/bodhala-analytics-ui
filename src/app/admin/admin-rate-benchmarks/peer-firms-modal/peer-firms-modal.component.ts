import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {HttpService, UserService} from 'bodhala-ui-common';
import {Subscription} from 'rxjs';
import {AgGridService} from 'bodhala-ui-elements';
import {GridOptions} from 'ag-grid-community';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AdminRateBenchmarksComponent } from '../admin-rate-benchmarks.component';
import {CommonService, IClient} from '../../../shared/services/common.service';
import { SelectItemGroup } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'bd-peer-firms-modal',
  templateUrl: './peer-firms-modal.component.html',
  styleUrls: ['./peer-firms-modal.component.scss']
})
export class PeerFirmsModalComponent implements OnInit {

  pendingRequest: Subscription;
  errorMessage: any;
  loaded: boolean = false;
  saving: boolean = false;
  selectedClient: IClient;
  page: string;
  benchmark: any;
  parentDialogRef: MatDialogRef<AdminRateBenchmarksComponent>;
  selectedPeerFirms: Array<any> = [];
  clusterDefaultFirms: Array<any> = [];
  peerFirmOptions: Array<any> = [];
  paginationPageSize: number = 10;
  gridOptions: GridOptions;
  savedState: any;
  sideBarConfig: any;
  defaultColumn: any;
  defaultState: any;
  firstLoad: boolean = true;
  validFirmSelection: boolean = false;
  gridApi: any;
  firmOptions: SelectItemGroup[] = [];
  selectedFirm: any;
  @ViewChild('firmOptionsDropdown', {static: false}) firmOptionsDropdown: Dropdown;
  popoverText: string = 'Firms available for selection are those that have spend in the PA/year of this benchmark';
  resetTooltip: string = 'Set list of firms to those with the same cluster as the selected firm. Does not automatically save the list of firms.';
  cluster: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public userService: UserService,
              public commonServ: CommonService,
              private httpService: HttpService,
              public agGridService: AgGridService,
              public dialogRef: MatDialogRef<PeerFirmsModalComponent>) {}

  async ngOnInit(): Promise<void> {
    this.selectedClient = this.data.client;
    this.benchmark = this.data.benchmark;
    this.parentDialogRef = this.data.dialog;
    this.defaultColumn = this.agGridService.getDefaultColumn();
    this.sideBarConfig = this.agGridService.getDefaultSideBar();
    this.savedState = this.agGridService.getSavedState('ClientConfigsGrid');
    this.gridOptions = this.agGridService.getDefaultGridOptions();
    this.initColumns();
    const result = await this.getPeerFirmData();
    this.loaded = true;
    if (result.current_cluster_market_firms) {
      if (result.current_cluster_market_firms.length > 0) {
        this.processCurrentClusterMarketFirms(result.current_cluster_market_firms);
      }
    }
    if (result.current_selected_market_firms) {
      if (result.current_selected_market_firms.length > 0) {
        this.processCurrentSelectedMarketFirms(result.current_selected_market_firms);
      }
    }
    if (result.possible_market_firms) {
      if (result.possible_market_firms.length > 0) {
        this.processMarketFirmOptions(result.possible_market_firms);
      }
    }
    if (result.cluster) {
      this.cluster = result.cluster;
    }
    if (this.selectedPeerFirms.length > 2) {
      this.validFirmSelection = true;
    } else {
      this.validFirmSelection = false;
    }
    this.loadGrid();
  }

  initColumns() {
    this.gridOptions.columnDefs = [
      {headerName: 'Firm', field: 'firm_name', ...this.defaultColumn, filter: 'text', width: 220},
      {headerName: 'Cluster', field: 'cluster', ...this.defaultColumn, width: 80},
      {headerName: 'Avg Partner Rate', field: 'avg_partner_rate', ...this.defaultColumn, width: 90, cellRenderer: this.agGridService.roundCurrencyCellRenderer},
      {headerName: 'Avg Associate Rate', field: 'avg_associate_rate', ...this.defaultColumn, width: 95, cellRenderer: this.agGridService.roundCurrencyCellRenderer},
      {headerName: 'Avg Blended Rate', field: 'blended_rate', ...this.defaultColumn, width: 90, cellRenderer: this.agGridService.roundCurrencyCellRenderer},
      {headerName: 'Total Spend in PA/Year', field: 'total_billed', ...this.defaultColumn, width: 120, cellRenderer: this.agGridService.roundCurrencyCellRenderer},
      {headerName: 'Delete', cellRenderer: this.deleteCellRenderer,  ...this.defaultColumn, width: 80, suppressMenu: true, onCellClicked: this.removeFirmFromSelectedList.bind(this, true)},
    ];
  }

  loadGrid(): void {
    if (!this.gridOptions.api) {
      return;
    }
    if (this.firstLoad) {
      this.defaultState = this.gridOptions.columnApi.getColumnState();
      this.firstLoad = false;
    }
    this.gridOptions.api.setRowData(this.selectedPeerFirms);
    this.agGridService.restoreGrid(this.savedState, this.gridOptions);
  }

  getPeerFirmData(): Promise<any> {
    let getCluster = true;
    let marketFirms = [];
    if (this.benchmark.market_avg_firms) {
      getCluster = false;
      marketFirms = this.benchmark.market_avg_firms.map(value => value.id);
    }
    const params = {
      pa: this.benchmark.smart_practice_area,
      firm: this.benchmark.bh_lawfirm_id,
      yyyy: this.benchmark.year,
      market_firms: marketFirms,
      get_cluster: getCluster,
      client: this.selectedClient.bh_client_id
    };
    return new Promise((resolve, reject) => {
      return this.httpService.makeGetRequest('getPeerFirmData', params).subscribe(
        (data: any) => {
          if (!data.result) {
            resolve(data);
          }
          resolve(data.result);
        },
        err => {
          return {error: err};
        }
      );
    });
  }

  saveMarketFirmData() {
    this.selectedPeerFirms.sort((a, b) => b.total_billed - a.total_billed);
    const marketFirms = this.selectedPeerFirms.map(f => ({ id: f.firm_id, name: f.firm_name }));
    const params = {
      firmList: marketFirms,
      bmId: this.benchmark.id,
      client: this.selectedClient.bh_client_id
    };
    this.pendingRequest = this.httpService.makePostRequest('saveMarketFirmData', params).subscribe(
      (data: any) => {
        if (data.result) {
          this.benchmark = data.result;
        }
        if (data.error) {
          this.errorMessage = data.error;
        }
      }
    );

  }

  processCurrentClusterMarketFirms(currentMarketFirms: Array<any>): void {
    for (const firm of currentMarketFirms) {
      if (firm.cluster === 0) {
        firm.cluster = '--';
      }
      if (this.benchmark.market_avg_firms === null) {
        this.selectedPeerFirms.push(firm);
      }
      this.clusterDefaultFirms.push(firm);
    }
  }

  processMarketFirmOptions(marketFirmOptions: Array<any>): void {
    marketFirmOptions.sort((a, b) => b.cluster - a.cluster);
    const firmClusterOptions = [];
    const maxCluster = marketFirmOptions[0].cluster;
    if (maxCluster > 0) {
      for (let i = 1; i <= maxCluster; i++) {
        const cluster = marketFirmOptions.filter(f => f.cluster === i);
        const clusterFirms = [];
        for (const firm of cluster) {
          if (this.selectedPeerFirms.filter(f => f.firm_id === firm.firm_id).length === 0) {
            clusterFirms.push({label: firm.firm_name, value: firm.firm_id});
            this.peerFirmOptions.push(firm);
          }
        }
        clusterFirms.sort((a, b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0));
        firmClusterOptions.push({label: 'Cluster ' + i.toString(), items: clusterFirms});
      }
    }
    const noClusterFirms = marketFirmOptions.filter(f => f.cluster === 0);
    if (noClusterFirms.length > 0) {
      const noClusterFirmOptions = [];
      for (const firm of noClusterFirms) {
        if (this.selectedPeerFirms.filter(f => f.firm_id === firm.firm_id).length === 0) {
          noClusterFirmOptions.push({label: firm.firm_name, value: firm.firm_id});
          this.peerFirmOptions.push(firm);
        }
      }
      firmClusterOptions.push({label: 'No Cluster', items: noClusterFirmOptions});
    }
    this.firmOptions = firmClusterOptions;
  }

  processCurrentSelectedMarketFirms(selectedMarketFirms: Array<any>): void {
    for (const firm of selectedMarketFirms) {
      if (firm.cluster === 0) {
        firm.cluster = '--';
      }
      this.selectedPeerFirms.push(firm);
    }
  }

  firmSelected(evt) {
    const selectedFirm = this.peerFirmOptions.filter(f => f.firm_id === evt.value);
    if (selectedFirm.length > 0) {
      this.selectedFirm = selectedFirm[0];
    }
  }

  addFirm(): void {
    this.selectedPeerFirms.push(this.selectedFirm);
    this.peerFirmOptions = this.peerFirmOptions.filter(f => f.firm_id !== this.selectedFirm.firm_id);
    let label = '';
    if (this.selectedFirm.cluster > 0) {
      label = 'Cluster ' + this.selectedFirm.cluster.toString();
    } else {
      label = 'No Cluster';
    }
    for (const option of this.firmOptions) {
      if (option.label === label) {
        option.items = option.items.filter(o => o.value !== this.selectedFirm.firm_id);
      }
    }

    this.selectedFirm = null;
    this.firmOptionsDropdown.clear(null);
    if (this.selectedPeerFirms.length >= 3) {
      this.validFirmSelection = true;
    } else {
      this.validFirmSelection = false;
    }
    this.loadGrid();
  }

  // reset the list of selected firms to the original cluster firms
  // note this does not automatically revert the market_avg_firms column
  // in the benchmark_rate table to null (must save first)
  resetFirmOptions(): void {
    this.clusterDefaultFirms = this.clusterDefaultFirms.filter(f => f.cluster === this.cluster);
    const removedFirms = this.selectedPeerFirms.filter(f => f.cluster !== this.cluster);
    this.peerFirmOptions = this.peerFirmOptions.filter(f => f.cluster !== this.cluster);

    for (const firm of removedFirms) {
      this.peerFirmOptions.push(firm);
      if (firm.cluster > 0) {
        const ix = this.firmOptions.findIndex(f => f.label === 'Cluster ' + firm.cluster.toString());
        if (ix >= 0) {
          this.firmOptions[ix].items.push({label: firm.firm_name, value: firm.firm_id});
          this.firmOptions[ix].items.sort((a, b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0));
        }
      } else if (firm.cluster === 0) {
        const ix = this.firmOptions.findIndex(f => f.label === 'No Cluster');
        if (ix >= 0) {
          this.firmOptions[ix].items.push({label: firm.firm_name, value: firm.firm_id});
          this.firmOptions[ix].items.sort((a, b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0));
        }
      }
    }

    for (const option of this.firmOptions) {
      if (option.label === 'Cluster ' + this.cluster.toString()) {
        option.items = [];
      }
    }

    this.selectedPeerFirms = this.clusterDefaultFirms;
    if (this.selectedPeerFirms.length > 2) {
      this.validFirmSelection = true;
    } else {
      this.validFirmSelection = false;
    }
    this.loadGrid();
  }

  // clear the current set of firms, which invalidates the current firm selection (min of 3)
  removeAll(): void {
    for (const firm of this.selectedPeerFirms) {
      this.removeFirmFromSelectedList(false, firm);
    }
    this.selectedPeerFirms = [];
    this.validFirmSelection = false;
    this.loadGrid();

  }

  removeFirmFromSelectedList(fromGrid: boolean, item: any): void {
    if (fromGrid) {
      this.selectedPeerFirms = this.selectedPeerFirms.filter(f => f.firm_id !== item.data.firm_id);
    } else {
      this.selectedPeerFirms = this.selectedPeerFirms.filter(f => f.firm_id !== item.firm_id);
    }
    if (this.selectedPeerFirms.length > 2) {
      this.validFirmSelection = true;
    } else {
      this.validFirmSelection = false;
    }
    let label = '';
    if (fromGrid) {
      this.peerFirmOptions.push(item.data);
    } else {
      this.peerFirmOptions.push(item);
    }

    if (fromGrid) {
      if (item.data.cluster > 0) {
        label = 'Cluster ' + item.data.cluster.toString();
      } else {
        label = 'No Cluster';
      }
    } else {
      if (item.cluster > 0) {
        label = 'Cluster ' + item.cluster.toString();
      } else {
        label = 'No Cluster';
      }
    }
    for (const option of this.firmOptions) {
      if (option.label === label) {
        if (fromGrid) {
          option.items.push({label: item.data.firm_name, value: item.data.firm_id});
        } else {
          option.items.push({label: item.firm_name, value: item.firm_id});
        }
        option.items.sort((a, b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0));
      }
    }
    this.loadGrid();
  }

  manageSave() {
    this.dialogRef.close(true);
  }

  deleteCellRenderer() {
    const value = '<button mat-flat-button type="button" style="width: 40px; border: none; background-color: #e1e2e3;"><em class="icon-trash"></em></button>';
    return value;
  }

  changePageSize(evt: any): void {
    this.paginationPageSize = evt.value;
    this.gridOptions.api.paginationSetPageSize(this.paginationPageSize);
  }

}
