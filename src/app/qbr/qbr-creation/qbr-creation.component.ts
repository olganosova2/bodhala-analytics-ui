import { Component, OnInit } from '@angular/core';
import {CommonService, IClient} from '../../shared/services/common.service';
import {FiltersService} from '../../shared/services/filters.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, ConfirmModalComponent, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import {confirmDialogConfig} from '../../shared/services/config';
import {FormGroup, Validators, FormControl, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import {QbrService} from '../qbr.service';
import {IReport} from '../qbr.model';


@Component({
  selector: 'bd-qbr-creation',
  templateUrl: './qbr-creation.component.html',
  styleUrls: ['./qbr-creation.component.scss']
})
export class QbrCreationComponent implements OnInit {
  pendingRequest: Subscription;
  firstReport: boolean = false;
  dateForm = new FormGroup({});
  metricsForm = new FormGroup({});
  excludeFilters = ['dates'];
  reportType: string;
  qoqReportType: string;
  reportStartDate;
  reportEndDate = null;
  comparisonStartDate = null;
  comparisonEndDate = null;
  reportData: any = null;
  comparisonData: any = null;
  dateRangeReady: boolean = false;
  filterSet = null;
  report: IReport = null;
  dataProcessed: boolean = false;
  practiceAreaSetting: string;

  topPA: any;
  topPATopFirm: any;
  topPASecondFirm: any;
  topPAMatter: any;
  secondPA: any;
  secondPATopFirm: any;
  secondPASecondFirm: any;
  secondPAMatter: any;

  topPAComparison: any;
  topPATopFirmComparison: any;
  topPASecondFirmComparison: any;
  topPAMatterComparison: any;
  secondPAComparison: any;
  secondPATopFirmComparison: any;
  secondPASecondFirmComparison: any;
  secondPAMatterComparison: any;

  paCompDataAvailable: boolean = false;




  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public userService: UserService,
              public filtersService: FiltersService,
              public commonServ: CommonService,
              public utilService: UtilService,
              public datepipe: DatePipe,
              private qbrService: QbrService) {
    this.commonServ.pageTitle = 'Create QBR';
    this.commonServ.pageSubtitle = this.userService.currentUser.client_info.org.name;
  }

  ngOnInit(): void {
    this.firstReport = this.qbrService.firstReport;
    // console.log("first report: ", this.firstReport, this.dateRangeReady)
    // console.log("userService: ", this.userService)
    // console.log("filterservice: ", this.filtersService)
    if (this.firstReport) {
      this.reportType = 'YoY';
    } else {
      this.reportType = 'QoQ';
    }
    this.dateForm.addControl('startDate', new FormControl(null, Validators.required));
    this.dateForm.validator =  this.validateStartDate();
    this.metricsForm.addControl('partner_hourly_cost', new FormControl(true, Validators.required));
    this.metricsForm.addControl('associate_hourly_cost', new FormControl(true, Validators.required));
    this.metricsForm.addControl('total_spend', new FormControl(true, Validators.required));
    this.metricsForm.addControl('partner_hours_percent', new FormControl(true, Validators.required));
    this.metricsForm.addControl('associate_hours_percent', new FormControl(true, Validators.required));
    this.metricsForm.addControl('block_billing_percent', new FormControl(true, Validators.required));
    this.metricsForm.addControl('blended_rate', new FormControl(false, Validators.required));
    this.metricsForm.addControl('bodhala_price_index', new FormControl(false, Validators.required));
    this.metricsForm.validator = this.validateMetricSelection();
    if (this.userService.config !== undefined) {
      if ('analytics.practice.bodhala.areas' in this.userService.config) {
        const userConfigs = Object.values(this.userService.config);
        for (const config of userConfigs) {
          if (config.configs[0].description === 'config for analytics practice areas') {
            this.practiceAreaSetting = config.configs[0].value;
            break;
          }
        }
      }
    }
  }

  storeFilters(event): void {
    this.filterSet = event;
    // console.log("this.filterSet: ", this.filterSet)
  }

  validateStartDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const checkDay = control.value;
      if (checkDay.startDate !== null && checkDay.startDate !== undefined) {
        const dayOfMonth = checkDay.startDate.getDate();
        if (dayOfMonth !== 1) {
          return {notFirstOfMonth: true};
        } else {
          this.reportStartDate = checkDay.startDate;
          if (this.firstReport) {
            this.reportEndDate = new Date(this.reportStartDate.getFullYear(), this.reportStartDate.getMonth(), this.reportStartDate.getDate());
            this.reportEndDate.setFullYear(this.reportStartDate.getFullYear() + 1);
            this.reportEndDate.setDate(this.reportStartDate.getDate() - 1);
            this.comparisonStartDate = new Date(this.reportStartDate.getFullYear(), this.reportStartDate.getMonth(), this.reportStartDate.getDate());
            this.comparisonStartDate.setFullYear(this.reportStartDate.getFullYear() - 1);
            this.comparisonStartDate.setDate(this.reportStartDate.getDate());
            this.comparisonEndDate = new Date(this.reportStartDate.getFullYear(), this.reportStartDate.getMonth(), this.reportStartDate.getDate());
            this.comparisonEndDate.setFullYear(this.reportStartDate.getFullYear());
            this.comparisonEndDate.setDate(this.reportStartDate.getDate() - 1);
          } else {
            // for QoQ reports

          }
        }
      }
      this.dateRangeReady = true;
      return null;
    };
  }

  validateMetricSelection(): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors | null => {
      let checked = 0;
      Object.keys(formGroup.controls).forEach(key => {
        const control = formGroup.controls[key];
        if (control.value === true) {
          checked++;
        }
      });
      // make this an entity_config checkl at some point
      if (checked < 6 || checked > 6) {
        return {notEnoughSelected: true};
      }
      return null;
    };
  }

  generateMetrics(): void {
    if (this.report === null) {
      this.report = {
        id: null,
        bh_client_id: null,
        filters: null,
        chosen_metrics: null,
        report_type: this.reportType,
        status: null,
        title: null
      };
    }
    const filterParams = {
      name: 'filters',
      filters: null
    };
    const strObj = JSON.stringify(this.filterSet);
    const serialized = JSON.parse(strObj);
    filterParams.filters = Object.assign([], serialized);
    // const tempFilters = localStorage.getItem('ELEMENTS_dataFilters_' + this.userService.currentUser.id.toString());
    // const tempFiltersDict = JSON.parse(tempFilters);
    // const filterString = tempFiltersDict.querystring;
    const params = this.filtersService.getCurrentUserCombinedFilters();

    const payload = {
      id: this.report.id,
      startDate: this.reportStartDate,
      endDate: this.reportEndDate,
      reportType: this.reportType,
      filters: filterParams,
      client: this.userService.currentUser.client_info.id,
      comparisonStartDate: this.comparisonStartDate,
      comparisonEndDate: this.comparisonEndDate,
      paSetting: this.practiceAreaSetting,
      queryString: params
    };
    // console.log("payload: ", payload);
    // console.log("filterParams: ", filterParams);

    this.pendingRequest = this.httpService.makePostRequest('generateClientQBR', payload).subscribe(
      (data: any) => {
        // console.log("data: ", data)
        if (data.qbr_record) {
          this.report = data.qbr_record;
        }
        // console.log("report: ", this.report);
        if (data.result.report_timeframe_metrics) {
          this.reportData = data.result.report_timeframe_metrics;
        }
        if (data.result.comparison_timeframe_metrics) {
          this.comparisonData = data.result.comparison_timeframe_metrics;
        }

        if (data.result.report_timeframe_top_pas) {
          this.topPA = {
            practice_area: data.result.report_timeframe_top_pas[0].practice_area,
            total_billed: data.result.report_timeframe_top_pas[0].total_billed,
            total_expenses: data.result.report_timeframe_top_pas[0].total_expenses,
            total_associate_billed: data.result.report_timeframe_top_pas[0].total_associate_billed,
            total_associate_hours: data.result.report_timeframe_top_pas[0].total_associate_hours,
            total_associate_writeoff: data.result.report_timeframe_top_pas[0].total_associate_writeoff,
            total_associate_writeoff_hours: data.result.report_timeframe_top_pas[0].total_associate_writeoff_hours,
            total_partner_billed: data.result.report_timeframe_top_pas[0].total_partner_billed,
            total_partner_hours: data.result.report_timeframe_top_pas[0].total_partner_hours,
            total_partner_writeoff: data.result.report_timeframe_top_pas[0].total_partner_writeoff,
            total_partner_writeoff_hours: data.result.report_timeframe_top_pas[0].total_partner_writeoff_hours,
            total_hours: data.result.report_timeframe_top_pas[0].total_hours
          };

          this.topPATopFirm = {
            firm_name: data.result.report_timeframe_top_pas[0].firm_name,
            practice_area: data.result.report_timeframe_top_pas[0].practice_area,
            total_billed: Number(data.result.report_timeframe_top_pas[0].firm_total),
            total_expenses: data.result.report_timeframe_top_pas[0].firm_expenses,
            total_associate_billed: data.result.report_timeframe_top_pas[0].firm_associate_billed,
            total_associate_hours: data.result.report_timeframe_top_pas[0].firm_associate_hours,
            total_associate_writeoff: data.result.report_timeframe_top_pas[0].firm_associate_writeoff,
            total_associate_writeoff_hours: data.result.report_timeframe_top_pas[0].firm_associate_writeoff_hours,
            total_partner_billed: data.result.report_timeframe_top_pas[0].firm_partner_billed,
            total_partner_hours: data.result.report_timeframe_top_pas[0].firm_partner_hours,
            total_partner_writeoff: data.result.report_timeframe_top_pas[0].firm_partner_writeoff,
            total_partner_writeoff_hours: data.result.report_timeframe_top_pas[0].firm_partner_writeoff_hours,
            total_hours: data.result.report_timeframe_top_pas[0].firm_hours
          };

          this.topPASecondFirm = {
            firm_name: data.result.report_timeframe_top_pas[0].second_firm_name,
            practice_area: data.result.report_timeframe_top_pas[0].practice_area,
            total_billed: Number(data.result.report_timeframe_top_pas[0].second_firm_total),
            total_expenses: data.result.report_timeframe_top_pas[0].second_firm_expenses,
            total_associate_billed: data.result.report_timeframe_top_pas[0].second_firm_associate_billed,
            total_associate_hours: data.result.report_timeframe_top_pas[0].second_firm_associate_hours,
            total_associate_writeoff: data.result.report_timeframe_top_pas[0].second_firm_associate_writeoff,
            total_associate_writeoff_hours: data.result.report_timeframe_top_pas[0].second_firm_associate_writeoff_hours,
            total_partner_billed: data.result.report_timeframe_top_pas[0].second_firm_partner_billed,
            total_partner_hours: data.result.report_timeframe_top_pas[0].second_firm_partner_hours,
            total_partner_writeoff: data.result.report_timeframe_top_pas[0].second_firm_partner_writeoff,
            total_partner_writeoff_hours: data.result.report_timeframe_top_pas[0].second_firm_partner_writeoff_hours,
            total_hours: data.result.report_timeframe_top_pas[0].second_firm_hours
          };

          this.topPAMatter = {
            matter_name: data.result.report_timeframe_top_pas[0].matter_name,
            matter_id: data.result.report_timeframe_top_pas[0].matter_id,
            practice_area: data.result.report_timeframe_top_pas[0].practice_area,
            total_billed: Number(data.result.report_timeframe_top_pas[0].matter_total),
            total_expenses: data.result.report_timeframe_top_pas[0].matter_expenses,
            total_associate_billed: data.result.report_timeframe_top_pas[0].matter_associate_billed,
            total_associate_hours: data.result.report_timeframe_top_pas[0].matter_associate_hours,
            total_associate_writeoff: data.result.report_timeframe_top_pas[0].matter_associate_writeoff,
            total_associate_writeoff_hours: data.result.report_timeframe_top_pas[0].matter_associate_writeoff_hours,
            total_partner_billed: data.result.report_timeframe_top_pas[0].matter_partner_billed,
            total_partner_hours: data.result.report_timeframe_top_pas[0].matter_partner_hours,
            total_partner_writeoff: data.result.report_timeframe_top_pas[0].matter_partner_writeoff,
            total_partner_writeoff_hours: data.result.report_timeframe_top_pas[0].matter_partner_writeoff_hours,
            total_hours: data.result.report_timeframe_top_pas[0].matter_hours
          };

          if (data.result.report_timeframe_top_pas.length > 1) {
            this.secondPA = {
              practice_area: data.result.report_timeframe_top_pas[1].practice_area,
              total_billed: data.result.report_timeframe_top_pas[1].total_billed,
              total_expenses: data.result.report_timeframe_top_pas[1].total_expenses,
              total_associate_billed: data.result.report_timeframe_top_pas[1].total_associate_billed,
              total_associate_hours: data.result.report_timeframe_top_pas[1].total_associate_hours,
              total_associate_writeoff: data.result.report_timeframe_top_pas[1].total_associate_writeoff,
              total_associate_writeoff_hours: data.result.report_timeframe_top_pas[1].total_associate_writeoff_hours,
              total_partner_billed: data.result.report_timeframe_top_pas[1].total_partner_billed,
              total_partner_hours: data.result.report_timeframe_top_pas[1].total_partner_hours,
              total_partner_writeoff: data.result.report_timeframe_top_pas[1].total_partner_writeoff,
              total_partner_writeoff_hours: data.result.report_timeframe_top_pas[1].total_partner_writeoff_hours,
              total_hours: data.result.report_timeframe_top_pas[1].total_hours
            };

            this.secondPATopFirm = {
              firm_name: data.result.report_timeframe_top_pas[1].firm_name,
              practice_area: data.result.report_timeframe_top_pas[1].practice_area,
              total_billed: Number(data.result.report_timeframe_top_pas[1].firm_total),
              total_expenses: data.result.report_timeframe_top_pas[1].firm_expenses,
              total_associate_billed: data.result.report_timeframe_top_pas[1].firm_associate_billed,
              total_associate_hours: data.result.report_timeframe_top_pas[1].firm_associate_hours,
              total_associate_writeoff: data.result.report_timeframe_top_pas[1].firm_associate_writeoff,
              total_associate_writeoff_hours: data.result.report_timeframe_top_pas[1].firm_associate_writeoff_hours,
              total_partner_billed: data.result.report_timeframe_top_pas[1].firm_partner_billed,
              total_partner_hours: data.result.report_timeframe_top_pas[1].firm_partner_hours,
              total_partner_writeoff: data.result.report_timeframe_top_pas[1].firm_partner_writeoff,
              total_partner_writeoff_hours: data.result.report_timeframe_top_pas[1].firm_partner_writeoff_hours,
              total_hours: data.result.report_timeframe_top_pas[1].firm_hours
            };

            this.secondPASecondFirm = {
              firm_name: data.result.report_timeframe_top_pas[1].second_firm_name,
              practice_area: data.result.report_timeframe_top_pas[1].practice_area,
              total_billed: Number(data.result.report_timeframe_top_pas[1].second_firm_total),
              total_expenses: data.result.report_timeframe_top_pas[1].second_firm_expenses,
              total_associate_billed: data.result.report_timeframe_top_pas[1].second_firm_associate_billed,
              total_associate_hours: data.result.report_timeframe_top_pas[1].second_firm_associate_hours,
              total_associate_writeoff: data.result.report_timeframe_top_pas[1].second_firm_associate_writeoff,
              total_associate_writeoff_hours: data.result.report_timeframe_top_pas[1].second_firm_associate_writeoff_hours,
              total_partner_billed: data.result.report_timeframe_top_pas[1].second_firm_partner_billed,
              total_partner_hours: data.result.report_timeframe_top_pas[1].second_firm_partner_hours,
              total_partner_writeoff: data.result.report_timeframe_top_pas[1].second_firm_partner_writeoff,
              total_partner_writeoff_hours: data.result.report_timeframe_top_pas[1].second_firm_partner_writeoff_hours,
              total_hours: data.result.report_timeframe_top_pas[1].second_firm_hours
            };

            this.secondPAMatter = {
              matter_name: data.result.report_timeframe_top_pas[1].matter_name,
              matter_id: data.result.report_timeframe_top_pas[1].matter_id,
              practice_area: data.result.report_timeframe_top_pas[1].practice_area,
              total_billed: Number(data.result.report_timeframe_top_pas[1].matter_total),
              total_expenses: data.result.report_timeframe_top_pas[1].matter_expenses,
              total_associate_billed: data.result.report_timeframe_top_pas[1].matter_associate_billed,
              total_associate_hours: data.result.report_timeframe_top_pas[1].matter_associate_hours,
              total_associate_writeoff: data.result.report_timeframe_top_pas[1].matter_associate_writeoff,
              total_associate_writeoff_hours: data.result.report_timeframe_top_pas[1].matter_associate_writeoff_hours,
              total_partner_billed: data.result.report_timeframe_top_pas[1].matter_partner_billed,
              total_partner_hours: data.result.report_timeframe_top_pas[1].matter_partner_hours,
              total_partner_writeoff: data.result.report_timeframe_top_pas[1].matter_partner_writeoff,
              total_partner_writeoff_hours: data.result.report_timeframe_top_pas[1].matter_partner_writeoff_hours,
              total_hours: data.result.report_timeframe_top_pas[1].matter_hours
            };
          }
        }

        if (data.result.comparison_timeframe_top_pas) {
          if (data.result.comparison_timeframe_top_pas[0].practice_area === this.topPA.practice_area) {
            this.topPAComparison = {
              practice_area: data.result.comparison_timeframe_top_pas[0].practice_area,
              total_billed: data.result.comparison_timeframe_top_pas[0].total_billed,
              total_expenses: data.result.comparison_timeframe_top_pas[0].total_expenses,
              total_associate_billed: data.result.comparison_timeframe_top_pas[0].total_associate_billed,
              total_associate_hours: data.result.comparison_timeframe_top_pas[0].total_associate_hours,
              total_associate_writeoff: data.result.comparison_timeframe_top_pas[0].total_associate_writeoff,
              total_associate_writeoff_hours: data.result.comparison_timeframe_top_pas[0].total_associate_writeoff_hours,
              total_partner_billed: data.result.comparison_timeframe_top_pas[0].total_partner_billed,
              total_partner_hours: data.result.comparison_timeframe_top_pas[0].total_partner_hours,
              total_partner_writeoff: data.result.comparison_timeframe_top_pas[0].total_partner_writeoff,
              total_partner_writeoff_hours: data.result.comparison_timeframe_top_pas[0].total_partner_writeoff_hours,
              total_hours: data.result.comparison_timeframe_top_pas[0].total_hours
            };
            if (data.result.comparison_timeframe_top_pas.length > 1) {
              this.secondPAComparison = {
                practice_area: data.result.comparison_timeframe_top_pas[1].practice_area,
                total_billed: data.result.comparison_timeframe_top_pas[1].total_billed,
                total_expenses: data.result.comparison_timeframe_top_pas[1].total_expenses,
                total_associate_billed: data.result.comparison_timeframe_top_pas[1].total_associate_billed,
                total_associate_hours: data.result.comparison_timeframe_top_pas[1].total_associate_hours,
                total_associate_writeoff: data.result.comparison_timeframe_top_pas[1].total_associate_writeoff,
                total_associate_writeoff_hours: data.result.comparison_timeframe_top_pas[1].total_associate_writeoff_hours,
                total_partner_billed: data.result.comparison_timeframe_top_pas[1].total_partner_billed,
                total_partner_hours: data.result.comparison_timeframe_top_pas[1].total_partner_hours,
                total_partner_writeoff: data.result.comparison_timeframe_top_pas[1].total_partner_writeoff,
                total_partner_writeoff_hours: data.result.comparison_timeframe_top_pas[1].total_partner_writeoff_hours,
                total_hours: data.result.comparison_timeframe_top_pas[1].total_hours
              };
            }

          } else {
            this.topPAComparison = {
              practice_area: data.result.comparison_timeframe_top_pas[1].practice_area,
              total_billed: data.result.comparison_timeframe_top_pas[1].total_billed,
              total_expenses: data.result.comparison_timeframe_top_pas[1].total_expenses,
              total_associate_billed: data.result.comparison_timeframe_top_pas[1].total_associate_billed,
              total_associate_hours: data.result.comparison_timeframe_top_pas[1].total_associate_hours,
              total_associate_writeoff: data.result.comparison_timeframe_top_pas[1].total_associate_writeoff,
              total_associate_writeoff_hours: data.result.comparison_timeframe_top_pas[1].total_associate_writeoff_hours,
              total_partner_billed: data.result.comparison_timeframe_top_pas[1].total_partner_billed,
              total_partner_hours: data.result.comparison_timeframe_top_pas[1].total_partner_hours,
              total_partner_writeoff: data.result.comparison_timeframe_top_pas[1].total_partner_writeoff,
              total_partner_writeoff_hours: data.result.comparison_timeframe_top_pas[1].total_partner_writeoff_hours,
              total_hours: data.result.comparison_timeframe_top_pas[1].total_hours
            };
            if (data.result.comparison_timeframe_top_pas.length > 1) {
              this.secondPAComparison = {
                practice_area: data.result.comparison_timeframe_top_pas[0].practice_area,
                total_billed: data.result.comparison_timeframe_top_pas[0].total_billed,
                total_expenses: data.result.comparison_timeframe_top_pas[0].total_expenses,
                total_associate_billed: data.result.comparison_timeframe_top_pas[0].total_associate_billed,
                total_associate_hours: data.result.comparison_timeframe_top_pas[0].total_associate_hours,
                total_associate_writeoff: data.result.comparison_timeframe_top_pas[0].total_associate_writeoff,
                total_associate_writeoff_hours: data.result.comparison_timeframe_top_pas[0].total_associate_writeoff_hours,
                total_partner_billed: data.result.comparison_timeframe_top_pas[0].total_partner_billed,
                total_partner_hours: data.result.comparison_timeframe_top_pas[0].total_partner_hours,
                total_partner_writeoff: data.result.comparison_timeframe_top_pas[0].total_partner_writeoff,
                total_partner_writeoff_hours: data.result.comparison_timeframe_top_pas[0].total_partner_writeoff_hours,
                total_hours: data.result.comparison_timeframe_top_pas[0].total_hours
              };
            }
          }
        }

        if (data.result.compare_timeframe_top_pa_matter) {
          this.topPAMatterComparison = {
            matter_name: data.result.compare_timeframe_top_pa_matter[0].matter_name,
            matter_id: data.result.compare_timeframe_top_pa_matter[0].matter_id,
            practice_area: data.result.compare_timeframe_top_pa_matter[0].practice_area,
            total_billed: Number(data.result.compare_timeframe_top_pa_matter[0].matter_total),
            total_expenses: data.result.compare_timeframe_top_pa_matter[0].matter_expenses,
            total_associate_billed: data.result.compare_timeframe_top_pa_matter[0].matter_associate_billed,
            total_associate_hours: data.result.compare_timeframe_top_pa_matter[0].matter_associate_hours,
            total_associate_writeoff: data.result.compare_timeframe_top_pa_matter[0].matter_associate_writeoff,
            total_associate_writeoff_hours: data.result.compare_timeframe_top_pa_matter[0].matter_associate_writeoff_hours,
            total_partner_billed: data.result.compare_timeframe_top_pa_matter[0].matter_partner_billed,
            total_partner_hours: data.result.compare_timeframe_top_pa_matter[0].matter_partner_hours,
            total_partner_writeoff: data.result.compare_timeframe_top_pa_matter[0].matter_partner_writeoff,
            total_partner_writeoff_hours: data.result.compare_timeframe_top_pa_matter[0].matter_partner_writeoff_hours,
            total_hours: data.result.compare_timeframe_top_pa_matter[0].matter_hours
          };
        }

        if (data.result.compare_timeframe_second_pa_matter) {
          this.secondPAMatterComparison = {
            matter_name: data.result.compare_timeframe_second_pa_matter[0].matter_name,
            matter_id: data.result.compare_timeframe_second_pa_matter[0].matter_id,
            practice_area: data.result.compare_timeframe_second_pa_matter[0].practice_area,
            total_billed: Number(data.result.compare_timeframe_second_pa_matter[0].matter_total),
            total_expenses: data.result.compare_timeframe_second_pa_matter[0].matter_expenses,
            total_associate_billed: data.result.compare_timeframe_second_pa_matter[0].matter_associate_billed,
            total_associate_hours: data.result.compare_timeframe_second_pa_matter[0].matter_associate_hours,
            total_associate_writeoff: data.result.compare_timeframe_second_pa_matter[0].matter_associate_writeoff,
            total_associate_writeoff_hours: data.result.compare_timeframe_second_pa_matter[0].matter_associate_writeoff_hours,
            total_partner_billed: data.result.compare_timeframe_second_pa_matter[0].matter_partner_billed,
            total_partner_hours: data.result.compare_timeframe_second_pa_matter[0].matter_partner_hours,
            total_partner_writeoff: data.result.compare_timeframe_second_pa_matter[0].matter_partner_writeoff,
            total_partner_writeoff_hours: data.result.compare_timeframe_second_pa_matter[0].matter_partner_writeoff_hours,
            total_hours: data.result.compare_timeframe_second_pa_matter[0].matter_hours
          };
        }

        if (data.result.compare_timeframe_top_pa_firms) {
          this.topPATopFirmComparison = {
            firm_name: data.result.compare_timeframe_top_pa_firms[0].firm_name,
            practice_area: data.result.compare_timeframe_top_pa_firms[0].practice_area,
            total_billed: Number(data.result.compare_timeframe_top_pa_firms[0].firm_total),
            total_expenses: data.result.compare_timeframe_top_pa_firms[0].firm_expenses,
            total_associate_billed: data.result.compare_timeframe_top_pa_firms[0].firm_associate_billed,
            total_associate_hours: data.result.compare_timeframe_top_pa_firms[0].firm_associate_hours,
            total_associate_writeoff: data.result.compare_timeframe_top_pa_firms[0].firm_associate_writeoff,
            total_associate_writeoff_hours: data.result.compare_timeframe_top_pa_firms[0].firm_associate_writeoff_hours,
            total_partner_billed: data.result.compare_timeframe_top_pa_firms[0].firm_partner_billed,
            total_partner_hours: data.result.compare_timeframe_top_pa_firms[0].firm_partner_hours,
            total_partner_writeoff: data.result.compare_timeframe_top_pa_firms[0].firm_partner_writeoff,
            total_partner_writeoff_hours: data.result.compare_timeframe_top_pa_firms[0].firm_partner_writeoff_hours,
            total_hours: data.result.compare_timeframe_top_pa_firms[0].firm_hours
          };

          this.topPASecondFirmComparison = {
            firm_name: data.result.compare_timeframe_top_pa_firms[0].second_firm_name,
            practice_area: data.result.compare_timeframe_top_pa_firms[0].practice_area,
            total_billed: Number(data.result.compare_timeframe_top_pa_firms[0].second_firm_total),
            total_expenses: data.result.compare_timeframe_top_pa_firms[0].second_firm_expenses,
            total_associate_billed: data.result.compare_timeframe_top_pa_firms[0].second_firm_associate_billed,
            total_associate_hours: data.result.compare_timeframe_top_pa_firms[0].second_firm_associate_hours,
            total_associate_writeoff: data.result.compare_timeframe_top_pa_firms[0].second_firm_associate_writeoff,
            total_associate_writeoff_hours: data.result.compare_timeframe_top_pa_firms[0].second_firm_associate_writeoff_hours,
            total_partner_billed: data.result.compare_timeframe_top_pa_firms[0].second_firm_partner_billed,
            total_partner_hours: data.result.compare_timeframe_top_pa_firms[0].second_firm_partner_hours,
            total_partner_writeoff: data.result.compare_timeframe_top_pa_firms[0].second_firm_partner_writeoff,
            total_partner_writeoff_hours: data.result.compare_timeframe_top_pa_firms[0].second_firm_partner_writeoff_hours,
            total_hours: data.result.compare_timeframe_top_pa_firms[0].second_firm_hours
          };
        }

        if (data.result.compare_timeframe_second_pa_firms) {
          this.secondPATopFirmComparison = {
            firm_name: data.result.compare_timeframe_second_pa_firms[0].firm_name,
            practice_area: data.result.compare_timeframe_second_pa_firms[0].practice_area,
            total_billed: Number(data.result.compare_timeframe_second_pa_firms[0].firm_total),
            total_expenses: data.result.compare_timeframe_second_pa_firms[0].firm_expenses,
            total_associate_billed: data.result.compare_timeframe_second_pa_firms[0].firm_associate_billed,
            total_associate_hours: data.result.compare_timeframe_second_pa_firms[0].firm_associate_hours,
            total_associate_writeoff: data.result.compare_timeframe_second_pa_firms[0].firm_associate_writeoff,
            total_associate_writeoff_hours: data.result.compare_timeframe_second_pa_firms[0].firm_associate_writeoff_hours,
            total_partner_billed: data.result.compare_timeframe_second_pa_firms[0].firm_partner_billed,
            total_partner_hours: data.result.compare_timeframe_second_pa_firms[0].firm_partner_hours,
            total_partner_writeoff: data.result.compare_timeframe_second_pa_firms[0].firm_partner_writeoff,
            total_partner_writeoff_hours: data.result.compare_timeframe_second_pa_firms[0].firm_partner_writeoff_hours,
            total_hours: data.result.compare_timeframe_second_pa_firms[0].firm_hours
          };

          this.secondPASecondFirmComparison = {
            firm_name: data.result.compare_timeframe_second_pa_firms[0].second_firm_name,
            practice_area: data.result.compare_timeframe_second_pa_firms[0].practice_area,
            total_billed: Number(data.result.compare_timeframe_second_pa_firms[0].second_firm_total),
            total_expenses: data.result.compare_timeframe_second_pa_firms[0].second_firm_expenses,
            total_associate_billed: data.result.compare_timeframe_second_pa_firms[0].second_firm_associate_billed,
            total_associate_hours: data.result.compare_timeframe_second_pa_firms[0].second_firm_associate_hours,
            total_associate_writeoff: data.result.compare_timeframe_second_pa_firms[0].second_firm_associate_writeoff,
            total_associate_writeoff_hours: data.result.compare_timeframe_second_pa_firms[0].second_firm_associate_writeoff_hours,
            total_partner_billed: data.result.compare_timeframe_second_pa_firms[0].second_firm_partner_billed,
            total_partner_hours: data.result.compare_timeframe_second_pa_firms[0].second_firm_partner_hours,
            total_partner_writeoff: data.result.compare_timeframe_second_pa_firms[0].second_firm_partner_writeoff,
            total_partner_writeoff_hours: data.result.compare_timeframe_second_pa_firms[0].second_firm_partner_writeoff_hours,
            total_hours: data.result.compare_timeframe_second_pa_firms[0].second_firm_hours
          };
        }

        // console.log("topPA: ", this.topPA);
        // console.log("topPATopFirm: ", this.topPATopFirm)
        // console.log("topPASecondFirm: ", this.topPASecondFirm)
        // console.log("topPAMatter: ", this.topPAMatter)

        // console.log("topPAComparison: ", this.topPAComparison)
        // console.log("topPATopFirmComparison: ", this.topPATopFirmComparison)
        // console.log("topPASecondFirm: ", this.topPASecondFirmComparison)
        // console.log("topPASecondFirmComparison: ", this.topPAMatterComparison)

        // console.log("secondPA: ", this.secondPA);
        // console.log("topPATopFirm: ", this.secondPATopFirm)
        // console.log("topPASecondFirm: ", this.secondPASecondFirm)
        // console.log("topPAMatter: ", this.secondPAMatter)

        // console.log("secondPAComparison: ", this.secondPAComparison)
        // console.log("secondPATopFirmComparison: ", this.secondPATopFirmComparison)
        // console.log("secondPASecondFirmComparison: ", this.secondPASecondFirmComparison)
        // console.log("secondPAMatterComparison: ", this.secondPAMatterComparison)


        this.processData();
      }
    );
  }

  processData(): void {
    // console.log("report data: ", this.reportData);
    // console.log("comparison data: ", this.comparisonData);
    // this.reportData.partner_percent_hrs_worked;
    if (this.reportData.total_hours > 0) {
      this.reportData.partner_percent_hours_worked = (this.reportData.total_partner_hours / this.reportData.total_hours) * 100;
      this.reportData.associate_percent_hours_worked = (this.reportData.total_associate_hours / this.reportData.total_hours) * 100;
    } else {
      this.reportData.partner_percent_hours_worked = 0;
      this.reportData.associate_percent_hours_worked = 0;
    }
    if (this.comparisonData.total_hours > 0) {
      this.comparisonData.partner_percent_hours_worked = (this.comparisonData.total_partner_hours / this.comparisonData.total_hours) * 100;
      this.comparisonData.associate_percent_hours_worked = (this.comparisonData.total_associate_hours / this.comparisonData.total_hours) * 100;
    } else {
      this.comparisonData.partner_percent_hours_worked = 0;
      this.comparisonData.associate_percent_hours_worked = 0;
    }

    // calculate total spend diff and trend
    if (this.filtersService.includeExpenses) {
      if (this.reportData.total_spend_including_expenses.total > 0 && this.comparisonData.total_spend_including_expenses.total && this.comparisonData.total_spend_including_expenses.total > 0) {
        this.reportData.total_spend_trend = ((this.reportData.total_spend_including_expenses.total / this.comparisonData.total_spend_including_expenses.total) - 1) * 100;
        this.reportData.total_spend_diff = this.reportData.total_spend_including_expenses.total - this.comparisonData.total_spend_including_expenses.total;
      }
    } else {
      if (this.comparisonData.total_spend.total > 0 && this.comparisonData.total_spend.total !== null && this.comparisonData.total_spend.total !== undefined) {
        this.reportData.total_spend_trend = ((this.reportData.total_spend.total / this.comparisonData.total_spend.total) - 1) * 100;
        this.reportData.total_spend_diff = this.reportData.total_spend.total - this.comparisonData.total_spend.total;
      }
    }

    // calculate associate and partner avg. rate trends
    if (this.comparisonData.avg_partner_rate > 0 && this.comparisonData.avg_partner_rate !== null && this.comparisonData.avg_partner_rate !== undefined) {
      this.reportData.partner_rate_trend = ((this.reportData.avg_partner_rate / this.comparisonData.avg_partner_rate) - 1) * 100;
    }
    if (this.comparisonData.avg_associate_rate > 0 && this.comparisonData.avg_associate_rate !== null && this.comparisonData.avg_associate_rate !== undefined) {
      this.reportData.assoc_rate_trend = ((this.reportData.avg_associate_rate / this.comparisonData.avg_associate_rate) - 1) * 100;
    }

    // calculate associate and partner % of hours billed trends
    if (this.comparisonData.partner_percent_hours_worked > 0 && this.comparisonData.partner_percent_hours_worked !== null && this.comparisonData.partner_percent_hours_worked !== undefined) {
      this.reportData.partner_hrs_trend = ((this.reportData.partner_percent_hours_worked / this.comparisonData.partner_percent_hours_worked) - 1) * 100;
    }
    if (this.comparisonData.associate_percent_hours_worked > 0 && this.comparisonData.associate_percent_hours_worked !== null && this.comparisonData.associate_percent_hours_worked !== undefined) {
      this.reportData.assoc_hrs_trend = ((this.reportData.associate_percent_hours_worked / this.comparisonData.associate_percent_hours_worked) - 1) * 100;
    }

    // calculate block billing trends
    if (this.comparisonData.percent_block_billed > 0 && this.comparisonData.percent_block_billed !== null && this.comparisonData.percent_block_billed !== undefined) {
      this.reportData.bb_trend = ((this.reportData.percent_block_billed / this.comparisonData.percent_block_billed) - 1) * 100;
    }

    // calculate bpi trends
    if (this.comparisonData.bodhala_price_index > 0 && this.comparisonData.bodhala_price_index !== null && this.comparisonData.bodhala_price_index !== undefined) {
      this.reportData.bpi_trend = ((this.reportData.bodhala_price_index / this.comparisonData.bodhala_price_index) - 1) * 100;
    }

    // calculate blended rate trends
    if (this.comparisonData.avg_blended_rate > 0 && this.comparisonData.avg_blended_rate !== null && this.comparisonData.avg_blended_rate !== undefined) {
      this.reportData.blended_rate_trend = ((this.reportData.avg_blended_rate / this.comparisonData.avg_blended_rate) - 1) * 100;
    }
    this.dataProcessed = true;
  }

  toggleExpenses(): void {
    this.filtersService.includeExpenses = !this.filtersService.includeExpenses;
    localStorage.setItem('include_expenses_' + this.userService.currentUser.id.toString(), this.filtersService.includeExpenses.toString());
  }
}
