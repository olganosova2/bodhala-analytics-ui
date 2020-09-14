import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import { ReportCardBillingTotalsComponent } from './report-card-billing-totals.component';
import {FiltersService} from '../../../shared/services/filters.service';
import * as mockServices from '../../../shared/unit-tests/mock-services';


describe('ReportCardBillingTotalsComponent', () => {
  let component: ReportCardBillingTotalsComponent;
  let fixture: ComponentFixture<ReportCardBillingTotalsComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(ReportCardBillingTotalsComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCardBillingTotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
   
  it('should create ReportCardBillingTotalsComponent', () => {
    expect(component).toBeTruthy();
  });
});
