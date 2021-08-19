import {Component, OnInit} from '@angular/core';
import {CommonService, IClient} from '../../shared/services/common.service';
import {IRecommendationReport} from './client-recommendations-model';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, ConfirmModalComponent, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {AgGridService} from 'bodhala-ui-elements';
import {Subscription} from 'rxjs';
import {GridOptions} from 'ag-grid-community';
import {MatDialog} from '@angular/material/dialog';
import {FRESH_DESK_ARTICLES} from '../../shared/services/config';
import { DatePipe } from '@angular/common';
import {confirmDialogConfig} from '../../shared/services/config';
import {PublishCheckboxComponent} from './publish-checkbox/publish-checkbox.component';

@Component({
  selector: 'bd-client-recommendations',
  templateUrl: './client-recommendations.component.html',
  styleUrls: ['./client-recommendations.component.scss']
})
export class ClientRecommendationsComponent implements OnInit {
  pendingRequest: Subscription;
  pendingRequestDelete: Subscription;
  selectedClient: IClient;
  clientRecommendationReports: Array<IRecommendationReport> = [];
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
      {headerName: 'View', cellRenderer: this.viewCellRenderer,  ...this.defaultColumn, width: 100, suppressMenu: true,  onCellClicked: this.view.bind(this)},
      {headerName: 'Published', field: 'published',  ...this.defaultColumn, width: 100, suppressMenu: true,  cellRendererFramework: PublishCheckboxComponent},
      {headerName: 'Edit', cellRenderer: this.editCellRenderer,  ...this.defaultColumn, width: 100, suppressMenu: true,  onCellClicked: this.edit.bind(this)},
      {headerName: 'Delete', cellRenderer: this.deleteCellRenderer,  ...this.defaultColumn, width: 100, suppressMenu: true,  onCellClicked: this.openDeleteDialog.bind(this)},
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
    this.pendingRequest = this.httpService.makeGetRequest('getRecommendationReportsAdmin', params).subscribe(
      (data: any) => {
        this.clientRecommendationReports = data.result || [];
        this.clientRecommendationReports = this.clientRecommendationReports.sort(this.utilService.dynamicSort('-created_on'));
        const pipe = new DatePipe('en-US');
        for (const report of this.clientRecommendationReports) {
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
    this.gridOptions.api.setRowData(this.clientRecommendationReports);
    this.agGridService.restoreGrid(this.savedState, this.gridOptions);
  }

  saveGridConfig(evt: any): void {
    const state = evt;
    // this.agGridService.saveState('ClientConfigsGrid', this.gridOptions);
  }

  viewCellRenderer() {
    const value = '<button mat-flat-button type="button" style="width: 60px;border: none;background-color: #e1e2e3;"><em class="icon-eye"></em></button>';
    return value;
  }

  editCellRenderer() {
    const value = '<button mat-flat-button type="button" style="width: 60px;border: none;background-color: #e1e2e3;"><em class="icon-pencil"></em></button>';
    return value;
  }

  deleteCellRenderer() {
    const value = '<button mat-flat-button type="button" style="width: 60px;border: none;background-color: #e1e2e3;"><em class="icon-trash"></em></button>';
    return value;
  }

  view(row: any): void {
    const item = row.data;
    this.router.navigate(['/analytics-ui/admin/client-recommendations/view/', row.data.id], {queryParams: {
      clientId: this.selectedClient.bh_client_id,
      orgId: this.selectedClient.org_id
    }});
  }

  edit(row: any): void {
    this.router.navigate(['/analytics-ui/admin/client-recommendations/edit/', this.selectedClient.bh_client_id], {queryParams: {
      orgId: this.selectedClient.org_id,
      reportId: row.data.id
    }});
  }

  openDeleteDialog(item: any): void {
    const modalConfig = {...confirmDialogConfig, data: {title: 'Confirm Delete', item: 'recommendation report'}};
    const dialogRef = this.dialog.open(ConfirmModalComponent, {...modalConfig, disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteReport(item.data);
      }
    });

  }

  deleteReport(item: any): void {
    const params = { id: item.id};
    this.pendingRequestDelete = this.httpService.makeDeleteRequest('deleteClientRecommendationReport', params).subscribe(
      (data: any) => {
        const deleted = data.result;
        if (deleted) {
          this.getClientRecommendationReports();
        }
      }
    );
  }

  addNew(): void {
    this.router.navigate(['/analytics-ui/admin/client-recommendations/new/', this.selectedClient.bh_client_id], {queryParams: {
      orgId: this.selectedClient.org_id
    }});
  }
}
