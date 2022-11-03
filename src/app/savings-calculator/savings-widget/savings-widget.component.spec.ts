import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsWidgetComponent } from './savings-widget.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {SavingsCalculatorComponent} from '../savings-calculator.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {ActivatedRouteMock} from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';
import {OverstaffingGridComponent} from '../overstaffing-grid/overstaffing-grid.component';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {MOCK_METRIC} from '../../shared/unit-tests/mock-data/savings-calculator';
import {CommonService} from '../../shared/services/common.service';

describe('SavingsWidgetComponent', () => {
  let component: SavingsWidgetComponent;
  let fixture: ComponentFixture<SavingsWidgetComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(SavingsWidgetComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
          { provide: ActivatedRoute, useClass:mockServices.ActivatedRouteMock},
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub },
          { provide: CommonService, useClass: mockServices.CommonServiceStub }
        ]
      }
    });
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ OverstaffingGridComponent ]
      }
    });
    TestBed.compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(SavingsWidgetComponent);
    component = fixture.componentInstance;
    component.metric = MOCK_METRIC;
    fixture.detectChanges();
  });

  it('should create SavingsWidgetComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should create format Label', () => {
    const result = component.formatLabel(123);
    expect(result).toBe('123%');
  });
  it('should openDetails', () => {
    component.openDetails();
    expect(component.dialog).toBeTruthy();
  });
  it('should showTooltip', () => {
    component.showTooltip();
    expect(component.dialog).toBeTruthy();
  });
  it('should onClickedOutside', () => {
    component.isTooltipOpened = true;
    component.onClickedOutside(null);
    expect(component.isTooltipOpened).toBe(false);
  });
});
