import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { RatesAnalysisService } from '../../../rates-analysis.service';
import { moneyFormatter, formatter } from '../../../rates-analysis.model';
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
  @Input() internalData: any;
  @Input() marketData: any;
  @Input() firmPartnerSeniorityData: any;
  @Input() firmAssociateSeniorityData: any;
  @Input() benchmark: any;
  @Input() cluster: number;
  @Input() firmName: string;
  @Input() tier: number;
  @Input() totalSeniorityHours: number;
  @Input() seniorityFirmRate: number;
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
  percentOfTotalHours: number;
  internalRateCostImpact: string;
  marketAvgLowCostImpact: string;
  marketAvgHighCostImpact: string;
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
      if (this.marketData) {
        if (this.marketData.market_num_firms < 3) {
          this.validMarketAverage = false;
        }
      } else {
        this.validMarketAverage = false;
      }
      if (this.internalData) {
        if (this.internalData.internal_num_firms < 1) {
          this.validInternalBM = false;
          this.marketAverageHeight = '84px';
        }
      } else {
        this.validInternalBM = false;
        this.marketAverageHeight = '84px';
      }

      if (this.totalHours > 0) {
        this.percentOfTotalHours = (this.totalSeniorityHours / this.totalHours) * 100;
      }
      this.totalSeniorityHoursFormatted = formatter.format(this.totalSeniorityHours);

      if (this.seniorityFirmRate === null || this.seniorityFirmRate === 0) {
        this.validFirmData = false;
      }
      if (this.totalHours > 0) {
        this.percentOfTotalHours = (this.totalSeniorityHours / this.totalHours) * 100;
      }

      this.loaded = true;
      this.calculateChartMetrics();

    } else if (this.classification === 'partner') {
      if (this.tier === 1 && this.numTiers === 2) {
        this.seniority = 'Junior';
      } else if (this.tier === 2 && this.numTiers === 2) {
        this.seniority = 'Senior';
      } else if (this.tier === 1 && this.numTiers === 3) {
        this.seniority = 'Junior';
      } else if (this.tier === 2 && this.numTiers === 3) {
        this.seniority = 'Mid-Level';
      } else if (this.tier === 3 && this.numTiers === 3) {
        this.seniority = 'Senior';
      } else if (this.tier === 1 && this.numTiers === 4) {
        this.seniority = 'Junior';
      } else if (this.tier === 2 && this.numTiers === 4) {
        this.seniority = 'Mid-Level';
      } else if (this.tier === 3 && this.numTiers === 4) {
        this.seniority = 'Mid-Level';
      } else if (this.tier === 4 && this.numTiers === 4) {
        this.seniority = 'Senior';
      } else if (this.tier === 1 && this.numTiers === 1) {
        this.seniority = 'Junior';
      }

      if (this.seniority === 'Junior') {
        this.seniorityFirmRate = this.firmPartnerSeniorityData.junior_rate;
        this.totalSeniorityHours = this.firmPartnerSeniorityData.total_junior_partner_hours;
      } else if (this.seniority === 'Mid-Level') {
        this.seniorityFirmRate = this.firmPartnerSeniorityData.mid_rate;
        this.totalSeniorityHours = this.firmPartnerSeniorityData.total_mid_partner_hours;
      } else if (this.seniority === 'Senior') {
        this.seniorityFirmRate = this.firmPartnerSeniorityData.senior_rate;
        this.totalSeniorityHours = this.firmPartnerSeniorityData.total_senior_partner_hours;
      }

      const marketData = this.marketData.filter(m => m.seniority === this.seniority);
      if (marketData.length > 0) {
        this.marketData = marketData[0];
      }
      if ('seniority' in this.marketData) {
        if (this.marketData.market_num_firms < 3) {
          this.validMarketAverage = false;
        }
      } else {
        this.validMarketAverage = false;
      }
      const internalData = this.internalData.filter(m => m.seniority === this.seniority);
      if (internalData.length > 0) {
        this.internalData = internalData[0];
      }
      if ('seniority' in this.internalData) {
        if (this.internalData.internal_num_firms < 1) {
          this.validInternalBM = false;
          this.marketAverageHeight = '84px';
        }
      } else {
        this.validInternalBM = false;
        this.marketAverageHeight = '84px';
      }
      this.totalSeniorityHoursFormatted = formatter.format(this.totalSeniorityHours);
      if (this.seniorityFirmRate === null || this.seniorityFirmRate === 0) {
        this.validFirmData = false;
      }
      if (this.totalHours > 0) {
        this.percentOfTotalHours = (this.totalSeniorityHours / this.totalHours) * 100;
      }
      this.loaded = true;
      this.calculateChartMetrics();
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

  calculateChartMetrics(): void {


    if (this.classification === 'associate') {
      const associateRates = [];
      // this.topBarDollars = this.seniorityFirmRate;

      if (this.marketData) {
        if (this.marketData.market_associate_rate_hi !== null && this.validMarketAverage) {
          associateRates.push(this.marketData.market_associate_rate_hi );
        }

        const lowerRange = this.calculateBarWidth(this.marketData.market_associate_rate_lo);
        const upperRange = this.calculateBarWidth(this.marketData.market_associate_rate_hi);
        const width = upperRange - lowerRange;
        if (width < 65) {
          this.modifyMarketDisplay = true;
        }
        this.marketAverageLowerRange = this.marketData.market_associate_rate_lo;
        this.marketAverageUpperRange =  this.marketData.market_associate_rate_hi;
        this.marketAverageMedian = (this.marketData.market_associate_rate_hi + this.marketData.market_associate_rate_lo) / 2;
        this.marketAverageLowerRangeFormatted = moneyFormatter.format(this.marketData.market_associate_rate_lo);
        this.marketAverageUpperRangeFormatted =  moneyFormatter.format(this.marketData.market_associate_rate_hi);

        this.marketAverageLeft = lowerRange + 'px';
        this.marketAverageWidth = width + 'px';

        if (this.seniorityFirmRate > this.marketData.market_associate_rate_hi) {
          this.marketRateLowerDelta = this.seniorityFirmRate - this.marketData.market_associate_rate_hi;
          this.marketRateUpperDelta  = this.seniorityFirmRate - this.marketData.market_associate_rate_lo;
          this.marketRateLowerDeltaPct = this.marketRateLowerDelta / this.marketData.market_associate_rate_hi;
          this.marketRateUpperDeltaPct = this.marketRateUpperDelta / this.marketData.market_associate_rate_lo;
        } else if (this.seniorityFirmRate < this.marketData.market_associate_rate_lo) {
          this.marketRateLowerDelta = this.seniorityFirmRate - this.marketData.market_associate_rate_lo;
          this.marketRateUpperDelta  = this.seniorityFirmRate - this.marketData.market_associate_rate_hi;
          this.marketRateLowerDeltaPct = this.marketRateLowerDelta / this.marketData.market_associate_rate_lo;
          this.marketRateUpperDeltaPct = this.marketRateUpperDelta / this.marketData.market_associate_rate_hi;
        } else {
          this.marketRateLowerDelta = this.seniorityFirmRate - this.marketData.market_associate_rate_lo;
          this.marketRateUpperDelta  = this.seniorityFirmRate - this.marketData.market_associate_rate_hi;
          this.marketRateLowerDeltaPct = this.marketRateLowerDelta / this.marketData.market_associate_rate_lo;
          this.marketRateUpperDeltaPct = this.marketRateUpperDelta / this.marketData.market_associate_rate_hi;
          this.withinRange = true;
        }
        this.marketRateLowerDeltaPct *= 100;
        this.marketRateUpperDeltaPct *= 100;
      } else {
        this.validMarketAverage = false;
      }

      if (this.internalData) {
        if (this.internalData.internal_avg_associate_rate !== null && this.validInternalBM) {
          associateRates.push(this.internalData.internal_avg_associate_rate);
        }

        this.bottomBarDollars = this.internalData.internal_avg_associate_rate;
        this.bottomBarDollarFormatted = moneyFormatter.format(this.bottomBarDollars);
        this.bottomBarWidth = this.calculateBarWidth(this.internalData.internal_avg_associate_rate) + 'px';

        this.internalRateDelta = this.seniorityFirmRate - this.internalData.internal_avg_associate_rate;
        this.internalRateDeltaPct = this.internalRateDelta / this.internalData.internal_avg_associate_rate;
        this.internalRateDeltaPct *= 100;

      } else {
        this.validInternalBM = false;
      }

      if (this.seniorityFirmRate !== null) {
        associateRates.push(this.seniorityFirmRate);
      }
      this.highestRate = Math.max(...associateRates);
      this.topBarWidth = this.calculateBarWidth(this.seniorityFirmRate) + 'px';
      this.topBarDollars = this.seniorityFirmRate;
      this.topBarDollarFormatted = moneyFormatter.format(this.topBarDollars);

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
      this.marketRateMedianDeltaPct = ((this.seniorityFirmRate - this.marketAverageMedian) / this.seniorityFirmRate) * 100;
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

    } else if (this.classification === 'partner') {
      const partnerRates = [];

      if (this.marketData) {
        if (this.marketData.market_partner_rate_hi !== null && this.validMarketAverage) {
          partnerRates.push(this.marketData.market_partner_rate_hi);
        }

        this.marketAverageLowerRange = this.marketData.market_partner_rate_lo;
        this.marketAverageUpperRange = this.marketData.market_partner_rate_hi;
        this.marketAverageLowerRangeFormatted = moneyFormatter.format(this.marketData.market_partner_rate_lo);
        this.marketAverageUpperRangeFormatted = moneyFormatter.format(this.marketData.market_partner_rate_hi);
        this.marketAverageMedian = (this.marketData.market_partner_rate_hi + this.marketData.market_partner_rate_lo) / 2;
        const lowerRange = this.calculateBarWidth(this.marketData.market_partner_rate_lo);
        const upperRange = this.calculateBarWidth(this.marketData.market_partner_rate_hi);
        const width = upperRange - lowerRange;
        if (width < 65) {
          this.modifyMarketDisplay = true;
        }
        this.marketAverageLeft = lowerRange + 'px';
        this.marketAverageWidth = width + 'px';

        if (this.seniorityFirmRate > this.marketData.market_partner_rate_hi) {
          this.marketRateLowerDelta = this.seniorityFirmRate - this.marketData.market_partner_rate_hi;
          this.marketRateUpperDelta = this.seniorityFirmRate - this.marketData.market_partner_rate_lo;
          this.marketRateLowerDeltaPct = this.marketRateLowerDelta / this.marketData.market_partner_rate_hi;
          this.marketRateUpperDeltaPct = this.marketRateUpperDelta / this.marketData.market_partner_rate_lo;
        } else if (this.seniorityFirmRate < this.marketData.market_partner_rate_lo) {
          this.marketRateLowerDelta = this.seniorityFirmRate - this.marketData.market_partner_rate_lo;
          this.marketRateUpperDelta = this.seniorityFirmRate - this.marketData.market_partner_rate_hi;
          this.marketRateLowerDeltaPct = this.marketRateLowerDelta / this.marketData.market_partner_rate_lo;
          this.marketRateUpperDeltaPct = this.marketRateUpperDelta / this.marketData.market_partner_rate_hi;
        } else {
          this.marketRateLowerDelta = this.seniorityFirmRate - this.marketData.market_partner_rate_lo;
          this.marketRateUpperDelta = this.seniorityFirmRate - this.marketData.market_partner_rate_hi;
          this.marketRateLowerDeltaPct = this.marketRateLowerDelta / this.marketData.market_partner_rate_lo;
          this.marketRateUpperDeltaPct = this.marketRateUpperDelta / this.marketData.market_partner_rate_hi;
          this.withinRange = true;
        }
        this.marketRateLowerDeltaPct *= 100;
        this.marketRateUpperDeltaPct *= 100;
      } else {
        this.validMarketAverage = false;
      }

      if (this.internalData) {
        if (this.internalData.internal_avg_partner_rate !== null && this.validInternalBM) {
          partnerRates.push(this.internalData.internal_avg_partner_rate);
        }

        this.bottomBarDollars = this.internalData.internal_avg_partner_rate;
        this.bottomBarWidth = this.calculateBarWidth(this.internalData.internal_avg_partner_rate) + 'px';

        this.internalRateDelta = this.seniorityFirmRate - this.internalData.internal_avg_partner_rate;
        this.internalRateDeltaPct = this.internalRateDelta / this.internalData.internal_avg_partner_rate;
        this.internalRateDeltaPct *= 100;

      } else {
        this.validInternalBM = false;
      }

      if (this.seniorityFirmRate !== null) {
        partnerRates.push(this.seniorityFirmRate);
      }
      this.topBarWidth = this.calculateBarWidth(this.seniorityFirmRate) + 'px';
      this.highestRate = Math.max(...partnerRates);
      this.topBarDollars = this.seniorityFirmRate;
      this.topBarDollarFormatted = moneyFormatter.format(this.topBarDollars);

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
      this.marketRateMedianDeltaPct = ((this.seniorityFirmRate - this.marketAverageMedian) / this.seniorityFirmRate) * 100;
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
    } else if (deltaPct >= 0 && deltaPct < 20) {
      result = '#FF8B4A';
    } else if (deltaPct < 0) {
      result = '#3EDB73';
    } else {
      result = '#FFC327';
    }
    return result;
  }
}
