import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
  genderChartOptions,
  IBillingTotalItem,
  IDiversityData,
  IFirm,
  minorityChartOptions,
  pieDonut
} from '../firm.model';
import {Subscription} from 'rxjs';
import {HttpService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';

@Component({
  selector: 'bd-diversity',
  templateUrl: './diversity.component.html',
  styleUrls: ['./diversity.component.scss']
})
export class DiversityComponent implements OnInit, OnDestroy {
  errorMessage: any;
  chartData: IDiversityData;
  pendingRequest: Subscription;
  optionsGender: any;
  optionsMinority: any;
  chartGender: any = {};
  chartMinority: any = {};
  loaded: boolean = false;
  @Input() firmId: number;
  constructor(private httpService: HttpService,
              public filtersService: FiltersService) { }

  ngOnInit() {
    this.optionsGender = Object.assign({},  genderChartOptions);
    this.optionsMinority = Object.assign({},  minorityChartOptions);
    console.log("optionsG: ", this.optionsGender);
    this.getDiversity();
  }
  getDiversity(): void {
    const params = this.filtersService.getCurrentUserCombinedFilters();
    const arr = [];
    arr.push(this.firmId.toString());
    params.firms = JSON.stringify(arr);
    this.pendingRequest = this.httpService.makeGetRequest('getDiversityData', params).subscribe(
      (data: any) => {
        if (!data.result || !data.result.total_lawyer_hours) {
          return;
        }
        this.chartData = this.formatDiversityData(data.result);
        this.formatChartSeries();
      },
      err => {
        this.errorMessage = err;
      }
    );
  }
  formatDiversityData(data: any): IDiversityData  {
    let females = 0;
    let males = 0;
    let femalePartnerPercent = 0;
    // tslint:disable-next-line:one-variable-per-declaration
    let ep, ea, cp, ca, minority, whites, ethnicPercent, ethnicPartnerPercent = 0;

    // gender
    males = data.male_partner_hours + data.male_associate_hours;
    females = data.female_partner_hours + data.female_associate_hours;
    femalePartnerPercent = data.female_partner_hours / data.total_lawyer_hours * 100;
    const femalePercent = females / data.total_lawyer_hours * 100;

    // ethnic
    ep = data.ethnic_partner_hours || 0;
    ea = data.ethnic_associate_hours || 0;
    minority = ep + ea;
    cp = data.non_ethnic_partner_hours || 0;
    ca = data.non_ethnic_associate_hours || 0;
    whites = cp + ca;

    ethnicPercent = minority / data.total_lawyer_hours * 100;
    ethnicPartnerPercent = ep / data.total_lawyer_hours * 100;

    return {
      percentFemale: femalePercent,
      percentFemalePartners: femalePartnerPercent,
      industryFemale: 40,
      similarFemale: 42,
      percentEthnic: ethnicPercent,
      percentEthnicPartners: ethnicPartnerPercent,
      industryEthnic: 25,
      similarEthnic: 27
    };
  }
  formatChartSeries(): void {
    const femaleData = [{
      name: 'All Female Attorneys',
      y: this.chartData.percentFemale,
      color: '#00b4ff'
    }, {
      name: 'All Male Attorneys',
      y: 100 - this.chartData.percentFemale,
      color: '#EEEEEE'
    }];

    const femalePartnersData = [{
      name: 'Female Partners',
      y: this.chartData.percentFemalePartners,
      color: '#39C558'
    }, {
      name: 'Female Non-partners',
      y: this.chartData.percentFemale - this.chartData.percentFemalePartners,
      color: '#a5c6ac'
    }, {
      name: 'Male',
      y: 100 - this.chartData.percentFemale,
      color: '#EEEEEE'
    }];

    const minorityData = [{
      name: 'Minority',
      y: this.chartData.percentEthnic,
      color: '#00b4ff'
    }, {
      name: 'Other',
      y: 100 - this.chartData.percentEthnic,
      color: '#EEEEEE'
    }];

    const minorityPartnersData = [{
      name: 'Minority Partners',
      y: this.chartData.percentEthnicPartners,
      color: '#39C558'
    }, {
      name: 'Minority Non-partners',
      y: this.chartData.percentEthnic - this.chartData.percentEthnicPartners,
      color: '#a5c6ac'
    }, {
      name: 'Other',
      y: 100 - this.chartData.percentEthnic,
      color: '#EEEEEE'
    }];
    // console.log("GBEFORE: ", this.chartGender);
    this.chartGender.series[0].setData(femaleData);
    this.chartGender.series[1].setData(femalePartnersData);
    this.chartMinority.series[0].setData(minorityData);
    this.chartMinority.series[1].setData(minorityPartnersData);
    console.log("GENDER", this.chartGender);
    console.log("GENDER OPTIONS: ", this.optionsGender);
    this.loaded = true;
  }
  saveInstanceGender(chartInstance): void {
    this.chartGender = chartInstance;
  }
  saveInstanceMinority(chartInstance): void {
    this.chartMinority = chartInstance;
  }
  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
