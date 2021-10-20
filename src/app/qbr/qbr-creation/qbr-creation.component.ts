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
import {IReport, QbrType, IPayloadQuarterDates} from '../qbr-model';


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
  yoyStartDate: any;
  quarterStartDates: Array<number> = [];
  formattedQuarterStartDates: Array<string>;

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
    this.practiceAreaSetting = this.commonServ.getClientPASetting();
  }

  ngOnInit(): void {
    this.firstReport = this.qbrService.firstReport;
    this.yoyStartDate = this.qbrService.yoyStartDate;

    // console.log("yoyStartDate: ", this.yoyStartDate)
    // console.log("first report: ", this.firstReport, this.dateRangeReady)
    // console.log("userService: ", this.userService)
    // console.log("filterservice: ", this.filtersService)
    if (this.firstReport) {
      this.reportType = 'YoY';
    } else {
      this.reportType = 'QoQAdjacent';
    }
    if (this.yoyStartDate !== null && this.yoyStartDate !== undefined) {
      const result = this.qbrService.constructSelectableQuarterDates(this.yoyStartDate);
      this.quarterStartDates = result.monthNumbers;
      this.formattedQuarterStartDates = result.formattedQuarterDates;
      // console.log("quarterStartDates: ", this.quarterStartDates);
      // console.log("formattedQuarterStartDates: ", this.formattedQuarterStartDates);
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
  }

  // storeFilters(event): void {
  //   this.filterSet = event;
  //   console.log("this.filterSet: ", this.filterSet)
  // }
  // update the date range if the user switches QoQ type
  updateDateRange(): void {
    // console.log("updateDateRange: ", this.reportType)
    // console.log("form: ", this.dateForm)
    // console.log("comp: ", this.dateForm.controls['startDate'].value, this.reportStartDate)
    if (this.dateForm.controls.startDate.value !== null) {
      const result = this.qbrService.formatPayloadDates(this.dateForm.controls.startDate.value, QbrType[this.reportType]);
      // console.log("RESULT: ", result);
      this.reportEndDate = result.endDate;
      this.comparisonStartDate = result.comparisonStartDate;
      this.comparisonEndDate = result.comparisonEndDate;
    }
  }

  validateStartDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const checkDay = control.value;
      if (checkDay.startDate !== null && checkDay.startDate !== undefined) {
        const dayOfMonth = checkDay.startDate.getDate();
        let month = checkDay.startDate.getMonth();
        month++;
        // console.log("month: ", month)
        // console.log("check: ", !this.quarterStartDates.includes(month))
        if (dayOfMonth !== 1) {
          return {notFirstOfMonth: true};
        } else if (!this.firstReport && !this.quarterStartDates.includes(month)) {
          return {incorrectQuarter: true};
        } else {
          this.reportStartDate = checkDay.startDate;
          const result = this.qbrService.formatPayloadDates(this.reportStartDate, QbrType[this.reportType]);
          // console.log("RESULT: ", result);
          this.reportStartDate = result.startDate;
          this.reportEndDate = result.endDate;
          this.comparisonStartDate = result.comparisonStartDate;
          this.comparisonEndDate = result.comparisonEndDate;
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

  generateQBR(): void {

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
    const tempFilters = localStorage.getItem('ELEMENTS_dataFilters_' + this.userService.currentUser.id.toString());
    const tempDataFilters = JSON.parse(tempFilters);
    const strObj = JSON.stringify(tempDataFilters.dataFilters);
    const serialized = JSON.parse(strObj);
    filterParams.filters = Object.assign([], serialized);
    const params = this.filtersService.getCurrentUserCombinedFilters();
    const payload = {
      id: this.report.id,
      startDate: this.reportStartDate,
      endDate: this.reportEndDate,
      reportType: this.reportType,
      filters: filterParams,
      client: this.userService.currentUser.client_info.id,
      queryString: params
    };
    // console.log("payload: ", payload);

    this.pendingRequest = this.httpService.makePostRequest('generateClientQBR', payload).subscribe(
      (data: any) => {
        // console.log("data: ", data)
        if (data.result) {
          this.report = data.result;
        }

        this.generateQBRAndMetrics();


      },
      err => {
        // console.log("error: ", err)
        return {error: err};
      }
    );

  }

  generateQBRAndMetrics(): void {
    // console.log("generateQBRAndMetrics report check: ", this.report)
    const params = this.filtersService.getCurrentUserCombinedFilters();

    // console.log("params: ", params);

    const payload = {
      startDate: this.reportStartDate,
      endDate: this.reportEndDate,
      client: this.userService.currentUser.client_info.id,
      comparisonStartDate: this.comparisonStartDate,
      comparisonEndDate: this.comparisonEndDate,
      paSetting: this.practiceAreaSetting
    };
    // console.log("payload: ", payload);

    this.pendingRequest = this.httpService.makeGetRequest('getClientQBRData', payload).subscribe(
      (data: any) => {
        // console.log("data: ", data)
        if (data.qbr_record) {
          this.report = data.qbr_record;
        }
        if (data.result.report_timeframe_metrics) {
          this.reportData = data.result.report_timeframe_metrics;
        }
        if (data.result.comparison_timeframe_metrics) {
          this.comparisonData = data.result.comparison_timeframe_metrics;
        }

        if (data.result.report_timeframe_top_pas) {
          if (data.result.report_timeframe_top_pas.length > 0) {
            this.topPA = {
              practice_area: data.result.report_timeframe_top_pas[0].practice_area,
              total_billed: data.result.report_timeframe_top_pas[0].total_billed,
              expenses: data.result.report_timeframe_top_pas[0].total_expenses,
              associate_percent_hours_worked: data.result.report_timeframe_top_pas[0].associate_per_hrs_worked,
              partner_percent_hours_worked: data.result.report_timeframe_top_pas[0].partner_per_hrs_worked,
              avg_associate_rate: data.result.report_timeframe_top_pas[0].avg_associate_rate,
              avg_partner_rate: data.result.report_timeframe_top_pas[0].avg_partner_rate,
              avg_blended_rate: data.result.report_timeframe_top_pas[0].blended_rate,
              percent_block_billed: data.result.report_timeframe_top_pas[0].block_billed_pct,
              bodhala_price_index: data.result.report_timeframe_top_pas[0].bpi
            };

            this.topPATopFirm = {
              firm_name: data.result.report_timeframe_top_pas[0].firm_name,
              practice_area: data.result.report_timeframe_top_pas[0].practice_area,
              expenses: data.result.report_timeframe_top_pas[0].firm_expenses,
              total_billed: data.result.report_timeframe_top_pas[0].firm_total,
              associate_percent_hours_worked: data.result.report_timeframe_top_pas[0].firm_associate_per_hrs_worked,
              partner_percent_hours_worked: data.result.report_timeframe_top_pas[0].firm_partner_per_hrs_worked,
              avg_associate_rate: data.result.report_timeframe_top_pas[0].firm_avg_associate_rate,
              avg_partner_rate: data.result.report_timeframe_top_pas[0].firm_avg_partner_rate,
              avg_blended_rate: data.result.report_timeframe_top_pas[0].firm_blended_rate,
              percent_block_billed: data.result.report_timeframe_top_pas[0].firm_block_billed_pct,
              bodhala_price_index: data.result.report_timeframe_top_pas[0].firm_bpi
            };

            this.topPASecondFirm = {
              firm_name: data.result.report_timeframe_top_pas[0].second_firm_name,
              practice_area: data.result.report_timeframe_top_pas[0].practice_area,
              expenses: data.result.report_timeframe_top_pas[0].second_firm_expenses,
              total_billed: data.result.report_timeframe_top_pas[0].second_firm_total,
              associate_percent_hours_worked: data.result.report_timeframe_top_pas[0].second_firm_associate_per_hrs_worked,
              partner_percent_hours_worked: data.result.report_timeframe_top_pas[0].second_firm_partner_per_hrs_worked,
              avg_associate_rate: data.result.report_timeframe_top_pas[0].second_firm_avg_associate_rate,
              avg_partner_rate: data.result.report_timeframe_top_pas[0].second_firm_avg_partner_rate,
              avg_blended_rate: data.result.report_timeframe_top_pas[0].second_firm_blended_rate,
              percent_block_billed: data.result.report_timeframe_top_pas[0].second_firm_block_billed_pct,
              bodhala_price_index: data.result.report_timeframe_top_pas[0].second_firm_bpi
            };

            this.topPAMatter = {
              matter_name: data.result.report_timeframe_top_pas[0].matter_name,
              matter_id: data.result.report_timeframe_top_pas[0].matter_id,
              practice_area: data.result.report_timeframe_top_pas[0].practice_area,
              expenses: data.result.report_timeframe_top_pas[0].matter_expenses,
              total_billed: data.result.report_timeframe_top_pas[0].matter_total,
              associate_percent_hours_worked: data.result.report_timeframe_top_pas[0].matter_associate_per_hrs_worked,
              partner_percent_hours_worked: data.result.report_timeframe_top_pas[0].matter_partner_per_hrs_worked,
              avg_associate_rate: data.result.report_timeframe_top_pas[0].matter_avg_associate_rate,
              avg_partner_rate: data.result.report_timeframe_top_pas[0].matter_avg_partner_rate,
              avg_blended_rate: data.result.report_timeframe_top_pas[0].matter_blended_rate,
              percent_block_billed: data.result.report_timeframe_top_pas[0].matter_block_billed_pct,
              bodhala_price_index: data.result.report_timeframe_top_pas[0].matter_bpi
            };
          }

          if (this.topPA && this.topPAMatter) {
            if (this.topPA.total_billed > 0) {
              const pctOfSpend = (this.topPAMatter.total_billed / this.topPA.total_billed) * 100;
              this.topPAMatter.pct_of_total_spend = pctOfSpend;
            } else {
              this.topPAMatter.pct_of_total_spend = 0;
            }
          }

          if (data.result.report_timeframe_top_pas.length > 1) {
            this.secondPA = {
              practice_area: data.result.report_timeframe_top_pas[1].practice_area,
              total_billed: data.result.report_timeframe_top_pas[1].total_billed,
              expenses: data.result.report_timeframe_top_pas[1].total_expenses,
              associate_percent_hours_worked: data.result.report_timeframe_top_pas[1].associate_per_hrs_worked,
              partner_percent_hours_worked: data.result.report_timeframe_top_pas[1].partner_per_hrs_worked,
              avg_associate_rate: data.result.report_timeframe_top_pas[1].avg_associate_rate,
              avg_partner_rate: data.result.report_timeframe_top_pas[1].avg_partner_rate,
              avg_blended_rate: data.result.report_timeframe_top_pas[1].blended_rate,
              percent_block_billed: data.result.report_timeframe_top_pas[1].block_billed_pct,
              bodhala_price_index: data.result.report_timeframe_top_pas[1].bpi
            };

            this.secondPATopFirm = {
              firm_name: data.result.report_timeframe_top_pas[1].firm_name,
              practice_area: data.result.report_timeframe_top_pas[1].practice_area,
              expenses: data.result.report_timeframe_top_pas[1].firm_expenses,
              total_billed: data.result.report_timeframe_top_pas[1].firm_total,
              associate_percent_hours_worked: data.result.report_timeframe_top_pas[1].firm_associate_per_hrs_worked,
              avg_associate_rate: data.result.report_timeframe_top_pas[1].firm_avg_associate_rate,
              partner_percent_hours_worked: data.result.report_timeframe_top_pas[1].firm_partner_per_hrs_worked,
              avg_partner_rate: data.result.report_timeframe_top_pas[1].firm_avg_partner_rate,
              avg_blended_rate: data.result.report_timeframe_top_pas[1].firm_blended_rate,
              percent_block_billed: data.result.report_timeframe_top_pas[1].firm_block_billed_pct,
              bodhala_price_index: data.result.report_timeframe_top_pas[1].firm_bpi
            };

            this.secondPASecondFirm = {
              firm_name: data.result.report_timeframe_top_pas[1].second_firm_name,
              practice_area: data.result.report_timeframe_top_pas[1].practice_area,
              expenses: data.result.report_timeframe_top_pas[1].second_firm_expenses,
              total_billed: data.result.report_timeframe_top_pas[1].second_firm_total,
              associate_percent_hours_worked: data.result.report_timeframe_top_pas[1].second_firm_associate_per_hrs_worked,
              partner_percent_hours_worked: data.result.report_timeframe_top_pas[1].second_firm_partner_per_hrs_worked,
              avg_associate_rate: data.result.report_timeframe_top_pas[1].second_firm_avg_associate_rate,
              avg_partner_rate: data.result.report_timeframe_top_pas[1].second_firm_avg_partner_rate,
              avg_blended_rate: data.result.report_timeframe_top_pas[1].second_firm_blended_rate,
              percent_block_billed: data.result.report_timeframe_top_pas[1].second_firm_block_billed_pct,
              bodhala_price_index: data.result.report_timeframe_top_pas[1].second_firm_bpi
            };

            this.secondPAMatter = {
              matter_name: data.result.report_timeframe_top_pas[1].matter_name,
              matter_id: data.result.report_timeframe_top_pas[1].matter_id,
              practice_area: data.result.report_timeframe_top_pas[1].practice_area,
              expenses: data.result.report_timeframe_top_pas[1].matter_expenses,
              total_billed: data.result.report_timeframe_top_pas[1].matter_total,
              associate_percent_hours_worked: data.result.report_timeframe_top_pas[1].matter_associate_per_hrs_worked,
              partner_percent_hours_worked: data.result.report_timeframe_top_pas[1].matter_partner_per_hrs_worked,
              avg_associate_rate: data.result.report_timeframe_top_pas[1].matter_avg_associate_rate,
              avg_partner_rate: data.result.report_timeframe_top_pas[1].matter_avg_partner_rate,
              avg_blended_rate: data.result.report_timeframe_top_pas[1].matter_blended_rate,
              percent_block_billed: data.result.report_timeframe_top_pas[1].matter_block_billed_pct,
              bodhala_price_index: data.result.report_timeframe_top_pas[1].matter_bpi
            };

            if (this.secondPA && this.secondPAMatter) {
              if (this.secondPA.total_billed > 0) {
                const pctOfSpend = (this.secondPAMatter.total_billed / this.secondPA.total_billed) * 100;
                this.secondPAMatter.pct_of_total_spend = pctOfSpend;
              } else {
                this.secondPAMatter.pct_of_total_spend = 0;
              }
            }
          }
        }

        if (data.result.comparison_timeframe_top_pas) {
          if (data.result.comparison_timeframe_top_pas.length > 0) {
            if (data.result.comparison_timeframe_top_pas[0].practice_area === this.topPA.practice_area) {
              this.topPAComparison = {
                practice_area: data.result.comparison_timeframe_top_pas[0].practice_area,
                total_billed: data.result.comparison_timeframe_top_pas[0].total_billed,
                expenses: data.result.comparison_timeframe_top_pas[0].total_expenses,
                associate_percent_hours_worked: data.result.comparison_timeframe_top_pas[0].associate_per_hrs_worked,
                partner_percent_hours_worked: data.result.comparison_timeframe_top_pas[0].partner_per_hrs_worked,
                avg_associate_rate: data.result.comparison_timeframe_top_pas[0].avg_associate_rate,
                avg_partner_rate: data.result.comparison_timeframe_top_pas[0].avg_partner_rate,
                avg_blended_rate: data.result.comparison_timeframe_top_pas[0].blended_rate,
                percent_block_billed: data.result.comparison_timeframe_top_pas[0].block_billed_pct,
                bodhala_price_index: data.result.comparison_timeframe_top_pas[0].bpi
              };
              if (data.result.comparison_timeframe_top_pas.length > 1) {
                this.secondPAComparison = {
                  practice_area: data.result.comparison_timeframe_top_pas[1].practice_area,
                  total_billed: data.result.comparison_timeframe_top_pas[1].total_billed,
                  expenses: data.result.comparison_timeframe_top_pas[1].total_expenses,
                  associate_percent_hours_worked: data.result.comparison_timeframe_top_pas[1].associate_per_hrs_worked,
                  partner_percent_hours_worked: data.result.comparison_timeframe_top_pas[1].partner_per_hrs_worked,
                  avg_associate_rate: data.result.comparison_timeframe_top_pas[1].avg_associate_rate,
                  avg_partner_rate: data.result.comparison_timeframe_top_pas[1].avg_partner_rate,
                  avg_blended_rate: data.result.comparison_timeframe_top_pas[1].blended_rate,
                  percent_block_billed: data.result.comparison_timeframe_top_pas[1].block_billed_pct,
                  bodhala_price_index: data.result.comparison_timeframe_top_pas[1].bpi
                };
              }

            } else {
              if (data.result.comparison_timeframe_top_pas.length > 1) {
                this.topPAComparison = {
                  practice_area: data.result.comparison_timeframe_top_pas[1].practice_area,
                  total_billed: data.result.comparison_timeframe_top_pas[1].total_billed,
                  expenses: data.result.comparison_timeframe_top_pas[1].total_expenses,
                  associate_percent_hours_worked: data.result.comparison_timeframe_top_pas[1].associate_per_hrs_worked,
                  partner_percent_hours_worked: data.result.comparison_timeframe_top_pas[1].partner_per_hrs_worked,
                  avg_associate_rate: data.result.comparison_timeframe_top_pas[1].avg_associate_rate,
                  avg_partner_rate: data.result.comparison_timeframe_top_pas[1].avg_partner_rate,
                  avg_blended_rate: data.result.comparison_timeframe_top_pas[1].blended_rate,
                  percent_block_billed: data.result.comparison_timeframe_top_pas[1].block_billed_pct,
                  bodhala_price_index: data.result.comparison_timeframe_top_pas[1].bpi
                };
              }
              this.secondPAComparison = {
                practice_area: data.result.comparison_timeframe_top_pas[0].practice_area,
                total_billed: data.result.comparison_timeframe_top_pas[0].total_billed,
                expenses: data.result.comparison_timeframe_top_pas[0].total_expenses,
                associate_percent_hours_worked: data.result.comparison_timeframe_top_pas[0].associate_per_hrs_worked,
                partner_percent_hours_worked: data.result.comparison_timeframe_top_pas[0].partner_per_hrs_worked,
                avg_associate_rate: data.result.comparison_timeframe_top_pas[0].avg_associate_rate,
                avg_partner_rate: data.result.comparison_timeframe_top_pas[0].avg_partner_rate,
                avg_blended_rate: data.result.comparison_timeframe_top_pas[0].blended_rate,
                percent_block_billed: data.result.comparison_timeframe_top_pas[0].block_billed_pct,
                bodhala_price_index: data.result.comparison_timeframe_top_pas[0].bpi
              };
            }
          }
        }

        if (data.result.compare_timeframe_top_pa_matter) {
          if (data.result.compare_timeframe_top_pa_matter.length > 0) {
            this.topPAMatterComparison = {
              matter_name: data.result.compare_timeframe_top_pa_matter[0].matter_name,
              matter_id: data.result.compare_timeframe_top_pa_matter[0].matter_id,
              practice_area: data.result.compare_timeframe_top_pa_matter[0].practice_area,
              expenses: data.result.compare_timeframe_top_pa_matter[0].matter_expenses,
              total_billed: data.result.compare_timeframe_top_pa_matter[0].matter_total,
              associate_percent_hours_worked: data.result.compare_timeframe_top_pa_matter[0].matter_associate_per_hrs_worked,
              partner_percent_hours_worked: data.result.compare_timeframe_top_pa_matter[0].matter_partner_per_hrs_worked,
              avg_associate_rate: data.result.compare_timeframe_top_pa_matter[0].matter_avg_associate_rate,
              avg_partner_rate: data.result.compare_timeframe_top_pa_matter[0].matter_avg_partner_rate,
              avg_blended_rate: data.result.compare_timeframe_top_pa_matter[0].matter_blended_rate,
              percent_block_billed: data.result.compare_timeframe_top_pa_matter[0].matter_block_billed_pct,
              bodhala_price_index: data.result.compare_timeframe_top_pa_matter[0].matter_bpi
            };
          }
        }

        if (this.topPAComparison && this.topPAMatterComparison) {
          if (this.topPAComparison.total_billed > 0) {
            let pctOfSpend = 0;
            if (this.filtersService.includeExpenses) {
              pctOfSpend = ((this.topPAMatterComparison.total_billed + this.topPAMatterComparison.expenses) / (this.topPAComparison.total_billed + this.topPAComparison.expenses)) * 100;
            } else {
              pctOfSpend = (this.topPAMatterComparison.total_billed / this.topPAComparison.total_billed) * 100;
            }
            this.topPAMatterComparison.pct_of_total_spend = pctOfSpend;
          } else {
            this.topPAMatterComparison.pct_of_total_spend = 0;
          }
        }

        if (data.result.compare_timeframe_second_pa_matter) {
          if (data.result.compare_timeframe_second_pa_matter.length > 0) {
            this.secondPAMatterComparison = {
              matter_name: data.result.compare_timeframe_second_pa_matter[0].matter_name,
              matter_id: data.result.compare_timeframe_second_pa_matter[0].matter_id,
              practice_area: data.result.compare_timeframe_second_pa_matter[0].practice_area,
              expenses: data.result.compare_timeframe_second_pa_matter[0].matter_expenses,
              total_billed: data.result.compare_timeframe_second_pa_matter[0].matter_total,
              associate_percent_hours_worked: data.result.compare_timeframe_second_pa_matter[0].matter_associate_per_hrs_worked,
              partner_percent_hours_worked: data.result.compare_timeframe_second_pa_matter[0].matter_partner_per_hrs_worked,
              avg_associate_rate: data.result.compare_timeframe_second_pa_matter[0].matter_avg_associate_rate,
              avg_partner_rate: data.result.compare_timeframe_second_pa_matter[0].matter_avg_partner_rate,
              avg_blended_rate: data.result.compare_timeframe_second_pa_matter[0].matter_blended_rate,
              percent_block_billed: data.result.compare_timeframe_second_pa_matter[0].matter_block_billed_pct,
              bodhala_price_index: data.result.compare_timeframe_second_pa_matter[0].matter_bpi
            };
          }

          if (this.secondPAComparison && this.secondPAMatterComparison) {
            if (this.secondPAComparison.total_billed > 0) {
              let pctOfSpend = 0;
              if (this.filtersService.includeExpenses) {
                pctOfSpend = ((this.secondPAMatterComparison.total_billed + this.secondPAMatterComparison.expenses) / (this.secondPAComparison.total_billed + this.secondPAComparison.expenses)) * 100;
              } else {
                pctOfSpend = (this.secondPAMatterComparison.total_billed / this.secondPAComparison.total_billed) * 100;
              }
              this.secondPAMatterComparison.pct_of_total_spend = pctOfSpend;
            } else {
              this.secondPAMatterComparison.pct_of_total_spend = 0;
            }
          }
        }

        if (data.result.compare_timeframe_top_pa_firms) {
          if (data.result.compare_timeframe_top_pa_firms.length > 0) {
            this.topPATopFirmComparison = {
              firm_name: data.result.compare_timeframe_top_pa_firms[0].firm_name,
              practice_area: data.result.compare_timeframe_top_pa_firms[0].practice_area,
              expenses: data.result.compare_timeframe_top_pa_firms[0].firm_expenses,
              total_billed: data.result.compare_timeframe_top_pa_firms[0].total_billed,
              associate_percent_hours_worked: data.result.compare_timeframe_top_pa_firms[0].firm_associate_per_hrs_worked,
              partner_percent_hours_worked: data.result.compare_timeframe_top_pa_firms[0].firm_partner_per_hrs_worked,
              avg_associate_rate: data.result.compare_timeframe_top_pa_firms[0].firm_avg_associate_rate,
              avg_partner_rate: data.result.compare_timeframe_top_pa_firms[0].firm_avg_partner_rate,
              avg_blended_rate: data.result.compare_timeframe_top_pa_firms[0].firm_blended_rate,
              percent_block_billed: data.result.compare_timeframe_top_pa_firms[0].firm_block_billed_pct,
              bodhala_price_index: data.result.compare_timeframe_top_pa_firms[0].firm_bpi
            };

            this.topPASecondFirmComparison = {
              firm_name: data.result.compare_timeframe_top_pa_firms[0].second_firm_name,
              practice_area: data.result.compare_timeframe_top_pa_firms[0].practice_area,
              expenses: data.result.compare_timeframe_top_pa_firms[0].second_firm_expenses,
              total_billed: data.result.compare_timeframe_top_pa_firms[0].second_firm_total,
              associate_percent_hours_worked: data.result.compare_timeframe_top_pa_firms[0].second_firm_associate_per_hrs_worked,
              partner_percent_hours_worked: data.result.compare_timeframe_top_pa_firms[0].second_firm_partner_per_hrs_worked,
              avg_associate_rate: data.result.compare_timeframe_top_pa_firms[0].second_firm_avg_associate_rate,
              avg_partner_rate: data.result.compare_timeframe_top_pa_firms[0].second_firm_avg_partner_rate,
              avg_blended_rate: data.result.compare_timeframe_top_pa_firms[0].second_firm_blended_rate,
              percent_block_billed: data.result.compare_timeframe_top_pa_firms[0].second_firm_block_billed_pct,
              bodhala_price_index: data.result.compare_timeframe_top_pa_firms[0].second_firm_bpi
            };
          }
        }

        if (data.result.compare_timeframe_second_pa_firms) {
          if (data.result.compare_timeframe_second_pa_firms.length) {
            this.secondPATopFirmComparison = {
              firm_name: data.result.compare_timeframe_second_pa_firms[0].firm_name,
              practice_area: data.result.compare_timeframe_second_pa_firms[0].practice_area,
              expenses: data.result.compare_timeframe_second_pa_firms[0].firm_expenses,
              total_billed: data.result.compare_timeframe_second_pa_firms[0].total_billed,
              associate_percent_hours_worked: data.result.compare_timeframe_second_pa_firms[0].firm_associate_per_hrs_worked,
              partner_percent_hours_worked: data.result.compare_timeframe_second_pa_firms[0].firm_partner_per_hrs_worked,
              avg_associate_rate: data.result.compare_timeframe_second_pa_firms[0].firm_avg_associate_rate,
              avg_partner_rate: data.result.compare_timeframe_second_pa_firms[0].firm_avg_partner_rate,
              avg_blended_rate: data.result.compare_timeframe_second_pa_firms[0].firm_blended_rate,
              percent_block_billed: data.result.compare_timeframe_second_pa_firms[0].firm_block_billed_pct,
              bodhala_price_index: data.result.compare_timeframe_second_pa_firms[0].firm_bpi
            };

            this.secondPASecondFirmComparison = {
              firm_name: data.result.compare_timeframe_second_pa_firms[0].second_firm_name,
              practice_area: data.result.compare_timeframe_second_pa_firms[0].practice_area,
              expenses: data.result.compare_timeframe_second_pa_firms[0].second_firm_expenses,
              total_billed: data.result.compare_timeframe_second_pa_firms[0].second_firm_total,
              associate_percent_hours_worked: data.result.compare_timeframe_second_pa_firms[0].second_firm_associate_per_hrs_worked,
              partner_percent_hours_worked: data.result.compare_timeframe_second_pa_firms[0].second_firm_partner_per_hrs_worked,
              avg_associate_rate: data.result.compare_timeframe_second_pa_firms[0].second_firm_avg_associate_rate,
              avg_partner_rate: data.result.compare_timeframe_second_pa_firms[0].second_firm_avg_partner_rate,
              avg_blended_rate: data.result.compare_timeframe_second_pa_firms[0].second_firm_blended_rate,
              percent_block_billed: data.result.compare_timeframe_second_pa_firms[0].second_firm_block_billed_pct,
              bodhala_price_index: data.result.compare_timeframe_second_pa_firms[0].second_firm_bpi
            };
          }
        }

        // console.log("topPA: ", this.topPA);
        // console.log("topPATopFirm: ", this.topPATopFirm)
        // console.log("topPASecondFirm: ", this.topPASecondFirm)
        // console.log("topPAMatter: ", this.topPAMatter)

        // console.log("topPAComparison: ", this.topPAComparison)
        // console.log("topPATopFirmComparison: ", this.topPATopFirmComparison)
        // console.log("topPASecondFirmComparison: ", this.topPASecondFirmComparison)
        // console.log("topPAMatterComparison: ", this.topPAMatterComparison)

        // console.log("secondPA: ", this.secondPA);
        // console.log("secondPATopFirm: ", this.secondPATopFirm)
        // console.log("secondPASecondFirm: ", this.secondPASecondFirm)
        // console.log("secondPAMatter: ", this.secondPAMatter)

        // console.log("secondPAComparison: ", this.secondPAComparison)
        // console.log("secondPATopFirmComparison: ", this.secondPATopFirmComparison)
        // console.log("secondPASecondFirmComparison: ", this.secondPASecondFirmComparison)
        // console.log("secondPAMatterComparison: ", this.secondPAMatterComparison)
        // console.log("report data: ", this.reportData);
        // console.log("comparison data: ", this.comparisonData);

        this.calcluateTrendData(this.reportData, this.comparisonData, true, false);
        this.calcluateTrendData(this.topPA, this.topPAComparison, false, false);
        this.calcluateTrendData(this.topPATopFirm, this.topPATopFirmComparison, false, false);
        this.calcluateTrendData(this.topPASecondFirm, this.topPASecondFirmComparison, false, false);
        this.calcluateTrendData(this.topPAMatter, this.topPAMatterComparison, false, true);

        this.calcluateTrendData(this.secondPA, this.secondPAComparison, false, false);
        this.calcluateTrendData(this.secondPATopFirm, this.secondPATopFirmComparison, false, false);
        this.calcluateTrendData(this.secondPASecondFirm, this.secondPASecondFirmComparison, false, false);
        this.calcluateTrendData(this.secondPAMatter, this.secondPAMatterComparison, false, true);
        this.dataProcessed = true;
      },
      err => {
        return {error: err};
      }
    );
  }

  calcluateTrendData(reportTimeframeData: any, comparisonTimeframeData: any, overallNumbers: boolean, matterData: boolean): void {
    if (overallNumbers) {
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
    } else {
      if (reportTimeframeData && comparisonTimeframeData) {
        // calcluate total_billed trend
      if (this.filtersService.includeExpenses) {
        if (reportTimeframeData.total_billed > 0 && comparisonTimeframeData.total_billed && comparisonTimeframeData.total_billed > 0) {
          reportTimeframeData.total_billed_trend = (((reportTimeframeData.total_billed + reportTimeframeData.expenses) / (comparisonTimeframeData.total_billed + comparisonTimeframeData.expenses)) - 1) * 100;
        }
      } else {
        if (reportTimeframeData.total_billed > 0 && comparisonTimeframeData.total_billed && comparisonTimeframeData.total_billed > 0) {
          reportTimeframeData.total_billed_trend = ((reportTimeframeData.total_billed / comparisonTimeframeData.total_billed) - 1) * 100;
        }
      }
      }
    }

    if (reportTimeframeData && comparisonTimeframeData) {
      // calculate associate and partner avg. rate trends
      if (comparisonTimeframeData.avg_partner_rate > 0 && comparisonTimeframeData.avg_partner_rate !== null && comparisonTimeframeData.avg_partner_rate !== undefined) {
        reportTimeframeData.partner_rate_trend = ((reportTimeframeData.avg_partner_rate / comparisonTimeframeData.avg_partner_rate) - 1) * 100;
      }
      if (comparisonTimeframeData.avg_associate_rate > 0 && comparisonTimeframeData.avg_associate_rate !== null && comparisonTimeframeData.avg_associate_rate !== undefined) {
        reportTimeframeData.assoc_rate_trend = ((reportTimeframeData.avg_associate_rate / comparisonTimeframeData.avg_associate_rate) - 1) * 100;
      }

      // calculate associate and partner % of hours billed trends
      if (comparisonTimeframeData.partner_percent_hours_worked > 0 && comparisonTimeframeData.partner_percent_hours_worked !== null && comparisonTimeframeData.partner_percent_hours_worked !== undefined) {
        reportTimeframeData.partner_hrs_trend = ((reportTimeframeData.partner_percent_hours_worked / comparisonTimeframeData.partner_percent_hours_worked) - 1) * 100;
      }
      if (comparisonTimeframeData.associate_percent_hours_worked > 0 && comparisonTimeframeData.associate_percent_hours_worked !== null && comparisonTimeframeData.associate_percent_hours_worked !== undefined) {
        reportTimeframeData.assoc_hrs_trend = ((reportTimeframeData.associate_percent_hours_worked / comparisonTimeframeData.associate_percent_hours_worked) - 1) * 100;
      }

      // calculate block billing trends
      if (comparisonTimeframeData.percent_block_billed > 0 && comparisonTimeframeData.percent_block_billed !== null && comparisonTimeframeData.percent_block_billed !== undefined) {
        reportTimeframeData.bb_trend = ((reportTimeframeData.percent_block_billed / comparisonTimeframeData.percent_block_billed) - 1) * 100;
      }

      // calculate bpi trends
      if (comparisonTimeframeData.bodhala_price_index > 0 && comparisonTimeframeData.bodhala_price_index !== null && comparisonTimeframeData.bodhala_price_index !== undefined) {
        reportTimeframeData.bpi_trend = ((reportTimeframeData.bodhala_price_index / comparisonTimeframeData.bodhala_price_index) - 1) * 100;
      }

      // calculate blended rate trends
      if (comparisonTimeframeData.avg_blended_rate > 0 && comparisonTimeframeData.avg_blended_rate !== null && comparisonTimeframeData.avg_blended_rate !== undefined) {
        reportTimeframeData.blended_rate_trend = ((reportTimeframeData.avg_blended_rate / comparisonTimeframeData.avg_blended_rate) - 1) * 100;
      }

      if (matterData) {
        if (comparisonTimeframeData.pct_of_total_spend > 0 && comparisonTimeframeData.pct_of_total_spend !== null && comparisonTimeframeData.pct_of_total_spend !== undefined) {
          reportTimeframeData.pct_of_total_spend_trend = ((reportTimeframeData.pct_of_total_spend / comparisonTimeframeData.pct_of_total_spend) - 1) * 100;
        }
      }
    }

  }

  toggleExpenses(): void {
    this.filtersService.includeExpenses = !this.filtersService.includeExpenses;
    localStorage.setItem('include_expenses_' + this.userService.currentUser.id.toString(), this.filtersService.includeExpenses.toString());
  }
}
