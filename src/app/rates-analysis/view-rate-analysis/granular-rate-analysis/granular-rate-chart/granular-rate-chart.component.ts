import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { RatesAnalysisService } from '../../../rates-analysis.service';
import { moneyFormatter, percentFormatter, formatter, COST_IMPACT_GRADES } from '../../../rates-analysis.model';
import { InvokeFunctionExpr } from '@angular/compiler';
import { IBenchmarkRate } from 'src/app/benchmarks/model';
import { Subscription } from 'rxjs';
import { HttpService } from 'bodhala-ui-common';

@Component({
  selector: 'bd-granular-rate-chart',
  templateUrl: './granular-rate-chart.component.html',
  styleUrls: ['./granular-rate-chart.component.scss']
})
export class GranularRateChartComponent implements OnInit, AfterViewInit {
  pendingRequest: Subscription;
  @Input() selectedFirm: string;
  @Input() classification: string;
  @Input() seniority: string;
  @Input() overallSpendData: any;
  @Input() firmSpendData: any;
  @Input() benchmark: any;
  @Input() cluster: number;
  @Input() firmName: string;
  @Input() tier: number;
  @Input() totalHours: number;
  @Input() numTiers: number;

  marketAverageLowerRange: number;
  marketAverageUpperRange: number;
  marketAverageMedian: number;
  marketAverageLowerRangeFormatted: string;
  marketAverageUpperRangeFormatted: string;
  marketAverageLeft: string;
  marketAverageWidth: string;
  totalSeniorityHoursFormatted: string;

  marketRateLowerDelta: number;
  marketRateUpperDelta: number;
  marketRateLowerDeltaPct: number;
  marketRateUpperDeltaPct: number;
  marketRateMedianDeltaPct: number;
  internalRateDelta: number;
  internalRateDeltaPct: number;
  withinRange: boolean = false;

  topBarWidth: string = '500px';
  bottomBarWidth: string = '400px';
  marketAverageHeight: string = '133px';
  topBarDollars: number = 0;
  topBarDollarFormatted: string;
  bottomBarDollars: number = 0;
  bottomBarDollarFormatted: string;
  topBarColor: string;
  bottomBarColor: string;
  marketRateColor: string = '#E5EAEC';
  internalRateColor: string = '#E5EAEC';
  floatDivX: string;
  floatDivWidth: string;
  highestRate: number = 0;
  validInternalBM: boolean = true;
  validMarketAverage: boolean = true;
  modifyMarketDisplay: boolean = false;
  firmYearData: any;
  marketAverageData: any;
  internalData: any;
  percentOfTotalHours: number;
  totalSeniorityHours: number;
  internalRateCostImpact: string;
  marketAvgLowCostImpact: string;
  marketAvgHighCostImpact: string;
  projectedCostImpact: string;
  marketAvgProjectedCostImpact: string;
  rateImpact: string;
  rateImpactColor: string;
  validFirmData: boolean = true;
  loaded: boolean = false;
  rateImpactWidth: string = '54%';
  classificationWidth: string = '46%';
  helpText: string = 'Rate Impact is determined by a combination of % over market/internal rates and % of hours worked by this TK classification.';

  @ViewChild('chartPanel') chartPanel: ElementRef<HTMLElement>;

  constructor(public ratesService: RatesAnalysisService,
              public httpService: HttpService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.loaded) {
      this.resizeChart();
    }
  }

  ngOnInit(): void {
    if (this.classification === 'associate') {
      this.getAssociateData();
    } else if (this.classification === 'partner') {
      if (this.tier === 1 && this.numTiers === 2) {
        this.seniority = 'Junior';
      } else if (this.tier === 2 && this.numTiers === 2) {
        this.seniority = 'Senior';
      } else if (this.tier === 1 && this.numTiers === 3) {
        this.seniority = 'Junior';
      } else if (this.tier === 2 && this.numTiers === 3) {
        this.seniority = 'Mid-level';
      } else if (this.tier === 3 && this.numTiers === 3) {
        this.seniority = 'Senior';
      } else if (this.tier === 1 && this.numTiers === 4) {
        this.seniority = 'Junior';
      } else if (this.tier === 2 && this.numTiers === 4) {
        this.seniority = 'Mid-level';
      } else if (this.tier === 3 && this.numTiers === 4) {
        this.seniority = 'Mid-level';
      } else if (this.tier === 4 && this.numTiers === 4) {
        this.seniority = 'Senior';
      }
      if (this.numTiers === 4) {
        if (this.tier !== 3) {
          this.getPartnerData();
        }
      } else {
        this.getPartnerData();
      }

    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.loaded) {
        this.resizeChart();
      }
    });
  }

  resizeChart(): void {
    this.calculateChartMetrics();
    if (this.chartPanel) {
      if (this.chartPanel.nativeElement.offsetWidth <= 1188) {
        this.rateImpactWidth = '70%';
        this.classificationWidth = '30%';
      }
      else if (this.chartPanel.nativeElement.offsetWidth > 1188) {
        this.rateImpactWidth = '54%';
        this.classificationWidth = '46%';
      }
    }
  }

  getAssociateData(): void {
    const params = {
      pa: this.benchmark.smart_practice_area,
      firmId: this.benchmark.bh_lawfirm_id,
      yyyy: this.benchmark.year,
      seniority: this.seniority,
      classification: this.classification,
      cluster: this.cluster
    };
    this.pendingRequest = this.httpService.makeGetRequest('getAssociateGranularityRateData', params).subscribe(
      (data: any) => {
        if (!data.result) {
          return;
        }
        if (data.result.market_average) {
          if (data.result.market_average.length > 0) {
            this.marketAverageData = data.result.market_average[0];
            if (this.marketAverageData.num_firms < 3) {
              this.validMarketAverage = false;
            }
          }
        }
        if (data.result.firm_data) {
          if (data.result.firm_data.length > 0) {
            this.firmYearData = data.result.firm_data[0];
            this.totalSeniorityHours = this.firmYearData.total_associate_hours;
            this.totalSeniorityHoursFormatted = formatter.format(this.totalSeniorityHours);
            if (this.totalHours > 0) {
              this.percentOfTotalHours = (this.totalSeniorityHours / this.totalHours) * 100;
            }
            if (this.firmYearData.rate === null) {
              this.validFirmData = false;
            }
          }
        }
        if (data.result.internal_data) {
          if (data.result.internal_data.length > 0) {
            this.internalData = data.result.internal_data[0];
            if (this.internalData.num_firms < 3) {
              this.validInternalBM = false;
              this.marketAverageHeight = '84px';
            }
          }
        }
        this.loaded = true;
        this.calculateChartMetrics();
      },
      err => {
        return {error: err};
      }
    );
  }

  getPartnerData(): void {
    const params = {
      pa: this.benchmark.smart_practice_area,
      firmId: this.benchmark.bh_lawfirm_id,
      yyyy: this.benchmark.year,
      tier: this.tier,
      numTiers: this.numTiers,
      cluster: this.cluster
    };
    this.pendingRequest = this.httpService.makeGetRequest('getPartnerGranularityRateData', params).subscribe(
      (data: any) => {
        if (!data.result) {
          return;
        }
        if (data.result.market_average) {
          if (data.result.market_average.length > 0) {
            this.marketAverageData = data.result.market_average[0];
            if (this.marketAverageData.num_firms < 3) {
              this.validMarketAverage = false;
            }
          }
        }
        if (data.result.firm_data) {
          if (data.result.firm_data.length > 0) {
            this.firmYearData = data.result.firm_data[0];
            this.totalSeniorityHours = this.firmYearData.total_partner_hours;
            this.totalSeniorityHoursFormatted = formatter.format(this.totalSeniorityHours);
            if (this.totalHours > 0) {
              this.percentOfTotalHours = (this.totalSeniorityHours / this.totalHours) * 100;
            }
            if (this.firmYearData.rate === null) {
              this.validFirmData = false;
            }
          }
        }
        if (data.result.internal_data) {
          if (data.result.internal_data.length > 0) {
            this.internalData = data.result.internal_data[0];
            if (this.internalData.num_firms < 3) {
              this.validInternalBM = false;
              this.marketAverageHeight = '84px';
            }
          }
        }
        this.loaded = true;
        this.calculateChartMetrics();
      },
      err => {
        return {error: err};
      }
    );
  }

  calculateChartMetrics(): void {
    if (this.classification === 'associate') {
      const associateRates = [];
      if (this.marketAverageData.associate_hi !== null && this.validMarketAverage) {
        associateRates.push(this.marketAverageData.associate_hi);
      }
      if (this.internalData.avg_associate_rate !== null && this.validInternalBM) {
        associateRates.push(this.internalData.avg_associate_rate);
      }
      if (this.firmYearData.rate !== null) {
        associateRates.push(this.firmYearData.rate);
      }
      this.highestRate = Math.max(...associateRates);
      if (this.marketAverageData.associate_hi > this.firmYearData.rate && this.marketAverageData.associate_hi > this.internalData.avg_associate_rate) {
        this.highestRate = this.marketAverageData.associate_hi;
      } else if (this.firmYearData.rate > this.marketAverageData.associate_hi && this.firmYearData.rate > this.internalData.avg_associate_rate) {
        this.highestRate = this.firmYearData.rate;
      } else if (this.internalData.avg_associate_rate > this.firmYearData.rate && this.internalData.avg_associate_rate > this.marketAverageData.associate_hi) {
        this.highestRate = this.internalData.avg_associate_rate;
      } else {
        // random number - return to
        this.highestRate = this.firmYearData.rate;
      }
      this.topBarDollars = this.firmYearData.rate;
      this.topBarWidth = this.calculateBarWidth(this.firmYearData.rate) + 'px';
      this.bottomBarDollars = this.internalData.avg_associate_rate;
      this.bottomBarDollarFormatted = moneyFormatter.format(this.bottomBarDollars);
      this.bottomBarWidth = this.calculateBarWidth(this.internalData.avg_associate_rate) + 'px';

      const lowerRange = this.calculateBarWidth(this.marketAverageData.associate_lo);
      const upperRange = this.calculateBarWidth(this.marketAverageData.associate_hi);
      const width = upperRange - lowerRange;
      if (width < 65) {
        this.modifyMarketDisplay = true;
      }
      this.marketAverageLowerRange = this.marketAverageData.associate_lo;
      this.marketAverageUpperRange =  this.marketAverageData.associate_hi;
      this.marketAverageMedian = (this.marketAverageData.associate_hi + this.marketAverageData.associate_lo) / 2;
      this.marketAverageLowerRangeFormatted = moneyFormatter.format(this.marketAverageData.associate_lo);
      this.marketAverageUpperRangeFormatted =  moneyFormatter.format(this.marketAverageData.associate_hi);

      this.marketAverageLeft = lowerRange + 'px';
      this.marketAverageWidth = width + 'px';
      if (this.firmYearData.rate > this.marketAverageData.associate_hi) {

        this.marketRateLowerDelta = this.firmYearData.rate - this.marketAverageData.associate_hi;
        this.marketRateUpperDelta  = this.firmYearData.rate - this.marketAverageData.associate_lo;
        this.marketRateLowerDeltaPct = this.marketRateLowerDelta / this.firmYearData.rate;
        this.marketRateUpperDeltaPct = this.marketRateUpperDelta / this.firmYearData.rate;
      } else if (this.firmYearData.rate < this.marketAverageData.associate_lo) {
        this.marketRateLowerDelta = this.firmYearData.rate - this.marketAverageData.associate_lo;
        this.marketRateUpperDelta  = this.firmYearData.rate - this.marketAverageData.associate_hi;
        this.marketRateLowerDeltaPct = this.marketRateLowerDelta / this.firmYearData.rate;
        this.marketRateUpperDeltaPct = this.marketRateUpperDelta / this.firmYearData.rate;
      } else {
        this.marketRateLowerDelta = this.firmYearData.rate - this.marketAverageData.associate_lo;
        this.marketRateUpperDelta  = this.firmYearData.rate - this.marketAverageData.associate_hi;
        this.marketRateLowerDeltaPct = this.marketRateLowerDelta / this.firmYearData.rate;
        this.marketRateUpperDeltaPct = this.marketRateUpperDelta / this.firmYearData.rate;
        this.withinRange = true;
      }

      this.marketRateLowerDeltaPct *= 100;
      this.marketRateUpperDeltaPct *= 100;
      this.internalRateDelta = this.firmYearData.rate - this.internalData.avg_associate_rate;
      this.internalRateDeltaPct = this.internalRateDelta / this.firmYearData.rate;
      this.internalRateDeltaPct *= 100;
    } else if (this.classification === 'partner') {
      const partnerRates = [];
      if (this.marketAverageData.partner_hi !== null && this.validMarketAverage) {
        partnerRates.push(this.marketAverageData.partner_hi);
      }
      if (this.internalData.avg_partner_rate !== null && this.validInternalBM) {
        partnerRates.push(this.internalData.avg_partner_rate);
      }
      if (this.firmYearData.rate !== null) {
        partnerRates.push(this.firmYearData.rate);
      }
      this.highestRate = Math.max(...partnerRates);
      this.topBarDollars = this.firmYearData.rate;
      this.topBarWidth = this.calculateBarWidth(this.firmYearData.rate) + 'px';
      this.bottomBarDollars = this.internalData.avg_partner_rate;
      this.bottomBarWidth = this.calculateBarWidth(this.internalData.avg_partner_rate) + 'px';

      this.marketAverageLowerRange = this.marketAverageData.partner_lo;
      this.marketAverageUpperRange = this.marketAverageData.partner_hi;
      this.marketAverageLowerRangeFormatted = moneyFormatter.format(this.marketAverageData.partner_lo);
      this.marketAverageUpperRangeFormatted = moneyFormatter.format(this.marketAverageData.partner_hi);
      this.marketAverageMedian = (this.marketAverageData.partner_hi + this.marketAverageData.partner_lo) / 2;
      const lowerRange = this.calculateBarWidth(this.marketAverageData.partner_lo);
      const upperRange = this.calculateBarWidth(this.marketAverageData.partner_hi);
      const width = upperRange - lowerRange;
      if (width < 65) {
        this.modifyMarketDisplay = true;
      }
      this.marketAverageLeft = lowerRange + 'px';
      this.marketAverageWidth = width + 'px';

      if (this.firmYearData.rate > this.marketAverageData.partner_hi) {
        this.marketRateLowerDelta = this.firmYearData.rate - this.marketAverageData.partner_hi;
        this.marketRateUpperDelta = this.firmYearData.rate - this.marketAverageData.partner_lo;
        this.marketRateLowerDeltaPct = this.marketRateLowerDelta / this.firmYearData.rate;
        this.marketRateUpperDeltaPct = this.marketRateUpperDelta / this.firmYearData.rate;
      } else if (this.firmYearData.rate < this.marketAverageData.partner_lo) {
        this.marketRateLowerDelta = this.firmYearData.rate - this.marketAverageData.partner_lo;
        this.marketRateUpperDelta = this.firmYearData.rate - this.marketAverageData.partner_hi;
        this.marketRateLowerDeltaPct = this.marketRateLowerDelta / this.firmYearData.rate;
        this.marketRateUpperDeltaPct = this.marketRateUpperDelta / this.firmYearData.rate;
      } else {
        this.marketRateLowerDelta = this.firmYearData.rate - this.marketAverageData.partner_lo;
        this.marketRateUpperDelta = this.firmYearData.rate - this.marketAverageData.partner_hi;
        this.marketRateLowerDeltaPct = this.marketRateLowerDelta / this.firmYearData.rate;
        this.marketRateUpperDeltaPct = this.marketRateUpperDelta / this.firmYearData.rate;
        this.withinRange = true;
      }
      this.marketRateLowerDeltaPct *= 100;
      this.marketRateUpperDeltaPct *= 100;

      this.internalRateDelta = this.firmYearData.rate - this.internalData.avg_partner_rate;
      this.internalRateDeltaPct = this.internalRateDelta / this.firmYearData.rate;
      this.internalRateDeltaPct *= 100;
    }
    let marketAvgCostImpactHigh = this.marketRateUpperDelta * this.totalSeniorityHours;
    let marketAvgCostImpactLow = this.marketRateLowerDelta * this.totalSeniorityHours;
    let internalCostImpact = this.internalRateDelta * this.totalSeniorityHours;
    if (marketAvgCostImpactHigh < 0) {
      marketAvgCostImpactHigh *= -1;
    }
    if (marketAvgCostImpactLow < 0) {
      marketAvgCostImpactLow *= -1;
    }
    if (internalCostImpact < 0) {
      internalCostImpact *= -1;
    }
    this.marketRateMedianDeltaPct = ((this.firmYearData.rate - this.marketAverageMedian) / this.firmYearData.rate) * 100;
    this.marketAvgHighCostImpact = moneyFormatter.format(marketAvgCostImpactHigh);
    this.marketAvgLowCostImpact = moneyFormatter.format(marketAvgCostImpactLow);
    this.internalRateCostImpact = moneyFormatter.format(internalCostImpact);
    this.bottomBarDollarFormatted = moneyFormatter.format(this.bottomBarDollars);
    this.topBarDollarFormatted = moneyFormatter.format(this.topBarDollars);
    this.topBarColor = this.getBarColor();
    this.internalRateColor = this.getRateColor(this.internalRateDeltaPct);
    const impact = this.calcluateRateImpact();
    this.rateImpact = impact.impact;
    this.rateImpactColor = impact.color;
  }

  calcluateRateImpact(): any {
    if (this.marketRateMedianDeltaPct < 0 && this.internalRateDeltaPct < 0) {
      return {impact: 'POSITIVE', color: '#3EDB73'};
    } else if ((this.marketRateMedianDeltaPct >= 0 && this.marketRateMedianDeltaPct < 3) && (this.internalRateDeltaPct >= 0 && this.internalRateDeltaPct < 3)) {
      return {impact: 'LOW', color: '#FFC327'};
    }
    if (this.percentOfTotalHours < 3) {
      return {impact: 'LOW', color: '#FFC327'};
    }

    const impact = (this.percentOfTotalHours * .5) + (this.marketRateMedianDeltaPct * .25) + (this.internalRateDeltaPct * .25);
    if (impact >= 20) {
      return {impact: 'HIGH', color: '#FE3F56'};
    } else if (impact < 20 && impact > 10) {
      return {impact: 'MODERATE', color: '#FF8B4A'};
    } else {
      return {impact: 'LOW', color: '#FFC327'};
    }
  }

  calculateBarWidth(rate: number): number {
    let result = 0;
    const max = this.highestRate || 1;
    if (this.chartPanel) {
      const divWidth = this.chartPanel.nativeElement.offsetWidth - 50;
      result = rate * divWidth / max;
    }
    return result;
  }

  getBarColor(): string {
    let result = '';
    // should it be if either is > 20%?
    if ((this.topBarDollars / this.marketAverageUpperRange >= 1.2)) {
      result = '#FE3F56';
      this.marketAvgProjectedCostImpact = 'HIGH';
    } else if ((this.topBarDollars / this.marketAverageUpperRange) < 1.2 && this.topBarDollars > this.marketAverageUpperRange) {
      result = '#FF8B4A';
      this.marketAvgProjectedCostImpact = 'MODERATE';
    } else if (this.topBarDollars <= this.marketAverageUpperRange && this.topBarDollars >= this.marketAverageLowerRange) {
      result = '#FFC327';
    } else if ((this.topBarDollars / this.marketAverageLowerRange) < 1) {
      result = '#3EDB73';
    } else {
      result = '#E5EAEC';
    }
    return result;
  }

  getRateColor(deltaPct: number): string {
    let result = '';
    if (deltaPct >= 20) {
      result = '#FE3F56';
      this.projectedCostImpact = 'HIGH';
    } else if (deltaPct >= 0 && deltaPct < 20) {
      result = '#FF8B4A';
      this.projectedCostImpact = 'MODERATE';
    } else if (deltaPct < 0) {
      result = '#3EDB73';
    } else {
      result = '#FFC327';
    }
    return result;
  }
}
