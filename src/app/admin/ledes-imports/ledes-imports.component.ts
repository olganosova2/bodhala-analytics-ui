import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../shared/services/common.service';
import {Subscription} from 'rxjs';
import {AppStateService, GenericConfirmModalComponent, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import {GridOptions} from 'ag-grid-community';
import {DropdownModule} from 'primeng/dropdown';
import {SelectItem} from 'primeng/api';
import {ILedesImport} from './ledes-imports-model';
import {AgGridService} from 'bodhala-ui-elements';
import { DatePipe } from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {confirmDialogConfig} from '../../shared/services/config';
import {ImportDetailComponent} from './import-detail/import-detail.component';



@Component({
  selector: 'bd-ledes-imports',
  templateUrl: './ledes-imports.component.html',
  styleUrls: ['./ledes-imports.component.scss']
})
export class LedesImportsComponent implements OnInit {
  pendingRequest: Subscription;
  errorMessage: any;
  defaultColDef;
  detailCellRendererParams;
  daysOptions: SelectItem[] = [{label: 'Yesterday', value: 1},
                               {label: 'Last 7 Days', value: 7},
                               {label: 'Last 2 Weeks', value: 14},
                               {label: 'Last Month', value: 30},
                               {label: 'Last 3 Months', value: 90}];
  selectedDateRange: number = 7;
  dropdownWidth: any = {width: '325px'};
  imports: Array<ILedesImport> = [];
  paginationPageSize: number = 10;
  gridOptions: GridOptions;
  savedState: any;
  sideBarConfig: any;
  defaultColumn: any;
  defaultState: any;
  firstLoad: boolean = true;

  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public userService: UserService,
              public utilService: UtilService,
              public commonServ: CommonService,
              public agGridService: AgGridService,
              public datePipe: DatePipe,
              public matDialog: MatDialog) {
    this.commonServ.pageTitle = 'Auto LEDES Imports';
  }

  ngOnInit(): void {
    this.defaultColumn = this.agGridService.getDefaultColumn();
    this.sideBarConfig = this.agGridService.getDefaultSideBar();
    this.savedState = this.agGridService.getSavedState('AutoLEDESGrid');
    this.gridOptions = this.agGridService.getDefaultGridOptions();
    this.initColumns();
    this.getLEDESImports();
  }

  openModal(upload): void {
    const modalConfig = {...confirmDialogConfig, data: {title: 'Confirm Re-run', text: 'Please confirm that you would like to re-run this LEDES file.'}};

    const dialogRef = this.matDialog.open(GenericConfirmModalComponent, {
      ...modalConfig,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.reRunImport();
      }
    });
  }

  openDetailModal(detail): void {
    this.matDialog.open(ImportDetailComponent, {
      data: detail
    });
  }

  initColumns(): void {
    this.gridOptions.masterDetail = true;
    this.gridOptions.detailRowHeight = 450;

    this.gridOptions.columnDefs = [
      {headerName: 'Client', field: 'client_name', ...this.defaultColumn, floatingFilter: true, width: 350, pinned: true, cellRenderer: 'agGroupCellRenderer'},
      {headerName: '# Successful Uploads', field: 'num_imported_uploads', ...this.defaultColumn, floatingFilter: true, width: 180},
      {headerName: '# Failed Uploads', field: 'num_failed_uploads', ...this.defaultColumn, floatingFilter: true, width: 180},
      {headerName: '# Successful Ingests', field: 'num_imported_ingests', ...this.defaultColumn, floatingFilter: true, width: 180},
      {headerName: '# Failed Ingests', field: 'num_failed_ingests', ...this.defaultColumn, floatingFilter: true, width: 180},
      // {headerName: 'Files', cellRenderer: this.filesCellRenderer,  ...this.defaultColumn, width: 100, suppressMenu: true},
      // {headerName: 'Errors', cellRenderer: this.errorsCellRenderer,  ...this.defaultColumn, width: 100, suppressMenu: true},
      // {headerName: 'View', cellRenderer: this.viewCellRenderer,  ...this.defaultColumn, width: 100, suppressMenu: true},
      // {headerName: 'Re-run', cellRenderer: this.viewCellRenderer,  ...this.defaultColumn, width: 100, suppressMenu: true}
    ];

    this.defaultColDef = { flex: 1 };
    this.gridOptions.detailCellRendererParams = {
      detailGridOptions: {
        columnDefs: [
          {headerName: 'Client', field: 'client_name', width: 240, filter: 'text', sortable: true},
          {headerName: 'Firm', field: 'firm_name',  width: 240, sortable: true, resizable: true},
          {headerName: 'Created On', field: 'created_at', sortable: true, resizable: true},
          {headerName: 'Successfully Uploaded', field: 'is_uploaded', cellRenderer: this.booleanCellRenderer, ...this.defaultColumn, width: 140},
          {headerName: 'Successfully Ingested', field: 'is_ingested', cellRenderer: this.booleanCellRenderer, ...this.defaultColumn, width: 140},
          {headerName: 'Rejection Reason', field: 'rejected_reason', ...this.defaultColumn, width: 250},
          {headerName: 'Files/Errors', cellRenderer: this.filesCellRenderer,  ...this.defaultColumn, width: 120, tooltipField: 'file_tooltip', suppressMenu: true, onCellClicked: this.openDetailModal.bind(this)}
          // {headerName: 'View', cellRenderer: this.viewCellRenderer,  ...this.defaultColumn, width: 100, suppressMenu: true},
          // {headerName: 'Re-run', cellRenderer: this.reRunCellRenderer,  ...this.defaultColumn, width: 100, suppressMenu: true, onCellClicked: this.openModal.bind(this)}
        ]
      },
      getDetailRowData: (paramsIncoming) => {
        paramsIncoming.successCallback(paramsIncoming.data.data);
      },
    };
  }


  getLEDESImports(): void {
    const params = { range: this.selectedDateRange };
    this.pendingRequest = this.httpService.makeGetRequest<ILedesImport>('getAutoLEDESImports', params).subscribe(
      (data: any) => {
        this.imports = data.result || [];
        this.processData();
        this.loadGrid();
      },
      err => {
        this.errorMessage = err;
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
    this.gridOptions.api.setRowData(this.imports);
    this.agGridService.restoreGrid(this.savedState, this.gridOptions);
  }

  processData(): void {
    this.imports = this.groupBy(this.imports);
    for (const rec of this.imports) {
      rec.num_imported_uploads = 0;
      rec.num_failed_uploads = 0;
      rec.num_imported_ingests = 0;
      rec.num_failed_ingests = 0;
      rec.data = rec.data.sort(this.utilService.dynamicSort('-created_at'));
      for (const d of rec.data) {
        d.file_tooltip = 'Click to view import details';
        d.created_at = this.datePipe.transform(d.created_at, 'short');
        if (d.adu !== null) {
          d.firm_name = d.adu.searched_firm.name;
        } else {
          d.firm_name = 'N/A';
        }
        if (d.is_ingested === true) {
          rec.num_imported_ingests++;
        } else {
          rec.num_failed_ingests++;
        }
        if (d.is_uploaded === true) {
          rec.num_imported_uploads++;
        } else {
          rec.num_failed_uploads++;
        }
        if (d.rejected_reason === '') {
          d.rejected_reason = 'N/A';
        }
      }

    }
    this.imports = this.imports.sort(this.utilService.dynamicSort('-created_at'));
  }

  saveGridConfig(evt: any): void {
    const state = evt;
    // this.agGridService.saveState('AutoLEDESGrid', this.gridOptions); TODO
  }

  filesCellRenderer(params: any) {
    const value = '<button mat-flat-button type="button" style="width: 60px; border: none; background-color: #e1e2e3;"><em class="icon-docs"></em></button>';
    return value;
  }
  // errorsCellRenderer(params: any) {
  //   const value = '<button mat-flat-button type="button" style="width: 60px; border: none; background-color: #e1e2e3;"><i class="fa fa-exclamation-triangle"></i></button>';
  //   return value;
  // }
  reRunCellRenderer(params: any) {
    // if (params.data.is_ingested === true && params.data.is_uploaded === true)
    const value = '<button mat-flat-button type="button" style="width: 60px; border: none; background-color: #e1e2e3;"><em class="icon-equalizer"></em></button>';
    return value;
  }

  booleanCellRenderer(params: any) {
    if (params.value) {
      return 'Yes';
    } else {
      return 'No';
    }
  }

  groupBy(imports: any) {
    const result = imports.reduce((acc, d) => {
      const found = acc.find(a => a.client === d.client);
      const value = {
        adu: d.adu,
        client: d.client,
        client_id: d.client_id,
        client_name: d.client_name,
        created_at: d.created_at,
        etag: d.etag,
        is_uploaded: d.is_uploaded_PROD,
        is_ingested: d.is_ingested_PROD,
        original_name: d.original_name,
        rejected_reason: d.rejected_reason_PROD
      };
      if (!found) {
        acc.push({client: d.client, client_name: d.client_name, data: [value]});
      } else {
        found.data.push(value);
      }
      return acc;
    }, []);
    return result;
  }

}
