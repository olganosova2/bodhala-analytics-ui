import { ViewContainerRef, ViewChild, Component, OnInit, AfterViewInit, ComponentFactoryResolver, Input, Output, EventEmitter, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'bd-cell',
  templateUrl: './cell.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CellComponent implements AfterViewInit, AfterViewChecked, OnInit {

  @Input() column: any;
  @Input() data: any;
  @Output() changed: EventEmitter<any> = new EventEmitter();
  @Output() clicked: EventEmitter<any> = new EventEmitter();

  @ViewChild('container', { read: ViewContainerRef, static: false })
  container: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private ref: ChangeDetectorRef) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.render(this.container);
  }

  ngAfterViewChecked() {
    this.ref.detectChanges();
  }

  private render(viewContainerRef) {
    viewContainerRef.clear();
    const component = this.column.component;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

    const componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.data = this.data;
    componentRef.instance.column = this.column;

    componentRef.instance.changed.subscribe(() => {
      this.changed.emit({column: this.column, data: this.data});
    });
    componentRef.instance.clicked.subscribe(() => {
      this.clicked.emit({column: this.column, data: this.data});
    });
  }

}
