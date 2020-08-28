import {Component, OnInit, Inject} from '@angular/core';
import {UserService, HttpService} from 'bodhala-ui-common';
import {Subscription} from 'rxjs';
import {GridOptions, Module, _} from 'ag-grid-community';
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
  errorMessage: any;
  savedState: any;
  sideBarConfig: any;
  defaultColumn: any;
  defaultState: any;
  savedFilter: boolean = false;

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
    for (let data of this.data) {
      data.print_date = this.dateFormatter(data.print_date);
      data.username = this.userService.currentUser.first_name + ' ' + this.userService.currentUser.last_name;
      let temp = data.filter_set.datestring.split('&');
      data.startdate = temp[1].split('=')[1];
      data.enddate = temp[2].split('=')[1];
      data.startdate = this.dateFormatter(data.startdate);
      data.enddate = this.dateFormatter(data.enddate);
    }
    
  }

  dateFormatter(date) {
    return this.datepipe.transform(date, 'mediumDate');
  }

  loadSavedExport(data): void {
    console.log("loadSavedExport: ", data, typeof(data.filter_set));
    let temp = data.filter_set;
    temp = JSON.stringify(temp);
    localStorage.setItem('ELEMENTS_dataFilters_' + this.userService.currentUser.id.toString(), temp);
    if (data.saved_view === null) {
      localStorage.removeItem('saved_filter_' + this.userService.currentUser.id.toString());
    } else {
      localStorage.setItem('saved_filter_' + this.userService.currentUser.id.toString(), data.saved_view);
    }
    // localStorage.setItem('saved_report_' + this.userService.currentUser.id.toString(), data.print_date);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['analytics-ui/firm/report-card/' + data.lawfirm_id]);
    }); 
  }

  deleteSavedExport(data): void {
    let params = {};
    let lawfirmId = 0;
    if (data.lawfirm_id) {
      lawfirmId = data.lawfirm_id
    }
    if (data.id) {
      params = {id: data.id};
    }
    console.log("params: ", params);
    this.pendingRequest = this.httpService.makeDeleteRequest('deleteSavedExport', params).subscribe(
      (data: any) => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['analytics-ui/firm/report-card/' + lawfirmId]);
        }); 
      },
      err => {
        this.errorMessage = err;
      }
    );
  }
}
