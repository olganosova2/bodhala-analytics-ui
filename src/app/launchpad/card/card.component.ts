import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild, ElementRef} from '@angular/core';
export enum CardMode {
  List = 'list',
  Chart = 'chart'
}
@Component({
  selector: 'bd-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges {

  @Input()
  header: string;

  @Input()
  columns: Array<any>;

  @Input()
  request: Promise<any>;
  @Input()
  options: any;
  @Input()
  cardName: string;

  @Output()
  clicked: EventEmitter<any> = new EventEmitter();

  @Output()
  loaded: EventEmitter<any> = new EventEmitter();

  @ViewChild('panelBody', {static: false}) panelBody: ElementRef;

  individualData: any;
  data: Array<any> = [];
  displayedColumns: Array<any> = [];
  show: string  = CardMode.List;
  isLoaded: boolean = false;

  chart: any = {};

  constructor() { }

  async ngOnInit() {
    this.displayedColumns = this.columns ? this.columns.map(col => col.field) : [];
    this.load();
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.request && !changes.request.firstChange) {
      this.load();
    }
  }

  async load() {
    this.isLoaded = false;
    const response =  await this.request;
    this.data = response.data || response;
    if (!this.columns) { // specific, not table card
      this.individualData = response;
    }
    this.isLoaded = true;
    if (this.show === CardMode.Chart && this.options) {
      setTimeout(() => {
        this.reloadChart();
      });
    }
    this.loaded.emit(true);
  }

  // bubbled up from cell clicks
  onClick(row): void {
    this.clicked.emit(row);
  }

  toggle(show): void {
    this.show = show;
    if (show === CardMode.Chart && this.options) {
      setTimeout(() => {
      this.reloadChart();
      });
    }
  }

  reloadChart(): void {
    // TODO - this was meant to be generic for all column charts
    // don't want to hard code card names here
    // when transforming the data from the api add a category property
    if (this.cardName === 'topBlockBillers') {
      this.chart.xAxis[0].setCategories(this.data.map(d => d.category));
    }
    this.chart.series[0].setData(this.data);
  }

  saveInstance(chartInstance): void {
    this.chart = chartInstance;
  }
}
