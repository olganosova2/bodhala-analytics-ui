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
import {SelectItemGroup} from 'primeng/api';

@Component({
  selector: 'bd-practice-area-dropdown',
  templateUrl: './practice-area-dropdown.component.html',
  styleUrls: ['./practice-area-dropdown.component.scss']
})
export class PracticeAreaDropdownComponent implements OnInit {
  practiceAreasList: any;
  bodhalaPracticeAreas: any;
  clientPracticeAreas: any;
  @Input() practiceAreaSetting: string;
  @Input() clientMatterType: string;
  pendingRequest: Subscription;
  errorMessage: any;
  practiceAreaOptions: SelectItem[];
  practiceAreaGroupOptions: SelectItemGroup[];
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
        this.practiceAreasList = [];

        this.bodhalaPracticeAreas = data.result.bodhala;
        this.clientPracticeAreas = data.result.clients;

        if (this.practiceAreaSetting === 'Client Practice Areas' || this.practiceAreaSetting === undefined || this.practiceAreaSetting === null) {
          this.practiceAreasList = this.clientPracticeAreas;
        } else if (this.practiceAreaSetting === 'Bodhala Practice Areas') {

          const newList = [];
          for (let practiceArea of this.bodhalaPracticeAreas) {
            practiceArea = practiceArea + ' - Bodhala';
            newList.push(practiceArea);
          }
          this.practiceAreasList = newList;

        } else if (this.practiceAreaSetting === 'Both') {
          this.practiceAreaGroupOptions = [];
          this.practiceAreaGroupOptions = [
            {
              label: 'Bodhala Practice Areas',
              items: []
            },
            {
              label: 'Client Practice Areas',
              items: []
            }
          ];

          for (const group of this.practiceAreaGroupOptions) {
            if (group.label === 'Bodhala Practice Areas') {
              for (const practiceArea of this.bodhalaPracticeAreas) {
                group.items.push({label: practiceArea + ' - Bodhala', value: practiceArea + ' - Bodhala'});
                if (practiceArea === this.clientMatterType) {
                  this.currentPracticeArea = practiceArea + ' - Bodhala';
                }
              }
            }
            else if (group.label === 'Client Practice Areas') {
              for (const practiceArea of this.clientPracticeAreas) {
                group.items.push({label: practiceArea, value: practiceArea});
                if (practiceArea === this.clientMatterType) {
                  this.currentPracticeArea = practiceArea;
                }
              }
            }
          }
        }

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
