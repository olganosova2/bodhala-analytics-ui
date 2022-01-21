import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'bodhala-ui-common';
import { Subscription } from 'rxjs';
import {IRateBenchmark, smartPracticeAreas, peerFirmMapping} from '../../../rates-analysis/rates-analysis.model';
import {SelectItem, SelectItemGroup} from 'primeng/api';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';


@Component({
  selector: 'bd-add-rate-benchmark',
  templateUrl: './add-rate-benchmark.component.html',
  styleUrls: ['./add-rate-benchmark.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class AddRateBenchmarkComponent implements OnInit {

  pendingRequest: Subscription;
  pendingRequestConfigName: Subscription;
  errorMessage: any;
  rateBenchmark: IRateBenchmark;
  possibleValues: Array<string> = [];
  allBenchmarks: Array<IRateBenchmark> = [];
  distinctNames: Array<string> = [];
  filteredNames: Array<string> = [];
  filteredValues: Array<string> = [];
  inProgress: boolean = false;
  formInvalid: boolean = false;
  firmOptions: SelectItemGroup[] = [];
  smartPAOptions: SelectItem[] = smartPracticeAreas;
  allFirmsCluster: Array<any>;
  yearOptions: SelectItem[] = [];
  peerFirms: Array<string>;

  benchmarkForm = new FormGroup({
    firm: new FormControl(null, [
      Validators.required
    ]),
    smartPracticeArea: new FormControl(null, [
      Validators.required
    ]),
    year: new FormControl(null, [
      Validators.required
    ])
  });

  constructor(public dialogRef: MatDialogRef<AddRateBenchmarkComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private httpService: HttpService) {
  }

  async ngOnInit(): Promise<void> {
    this.rateBenchmark = Object.assign({}, this.data.config);
    this.allBenchmarks = this.data.records || [];
    console.log("this.data: ", this.data)
    console.log("allBenchmarks: ", this.allBenchmarks)
    const d = new Date();
    for (let i = 0; i < 5; i++) {
      let newYear = d.getFullYear();
      newYear -= i;
      this.yearOptions.push({label: newYear.toString(), value: newYear});
    }
    this.firmOptions = await this.getFirms();
    console.log("yearOptions: ", this.yearOptions)
    console.log("firmOptions: ", this.firmOptions)
  }

  getFirms(): Promise<any>  {
    const params = {clientId: this.rateBenchmark.bh_client_id};
    console.log("params: ", params);
    return new Promise((resolve, reject) => {
      return this.httpService.makeGetRequest('getFirmsByClientCluster', params).subscribe(
        (data: any) => {
          if (!data.result) {
            return;
          }
          console.log("data: ", data);
          const firmOptions = [];
          for (const firm of data.result) {
            firmOptions.push({label: firm.law_firm_name, value: firm.id});
          }
          const firmClusterOptions = [];
          const peerFirmClusterOptions = [];
          if (data.result && data.cluster_res) {
            this.allFirmsCluster = data.cluster_res;
            const firmOptions = data.result;
            const clusterFirmOptions = data.cluster_res;
            // think of a way to make the limit dynamic
            for (let i = 1; i < 8; i++) {
              const cluster = firmOptions.filter(f => f.cluster === i);
              const clusterFirms = [];
              if (cluster) {
                for (const firm of cluster) {
                  clusterFirms.push({label: firm.law_firm_name, value: firm.firm_id})
                }
              }
              firmClusterOptions.push({label: 'Cluster ' + i.toString(), items: clusterFirms});
            }
          }
          resolve(firmClusterOptions);
        },
        err => {
          return {error: err};
        }
      );
    });
  }

  firmSelected($evt): void {
    console.log("firmSelected: ", $evt)
  }

  validateForm(): boolean {
    const isValid = true;
    // if (!this.config.name) {
    //   return false;
    // }
    // if (!this.config.json_config_parsed) {
    //   this.config.json_config = null;
    //   return true;
    // }
    // try {
    //   this.config.json_config = JSON.parse(this.config.json_config_parsed);
    // } catch (e) {
    //   return false;
    // }
    return isValid;
  }

  saveBenchmark(): void {
    this.formInvalid = this.checkDuplicates();
    if (this.formInvalid) {
      return;
    }
    this.rateBenchmark.bh_lawfirm_id = this.benchmarkForm.value.firm;
    this.rateBenchmark.smart_practice_area = this.benchmarkForm.value.smartPracticeArea;
    this.rateBenchmark.year = this.benchmarkForm.value.year;
    this.rateBenchmark.peers = ['Jones Day', 'Kirkland & Ellis'];
    this.errorMessage = null;
    this.inProgress = true;
    const params = Object.assign({}, this.rateBenchmark);
    console.log("rateBenchmark: ", this.rateBenchmark)
    this.pendingRequest = this.httpService.makePostRequest('saveRateBenchmark', params).subscribe(
      (data: any) => {
        console.log("data: ", data);
        const savedBenchmark = data.result;
        if (savedBenchmark) {
          this.inProgress = false;
          this.dialogRef.close(savedBenchmark);
        }
        if (data.error) {
          this.errorMessage = data.error;
        }
      }
    );
  }

  checkDuplicates(): boolean {
    let isDupe = false;
    let benchmarks = [];
    if (this.benchmarkForm.value.firm && this.benchmarkForm.value.smartPracticeArea && this.benchmarkForm.value.year) {
      benchmarks = this.allBenchmarks.filter(b => b.bh_lawfirm_id === this.benchmarkForm.value.firm && b.smart_practice_area === this.benchmarkForm.value.smartPracticeArea && b.year === this.benchmarkForm.value.year) || [];
    }
    if (benchmarks.length > 0) {
      isDupe = true;
    }
    return isDupe;
  }



  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
    if (this.pendingRequestConfigName) {
      this.pendingRequestConfigName.unsubscribe();
    }
  }

}
