import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverstaffingGridComponent } from './overstaffing-grid.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {ProgressSemiCircleComponent} from '../progress-semi-circle/progress-semi-circle.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {ActivatedRouteMock} from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';

describe('OverstaffingGridComponent', () => {
  let component: OverstaffingGridComponent;
  let fixture: ComponentFixture<OverstaffingGridComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(OverstaffingGridComponent, {
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
    fixture = TestBed.createComponent(OverstaffingGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create OverstaffingGridComponent', () => {
    expect(component).toBeTruthy();
  });
});
