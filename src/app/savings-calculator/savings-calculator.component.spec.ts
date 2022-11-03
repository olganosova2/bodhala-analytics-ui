import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsCalculatorComponent } from './savings-calculator.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../shared/unit-tests/mock-app.imports';
import {MattersComponent} from '../matters/matters.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../shared/unit-tests/mock-services';
import {ActivatedRouteMock} from '../shared/unit-tests/mock-services';
import {FiltersService} from '../shared/services/filters.service';
import {MOCK_SAVINGS_BY_FIRM} from '../shared/unit-tests/mock-data/savings-by-firm';

describe('SavingsCalculatorComponent', () => {
  let component: SavingsCalculatorComponent;
  let fixture: ComponentFixture<SavingsCalculatorComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(SavingsCalculatorComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
          { provide: ActivatedRoute, useClass: mockServices.ActivatedRouteMock},
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub }
        ]
      }
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(SavingsCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create SavingsCalculatorComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should getSavingsCalculator', () => {
    component.getSavingsCalculator({});
    expect(component).toBeTruthy();
  });
  it('should buildTableRecords', () => {
    component.calcDataTable = MOCK_SAVINGS_BY_FIRM.result;
    component.buildTableRecords();
    expect(component).toBeTruthy();
  });
});
