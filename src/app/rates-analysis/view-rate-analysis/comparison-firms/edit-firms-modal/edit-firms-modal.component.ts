import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {HttpService, UserService} from 'bodhala-ui-common';
import {Subscription} from 'rxjs';
import {AgGridService} from 'bodhala-ui-elements';
import {GridOptions} from 'ag-grid-community';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CommonService} from '../../../../shared/services/common.service';
import { SelectItemGroup } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import {ComparisonFirmsComponent} from '../comparison-firms.component';

@Component({
  selector: 'bd-edit-firms-modal',
  templateUrl: './edit-firms-modal.component.html',
  styleUrls: ['./edit-firms-modal.component.scss']
})
export class EditFirmsModalComponent implements OnInit {
  pendingRequest: Subscription;
  errorMessage: any;
  loaded: boolean = false;
  saving: boolean = false;
  benchmark: any;
  selectedPanelFirms: Array<any> = [];
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
  popoverText: string = 'Firms available for selection are those that have spend in the PA/year of this benchmark for this client';
  resetTooltip: string;
  parentDialogRef: MatDialogRef<ComparisonFirmsComponent>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public userService: UserService,
              public commonServ: CommonService,
              private httpService: HttpService,
              public agGridService: AgGridService,
              public dialogRef: MatDialogRef<EditFirmsModalComponent>) {}

  async ngOnInit(): Promise<void> {
    this.benchmark = this.data.benchmark;
    this.parentDialogRef = this.data.dialog;
    this.defaultColumn = this.agGridService.getDefaultColumn();
    this.sideBarConfig = this.agGridService.getDefaultSideBar();
    this.savedState = this.agGridService.getSavedState('ClientConfigsGrid');
    this.gridOptions = this.agGridService.getDefaultGridOptions();
    this.resetTooltip = 'Set list of firms to those with the same cluster as ' + this.benchmark.firm_name
                        + '. Does not automatically save the list of firms.';
    this.initColumns();

    const result = await this.getPanelFirmData();
    this.loaded = true;
    if (result.current_cluster_internal_firms) {
      if (result.current_cluster_internal_firms.length > 0) {
        this.processCurrentClusterInternalFirms(result.current_cluster_internal_firms);
      }
    }
    if (result.current_selected_internal_firms) {
      if (result.current_selected_internal_firms.length > 0) {
        this.processCurrentSelectedInternalFirms(result.current_selected_internal_firms);
      }
    }
    if (result.possible_internal_firms) {
      if (result.possible_internal_firms.length > 0) {
        this.processInternalFirmOptions(result.possible_internal_firms);
      }
    }

    if (this.selectedPanelFirms.length > 2) {
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
    this.gridOptions.api.setRowData(this.selectedPanelFirms);
    this.agGridService.restoreGrid(this.savedState, this.gridOptions);
  }

  // comment TBD
  getPanelFirmData(): Promise<any> {
    let getCluster = true;
    let internalFirms = [];
    if (this.benchmark.internal_firms) {
      getCluster = false;
      internalFirms = this.benchmark.internal_firms.map(value => value.id);
    }
    const params = {
      bmId: this.benchmark.id,
      pa: this.benchmark.smart_practice_area,
      firm: this.benchmark.bh_lawfirm_id,
      yyyy: this.benchmark.year,
      internal_firms: internalFirms,
      get_cluster: getCluster,
      client: this.benchmark.bh_client_id
    };
    return new Promise((resolve, reject) => {
      return this.httpService.makeGetRequest('getPanelFirmData', params).subscribe(
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

  savePanelFirmData() {
    this.selectedPanelFirms.sort((a, b) => b.total_billed - a.total_billed);
    const internalFirms = this.selectedPanelFirms.map(f => ({ id: f.firm_id, name: f.firm_name }));
    const params = {
      firmList: internalFirms,
      bmId: this.benchmark.id,
      client: this.benchmark.bh_client_id
    };
    this.pendingRequest = this.httpService.makePostRequest('savePanelFirmData', params).subscribe(
      (data: any) => {
        if (data.result) {
          this.benchmark = data.result;
          this.dialogRef.close(this.benchmark);
        }
        if (data.error) {
          this.errorMessage = data.error;
        }
      }
    );

  }

  processCurrentClusterInternalFirms(currentInternalFirms: Array<any>): void {
    for (const firm of currentInternalFirms) {
      if (firm.cluster === 0) {
        firm.cluster = '--';
      }
      if (this.benchmark.internal_firms === null) {
        this.selectedPanelFirms.push(firm);
      }
      this.clusterDefaultFirms.push(firm);
    }
  }

  processInternalFirmOptions(internalFirmOptions: Array<any>): void {
    internalFirmOptions.sort((a, b) => b.cluster - a.cluster);
    const firmClusterOptions = [];
    const maxCluster = internalFirmOptions[0].cluster;
    if (maxCluster > 0) {
      for (let i = 1; i <= maxCluster; i++) {
        const cluster = internalFirmOptions.filter(f => f.cluster === i);
        const clusterFirms = [];
        for (const firm of cluster) {
          if (this.selectedPanelFirms.filter(f => f.firm_id === firm.firm_id).length === 0) {
            clusterFirms.push({label: firm.firm_name, value: firm.firm_id});
            this.peerFirmOptions.push(firm);
          }
        }
        clusterFirms.sort((a, b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0));
        firmClusterOptions.push({label: 'Cluster ' + i.toString(), items: clusterFirms});
      }
    }
    const noClusterFirms = internalFirmOptions.filter(f => f.cluster === 0);
    if (noClusterFirms.length > 0) {
      const noClusterFirmOptions = [];
      for (const firm of noClusterFirms) {
        if (this.selectedPanelFirms.filter(f => f.firm_id === firm.firm_id).length === 0) {
          noClusterFirmOptions.push({label: firm.firm_name, value: firm.firm_id});
          this.peerFirmOptions.push(firm);
        }
      }
      firmClusterOptions.push({label: 'No Cluster', items: noClusterFirmOptions});
    }
    this.firmOptions = firmClusterOptions;
  }

  processCurrentSelectedInternalFirms(selectedInternalFirms: Array<any>): void {
    for (const firm of selectedInternalFirms) {
      if (firm.cluster === 0) {
        firm.cluster = '--';
      }
      this.selectedPanelFirms.push(firm);
    }
  }

  firmSelected(evt) {
    const selectedFirm = this.peerFirmOptions.filter(f => f.firm_id === evt.value);
    if (selectedFirm.length > 0) {
      this.selectedFirm = selectedFirm[0];
    }
  }

  addFirm(): void {
    this.selectedPanelFirms.push(this.selectedFirm);
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
    if (this.selectedPanelFirms.length >= 3) {
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
    let cluster = 0;
    if (this.clusterDefaultFirms.length > 0) {
      cluster = this.clusterDefaultFirms[0].cluster;
    }
    this.peerFirmOptions = this.peerFirmOptions.filter(f => f.cluster !== cluster);
    for (const option of this.firmOptions) {

      if (option.label === 'Cluster ' + cluster.toString()) {
        option.items = [];
      }
    }

    this.selectedPanelFirms = this.clusterDefaultFirms;
    if (this.selectedPanelFirms.length > 2) {
      this.validFirmSelection = true;
    } else {
      this.validFirmSelection = false;
    }
    this.loadGrid();
  }

  // clear the current set of firms, which invalidates the current firm selection (min of 3)
  removeAll(): void {
    for (const firm of this.selectedPanelFirms) {
      this.removeFirmFromSelectedList(false, firm);
    }
    this.selectedPanelFirms = [];
    this.validFirmSelection = false;
    this.loadGrid();

  }

  removeFirmFromSelectedList(fromGrid: boolean, item: any): void {
    if (fromGrid) {
      this.selectedPanelFirms = this.selectedPanelFirms.filter(f => f.firm_id !== item.data.firm_id);
    } else {
      this.selectedPanelFirms = this.selectedPanelFirms.filter(f => f.firm_id !== item.firm_id);
    }
    if (this.selectedPanelFirms.length > 2) {
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
