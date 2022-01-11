import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterExecutiveSummaryComponent } from './matter-executive-summary.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {CirpMatterSummaryComponent} from '../cirp-matter-summary/cirp-matter-summary.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock} from '../../shared/unit-tests/mock-services';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';
import {MOCK_MATTER_OVERVIEW} from '../../shared/unit-tests/mock-data/matter-overview';

describe('MatterExecutiveSummaryComponent', () => {
  let component: MatterExecutiveSummaryComponent;
  let fixture: ComponentFixture<MatterExecutiveSummaryComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(MatterExecutiveSummaryComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useValue: mockRouter},
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
    fixture = TestBed.createComponent(MatterExecutiveSummaryComponent);
    component = fixture.componentInstance;
    component.summaryData = MOCK_MATTER_OVERVIEW.result.ade_data[0];
    component.marketData = MOCK_MATTER_OVERVIEW.result.market_data[0];
    fixture.detectChanges();
  });

  it('should create MatterExecutiveSummaryComponent', () => {
    expect(component).toBeTruthy();
  });
});
