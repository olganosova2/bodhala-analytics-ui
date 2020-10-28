import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import {CommonService} from '../../shared/services/common.service';
import {IMetric, pieDonutOptions, SavingMetrics, SavingsCalculatorService} from '../savings-calculator.service';
import { MatDialog } from '@angular/material/dialog';
import {OverstaffingGridComponent} from '../overstaffing-grid/overstaffing-grid.component';
import {HELP_MODAL_CONFIG, SAVINGS_CALCULATOR_CONFIG} from '../../shared/services/config';
import {Subscription} from 'rxjs';
import {HelpModalComponent} from '../../shared/components/help-modal/help-modal.component';

@Component({
  selector: 'bd-savings-widget',
  templateUrl: './savings-widget.component.html',
  styleUrls: ['./savings-widget.component.scss']
})
export class SavingsWidgetComponent implements OnInit, OnDestroy {
  chart: any = {};
  options: any = Object.assign({}, pieDonutOptions);
  minRange = 0;
  pendingRequest: Subscription;
  errorMessage: any;
  isTooltipOpened: boolean = false;
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
    this.minRange = this.metric.minRange ? this.metric.minRange : 0;
    const initValue = Object.assign({}, {value: this.metric.percent});
    this.sliderChange(initValue);
  }
  sliderChange(val: any): void {
    switch (this.metric.savingsType) {
      case SavingMetrics.BlockBilling:
        this.metric.savings = this.savingsService.calculateBlockBillingValue(val.value, this.metric.origPercent, this.metric.total);
        break;
      case SavingMetrics.Overstaffing:
        this.metric.savings = this.savingsService.calculateOverstaffingValue(val.value, this.metric.total);
        break;
      case SavingMetrics.RateIncrease:
        this.metric.savings = this.savingsService.calculateIncreaseRateValue(val.value, this.metric);
        break;
      default:
        break;
    }
    this.changed.emit(this.metric);
  }

  openDetails(): void {
    const modalConfig = {...SAVINGS_CALCULATOR_CONFIG.detailsDialogConfig, data: Object.assign([], this.metric.details)};
    const dialogRef = this.dialog.open(OverstaffingGridComponent, {...modalConfig, disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  showTooltip(): void {
    const params = {id: this.metric.articleId};
    this.pendingRequest = this.httpService.makeGetRequest('getTrainingMaterialsArticle', params).subscribe(
      (data: any) => {
        if (data.result) {
          const article = data.result;
          const modalConfig = {...HELP_MODAL_CONFIG, data: Object.assign([], article)};
          const dialogRef = this.dialog.open(HelpModalComponent, {...modalConfig });
        }
      },
      err => {
        this.errorMessage = err;
      }
    );
  }
  onClickedOutside(event: any) {
      this.isTooltipOpened = false;
  }
  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }
}
