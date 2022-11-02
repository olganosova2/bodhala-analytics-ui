import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtbmsComponent } from './utbms.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {BillingTotalsComponent} from '../billing-totals/billing-totals.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {Router} from '@angular/router';
import {FiltersService} from '../../shared/services/filters.service';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {MOCK_FIRM} from '../../shared/unit-tests/mock-data/firm';
import {taxonomyChartOptions, trendChart, UTBMSChartOptions} from '../firm.model';
import {chainedInstruction} from '@angular/compiler/src/render3/view/util';

describe('UtbmsComponent', () => {
  let component: UtbmsComponent;
  let fixture: ComponentFixture<UtbmsComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(UtbmsComponent, {
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
    fixture = TestBed.createComponent(UtbmsComponent);
    component = fixture.componentInstance;
    component.firmId = 1;
    component.chartUTBMS = Object.assign({}, UTBMSChartOptions);
    component.chartUTBMS.series[0].setData = (data) => {};
    component.chartUTBMS.series[1].setData = (data) => {};
    component.chartTaxonomy = Object.assign({}, taxonomyChartOptions);
    component.chartTaxonomy.series[0].setData = (data) => {};
    component.chartTaxonomy.series[1].setData = (data) => {};
    fixture.detectChanges();
  });

  it('should create UtbmsComponent', () => {
    component.firmId = 1;
    expect(component).toBeTruthy();
  });

  it('should return rgb', () => {
    const temp = component.colorLuminance('ddeeff', 0.15);
    expect(temp).toBe('#feffff');
  });
});
