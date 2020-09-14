import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import { ReportCardBillingTotalItemComponent } from './report-card-billing-total-item.component';
import {FiltersService} from '../../../../shared/services/filters.service';
import * as mockServices from '../../../../shared/unit-tests/mock-services';

describe('ReportCardBillingTotalItemComponent', () => {
  let component: ReportCardBillingTotalItemComponent;
  let fixture: ComponentFixture<ReportCardBillingTotalItemComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(ReportCardBillingTotalItemComponent, {
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
    fixture = TestBed.createComponent(ReportCardBillingTotalItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ReportCardBillingTotalItemComponent', () => {
    expect(component).toBeTruthy();
  });
});
