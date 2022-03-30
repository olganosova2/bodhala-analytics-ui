import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { RatesAnalysisService } from '../../../rates-analysis.service';
import { moneyFormatter, percentFormatter } from '../../../rates-analysis.model';
import { InvokeFunctionExpr } from '@angular/compiler';
import { IBenchmarkRate } from 'src/app/benchmarks/model';
import { Subscription } from 'rxjs';
import { HttpService } from 'bodhala-ui-common';

@Component({
  selector: 'bd-granular-rate-chart',
  templateUrl: './granular-rate-chart.component.html',
  styleUrls: ['./granular-rate-chart.component.scss']
})
export class GranularRateChartComponent implements OnInit {
  pendingRequest: Subscription;
  @Input() selectedFirm: string;
  @Input() classification: string;
  @Input() seniority: string;
  @Input() overallSpendData: any;
  @Input() firmSpendData: any;
  @Input() benchmark: any;
  @Input() cluster: number;
  @Input() firmName: string;

  marketAverageLowerRange: number;
  marketAverageUpperRange: number;
  marketAverageLowerRangeFormatted: string;
  marketAverageUpperRangeFormatted: string;
  marketAverageLeft: string;
  marketAverageWidth: string;

  marketRateLowerDelta: number;
  marketRateUpperDelta: number;
  marketRateLowerDeltaPct: number;
  marketRateUpperDeltaPct: number;
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

  @ViewChild('chartPanel') chartPanel: ElementRef<HTMLElement>;

  constructor(public ratesService: RatesAnalysisService,
              public httpService: HttpService) {
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   this.resizeChart();
  // }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    const params = {
      pa: this.benchmark.smart_practice_area,
      firmId: this.benchmark.bh_lawfirm_id,
      yyyy: this.benchmark.year,
      seniority: this.seniority,
      classification: this.classification,
      cluster: this.cluster
    };
    console.log("params: ", params)
    this.pendingRequest = this.httpService.makeGetRequest('getTKGranularityRateData', params).subscribe(
      (data: any) => {
        console.log("DATA: ", data)
        if (!data.result) {
          return;
        }
        if (data.result.market_average) {
          if (data.result.market_average.length > 0) {
            this.marketAverageData = data.result.market_average[0];
          }
        }
        if (data.result.firm_data) {
          if (data.result.firm_data.length > 0) {
            this.firmYearData = data.result.firm_data[0];
          }
        }
        if (data.result.internal_data) {
          if (data.result.internal_data.length > 0) {
            this.internalData = data.result.internal_data[0];
          }
        }
        this.calculateChartMetrics();
      },
      err => {
        return {error: err};
      }
    );
  }

  calculateChartMetrics(): void {
    console.log("firmYearData: ", this.firmYearData)
    console.log("marketAverageData: ", this.marketAverageData)
    console.log("internalData: ", this.internalData)
    if (this.classification === 'associate') {
      if (this.marketAverageData.associate_hi > this.firmYearData.rate && this.marketAverageData.associate_hi > this.internalData.avg_associate_rate) {
        this.highestRate = this.marketAverageData.associate_hi;
      } else if (this.firmYearData.rate > this.marketAverageData.associate_hi && this.firmYearData.rate > this.internalData.avg_associate_rate) {
        this.highestRate = this.firmYearData.rate;
      } else if (this.internalData.avg_associate_rate > this.firmYearData.rate && this.internalData.avg_associate_rate > this.marketAverageData.associate_hi) {
        this.highestRate = this.internalData.avg_associate_rate;
      } else {
        // random number - return to
        this.highestRate = 1000;
      }
      console.log("HIGHEST RATE: ", this.highestRate)
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
        this.withinRange = true;
      }

      this.marketRateLowerDeltaPct *= 100;
      this.marketRateUpperDeltaPct *= 100;
      this.internalRateDelta = this.firmYearData.rate - this.internalData.avg_associate_rate;
      this.internalRateDeltaPct = this.internalRateDelta / this.firmYearData.rate;
      this.internalRateDeltaPct *= 100;
    } else if (this.classification === 'partner') {

      if (this.marketAverageData.partner_hi > this.firmYearData.avg_partner_rate && this.marketAverageData.partner_hi > this.internalData.avg_partner_rate) {
        this.highestRate = this.marketAverageData.partner_hi;
      } else if (this.firmYearData.avg_partner_rate > this.marketAverageData.partner_hi && this.firmYearData.avg_partner_rate > this.internalData.avg_partner_rate) {
        this.highestRate = this.firmYearData.avg_partner_rate;
      } else if (this.internalData.avg_partner_rate > this.firmYearData.avg_partner_rate && this.internalData.avg_partner_rate > this.marketAverageData.partner_hi) {
        this.highestRate = this.internalData.avg_partner_rate;
      } else {
        this.highestRate = 5000;
      }
      this.topBarDollars = this.firmYearData.avg_partner_rate;
      this.topBarWidth = this.calculateBarWidth(this.firmYearData.avg_partner_rate) + 'px';
      this.bottomBarDollars = this.internalData.avg_partner_rate;
      this.bottomBarWidth = this.calculateBarWidth(this.internalData.avg_partner_rate) + 'px';

      this.marketAverageLowerRange = this.marketAverageData.partner_lo;
      this.marketAverageUpperRange = this.marketAverageData.partner_hi;
      this.marketAverageLowerRangeFormatted = moneyFormatter.format(this.marketAverageData.partner_lo);
      this.marketAverageUpperRangeFormatted = moneyFormatter.format(this.marketAverageData.partner_hi);
      const lowerRange = this.calculateBarWidth(this.marketAverageData.partner_lo);
      const upperRange = this.calculateBarWidth(this.marketAverageData.partner_hi);
      const width = upperRange - lowerRange;
      if (width < 65) {
        this.modifyMarketDisplay = true;
      }
      this.marketAverageLeft = lowerRange + 'px';
      this.marketAverageWidth = width + 'px';

      if (this.firmYearData.avg_partner_rate > this.marketAverageData.partner_hi) {
        this.marketRateLowerDelta = this.firmYearData.avg_partner_rate - this.marketAverageData.partner_hi;
        this.marketRateUpperDelta = this.firmYearData.avg_partner_rate - this.marketAverageData.partner_lo;
        this.marketRateLowerDeltaPct = this.marketRateLowerDelta / this.firmYearData.avg_partner_rate;
        this.marketRateUpperDeltaPct = this.marketRateUpperDelta / this.firmYearData.avg_partner_rate;
      } else if (this.firmYearData.avg_partner_rate < this.marketAverageData.partner_lo) {
        this.marketRateLowerDelta = this.firmYearData.avg_partner_rate - this.marketAverageData.partner_lo;
        this.marketRateUpperDelta = this.firmYearData.avg_partner_rate - this.marketAverageData.partner_hi;
        this.marketRateLowerDeltaPct = this.marketRateLowerDelta / this.firmYearData.avg_partner_rate;
        this.marketRateUpperDeltaPct = this.marketRateUpperDelta / this.firmYearData.avg_partner_rate;
      } else {
        this.marketRateLowerDelta = this.firmYearData.avg_partner_rate - this.marketAverageData.partner_lo;
        this.marketRateUpperDelta = this.firmYearData.avg_partner_rate - this.marketAverageData.partner_hi;
        this.withinRange = true;
      }
      this.marketRateLowerDeltaPct *= 100;
      this.marketRateUpperDeltaPct *= 100;

      this.internalRateDelta = this.firmYearData.avg_partner_rate - this.internalData.avg_partner_rate;
      this.internalRateDeltaPct = this.internalRateDelta / this.firmYearData.avg_partner_rate;
      this.internalRateDeltaPct *= 100;
    }
    this.bottomBarDollarFormatted = moneyFormatter.format(this.bottomBarDollars);
    this.topBarDollarFormatted = moneyFormatter.format(this.topBarDollars);
    this.topBarColor = this.getBarColor();
    this.internalRateColor = this.getRateColor(this.internalRateDeltaPct);
    this.marketRateColor = this.getRateColor(this.marketRateUpperDeltaPct);
  }

  calculateBarWidth(rate: number): number {
    let result = 0;
    const max = this.highestRate || 1;
    const divWidth = this.chartPanel.nativeElement.offsetWidth - 50;
    result = rate * divWidth / max;
    return result;
  }

  getBarColor(): string {
    let result = '';
    // should it be if either is > 20%?
    if ((this.topBarDollars / this.marketAverageUpperRange >= 1.2)) {
      result = '#FE3F56';
    } else if ((this.topBarDollars / this.marketAverageUpperRange) < 1.2 && this.topBarDollars > this.marketAverageUpperRange) {
      result = '#FF8B4A';
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
