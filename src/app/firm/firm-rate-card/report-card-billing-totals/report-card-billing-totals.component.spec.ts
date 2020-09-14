import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import { ReportCardBillingTotalsComponent } from './report-card-billing-totals.component';
import {FiltersService} from '../../../shared/services/filters.service';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {MOCK_FIRM, MOCK_TOTALS_RAW, MOCK_OTHER_FIRMS} from '../../../shared/unit-tests/mock-data/firm';
import {IFirm} from '../../firm.model';


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
    component.firm = MOCK_FIRM as IFirm;
    fixture.detectChanges();
  });
   
  it('should create ReportCardBillingTotalsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should create ReportCardBillingTotalsComponent RC', () => {
    component.isReportCard = true;
    component.loadTotals();
    expect(component).toBeTruthy();
  });

  it('should create ReportCardBillingTotalsComponent Comparison', () => {
    component.isReportCard = false;
    component.isComparison = true;
    component.loadTotals();
    expect(component).toBeTruthy();
  });

  it('should create ReportCardBillingTotalsComponent Comparison (SL)', () => {
    component.isReportCard = false;
    component.isComparison = true;
    component.firstLoad = false;
    component.filtersService.includeExpenses = true;
    component.reportCardStartDate = '2019-09-25';
    component.reportCardEndDate = '2017-09-25';
    
    component.loadTotals();
    expect(component).toBeTruthy();
  });

  it('should calculateDiffs', () => {
    component.totalsRaw = MOCK_TOTALS_RAW;
    component.otherFirms = MOCK_OTHER_FIRMS;
    component.calculateDiffs(component.totalsRaw, component.otherFirms);
    expect(component).toBeTruthy();
  });
});
