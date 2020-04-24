import {Component, Input, OnDestroy, OnInit, NgModule} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {HttpService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'bd-firm-dropdown',
  templateUrl: './firm-dropdown.component.html',
  styleUrls: ['./firm-dropdown.component.scss'],
})
export class FirmDropdownComponent implements OnInit {
  firmsList: any;
  @Input() firmId: number;
  pendingRequest: Subscription;
  errorMessage: any;


  constructor(private httpService: HttpService,
              public filtersService: FiltersService,
              public router: Router) { }

  ngOnInit() {
    this.getFirmsList();
  }

  getFirmsList(): void {
    let params = this.filtersService.getCurrentUserCombinedFilters();
    const arr = [];
    arr.push(params.clientId.toString());
    params.clientId = JSON.stringify(arr);
    params = params.clientId;

    this.pendingRequest = this.httpService.makeGetRequest('getFirmsListByClient', params).subscribe(
      (data: any) => {
        if (!data.result) {
          return;
        }
        this.firmsList = data.result;
      },
      err => {
        this.errorMessage = err;
      }
    );
  }

  getFirm(firmId): void {
    this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(() => this.router.navigate(['/analytics-ui/firm/', firmId]));

  }

}
