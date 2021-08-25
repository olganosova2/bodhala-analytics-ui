import {Component, OnInit, Inject} from '@angular/core';
import {UserService, HttpService} from 'bodhala-ui-common';
import {Subscription} from 'rxjs';
import {GridOptions, _} from 'ag-grid-community';
import { DatePipe } from '@angular/common';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AgGridService} from 'bodhala-ui-elements';
import {CommonService} from '../../shared/services/common.service';
import {Router} from '@angular/router';


@Component({
  selector: 'bd-saved-reports-modal',
  templateUrl: './saved-reports-modal.component.html',
  styleUrls: ['./saved-reports-modal.component.scss']
})
export class SavedReportsModalComponent implements OnInit {
  savedReportData: any;
  paginationPageSize: number = 10;
  gridOptions: GridOptions;
  pendingRequest: Subscription;
  savedState: any;
  sideBarConfig: any;
  defaultColumn: any;
  defaultState: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public agGridService: AgGridService,
              public commonServ: CommonService,
              public userService: UserService,
              public httpService: HttpService,
              public datepipe: DatePipe,
              public router: Router) { }

  ngOnInit(): void {
    this.savedReportData = this.data;
    this.processData();

  }

  processData(): void {
    for (const rec of this.savedReportData) {
      rec.print_date = this.dateFormatter(rec.print_date);
      rec.username = this.userService.currentUser.first_name + ' ' + this.userService.currentUser.last_name;
      const temp = rec.filter_set.datestring.split('&');
      rec.startdate = temp[1].split('=')[1];
      rec.enddate = temp[2].split('=')[1];
      rec.startdate = this.dateFormatter(rec.startdate);
      rec.enddate = this.dateFormatter(rec.enddate);
    }
  }

  dateFormatter(date) {
    return this.datepipe.transform(date, 'mediumDate');
  }

  loadSavedExport(data): void {
    let temp = data.filter_set;
    temp = JSON.stringify(temp);
    localStorage.setItem('ELEMENTS_dataFilters_' + this.userService.currentUser.id.toString(), temp);
    if (data.saved_view === null) {
      localStorage.removeItem('saved_filter_' + this.userService.currentUser.id.toString());
    } else {
      localStorage.setItem('saved_filter_' + this.userService.currentUser.id.toString(), data.saved_view);
    }
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['analytics-ui/firm/report-card/' + data.lawfirm_id]);
    });
  }

  deleteSavedExport(exportData): void {
    let params = {};
    let lawfirmId = 0;
    if (exportData.lawfirm_id) {
      lawfirmId = exportData.lawfirm_id;
    }
    if (exportData.id) {
      params = {id: exportData.id};
    }
    this.pendingRequest = this.httpService.makeDeleteRequest('deleteSavedExport', params).subscribe(
      (data: any) => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['analytics-ui/firm/report-card/' + lawfirmId]);
        });
      }
    );
  }
}
