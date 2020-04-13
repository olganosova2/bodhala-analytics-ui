import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {
  IBillingTotalItem,
  IUTBMSData,
  IFirm,
  UTBMSChartOptions,
  taxonomyChartOptions,
  pieDonut
} from '../firm.model';
import {Subscription} from 'rxjs';
import {HttpService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import { registerLocaleData } from '@angular/common';
import { ɵAnimationGroupPlayer } from '@angular/animations';


@Component({
  selector: 'bd-utbms',
  templateUrl: './utbms.component.html',
  styleUrls: ['./utbms.component.scss']
})
export class UtbmsComponent implements OnInit {
  errorMessage: any;
  chartData: IUTBMSData;
  pendingRequest: Subscription;
  optionsUTBMS: any;
  optionsTaxonomy: any;
  chartUTBMS: any = {};
  chartTaxonomy: any = {};
  @Input() firmId: number;

  utbmsColors = {
    'L100': '#7cb5ec',
    'L200': '#434348',
    'L300': '#90ed7d',
    'L400': '#f7a35c',
    'L500': '#8085e9',
    'L600': '#f15c80',
    'E100': '#e4d354'

};

  constructor(private httpService: HttpService,
              public filtersService: FiltersService) { }

  ngOnInit() {
    this.optionsUTBMS = Object.assign({},  UTBMSChartOptions);
    this.optionsTaxonomy = Object.assign({},  taxonomyChartOptions);
    console.log("options: ", this.optionsUTBMS);
    this.getUTBMS();
    // this.getPhaseTaxonomy();
  }

  getUTBMS(): void {
    const params = this.filtersService.getCurrentUserCombinedFilters();
    const arr = [];
    console.log("PARAMS: ", params);
    arr.push(this.firmId.toString());
    params.firms = JSON.stringify(arr);
    this.pendingRequest = this.httpService.makeGetRequest('getSpendByUtbmsCodes', params).subscribe(
      (data: any) => {
        
        if (!data.result) {
          return;
        }
        this.chartData = this.formatUTBMSData(data.result);
        this.formatChartSeries();
      },
      err => {
        this.errorMessage = err;
      }
    );
  }

  // getPhaseTaxonomy(): void {
  //   const params = this.filtersService.getCurrentUserCombinedFilters();
  //   const arr = [];
  //   arr.push(params.clientId.toString());
  //   params.clientId = JSON.stringify(arr);
  //   this.pendingRequest = this.httpService.makeGetRequest('getPhaseTaxonomySpend', params).subscribe(
  //     (data: any) => {
  //       console.log("DATA: ", data);
  //       if (!data.result) {
  //         return;
  //       }
  //       this.chartData = this.formatTaxonomyData(data.result);
  //       this.formatChartSeries();
  //     },
  //     err => {
  //       this.errorMessage = err;
  //     }
  //   );
  // }

  formatUTBMSData(data: any): IUTBMSData {

    let taskdatautbms = [];
    let activitydatautbms = [];


    let spend = data;

    spend.forEach(element => {

      if(element.total_billed > 0) {

        let name = element.description + " (" + element.code + ")";
        let color = this.utbmsColors[element.code];
        let obj = {};
        obj = {"codegroup": true, "description": element.description, "name": name, "y": element.total_hours, "total_billed": element.total_billed, "color": color};
        taskdatautbms.push(obj);

        // task.subcodes = $filter('orderBy')(task.subcodes, 'total_billed', true);
        element.subcodes.forEach(sc => {
            let name = sc.description + " (" + sc.code + ")";
            let obj = {};
            obj = {"code": sc.code, "name": name, "y": sc.total_hours, "total_billed": sc.total_billed};
            activitydatautbms.push(obj);
        });

    }
    });

    return {
      activitydatautbms: activitydatautbms,
      taskdatautbms: taskdatautbms
      // code: " ",
      // description: "descriptive",
      // subcodes: ["1", "2"],
      // total_billed: 17,
      // total_hours: 2
    };
  }

  formatTaxonomyData(data: any): void {

  }

  formatChartSeries(): void {
    const UTBMSData = [
      {
          name: 'Task',
          data: this.chartData.taskdatautbms,
          size: '60%'
      }, {
          name: 'Activity',
          data: this.chartData.activitydatautbms,
          size: '70%',
          innerSize: '60%',
          dataLabels: {
              enabled: false
          }
      }];
    console.log("BEFORE: ", this.chartUTBMS);
    this.chartUTBMS.series[0].setData(UTBMSData);
    this.chartUTBMS.series[1].setData(UTBMSData);
    console.log("UTBMS: ", this.chartUTBMS);
    console.log("UTBMS OPTIONS: ", this.optionsUTBMS);
  }

  saveInstanceUTBMS(chartInstance): void {
    this.chartUTBMS = chartInstance;
  }
  saveInstanceTaxonomy(chartInstance): void {
    this.chartTaxonomy = chartInstance;
  }
  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }
}
