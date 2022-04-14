import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// tslint:disable-next-line:import-spacing
import  {AdminInsightsComponent} from './insights.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {InsightsCardComponent} from './insights-card/insights-card.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';
import {CommonService} from '../../shared/services/common.service';
import {MOCK_ADMIN_INSIGHTS} from '../../shared/unit-tests/mock-data/client-configs';
import {IBPI, IDates, IInvoiceIQItem, ISummary} from './models';
import {MOCK_SUMMARY_INSIGHT} from '../../shared/unit-tests/mock-data/insights';

describe('AdminInsightsComponent', () => {
  let component: AdminInsightsComponent;
  let fixture: ComponentFixture<AdminInsightsComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(AdminInsightsComponent, {
      set: {
        providers: [
          AppStateService,
          {provide: Router, useValue: mockRouter},
          {provide: ActivatedRoute, useClass: mockServices.ActivatedRouteMock},
          {provide: FiltersService, useClass: mockServices.FiltersStub},
          {provide: HttpService, useClass: mockServices.DataStub},
          {provide: UserService, useClass: mockServices.UserStub},
          { provide: CommonService, useClass: mockServices.CommonServiceStub }
        ]
      }
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInsightsComponent);
    component = fixture.componentInstance;
    component.page = 'Insights';
    fixture.detectChanges();
  });

  it('should create AdminInsightsComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should loadClients', () => {
    component.loadClients();
    expect(component.clients.length).toBeTruthy();
  });
  it('should getClientInsights', () => {
    const client = {
      bh_client_id: 1,
    org_name: 'Org',
    org_id: 1,
    missingSmartPA: false
  };
    component.getClientInsights(client);
    expect(component.clients.length).toBeTruthy();
  });
  it('should saveInsight', () => {
    const insight = MOCK_ADMIN_INSIGHTS.result[0];
    component.selectedInsight = Object.assign({}, insight);
    component.saveInsight(insight);
    expect(insight).toBeTruthy();
  });
  it('should selectMatter', () => {
    const insight = MOCK_ADMIN_INSIGHTS.result[0];
    component.selectMatter(insight);
    expect(component.selectedInsight.insight_type).toBe('BB');
  });
  it('should ngOnInit for BM', () => {
    component.page = 'BM';
    component.selectedClient = { bh_client_id: 110, org_id: 251, org_name: 'Blackrock'};
    component.ngOnInit();
    expect(component.selectedClientId).toBe(110);
  });
  it('should ngOnInit for rateBM', () => {
    component.page = 'rateBM';
    component.rateBM = { bh_lawfirm_id: 87 };
    component.selectedClient = { bh_client_id: 110, org_id: 251, org_name: 'Blackrock'};
    component.ngOnInit();
    expect(component.selectedClientId).toBe(110);
  });
  it('should formatData', () => {
    const summary = MOCK_SUMMARY_INSIGHT.result as ISummary;
    component.selectedClient = { bh_client_id: 110, org_id: 251, org_name: 'Blackrock'};
    component.formatData(summary);
    expect(component.summary.invoiceIQ_current.length).toBe(0);
  });

});
