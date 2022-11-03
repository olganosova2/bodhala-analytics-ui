import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrcDashboardComponent } from './frc-dashboard.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock} from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {MOCK_FRC_TRENDS_DATA, MOCK_PEER_FIRMS_ARRAY} from '../../../shared/unit-tests/mock-data/frc';

describe('FrcDashboardComponent', () => {
  let component: FrcDashboardComponent;
  let fixture: ComponentFixture<FrcDashboardComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(FrcDashboardComponent, {
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
    fixture = TestBed.createComponent(FrcDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create FrcDashboardComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should addFirm', () => {
    component.selectedFirms = [];
    component.addFirm({ data: {id: 1}});
    expect(component.selectedFirms.length).toBe(1);
  });
  it('should refreshData', () => {
    component.refreshData({ data: {id: 1}});
    expect(component.selectedFirms.length).toBe(0);
  });
  it('should deleteFirm', () => {
    component.selectedFirms = [ 1, 2, 3];
    component.deleteFirm({ data: {id: 1}});
    expect(component.selectedFirms.length).toBe(2);
  });
  it('should formatLargeData', () => {
    component.frcData = MOCK_PEER_FIRMS_ARRAY.result;
    component.formatLargeData();
    expect(component.formattedMetrics.length).toBeGreaterThan(0);
  });
});
