import {Component, OnInit, Input, ViewChild, ElementRef, HostListener} from '@angular/core';
import {IGenericBMChart} from '../../../rates-analysis/rates-analysis.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {MatDialog} from '@angular/material/dialog';
import {FiltersService} from '../../services/filters.service';
import {CommonService} from '../../services/common.service';
import {RatesAnalysisService} from '../../../rates-analysis/rates-analysis.service';

@Component({
  selector: 'bd-benchmark-generic-chart',
  templateUrl: './benchmark-generic-chart.component.html',
  styleUrls: ['./benchmark-generic-chart.component.scss']
})
export class BenchmarkGenericChartComponent implements OnInit {
  marketAverageLeft: string;
  marketAverageWidth: string;
  marketAverageHeight: string;
  actualBarWidth: string;
  compareBarWidth: string;
  actualBarColor: string;
  loaded: boolean = false;
  @Input() highestRate: number;
  @Input() benchmark: IGenericBMChart;
  @ViewChild('chartPanel') chartPanel: ElementRef<HTMLElement>;
  constructor(private route: ActivatedRoute,
              public router: Router,
              public appStateService: AppStateService,
              public filtersService: FiltersService,
              public userService: UserService,
              public ratesService: RatesAnalysisService,
              public commonServ: CommonService) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.loaded) {
      this.resizeChart();
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.resizeChart();
    }, );
  }
  resizeChart(): void {
    this.actualBarColor = this.ratesService.getBarColor(this.benchmark);
    this.marketAverageHeight = this.benchmark.compare ? '130px' : '90px';
    // this.highestRate = this.benchmark.actual > this.benchmark.high ? this.benchmark.actual : this.benchmark.high;
    this.actualBarWidth = this.calculateBarWidth(this.benchmark.actual) + 'px';
    const lowerRange = this.calculateBarWidth(this.benchmark.low);
    const upperRange = this.calculateBarWidth(this.benchmark.high);
    const width = upperRange - lowerRange;
    this.marketAverageLeft = 1.032 * lowerRange + 'px';
    this.marketAverageWidth = width + 'px';
    this.loaded = true;
  }
  calculateBarWidth(rate: number): number {
    let result = 0;
    const max = this.highestRate || 1;
    if (this.chartPanel) {
      const divWidth = this.chartPanel.nativeElement.offsetWidth - 100;
      result = rate * divWidth / max;
    }
    return result;
  }

}
