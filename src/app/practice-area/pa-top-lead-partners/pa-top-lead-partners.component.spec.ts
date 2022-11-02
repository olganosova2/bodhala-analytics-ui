import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaTopLeadPartnersComponent } from './pa-top-lead-partners.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {PracticeAreaDropdownComponent} from '../practice-area-dropdown/practice-area-dropdown.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {ActivatedRouteMock} from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';
import {MOCK_PRACTICE_AREA} from '../../shared/unit-tests/mock-data/practice-area';
import {FILTERS_LS} from '../../shared/unit-tests/mock-data/filters';

describe('PaTopLeadPartnersComponent', () => {
  let component: PaTopLeadPartnersComponent;
  let fixture: ComponentFixture<PaTopLeadPartnersComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(PaTopLeadPartnersComponent, {
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
    fixture = TestBed.createComponent(PaTopLeadPartnersComponent);
    component = fixture.componentInstance;
    component.practiceArea = MOCK_PRACTICE_AREA;
    component.clientMatterType = '';
    fixture.detectChanges();
  });

  it('should create PaTopLeadPartnersComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should set local storage', () => {
    const serializedState = JSON.stringify(FILTERS_LS);
    localStorage.setItem('ELEMENTS_dataFilters_397', serializedState);
    component.setLocalStorage();
    expect(component).toBeTruthy();
  });
});
