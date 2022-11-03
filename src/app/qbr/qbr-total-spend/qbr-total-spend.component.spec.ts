import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QbrTotalSpendComponent} from './qbr-total-spend.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {ActivatedRouteMock} from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';
import {QbrType} from '../qbr-model';

describe('QbrTotalSpendComponent', () => {
  let component: QbrTotalSpendComponent;
  let fixture: ComponentFixture<QbrTotalSpendComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(QbrTotalSpendComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
          { provide: ActivatedRoute, useClass:mockServices.ActivatedRouteMock},
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QbrTotalSpendComponent);
    component = fixture.componentInstance;
    component.qbrType = QbrType.YoY;
    fixture.detectChanges();
  });

  it('should create QbrTotalSpendComponent', () => {
    expect(component).toBeTruthy();
  });
});
