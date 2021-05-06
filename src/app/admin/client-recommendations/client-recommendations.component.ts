import {Component, OnInit} from '@angular/core';
import {CommonService, IClient, IRecommendationReport} from '../../shared/services/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, ConfirmModalComponent, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {AgGridService} from 'bodhala-ui-elements';
import {Subscription} from 'rxjs';
import {GridOptions} from 'ag-grid-community';
import * as config from '../../shared/services/config';
import {MatDialog} from '@angular/material/dialog';
import {FRESH_DESK_ARTICLES} from '../../shared/services/config';

@Component({
  selector: 'bd-client-recommendations',
  templateUrl: './client-recommendations.component.html',
  styleUrls: ['./client-recommendations.component.scss']
})
export class ClientRecommendationsComponent implements OnInit {
  pendingRequest: Subscription;
  pendingRequestDelete: Subscription;
  errorMessage: any;
  selectedClient: IClient;
  clientRecommendationReports: Array<IRecommendationReport> = []; // create interface var for this
  paginationPageSize: number = 10;
  gridOptions: GridOptions;
  savedState: any;
  sideBarConfig: any;
  defaultColumn: any;
  defaultState: any;
  firstLoad: boolean = true;
  helpArticleId: string = FRESH_DESK_ARTICLES.EntityConfig;

  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public userService: UserService,
              public commonServ: CommonService,
              public utilService: UtilService,
              public dialog: MatDialog,
              public agGridService: AgGridService) {
    this.commonServ.pageTitle = 'Manage Clients Recommendations';
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
      {headerName: 'Title', field: 'title', ...this.defaultColumn,  filter: 'text', flex: 1},
      {headerName: '# of Recommendations', field: 'num_recommendations', ...this.defaultColumn, flex: 1},
      {headerName: 'Created On', field: 'created_on', ...this.defaultColumn,  filter: 'text', flex: 1},
      {headerName: 'Edit', cellRenderer: this.editCellRenderer,  ...this.defaultColumn, width: 100, suppressMenu: true,  onCellClicked: this.edit.bind(this)},
      {headerName: 'Delete', cellRenderer: this.deleteCellRenderer,  ...this.defaultColumn, width: 100, suppressMenu: true}, //onCellClicked: this.openDeleteDialog.bind(this)
    ];
  }

  loadRecommendationReports(client: IClient): void {
    this.selectedClient = client;
    if (this.selectedClient) {
      this.getClientRecommendationReports();
      this.commonServ.pageSubtitle = this.selectedClient.org_name;
    }
  }

  getClientRecommendationReports(): void {
    const params = { clientId: this.selectedClient.bh_client_id };
    this.pendingRequest = this.httpService.makeGetRequest('getClientRecommendationReports', params).subscribe(
      (data: any) => {
        console.log("data: ", data);
        this.clientRecommendationReports = data.result || [];
        this.clientRecommendationReports = this.clientRecommendationReports.sort(this.utilService.dynamicSort('created_on'));
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
    this.gridOptions.api.setRowData(this.clientRecommendationReports);
    this.agGridService.restoreGrid(this.savedState, this.gridOptions);
  }

  saveGridConfig(evt: any): void {
    const state = evt;
    // this.agGridService.saveState('ClientConfigsGrid', this.gridOptions); TODO
  }

  editCellRenderer(params: any) {
    const value = '<button mat-flat-button type="button" style="width: 60px;border: none;background-color: #e1e2e3;"><em class="icon-pencil"></em></button>';
    return value;
  }

  deleteCellRenderer(params: any) {
    const value = '<button mat-flat-button type="button" style="width: 60px;border: none;background-color: #e1e2e3;"><em class="icon-trash"></em></button>';
    return value;
  }

  edit(row: any): void {
    const item = row.data;
    this.openModal(item);
  }

  openModal(item: any): void {
    // const packaged = { config: Object.assign({}, item), records: this.clientConfigs, client: this.selectedClient};
    // const modalConfig = {...SAVINGS_CALCULATOR_CONFIG.detailsDialogConfig, data: Object.assign([], packaged)};
    // const dialogRef = this.dialog.open(AddEditConfigComponent, {...modalConfig, disableClose: true });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.getClientConfigs();
    //   }
    // });

  }

  addNew(): void {
    this.router.navigate(['/analytics-ui/admin/client-recommendations/new/', this.selectedClient.bh_client_id]);
  }

}
