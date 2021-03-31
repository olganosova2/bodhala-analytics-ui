import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmDiscountsComponent } from './firm-discounts.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {FirmRateCardComponent} from '../firm-rate-card/firm-rate-card.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {SpendTrendChartComponent} from '../firm-rate-card/spend-trend-chart/spend-trend-chart.component';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';

describe('FirmDiscountsComponent', () => {
  let component: FirmDiscountsComponent;
  let fixture: ComponentFixture<FirmDiscountsComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(FirmDiscountsComponent, {
      set: {
        providers: [
          AppStateService,
          SpendTrendChartComponent,
          { provide: Router, useValue: mockRouter},
          { provide: ActivatedRoute, useClass: mockServices.ActivatedRouteMock },
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub }
        ]
      }
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(FirmDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create FirmDiscountsComponent', () => {
    expect(component).toBeTruthy();
  });
});
