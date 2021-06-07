import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkDistributionComponent } from './work-distribution.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {ClientConfigsComponent} from '../client-configs/client-configs.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';

describe('WorkDistributionComponent', () => {
  let component: WorkDistributionComponent;
  let fixture: ComponentFixture<WorkDistributionComponent>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(WorkDistributionComponent, {
      set: {
        providers: [
          AppStateService,
          {provide: Router, useValue: mockRouter},
          {provide: ActivatedRoute, useClass: mockServices.ActivatedRouteMock},
          {provide: FiltersService, useClass: mockServices.FiltersStub},
          {provide: HttpService, useClass: mockServices.DataStub},
          {provide: UserService, useClass: mockServices.UserStub}
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create WorkDistributionComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should loadClient', () => {
    const client = { org_id: 1, org_name: 'AIG', bh_client_id: 190};
    component.loadClient(client);
    expect(component.selectedClient.org_id).toBe(1);
  });
  it('should changeTab to 0', () => {
    component.selectedClient = { org_id: 1, org_name: 'AIG', bh_client_id: 190};
    const evt = { index: 0};
    component.changeTab(evt);
    expect(component.selectedTabIndex).toBe(0);
  });
  it('should changeTab to 1', () => {
    component.selectedClient = null;
    const evt = { index: 1};
    component.changeTab(evt);
    expect(component.selectedTabIndex).toBe(1);
  });
});
