import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
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
  header;

  @Input()
  columns: Array<any>;

  @Input()
  request: Promise<any>;
  @Input()
  options: any;

  @Output()
  clicked: EventEmitter<any> = new EventEmitter();

  @Output()
  loaded: EventEmitter<any> = new EventEmitter();

  data: [];
  displayedColumns: Array<any> = [];
  show: string  = CardMode.List;
  isLoaded: boolean = false;

  chart: any = {};

  constructor() { }

  async ngOnInit() {
    this.displayedColumns = this.columns.map(col => col.field);
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
    this.data = response.result || response;
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
    this.chart.series[0].setData(this.data);
  }

  saveInstance(chartInstance): void {
    this.chart = chartInstance;
  }
}
