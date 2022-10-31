import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrcComparisonHeaderComponent } from './frc-comparison-header.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../../shared/unit-tests/mock-app.imports';
import {FrcComparisonCellComponent} from '../frc-comparison-cell/frc-comparison-cell.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock} from '../../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../../shared/services/filters.service';
import * as mockServices from '../../../../shared/unit-tests/mock-services';
import {ICellRendererParams, IHeaderParams} from 'ag-grid-community';

describe('FrcComparisonHeaderComponent', () => {
  let component: FrcComparisonHeaderComponent;
  let fixture: ComponentFixture<FrcComparisonHeaderComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(FrcComparisonHeaderComponent, {
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
    fixture = TestBed.createComponent(FrcComparisonHeaderComponent);
    component = fixture.componentInstance;
    component.params = { column: { colId: 'firm_1'}} as any;
    fixture.detectChanges();
  });

  it('should create FrcComparisonHeaderComponent', () => {
    expect(component).toBeTruthy();
  });
});
