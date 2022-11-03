import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiversityComponent } from './diversity.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {BillingTotalsComponent} from '../billing-totals/billing-totals.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {Router} from '@angular/router';
import {FiltersService} from '../../shared/services/filters.service';
import * as mockServices from '../../shared/unit-tests/mock-services';

describe('DiversityComponent', () => {
  let component: DiversityComponent;
  let fixture: ComponentFixture<DiversityComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(DiversityComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiversityComponent);
    component = fixture.componentInstance;
    component.firmId = 1;
    fixture.detectChanges();
  });

  it('should create DiversityComponent', () => {
    expect(component).toBeTruthy();
  });
});
