import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingTotalsComponent } from './billing-totals.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {FirmComponent} from '../firm.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {Router} from '@angular/router';
import {FiltersService} from '../../shared/services/filters.service';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {MOCK_FIRM} from '../../shared/unit-tests/mock-data/firm';
import {IFirm} from '../firm.model';

describe('BillingTotalsComponent', () => {
  let component: BillingTotalsComponent;
  let fixture: ComponentFixture<BillingTotalsComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(BillingTotalsComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useValue: mockRouter},
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub }
        ]
      }
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(BillingTotalsComponent);
    component = fixture.componentInstance;
    component.firm = MOCK_FIRM as IFirm;
    fixture.detectChanges();
  });

  it('should create BillingTotalsComponent', () => {
    expect(component).toBeTruthy();
  });
});
