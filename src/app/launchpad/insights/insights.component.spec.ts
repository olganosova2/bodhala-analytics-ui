import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightsComponent } from './insights.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {LaunchpadComponent} from '../launchpad.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {Router} from '@angular/router';
import {FiltersService} from '../../shared/services/filters.service';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {MOCK_INSIGHTS} from '../../shared/unit-tests/mock-data/insights';

describe('InsightsComponent', () => {
  let component: InsightsComponent;
  let fixture: ComponentFixture<InsightsComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(InsightsComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create InsightsComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should selectInsight', () => {
    component.insights = MOCK_INSIGHTS.result;
    component.selectInsight(0);
    expect(component.selectedInsight).toBeTruthy();
  });
  // it('should goToView', () => {
  //   component.goToView('BB');
  //   expect(component).toBeTruthy();
  // });
});
