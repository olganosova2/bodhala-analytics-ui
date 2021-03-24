import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmComponent } from './firm.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../shared/unit-tests/mock-app.imports';
import {InsightsComponent} from '../launchpad/insights/insights.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {FiltersService} from '../shared/services/filters.service';
import * as mockServices from '../shared/unit-tests/mock-services';
import {MOCK_FIRM, MOCK_FIRM_DATA} from '../shared/unit-tests/mock-data/firm';
import {ActivatedRouteMock} from '../shared/unit-tests/mock-services';

describe('FirmComponent', () => {
  let component: FirmComponent;
  let fixture: ComponentFixture<FirmComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(FirmComponent, {
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
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(FirmComponent);
    component = fixture.componentInstance;
    component.firm =  MOCK_FIRM;
    component.firmId = '4702';
    component.firmData = MOCK_FIRM_DATA;
    component.userService.config = {};
    fixture.detectChanges();
  });

  it('should create FirmComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should toggleExpenses', () => {
    component.filtersService.includeExpenses =  false;
    component.toggleExpenses();
    const test = component.filtersService.includeExpenses;
    component.toggleExpenses();
    expect(test).toBe(true);
  });
  it('should refreshData', () => {
    component.refreshData(null);
    expect(component).toBeTruthy();
  });
});
