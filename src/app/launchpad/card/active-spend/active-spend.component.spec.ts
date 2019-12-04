import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveSpendComponent } from './active-spend.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {ChartModule} from 'angular2-highcharts';

describe('ActiveSpendComponent', () => {
  let component: ActiveSpendComponent;
  let fixture: ComponentFixture<ActiveSpendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [...IMPORTS, ChartModule],
      declarations: [...DECLARATIONS, ActiveSpendComponent],
      providers: PROVIDERS,
      schemas: SCHEMAS
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveSpendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ActiveSpendComponent', () => {
    expect(component).toBeTruthy();
  });
});
