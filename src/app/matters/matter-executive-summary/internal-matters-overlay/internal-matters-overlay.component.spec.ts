import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalMattersOverlayComponent } from './internal-matters-overlay.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock} from '../../../shared/unit-tests/mock-services';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';
import {MOCK_MATTER_OVERVIEW} from '../../../shared/unit-tests/mock-data/matter-overview';
import {FILTERS, FILTERS_LS} from '../../../shared/unit-tests/mock-data/filters';

describe('InternalMattersOverlayComponent', () => {
  let component: InternalMattersOverlayComponent;
  let fixture: ComponentFixture<InternalMattersOverlayComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(InternalMattersOverlayComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
          { provide: ActivatedRoute, useClass:mockServices.ActivatedRouteMock},
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub }
        ]
      }
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(InternalMattersOverlayComponent);
    component = fixture.componentInstance;
    component.matters = [];
    component.internalMatters = MOCK_MATTER_OVERVIEW.result.internal_matters;
    fixture.detectChanges();
  });

  it('should create InternalMattersOverlayComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should getMatterNames', () => {
    component.getMatterNames();
    expect(component.matters.length).toBe(2);
  });
  it('should viewMatters', () => {
    localStorage.setItem('ELEMENTS_dataFilters_' + component.userService.currentUser.id.toString(), JSON.stringify(FILTERS_LS));
    component.viewMatters(true, 'xxx');
    expect(component.matters.length).toBe(0);
  });
});
