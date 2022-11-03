import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterSummaryCardComponent } from './matter-summary-card.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {MatterTitleBarComponent} from '../matter-title-bar/matter-title-bar.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock } from '../../../shared/unit-tests/mock-services';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';
import {MOCK_MATTER_OVERVIEW} from '../../../shared/unit-tests/mock-data/matter-overview';

describe('MatterSummaryCardComponent', () => {
  let component: MatterSummaryCardComponent;
  let fixture: ComponentFixture<MatterSummaryCardComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(MatterSummaryCardComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
          { provide: ActivatedRoute, useClass: mockServices.ActivatedRouteMock},
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatterSummaryCardComponent);
    component = fixture.componentInstance;
    component.summaryData = MOCK_MATTER_OVERVIEW.result.ade_data[0];
    component.marketData = MOCK_MATTER_OVERVIEW.result.market_data[0];
    fixture.detectChanges();
  });

  it('should create MatterSummaryCardComponent', () => {
    expect(component).toBeTruthy();
  });
});
