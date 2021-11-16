import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QbrTopPasFirmsComponent } from './qbr-top-pas-firms.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {QbrTimekeepersComponent} from '../qbr-timekeepers/qbr-timekeepers.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock} from '../../../shared/unit-tests/mock-services';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';
import {MOCK_QBR_DATA, MOCK_QBRS} from '../../../shared/unit-tests/mock-data/qbr-executive-summary';
import {IQbrReport} from '../../qbr-model';

describe('QbrTopPasFirmsComponent', () => {
  let component: QbrTopPasFirmsComponent;
  let fixture: ComponentFixture<QbrTopPasFirmsComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(QbrTopPasFirmsComponent, {
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
    fixture = TestBed.createComponent(QbrTopPasFirmsComponent);
    component = fixture.componentInstance;
    component.qbr = MOCK_QBRS.result[0] as IQbrReport;
    component.qbrData = MOCK_QBR_DATA.result;
    fixture.detectChanges();
  });

  it('should create QbrTopPasFirmsComponent', () => {
    expect(component).toBeTruthy();
  });
});
