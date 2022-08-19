import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrcFirmComparisonComponent } from './frc-firm-comparison.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {FrcTablesComponent} from '../frc-tables/frc-tables.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock} from '../../../shared/unit-tests/mock-services';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';

describe('FrcFirmComparisonComponent', () => {
  let component: FrcFirmComparisonComponent;
  let fixture: ComponentFixture<FrcFirmComparisonComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(FrcFirmComparisonComponent, {
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
    fixture = TestBed.createComponent(FrcFirmComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create FrcFirmComparisonComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should refreshData', () => {
    component.refreshData({});
    expect(component).toBeTruthy();
  });
});
