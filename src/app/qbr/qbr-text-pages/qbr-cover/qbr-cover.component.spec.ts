import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QbrCoverComponent } from './qbr-cover.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {QbrAgendaComponent} from '../qbr-agenda/qbr-agenda.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock} from '../../../shared/unit-tests/mock-services';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';
import {MOCK_QBR_DATA, MOCK_QBRS} from '../../../shared/unit-tests/mock-data/qbr-executive-summary';
import {IQbrReport} from '../../qbr-model';

describe('QbrCoverComponent', () => {
  let component: QbrCoverComponent;
  let fixture: ComponentFixture<QbrCoverComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(QbrCoverComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
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
    fixture = TestBed.createComponent(QbrCoverComponent);
    component = fixture.componentInstance;
    component.qbr = MOCK_QBRS.result[0] as IQbrReport;
    component.qbrData = MOCK_QBR_DATA.result;
    component.pageNum = 1;
    fixture.detectChanges();
  });

  it('should create QbrCoverComponent', () => {
    expect(component).toBeTruthy();
  });
});
