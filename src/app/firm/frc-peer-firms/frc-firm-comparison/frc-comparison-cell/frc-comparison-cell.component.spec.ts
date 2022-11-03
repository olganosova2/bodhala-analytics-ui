import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrcComparisonCellComponent } from './frc-comparison-cell.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../../shared/unit-tests/mock-app.imports';
import {FrcFirmComparisonComponent} from '../frc-firm-comparison.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock} from '../../../../shared/unit-tests/mock-services';
import * as mockServices from '../../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../../shared/services/filters.service';
import {ICellRendererParams} from 'ag-grid-community';

describe('FrcComparisonCellComponent', () => {
  let component: FrcComparisonCellComponent;
  let fixture: ComponentFixture<FrcComparisonCellComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(FrcComparisonCellComponent, {
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
    fixture = TestBed.createComponent(FrcComparisonCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should agInit', () => {
    const params = { context: { frcMetrics: [ { metricType: 'avg_partner_rate', actual: 100, firms: 120}] },
    data: { metricType: 'avg_partner_rate'}, colDef: { field: 'firms' }} as ICellRendererParams;
    component.agInit(params);
    expect(component.metric).toBeTruthy();
  });
  it('should refresh', () => {
    const params = { checked: false};
    const result = component.refresh(params);
    expect(result).toBe(false);
  });
});
