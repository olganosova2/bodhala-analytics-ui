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

describe('SavingsWidgetComponent', () => {
  let component: SavingsWidgetComponent;
  let fixture: ComponentFixture<SavingsWidgetComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
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
          { provide: Router, useValue: mockRouter},
          { provide: ActivatedRoute, useClass: ActivatedRouteMock },
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub }
        ]
      }
    })
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
});
