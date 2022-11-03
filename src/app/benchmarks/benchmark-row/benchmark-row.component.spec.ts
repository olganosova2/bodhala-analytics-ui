import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenchmarkRowComponent } from './benchmark-row.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {BenchmarkOverviewComponent} from '../benchmark-overview/benchmark-overview.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock } from '../../shared/unit-tests/mock-services';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';
import {MOCK_BM_ROW} from '../../shared/unit-tests/mock-data/benchmarking';

describe('BenchmarkRowComponent', () => {
  let component: BenchmarkRowComponent;
  let fixture: ComponentFixture<BenchmarkRowComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(BenchmarkRowComponent, {
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
    fixture = TestBed.createComponent(BenchmarkRowComponent);
    component = fixture.componentInstance;
    component.dataRow = MOCK_BM_ROW;
    fixture.detectChanges();
  });

  it('should create BenchmarkRowComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should openGroup', () => {
    const row = MOCK_BM_ROW;
    component.openGroup(row);
    expect(row.isExpanded).toBe(true);
  });
  it('should showFirm when Child', () => {
   component.dataRow.isChild = true;
   component.showFirm();
   expect(component.dataRow.isChild).toBe(true);
  });
  it('should showFirm when NOT Child', () => {
    component.dataRow.isChild = false;
    component.showFirm();
    expect(component.dataRow.isChild).toBe(false);
  });
  it('should showFirm when NOT Child and isFirmDetail is true', () => {
    component.dataRow.isChild = false;
    component.showFirm();
    component.isFirmDetail = false;
    expect(component.dataRow.isChild).toBe(false);
  });
  it('should formatDelta', () => {
    const formatted = component.formatDelta(5);
    expect(formatted).toBe('-5%');
  });
});
