import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodhalaChartLegendComponent } from './bodhala-chart-legend.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../unit-tests/mock-app.imports';
import {BillingTotalsComponent} from '../../../firm/billing-totals/billing-totals.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {Router} from '@angular/router';
import {FiltersService} from '../../services/filters.service';
import * as mockServices from '../../unit-tests/mock-services';

describe('BodhalaChartLegendComponent', () => {
  let component: BodhalaChartLegendComponent;
  let fixture: ComponentFixture<BodhalaChartLegendComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(BodhalaChartLegendComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodhalaChartLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create BodhalaChartLegendComponent', () => {
    expect(component).toBeTruthy();
  });
});
