import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmDiscountsComponent } from './firm-discounts.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {FirmRateCardComponent} from '../firm-rate-card/firm-rate-card.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {SpendTrendChartComponent} from '../firm-rate-card/spend-trend-chart/spend-trend-chart.component';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';
import {MOCK_FIRM} from '../../shared/unit-tests/mock-data/firm';

describe('FirmDiscountsComponent', () => {
  let component: FirmDiscountsComponent;
  let fixture: ComponentFixture<FirmDiscountsComponent>;


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
          { provide: Router, useClass: mockServices.MockRouter},
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
    component.data.firm = MOCK_FIRM;
    component.data.config = {
      discount_pa_type: 'bodhala',
      sub_practice_are: 'generic_filter_3'
    };
  });

  it('should create FirmDiscountsComponent', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
});
