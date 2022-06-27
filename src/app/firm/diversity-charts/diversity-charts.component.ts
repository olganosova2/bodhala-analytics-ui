import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from 'bodhala-ui-elements';
import {Subscription} from 'rxjs';
import {ChartType, diversityChartOptions, IDiversityData, TkChartType} from './model';
import {AgGridService} from 'bodhala-ui-elements';
import {CommonService} from '../../shared/services/common.service';


@Component({
  selector: 'bd-diversity-charts',
  templateUrl: './diversity-charts.component.html',
  styleUrls: ['./diversity-charts.component.scss']
})
export class DiversityChartsComponent implements OnInit {
  pendingRequest: Subscription;
  filtersChanged: boolean = false;
  matterId: string;
  @Input() firmId: number;
  chartType: ChartType = ChartType.Hours;
  tkChartType: TkChartType = TkChartType.All;
  isOverview: boolean = true;
  genderData: Array<IDiversityData> = [];
  ethnicityData: Array<IDiversityData> = [];
  chartGender: any = {};
  chartMinority: any = {};
  // @ts-ignore
  genderChartOptions: Highcharts.Options = Object.assign({}, diversityChartOptions);
  // @ts-ignore
  minorityChartOptions: Highcharts.Options = Object.assign({}, diversityChartOptions);
  @ViewChild('divGender') divGender: ElementRef<HTMLElement>;
  @ViewChild('divMinority') divMinority: ElementRef<HTMLElement>;

  @Input()
  set refresh(matterId: string) {
    this.matterId = matterId;
    this.refreshData();
  }

  constructor(private httpService: HttpService,
              public appStateService: AppStateService,
              public filtersService: FiltersService,
              public userService: UserService,
              public agGridService: AgGridService,
              public commonService: CommonService,
              public utilServ: UtilService) {
    this.filtersService.filtersApplied.subscribe(value => {
      if (value) {
        this.load();
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resizeChart(this.chartGender, this.divGender);
    this.resizeChart(this.chartMinority, this.divMinority);
  }

  ngOnInit(): void {

  }


  refreshData(): void {
    this.isOverview = (!this.matterId && !this.firmId);
    this.load();
  }

  load(): void {
    if (!this.userService.hasEntitlement('data.analytics.diversity')) {
      return;
    }
    const params = this.filtersService.getCurrentUserCombinedFilters(true);
    const arr = [];
    if (this.matterId) {
      arr.push(this.matterId);
      params.matters = JSON.stringify(arr);
    }
    if (this.firmId) {
      arr.push(this.firmId);
      params.firms = JSON.stringify(arr);
    }
    this.pendingRequest = this.httpService.makeGetRequest('getDiversityChartData', params).subscribe(
      (data: any) => {
        if (data && data.result) {
          this.processGenderData(data.result.gender);
          this.processMinorityData(data.result.ethnicity);
          this.rebuildCharts();
        }
      }
    );
  }

  processGenderData(records: Array<IDiversityData>): void {
    this.genderData = [];
    for (const rec of records) {
      let gender = rec.gender ? rec.gender.toLowerCase() : 'not provided';
      gender = gender.trim();
      if (gender === 'not provided' || gender === 'yes' || gender === 'no') {
        rec.sort = 0;
        this.genderData.push(this.buildNewGenderMetric('Not Provided', rec));
      } else if (gender === 'female' || gender === 'woman') {
        const found = this.genderData.find(e => e.gender === 'Female');
        if (found) {
          this.aggreagateTotals(found, rec);
        } else {
          rec.sort = 2;
          this.genderData.push(this.buildNewGenderMetric('Female', rec));
        }
      } else if (gender === 'male' || gender === 'man') {
        const found = this.genderData.find(e => e.gender === 'Male');
        if (found) {
          this.aggreagateTotals(found, rec);
        } else {
          rec.sort = 1;
          this.genderData.push(this.buildNewGenderMetric('Male', rec));
        }
      } else if (gender === 'not disclosed' || gender.indexOf('decline') >= 0) {
        const found = this.genderData.find(e => e.gender === 'Declined to State');
        if (found) {
          this.aggreagateTotals(found, rec);
        } else {
          rec.sort = 3;
          this.genderData.push(this.buildNewGenderMetric('Declined to State', rec));
        }
      } else {
        const found = this.genderData.find(e => e.gender === 'Other');
        if (found) {
          this.aggreagateTotals(found, rec);
        } else {
          rec.sort = 4;
          this.genderData.push(this.buildNewGenderMetric('Other', rec));
        }
      }
    }
    this.genderData.sort(this.utilServ.dynamicSort('sort'));
  }

  processMinorityData(records: Array<IDiversityData>): void {
    this.ethnicityData = [];
    for (const rec of records) {
      let ethnicity = rec.ethnicity ? rec.ethnicity.toLowerCase() : 'not provided';
      ethnicity = ethnicity.trim();
      if (ethnicity === 'not provided') {
        rec.sort = 0;
        this.ethnicityData.push(this.buildNewMinorityMetric('Not Provided', rec));
      } else if (ethnicity === 'not disclosed' || ethnicity.indexOf('decline') >= 0) {
        const found = this.ethnicityData.find(e => e.gender === 'Declined to State');
        if (found) {
          this.aggreagateTotals(found, rec);
        } else {
          rec.sort = 2;
          this.ethnicityData.push(this.buildNewMinorityMetric('Declined to State', rec));
        }
      } else {
        rec.sort = 1;
        this.ethnicityData.push(this.buildNewMinorityMetric(rec.ethnicity, rec));
      }
    }
    this.ethnicityData.sort(this.utilServ.dynamicSort('sort'));
  }

  buildNewGenderMetric(genderStr: string, rec: IDiversityData): IDiversityData {
    return {
      gender: this.commonService.capitalizeFirstLetter(genderStr),
      total_spend: rec.total_spend,
      total_hours: rec.total_hours,
      partner_hours: rec.partner_hours,
      partner_billed: rec.partner_billed,
      sort: rec.sort
    };
  }

  buildNewMinorityMetric(minorityStr: string, rec: IDiversityData): IDiversityData {
    return {
      ethnicity: this.commonService.capitalizeFirstLetter(minorityStr),
      total_spend: rec.total_spend,
      total_hours: rec.total_hours,
      partner_hours: rec.partner_hours,
      partner_billed: rec.partner_billed,
      sort: rec.sort
    };
  }

  aggreagateTotals(original: IDiversityData, rec: IDiversityData): void {
    original.total_spend += rec.total_spend;
    original.total_hours += rec.total_hours;
    original.partner_billed += rec.partner_billed;
    original.partner_hours += rec.partner_hours;
  }

  toggleChartType(evt: any): void {
    const x = evt;
    this.chartType = evt.checked ? ChartType.Spend : ChartType.Hours;
    this.rebuildCharts();
  }

  toggleTkChartType(evt: any): void {
    const x = evt;
    this.tkChartType = evt.checked ? TkChartType.PartnersOnly : TkChartType.All;
    this.rebuildCharts();
  }

  rebuildCharts(): void {
    this.rebuildChart('gender');
    this.rebuildChart('minority');
    setTimeout(() => {
      this.resizeChart(this.chartGender, this.divGender);
      this.resizeChart(this.chartMinority, this.divMinority);
    });

  }

  rebuildChart(which: string): void {
    const current = which === 'gender' ? this.chartGender : this.chartMinority;
    const result = [];
    if (which === 'gender') {
      for (const rec of this.genderData) {
        const val = this.getYValue(rec);
        if (val) {
          result.push({name: rec.gender, y: val});
        }
      }
    }
    if (which === 'minority') {
      for (const rec of this.ethnicityData) {
        const val = this.getYValue(rec);
        if (val) {
          result.push({name: rec.ethnicity, y: val});
        }
      }
    }
    current.series[0].setData(result);
  }

  getYValue(rec: IDiversityData): number {
    let result = 0;
    if (this.chartType === ChartType.Hours) {
      result = this.tkChartType === TkChartType.All ? rec.total_hours : rec.partner_hours;
    }
    if (this.chartType === ChartType.Spend) {
      result = this.tkChartType === TkChartType.All ? rec.total_spend : rec.partner_billed;
    }
    return result;
  }

  saveInstance(chartInstance): void {
    this.chartGender = chartInstance;
  }

  saveInstanceMinority(chartInstance): void {
    this.chartMinority = chartInstance;
  }

  resizeChart(chart: any, div: ElementRef): void {
    const width = div.nativeElement.offsetWidth - 40;
    const height = 250;

    if (!chart || width <= 0) {
      return;
    }
    chart.setSize(width, height, false);
  }


}
