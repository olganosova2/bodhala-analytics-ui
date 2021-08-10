import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoyRateIncreaseComponent } from './yoy-rate-increase.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {SubscriptionListComponent} from '../../admin/subscription-list/subscription-list.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';

describe('YoyRateIncreaseComponent', () => {
  let component: YoyRateIncreaseComponent;
  let fixture: ComponentFixture<YoyRateIncreaseComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(YoyRateIncreaseComponent, {
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
    fixture = TestBed.createComponent(YoyRateIncreaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create YoyRateIncreaseComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should changePageSize', () => {
    const params = { value: 10};
    component.changePageSize(params);
    expect(component.paginationPageSize).toBe(10);
  });
});
