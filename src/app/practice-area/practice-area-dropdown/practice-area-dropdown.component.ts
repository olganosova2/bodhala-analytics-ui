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

@Component({
  selector: 'bd-practice-area-dropdown',
  templateUrl: './practice-area-dropdown.component.html',
  styleUrls: ['./practice-area-dropdown.component.scss']
})
export class PracticeAreaDropdownComponent implements OnInit {
  practiceAreasList: any;
  @Input() clientMatterType: string;
  pendingRequest: Subscription;
  errorMessage: any;
  practiceAreaOptions: SelectItem[];
  currentPracticeArea: string;
  dropdownWidth: any = {};

  constructor(private route: ActivatedRoute,
              private httpService: HttpService,
              public filtersService: FiltersService,
              public router: Router,
              public userService: UserService,
              public dropdownModule: DropdownModule,
              public commonServ: CommonService) { }

  ngOnInit() {
    this.getPracticeAreasList();
    this.route.paramMap.subscribe(params => {
      this.clientMatterType = params.get('client_matter_type');
    });
  }

  getPracticeAreasList(): any {
    const params = {clientId: this.userService.currentUser.client_info.id};

    this.pendingRequest = this.httpService.makeGetRequest('getPracticeAreasListByClient', params).subscribe(
      (data: any) => {
        if (!data.result) {
          return;
        }
        this.practiceAreasList = data.result;
        this.practiceAreaOptions = [];
        const key = 'width';
        for (const practiceArea of this.practiceAreasList) {
          this.practiceAreaOptions.push({label: practiceArea, value: practiceArea});

          if (practiceArea === this.clientMatterType) {
            this.currentPracticeArea = practiceArea;
          }
        }
        if (!this.currentPracticeArea) {
          return;
        }
        if (this.currentPracticeArea.length <= 45) {
          this.dropdownWidth[key] = '325px';
        } else if (this.currentPracticeArea.length > 45 && this.currentPracticeArea.length <= 55) {
          this.dropdownWidth[key] = '425px';
        } else {
          this.dropdownWidth[key] = '525px';
        }
      },
      err => {
        this.errorMessage = err;
      }
    );
  }

  getPracticeArea(): void {
    this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(() => this.router.navigate(['/analytics-ui/practiceArea/', this.clientMatterType]));

  }

}
