import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonService} from '../../../shared/services/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, GenericConfirmModalComponent, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {AgGridService} from 'bodhala-ui-elements';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {SelectItem, SelectItemGroup} from 'primeng/api';
import {AddEditRecommendationComponent} from './add-edit-recommendation/add-edit-recommendation.component';
import {confirmDialogConfig} from '../../../shared/services/config';
import { IRecommendationReport } from '../client-recommendations-model';
import { RecommendationService } from '../recommendation.service';

@Component({
  selector: 'bd-create-client-recommendations',
  templateUrl: './create-client-recommendations.component.html',
  styleUrls: ['./create-client-recommendations.component.scss']
})
export class CreateClientRecommendationsComponent implements OnInit {
  pendingRequest: Subscription;
  selectedClientId: number;
  selectedOrgId: number;
  reportId: number;
  title: string;
  newReport: IRecommendationReport;
  recommendationTypes: SelectItem[];
  firmOptions: SelectItem[];
  paOptions: SelectItem[];
  paGroupOptions: SelectItemGroup[];
  clientPracticeAreaSetting: string;
  validSave: boolean = false;
  editMode: boolean = false;
  step = 0;
  @ViewChild(AddEditRecommendationComponent) createRecComp: AddEditRecommendationComponent;

  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public userService: UserService,
              public commonServ: CommonService,
              public utilService: UtilService,
              public dialog: MatDialog,
              public agGridService: AgGridService,
              public recommendationService: RecommendationService)
  {
    this.route.paramMap.subscribe(params => {
      this.selectedClientId = Number(params.get('clientId'));
    });
    this.route.queryParams.subscribe(params => {
      this.selectedOrgId = Number(params.orgId);
      this.reportId = Number(params.reportId);
    });
    if (!isNaN(this.reportId)) {
      this.editMode = true;
      this.commonServ.pageTitle = 'Edit Client Recommendation';
    } else {
      this.commonServ.pageTitle = 'Create Client Recommendation';
    }
    this.recommendationTypes = [];
    this.firmOptions = [];
    this.paOptions = [];
  }

  async ngOnInit(): Promise<void> {
    this.clientPracticeAreaSetting = await this.recommendationService.getOrgPracticeAreaSetting(this.selectedOrgId);
    await this.getClientPracticeAreas();
    this.recommendationTypes = await this.recommendationService.getRecommendationTypes();
    this.firmOptions = await this.recommendationService.getFirms(this.selectedClientId);

    if (!this.editMode) {
      this.newReport = this.constructNewReport();
    } else {
      this.newReport = await this.recommendationService.getReport(this.reportId);
      for (const rec of this.newReport.recommendations) {
        const selectedType = this.recommendationTypes.filter(type => type.value === rec.type_id);
        if (selectedType.length > 0) {
          rec.selected_type = selectedType[0].label;
        }
      }
    }
  }

  constructNewReport(): IRecommendationReport {
    return {
      id: null,
      title: '',
      published: false,
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

  async getClientPracticeAreas(): Promise<void> {
    const params = {clientId: this.selectedClientId};
    this.pendingRequest = this.httpService.makeGetRequest('getPracticeAreaListByClientAdmin', params).subscribe(
      (data: any) => {
        if (!data.result) {
          return;
        }

        let practiceAreasList = [];

        const bodhalaPracticeAreas = data.result.bodhala;
        const clientPracticeAreas = data.result.clients;

        if (this.clientPracticeAreaSetting === 'Client Practice Areas' || this.clientPracticeAreaSetting === undefined || this.clientPracticeAreaSetting === null) {
          practiceAreasList = clientPracticeAreas;
          practiceAreasList.sort();
        } else if (this.clientPracticeAreaSetting === 'Smart Practice Areas') {
          bodhalaPracticeAreas.sort();
          const newList = [];
          for (const practiceArea of bodhalaPracticeAreas) {
            // practiceArea = practiceArea + ' - [Smart]';
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
      }
    );
  }

  save(): void {
    const payload = this.newReport;
    this.pendingRequest = this.httpService.makePostRequest('saveRecommendationReport', payload).subscribe(
      (data: any) => {
        this.newReport = data.result;
        if (this.newReport) {
          this.router.navigate(['/analytics-ui/admin/client-recommendations/view/', this.newReport.id], {queryParams: {
            clientId: this.selectedClientId,
            orgId: this.selectedOrgId
          }});
        }
      }
    );
  }

  addRec(): void {
    const newRec = {
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
      recommended_discount_pct_lower_range: null,
      recommended_discount_pct_upper_range: null,
      current_discount_pct: null,
      spend_increase_pct: null,
      rate_increase_pct: null,
      desired_rate_increase_pct: null,
      previous_firm_ids: [],
      recommended_firm_ids: [],
      previous_firm_names: [],
      recommended_firm_names: [],
      desired_partner_pct_of_hours_worked: null,
      desired_associate_pct_of_hours_worked: null,
      desired_paralegal_pct_of_hours_worked: null,
      desired_block_billing_pct: null,
      created_on: null,
      created_by: null,
      modified_on: null,
      modified_by: null,
      deleted_on: null,
      deleted_by: null,
      selected_type: null,
      firm_name: null
    };
    this.newReport.recommendations.push(newRec);
    this.updateSave('INVALID');
    this.setStep(this.newReport.recommendations.length - 1);
  }

  updateSave(event: any): void {
    if (this.newReport.recommendations.length > 0) {
      const recommendationsWithoutType = this.newReport.recommendations.filter(rec => rec.type_id === null);

      if (event === 'VALID' && recommendationsWithoutType.length === 0) {
        this.validSave = true;
      } else {
        this.validSave = false;
      }
    } else {
      this.validSave = false;
    }
  }

  openModal(): void {
    let modalText = '';
    let modalTitle = '';
    if (this.newReport.id) {
      modalTitle = 'Confirm Report Update';
      if (this.newReport.published) {
        modalText = 'Update report, ' + this.newReport.title + '? Because this is a published report, the updates will be immediately visible by the client.';
      } else {
        modalText = 'Update report, ' + this.newReport.title + '? This report is not currently viewable by the client. You must publish the report for the client to view the updates.';
      }
    } else {
      modalTitle = 'Confirm Report Creation';
      modalText = 'Create report, ' + this.newReport.title + '? The report will only be visible to clients after publishing.';
    }
    const modalConfig = {...confirmDialogConfig, data: {title: modalTitle, text: modalText}};

    const dialogRef = this.dialog.open(GenericConfirmModalComponent, {...modalConfig, disableClose: false });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.save();
      }
    });
  }

  setStep(index: number): void {
    this.step = index;
  }

  nextStep(): void {
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }

}
