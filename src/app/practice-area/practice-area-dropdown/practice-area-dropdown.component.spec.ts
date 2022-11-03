import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeAreaDropdownComponent } from './practice-area-dropdown.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {PracticeAreaComponent} from '../practice-area.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {ActivatedRouteMock} from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';
import {MOCK_PRACTICE_AREA, MOCK_PRACTICE_AREAS} from '../../shared/unit-tests/mock-data/practice-area';


describe('PracticeAreaDropdownComponent', () => {
  let component: PracticeAreaDropdownComponent;
  let fixture: ComponentFixture<PracticeAreaDropdownComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(PracticeAreaDropdownComponent, {
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
    fixture = TestBed.createComponent(PracticeAreaDropdownComponent);
    component = fixture.componentInstance;
    component.clientMatterType = 'LITIGATION';
    component.currentPracticeArea = 'LITIGATION';
    component.practiceAreaSetting = 'Client Practice Areas';
    fixture.detectChanges();
  });

  it('should create PracticeAreaDropdownComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should getPracticeAreasList with name <= 45', () => {
    component.getPracticeAreasList();
    expect(component.dropdownWidth.width).toBe('325px');
  });
  it('should getPracticeAreasList with name > 45', () => {
    component.currentPracticeArea = 'PRODUCTS LIABILITY PRODUCTS LIABILITY PRODUCTS LIA';
    component.getPracticeAreasList();
    expect(component.dropdownWidth.width).toBe('425px');
  });
  it('should getPracticeAreasList with name > 55', () => {
    component.currentPracticeArea = 'PRODUCTS LIABILITY PRODUCTS LIABILITY PRODUCTS LIABILITY PRODUCT';
    component.getPracticeAreasList();
    expect(component.dropdownWidth.width).toBe('525px');
  });
});
