import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightsCardComponent } from './insights-card.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {BlendedRateCardComponent} from '../blended-rate-card/blended-rate-card.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';
import {CommonService} from '../../../shared/services/common.service';

describe('InsightsCardComponent', () => {
  let component: InsightsCardComponent;
  let fixture: ComponentFixture<InsightsCardComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(InsightsCardComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
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
    fixture = TestBed.createComponent(InsightsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create InsightsCardComponent', () => {
    expect(component).toBeTruthy();
  });
});
