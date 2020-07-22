import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import {CommonService} from '../../shared/services/common.service';
import {ISlider, pieDonutOptions, SavingMetrics, SavingsCalculatorService} from '../savings-calculator.service';
import {of, throwError} from 'rxjs';
import {TOP_MATTERS} from '../../shared/unit-tests/mock-data/top-matters';
import {TOP_FIRMS} from '../../shared/unit-tests/mock-data/top-firms';

@Component({
  selector: 'bd-savings-widget',
  templateUrl: './savings-widget.component.html',
  styleUrls: ['./savings-widget.component.scss']
})
export class SavingsWidgetComponent implements OnInit {
  origPercent: number = 0;
  minRange = 0;
  chart: any = {};
  options: any = Object.assign({}, pieDonutOptions);
  savings: number = 0;
  @Input() savingsType: SavingMetrics;
  @Input() percent: number = 0;
  @Input() total: number = 0;
  @Input() title: string;
  @Input() maxRange: number;
  @Output() changed: EventEmitter<any> = new EventEmitter<number>();

  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public filtersService: FiltersService,
              public userService: UserService,
              public savingsService: SavingsCalculatorService,
              public commonServ: CommonService) {
  }

  ngOnInit() {
  }
  setUpDefaults(): void {
    this.origPercent = this.percent;
    const initValue = Object.assign({}, this.getInitValue(this.origPercent));
    this.sliderChange(initValue);
   // this.chart.series[0].setData(this.savingsService.getChartSeries(this.origPercent, this.origPercent, this.origTotal));
  }

  getInitValue(val: any): ISlider {
    const result = { value: null } as ISlider;
    switch (this.savingsType) {
      case SavingMetrics.BlockBilling:
        result.value = val > 10 ?  val - 10 : val;
        break;
      default:
        break;
    }
    this.percent = result.value;
    return result;
  }

  sliderChange(val: any): void {
    switch (this.savingsType) {
      case SavingMetrics.BlockBilling:
        this.savings = this.savingsService.calculateBlockBillingValue(val.value, this.origPercent, this.total);
        // this.chart.series[0].setData(this.savingsService.getChartSeries(val.value, this.origPercent, this.origTotal));
        break;
      default:
        break;
    }
    this.changed.emit(this.savings);
  }

  saveInstance(chartInstance): void {
    this.chart = chartInstance;
  }

}
