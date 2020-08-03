import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import {CommonService} from '../../shared/services/common.service';
import {IMetric, ISlider, pieDonutOptions, SavingMetrics, SavingsCalculatorService} from '../savings-calculator.service';
import {MatDialog} from '@angular/material';
import {OverstaffingGridComponent} from '../overstaffing-grid/overstaffing-grid.component';
import {SAVINGS_CALCULATOR_CONFIG} from '../../shared/services/config';

@Component({
  selector: 'bd-savings-widget',
  templateUrl: './savings-widget.component.html',
  styleUrls: ['./savings-widget.component.scss']
})
export class SavingsWidgetComponent implements OnInit {
  minRange = 0;
  chart: any = {};
  options: any = Object.assign({}, pieDonutOptions);
  @Input() metric: IMetric;
  @Input() totalSpend: number = 0;
  @Output() changed: EventEmitter<any> = new EventEmitter<IMetric>();

  constructor(private route: ActivatedRoute,
              public router: Router,
              public dialog: MatDialog,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public filtersService: FiltersService,
              public userService: UserService,
              public savingsService: SavingsCalculatorService,
              public commonServ: CommonService) {
  }

  ngOnInit() {
    this.setUpDefaults();
  }

  formatLabel(value: number) {
    return value.toString() + '%';
  }

  setUpDefaults(): void {
    const initValue = Object.assign({}, {value: this.metric.percent});
    this.sliderChange(initValue);
    // this.chart.series[0].setData(this.savingsService.getChartSeries(this.origPercent, this.origPercent, this.origTotal));
  }
  sliderChange(val: any): void {
    switch (this.metric.savingsType) {
      case SavingMetrics.BlockBilling:
        this.metric.savings = this.savingsService.calculateBlockBillingValue(val.value, this.metric.origPercent, this.metric.total);
        // this.chart.series[0].setData(this.savingsService.getChartSeries(val.value, this.origPercent, this.origTotal));
        break;
      case SavingMetrics.Overstaffing:
        this.metric.savings = this.savingsService.calculateOverstaffingValue(val.value, this.metric.total);
        break;
      default:
        break;
    }
    this.changed.emit(this.metric);
  }

  saveInstance(chartInstance): void {
    this.chart = chartInstance;
  }
  openDetails(): void {
    const modalConfig = {...SAVINGS_CALCULATOR_CONFIG.detailsDialogConfig, data: Object.assign([], this.metric.details)};
    const dialogRef = this.dialog.open(OverstaffingGridComponent, {...modalConfig, disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
