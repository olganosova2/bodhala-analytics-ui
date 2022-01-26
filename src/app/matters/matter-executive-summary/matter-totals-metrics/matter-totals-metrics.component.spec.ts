import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterTotalsMetricsComponent } from './matter-totals-metrics.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {MatterTotalSpendComponent} from '../matter-total-spend/matter-total-spend.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {ActivatedRouteMock} from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';

describe('MatterTotalsMetricsComponent', () => {
  let component: MatterTotalsMetricsComponent;
  let fixture: ComponentFixture<MatterTotalsMetricsComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(MatterTotalsMetricsComponent, {
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
    fixture = TestBed.createComponent(MatterTotalsMetricsComponent);
    component = fixture.componentInstance;
    component.firmId = 4;
    component.matterId = 'OOO';
    component.clientId = '110';
    fixture.detectChanges();
  });

  it('should create MatterTotalsMetricsComponent', () => {
    expect(component).toBeTruthy();
  });
});
