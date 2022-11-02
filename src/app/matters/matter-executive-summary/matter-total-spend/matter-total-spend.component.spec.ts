import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterTotalSpendComponent } from './matter-total-spend.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {MatterTotalPanelComponent} from '../matter-total-panel/matter-total-panel.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock} from '../../../shared/unit-tests/mock-services';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';
import {MOCK_MATTER_OVERVIEW} from '../../../shared/unit-tests/mock-data/matter-overview';

describe('MatterTotalSpendComponent', () => {
  let component: MatterTotalSpendComponent;
  let fixture: ComponentFixture<MatterTotalSpendComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(MatterTotalSpendComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
          { provide: ActivatedRoute, useClass: ActivatedRouteMock },
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub }
        ]
      }
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(MatterTotalSpendComponent);
    component = fixture.componentInstance;
    component.summaryData = MOCK_MATTER_OVERVIEW.result.ade_data[0];
    component.marketData = MOCK_MATTER_OVERVIEW.result.market_data[0];
    component.internalData = MOCK_MATTER_OVERVIEW.result.internal_data[0];
    fixture.detectChanges();
  });

  it('should create MatterTotalSpendComponent', () => {
    expect(component).toBeTruthy();
  });
});
