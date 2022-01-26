import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterInsightsComponent } from './matter-insights.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';
import {CommonService} from '../../../shared/services/common.service';

describe('MatterInsightsComponent', () => {
  let component: MatterInsightsComponent;
  let fixture: ComponentFixture<MatterInsightsComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(MatterInsightsComponent, {
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
    fixture = TestBed.createComponent(MatterInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create MatterInsightsComponent', () => {
    expect(component).toBeTruthy();
  });
});
