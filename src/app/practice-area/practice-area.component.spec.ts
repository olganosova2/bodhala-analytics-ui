import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeAreaComponent } from './practice-area.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../shared/unit-tests/mock-app.imports';
import {FirmComponent} from '../firm/firm.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../shared/unit-tests/mock-services';
import {ActivatedRouteMock} from '../shared/unit-tests/mock-services';
import {MOCK_PRACTICE_AREA} from '../shared/unit-tests/mock-data/practice-area';
import {FiltersService} from '../shared/services/filters.service';

describe('PracticeAreaComponent', () => {
  let component: PracticeAreaComponent;
  let fixture: ComponentFixture<PracticeAreaComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(PracticeAreaComponent, {
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
    fixture = TestBed.createComponent(PracticeAreaComponent);
    component = fixture.componentInstance;
    component.practiceArea = MOCK_PRACTICE_AREA;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should toggleExpenses', () => {
    component.filtersService.includeExpenses =  false;
    component.toggleExpenses();
    const test = component.filtersService.includeExpenses;
    component.toggleExpenses();
    expect(test).toBe(true);
  });
  it('should refreshData', () => {
    component.refreshData(null);
    expect(component).toBeTruthy();
  });
});
