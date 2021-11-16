import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QbrDeckComponent } from './qbr-deck.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {QbrExecutiveSummaryRightComponent} from '../qbr-executive-summary/qbr-executive-summary-right/qbr-executive-summary-right.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock} from '../../shared/unit-tests/mock-services';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';
import {MOCK_QBR_DATA, MOCK_QBRS} from '../../shared/unit-tests/mock-data/qbr-executive-summary';
import {IQbrReport} from '../qbr-model';

describe('QbrDeckComponent', () => {
  let component: QbrDeckComponent;
  let fixture: ComponentFixture<QbrDeckComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(QbrDeckComponent, {
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
    fixture = TestBed.createComponent(QbrDeckComponent);
    component = fixture.componentInstance;
    component.qbr = MOCK_QBRS.result[0] as IQbrReport;
    component.qbrData = MOCK_QBR_DATA.result;
    fixture.detectChanges();
  });

  it('should create QbrDeckComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should changeTab', () => {
    const tab = { index: 1, tab: { textLabel: 'TabLabel'}};
    component.changeTab(tab);
    expect(component.selectedTabIndex).toBe(1);
  });
  it('should goBack', () => {
    component.goBack();
    expect (mockRouter.navigate).toHaveBeenCalledWith([ '/analytics-ui/qbrs/dashboard' ]);
  });
  it('should goToEdit', () => {
    component.qbr.id = 4;
    component.goToEdit();
    expect (mockRouter.navigate).toHaveBeenCalledWith([ '/analytics-ui/qbrs/edit/4' ]);
  });
});
