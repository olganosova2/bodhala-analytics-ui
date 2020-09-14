import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import { SpendTrendChartComponent } from './spend-trend-chart.component';
import {FiltersService} from '../../../shared/services/filters.service';
import * as mockServices from '../../../shared/unit-tests/mock-services';

describe('SpendTrendChartComponent', () => {
  let component: SpendTrendChartComponent;
  let fixture: ComponentFixture<SpendTrendChartComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(SpendTrendChartComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendTrendChartComponent);
    component = fixture.componentInstance;
    component.firmId = '1';
    fixture.detectChanges();
  });

  it('should create SpendTrendChartComponent', () => {
    expect(component).toBeTruthy();
  });
});
