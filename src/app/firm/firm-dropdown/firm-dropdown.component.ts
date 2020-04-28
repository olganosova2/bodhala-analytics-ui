import {Component, Input, OnDestroy, OnInit, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../shared/services/common.service';
import {Subscription} from 'rxjs';
import {HttpService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import {UserService} from 'bodhala-ui-common';
import {FormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {SelectItem} from 'primeng/api';

@NgModule({
  imports: [
    DropdownModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,
            NO_ERRORS_SCHEMA]
})

@Component({
  selector: 'bd-firm-dropdown',
  templateUrl: './firm-dropdown.component.html',
  styleUrls: ['./firm-dropdown.component.scss'],
})
export class FirmDropdownComponent implements OnInit {
  firmsList: any;
  @Input() firmId: string;
  pendingRequest: Subscription;
  errorMessage: any;
  firmOptions: SelectItem[];
  currentFirmName: string;

  constructor(private route: ActivatedRoute,
              private httpService: HttpService,
              public filtersService: FiltersService,
              public router: Router,
              public userService: UserService,
              public dropdownModule: DropdownModule,
              public commonServ: CommonService) { }

  ngOnInit() {
    this.getFirmsList();
    this.route.paramMap.subscribe(params => {
      this.firmId = params.get('id');
    });
  }

  getFirmsList(): any {
    const params = {clientId: this.userService.currentUser.client_info.id};

    this.pendingRequest = this.httpService.makeGetRequest('getFirmsListByClient', params).subscribe(
      (data: any) => {
        if (!data.result) {
          return;
        }
        this.firmsList = data.result;
        this.firmOptions = [];
        for (const firm of this.firmsList) {
          this.firmOptions.push({label: firm.law_firm_name, value: firm.id});

          if (firm.id === Number(this.firmId)) {
            this.currentFirmName = firm.law_firm_name;
          }
        }
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
