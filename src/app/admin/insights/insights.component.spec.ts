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
    fixture.detectChanges();
  });

  it('should create AdminInsightsComponent', () => {
    expect(component).toBeTruthy();
  });
});
