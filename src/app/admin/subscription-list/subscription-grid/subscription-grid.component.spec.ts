import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionGridComponent } from './subscription-grid.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {WorkDistributionByPaComponent} from '../../work-distribution/work-distribution-by-pa/work-distribution-by-pa.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';
import {MOCK_SUBSCRIPTION_GROUP_DATA} from '../../../shared/unit-tests/mock-data/subscriptions';

describe('SubscriptionGridComponent', () => {
  let component: SubscriptionGridComponent;
  let fixture: ComponentFixture<SubscriptionGridComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(SubscriptionGridComponent, {
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
    fixture = TestBed.createComponent(SubscriptionGridComponent);
    component = fixture.componentInstance;
    component.groupData = MOCK_SUBSCRIPTION_GROUP_DATA;
    fixture.detectChanges();
  });

  it('should create SubscriptionGridComponent', () => {
    expect(component).toBeTruthy();
  });
});
