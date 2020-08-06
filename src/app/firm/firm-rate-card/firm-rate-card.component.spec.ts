import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmRateCardComponent } from './firm-rate-card.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {ScoreTrendComponent} from '../score-trend/score-trend.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {FiltersService} from '../../shared/services/filters.service';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {MOCK_FIRM} from '../../shared/unit-tests/mock-data/firm';
import {IFirm} from '../firm.model';
import {ActivatedRouteMock} from '../../shared/unit-tests/mock-services';

describe('FirmRateCardComponent', () => {
  let component: FirmRateCardComponent;
  let fixture: ComponentFixture<FirmRateCardComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(FirmRateCardComponent, {
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
    fixture = TestBed.createComponent(FirmRateCardComponent);
    component = fixture.componentInstance;
    component.firm = MOCK_FIRM as IFirm;
    component.firmId = '87';
    fixture.detectChanges();
  });

  it('should create FirmRateCardComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should initFirm', () => {
    component.otherFirms = true;
   // component.firmId = '87';
    component.initFirm();
    expect(component.rank).toBe(-1);
  });
  it('should navigate', () => {
    component.editReportCard();
    expect(component).toBeTruthy();
  });
  it('should goToTop', () => {
    component.goToTop();
    expect(component).toBeTruthy();
  });
});
