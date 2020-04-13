import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {
  IBillingTotalItem,
  IUTBMSData,
  IFirm,
  UTBMSChartOptions,
  taxonomyChartOptions,
  utbmsPieDonut,
  ITaxonomyData,
} from '../firm.model';
import {Subscription} from 'rxjs';
import {HttpService, UserService} from 'bodhala-ui-common';
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
  taxonomyChartData: ITaxonomyData;
  pendingRequest: Subscription;
  optionsUTBMS: any;
  optionsTaxonomy: any;
  chartUTBMS: any = {};
  chartTaxonomy: any = {};
  loaded: boolean = false;
  isCollapsed: boolean = true;
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
              public filtersService: FiltersService, 
              public userService: UserService) { }

  ngOnInit() {
    this.optionsUTBMS = Object.assign({},  UTBMSChartOptions);
    this.optionsTaxonomy = Object.assign({},  taxonomyChartOptions);
    this.getUTBMS();
  }

  colorLuminance(hex, lum): string {

    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
      hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;
  
    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i*2,2), 16);
      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
      rgb += ("00"+c).substr(c.length);
    }
  
    return rgb;
  }

    getUTBMS(): void {
    let params = this.filtersService.getCurrentUserCombinedFilters();
    let arr = [];
    arr.push(this.firmId.toString());
    params.firms = JSON.stringify(arr);
    this.pendingRequest = this.httpService.makeGetRequest('getSpendByUtbmsCodes', params).subscribe(
      (data: any) => {
        
        if (!data.result) {
          return;
        }
        this.chartData = this.formatUTBMSData(data.result);
      },
      err => {
        this.errorMessage = err;
      }
    );

    arr = [];
    arr.push(params.clientId.toString());
    params.clientId = JSON.stringify(arr);
    this.pendingRequest = this.httpService.makeGetRequest('getPhaseTaxonomySpend', params).subscribe(
      async (data: any) => {
        if (!data.result) {
          return;
        }
        this.taxonomyChartData = this.formatTaxonomyData(data.result);
        if (this.chartData != undefined && this.taxonomyChartData != undefined) {
          this.formatChartSeries();
        }
        
      },
      err => {
        this.errorMessage = err;
      }
    );
  }

  formatUTBMSData(data: any): IUTBMSData {
  // async formatUTBMSData(data: any): Promise<any> {
    let taskdata = [];
    let activitydata = [];
    let spend = data;
    
    spend.sort((a, b): number => {
      if (a.total_billed < b.total_billed) return 1;
      if (a.total_billed > b.total_billed) return -1;
      return 0;
    });

    spend.forEach(element => {
      if(element.total_billed > 0) {
        let name = element.description + " (" + element.code + ")";
        let color = this.utbmsColors[element.code];
        let obj = {};
        obj = {"codegroup": true, "description": element.description, "name": name, "y": element.total_hours, "total_billed": element.total_billed, "color": color};
        taskdata.push(obj);

        element.subcodes.sort((a, b): number => {
          if (a.total_billed < b.total_billed) return 1;
          if (a.total_billed > b.total_billed) return -1;
          return 0;
        });
        let new_color = this.colorLuminance(color, .15);

        element.subcodes.forEach(sc => {
            let name = sc.description + " (" + sc.code + ")";
            let obj = {};
            obj = {"code": sc.code, "name": name, "y": sc.total_hours, "total_billed": sc.total_billed, "color": new_color};
            activitydata.push(obj);
        });

    }
    });

    return {
      activitydata: activitydata,
      taskdata: taskdata
    };
  }

  formatTaxonomyData(data: any): ITaxonomyData {
    let phasedata = [];
    let subphasedata = [];
    let spend = data;

    function getPhase(point){
      for (var i = 0; i < phasedata.length; i++) {
        if (phasedata[i].code == point.bh_phase)
            return phasedata[i];
    }
      var obj = {"codegroup": true, "code": point.bh_phase, "description": point.phase_description, "name": point.phase_description + " (" + point.bh_phase + ")", "y": 0, "total_billed": 0, "subcodes": []};
      phasedata.push(obj);
      return obj;
    }

    function getSubPhase(obj, point){
      for (var i = 0; i < obj.subcodes.length; i++) {
          if (obj.subcodes[i].code == point.bh_sub_phase)
              return obj.subcodes[i];
      }

      var name = ""
      if(point.sub_phase_description){
        name = point.sub_phase_description + " (" + point.bh_sub_phase + ")";
      } else {
        name = point.bh_sub_phase;
      }

      var sc = {"codegroup": false, "code": point.bh_sub_phase, "description": point.sub_phase_description, "name": name, "y": 0, "total_billed": 0};

      obj.subcodes.push(sc);
      return sc;
  }

  data.forEach(element => {
    let phase = getPhase(element);
    phase.y = phase.y + element.total_hours;
    phase.total_billed = phase.total_billed + element.total_billed;
    if(!phase.color){
      phase.color = this.utbmsColors[element.bh_phase];
    }

    let subphase = getSubPhase(phase, element);
    subphase.y = subphase.y + element.total_hours;
    subphase.total_billed = subphase.total_billed + element.total_billed;
    if(!subphase.color){
      subphase.color = this.colorLuminance(phase.color, .15);
    }
  })

  phasedata.sort((a, b): number => {
    if (a.total_billed < b.total_billed) return 1;
    if (a.total_billed > b.total_billed) return -1;
    return 0;
  });

  phasedata.forEach(sub => {
    sub.subcodes.sort((a, b): number => {
      if (a.total_billed < b.total_billed) return 1;
      if (a.total_billed > b.total_billed) return -1;
      return 0;
    });
    sub.subcodes.forEach(sc => {
      subphasedata.push(sc);
    })
  })
    
    return {
      phasedata: phasedata,
      subphasedata: subphasedata
    };
  }

  formatChartSeries(): void {
    if (this.userService.hasEntitlement('analytics.utbms.codes')) {
      this.chartUTBMS.series[0].setData(this.chartData.taskdata);
      this.chartUTBMS.series[1].setData(this.chartData.activitydata);
    }
    if (this.userService.hasEntitlement('analytics.phase.taxonomy')) {
      this.chartTaxonomy.series[0].setData(this.taxonomyChartData.phasedata);
      this.chartTaxonomy.series[1].setData(this.taxonomyChartData.subphasedata); 
    }

      this.loaded = true;
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
