import {Component, OnInit} from '@angular/core';
import {CommonService, IClient} from '../shared/services/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {IRecommendationReport} from '../admin/client-recommendations/client-recommendations-model';
import {AgGridService} from 'bodhala-ui-elements';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {GridOptions} from 'ag-grid-community';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'bd-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {
  pendingRequest: Subscription;
  selectedClient: IClient;
  recommendationReports: Array<IRecommendationReport> = [];
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
              public commonServ: CommonService,
              public utilService: UtilService,
              public dialog: MatDialog,
              public agGridService: AgGridService) {
    this.commonServ.pageTitle = 'View Bodhala Recommendations';
  }

ngOnInit(): void {
  this.defaultColumn = this.agGridService.getDefaultColumn();
  this.sideBarConfig = this.agGridService.getDefaultSideBar();
  this.savedState = this.agGridService.getSavedState('ClientConfigsGrid');
  this.gridOptions = this.agGridService.getDefaultGridOptions();
  this.initColumns();
  this.getClientRecommendationReports();
}
initColumns(): void {
  this.gridOptions.columnDefs = [
    {headerName: 'Title', field: 'title', ...this.defaultColumn,  filter: 'text', flex: 1},
    {headerName: '# of Recommendations', field: 'num_recommendations', ...this.defaultColumn, flex: 1},
    {headerName: 'Created On', field: 'created_on', ...this.defaultColumn,  filter: 'text', flex: 1},
    {headerName: 'View', cellRenderer: this.viewCellRenderer,  ...this.defaultColumn, width: 100, suppressMenu: true,  onCellClicked: this.view.bind(this)}
  ];
}


  saveGridConfig(evt: any): void {
    const state = evt;
  }

  getClientRecommendationReports(): void {
    const params = { clientId: this.userService.currentUser.client_info_id };
    this.pendingRequest = this.httpService.makeGetRequest('getClientRecommendationReports', params).subscribe(
      (data: any) => {
        this.recommendationReports = data.result || [];
        this.recommendationReports = this.recommendationReports.filter(report => report.published === true);
        this.recommendationReports = this.recommendationReports.sort(this.utilService.dynamicSort('-created_on'));
        const pipe = new DatePipe('en-US');
        for (const report of this.recommendationReports) {
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
    this.gridOptions.api.setRowData(this.recommendationReports);
    this.agGridService.restoreGrid(this.savedState, this.gridOptions);
  }

  viewCellRenderer(params: any) {
    const value = '<button mat-flat-button type="button" style="width: 60px;border: none;background-color: #e1e2e3;"><em class="icon-eye"></em></button>';
    return value;
  }

  view(row: any): void {
    this.router.navigate(['/analytics-ui/recommendations/view/', row.data.id]);
  }

}
