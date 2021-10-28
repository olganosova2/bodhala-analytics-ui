import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QbrAgendaComponent } from './qbr-agenda.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {QbrTimekeepersComponent} from '../../qbr-top-pas/qbr-timekeepers/qbr-timekeepers.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock} from '../../../shared/unit-tests/mock-services';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';

describe('QbrAgendaComponent', () => {
  let component: QbrAgendaComponent;
  let fixture: ComponentFixture<QbrAgendaComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(QbrAgendaComponent, {
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
    fixture = TestBed.createComponent(QbrAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create QbrAgendaComponent', () => {
    expect(component).toBeTruthy();
  });
});
