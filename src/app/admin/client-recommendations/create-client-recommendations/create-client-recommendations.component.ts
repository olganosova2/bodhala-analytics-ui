import {Component, Input, OnInit} from '@angular/core';
import {CommonService, IClient, IRecommendationReport, IRecommendation} from '../../../shared/services/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, ConfirmModalComponent, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {AgGridService} from 'bodhala-ui-elements';
import {Subscription} from 'rxjs';
import * as config from '../../../shared/services/config';
import {MatDialog} from '@angular/material/dialog';
import {FRESH_DESK_ARTICLES} from '../../../shared/services/config';
import {SelectItem, SelectItemGroup} from 'primeng/api';

@Component({
  selector: 'bd-create-client-recommendations',
  templateUrl: './create-client-recommendations.component.html',
  styleUrls: ['./create-client-recommendations.component.scss']
})
export class CreateClientRecommendationsComponent implements OnInit {
  pendingRequest: Subscription;
  errorMessage: any;
  selectedClientId: number;
  title: string;
  newReport: IRecommendationReport;
  recommendationTypes: SelectItem[];
  firmOptions: SelectItem[];
  paOptions: SelectItem[];
  paGroupOptions: SelectItemGroup[];
  clientPracticeAreaSetting: string;
  validSave: boolean = false;

  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public userService: UserService,
              public commonServ: CommonService,
              public utilService: UtilService,
              public dialog: MatDialog,
              public agGridService: AgGridService) {
    this.commonServ.pageTitle = 'Create Client Recommendation';
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.selectedClientId = Number(params.get('clientId'));
    });
    if (this.userService.config !== undefined) {
      if ('analytics.practice.bodhala.areas' in this.userService.config) {
        const userConfigs = Object.values(this.userService.config);
        for (const config of userConfigs) {
          if (config.configs[0].description === 'config for analytics practice areas') {
            this.clientPracticeAreaSetting = config.configs[0].value;
            break;
          }
        }
      }
    }
    this.newReport = this.constructNewReport();
    console.log("neReport", this.newReport);
    this.recommendationTypes = [];
    this.firmOptions = [];
    this.paOptions = [];
    this.getRecommendationTypes();
    this.getClientFirms();
    this.getClientPracticeAreas();
  }

  constructNewReport(): IRecommendationReport {
    return {
      id: null,
      title: '',
      bh_client_id: this.selectedClientId,
      recommendations: [],
      created_on: '',
      created_by: '',
      modified_on: null,
      modified_by: null,
      deleted_on: null,
      deleted_by: null
    };
  }

  getRecommendationTypes(): void {
    this.pendingRequest = this.httpService.makeGetRequest('getRecommendationTypes').subscribe(
      (data: any) => {

        if (data.result) {
          for (let res of data.result) {
            this.recommendationTypes.push({label: res.name, value: res.id})

          }
        }
      },
      err => {
        this.errorMessage = err;
      }
    );
  }

  getClientFirms(): void {
    const params = {clientId: this.selectedClientId};

    this.pendingRequest = this.httpService.makeGetRequest('getAnalyticsFirmsByClient', params).subscribe(
      (data: any) => {
        if (!data.result) {
          return;
        }
        this.firmOptions = [];
        for (const firm of data.result) {
          this.firmOptions.push({label: firm.law_firm_name, value: firm.id});
        }
      },
      err => {
        this.errorMessage = err;
      }
    );
  }

  getClientPracticeAreas(): void {
    const params = {clientId: this.selectedClientId};
    this.pendingRequest = this.httpService.makeGetRequest('getPracticeAreaListByClientAdmin', params).subscribe(
      (data: any) => {
        if (!data.result) {
          return;
        }

        let practiceAreasList = [];

        let bodhalaPracticeAreas = data.result.bodhala;
        let clientPracticeAreas = data.result.clients;

        if (this.clientPracticeAreaSetting === 'Client Practice Areas' || this.clientPracticeAreaSetting === undefined || this.clientPracticeAreaSetting === null) {
          practiceAreasList = clientPracticeAreas;
          practiceAreasList.sort();
        } else if (this.clientPracticeAreaSetting === 'Smart Practice Areas') {
          bodhalaPracticeAreas.sort();
          const newList = [];
          for (let practiceArea of bodhalaPracticeAreas) {
            practiceArea = practiceArea + ' - [Smart]';
            newList.push(practiceArea);
          }
          practiceAreasList = newList;

        } else if (this.clientPracticeAreaSetting === 'Both') {
          this.paGroupOptions = [];
          this.paGroupOptions = [
            {
              label: 'Smart Practice Areas',
              items: []
            },
            {
              label: 'Client Practice Areas',
              items: []
            }
          ];
          for (const group of this.paGroupOptions) {
            if (group.label === 'Smart Practice Areas') {
              for (const practiceArea of bodhalaPracticeAreas) {
                group.items.push({label: practiceArea + ' - [Smart]', value: practiceArea + ' - [Smart]'});
              }
            }
            else if (group.label === 'Client Practice Areas') {
              for (const practiceArea of clientPracticeAreas) {
                group.items.push({label: practiceArea, value: practiceArea});
              }
            }
          }
        }

        for (const practiceArea of practiceAreasList) {
          this.paOptions.push({label: practiceArea, value: practiceArea});
        }
      },
      err => {
        this.errorMessage = err;
      }
    );
  }

  save(): void {
    const payload = this.newReport;
    console.log("saving: ", payload);
    this.pendingRequest = this.httpService.makePostRequest('saveRecommendationReport', payload).subscribe(
      (data: any) => {
        console.log("data: ", data);
        this.newReport = data.result;
        console.log("newReport: ", this.newReport);


      },
      err => {
        this.errorMessage = err;
      }
    );
  }

  addRec(): void {
    let newRec = {
      id: null,
      report_id: null,
      type_id: null,
      bh_lawfirm_id: null,
      comment: null,
      title: null,
      year: null,
      practice_area: null,
      is_smart_practice_area: null,
      discount_type: null,
      recommended_discount_pct: null,
      current_discount_pct: null,
      spend_increase_pct: null,
      rate_increase_pct: null,
      desired_rate_increase_pct: null,
      previous_firm_ids: [],
      recommended_firm_ids: [],
      desired_partner_pct_of_hours_worked: null,
      desired_associate_pct_of_hours_worked: null,
      desired_paralegal_pct_of_hours_worked: null,
      desired_block_billing_pct: null,
      created_on: null,
      created_by: null,
      modified_on: null,
      modified_by: null,
      deleted_on: null,
      deleted_by: null
    };
    this.newReport.recommendations.push(newRec);


  }

  updateSave(event: any): void {
    if (this.newReport.recommendations.length > 0) {
      const recommendationsWithoutType = this.newReport.recommendations.filter(rec => rec.type_id === null);
      if (recommendationsWithoutType.length == 0) {
        this.validSave = true;
      } else {
        this.validSave = false;
      }
      console.log("recommendationsWithoutType: ", recommendationsWithoutType);
    } else {
      this.validSave = false;
    }

    console.log("reportInParent: ", this.newReport);
    console.log("Valid?: ", this.validSave)

  }

}
