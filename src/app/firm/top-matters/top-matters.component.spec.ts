import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMattersComponent } from './top-matters.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {BillingTotalsComponent} from '../billing-totals/billing-totals.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {Router} from '@angular/router';
import {FiltersService} from '../../shared/services/filters.service';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {MOCK_FIRM} from '../../shared/unit-tests/mock-data/firm';

describe('TopMattersComponent', () => {
  let component: TopMattersComponent;
  let fixture: ComponentFixture<TopMattersComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(TopMattersComponent, {
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
    fixture = TestBed.createComponent(TopMattersComponent);
    component = fixture.componentInstance;
    component.firm =  MOCK_FIRM;
    component.firmId = 1;
    fixture.detectChanges();
  });

  it('should create TopMattersComponent', () => {
    expect(component).toBeTruthy();
  });
});
