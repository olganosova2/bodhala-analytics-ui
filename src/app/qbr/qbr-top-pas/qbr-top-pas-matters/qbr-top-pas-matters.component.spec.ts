import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QbrTopPasMattersComponent } from './qbr-top-pas-matters.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {QbrTopPasFirmsComponent} from '../qbr-top-pas-firms/qbr-top-pas-firms.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock} from '../../../shared/unit-tests/mock-services';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';

describe('QbrTopPasMattersComponent', () => {
  let component: QbrTopPasMattersComponent;
  let fixture: ComponentFixture<QbrTopPasMattersComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(QbrTopPasMattersComponent, {
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
    fixture = TestBed.createComponent(QbrTopPasMattersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create QbrTopPasMattersComponent', () => {
    expect(component).toBeTruthy();
  });
});
