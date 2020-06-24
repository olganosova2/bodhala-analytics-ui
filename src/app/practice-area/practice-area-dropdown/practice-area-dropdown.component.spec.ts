import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeAreaDropdownComponent } from './practice-area-dropdown.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {PracticeAreaComponent} from '../practice-area.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {ActivatedRouteMock} from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';

describe('PracticeAreaDropdownComponent', () => {
  let component: PracticeAreaDropdownComponent;
  let fixture: ComponentFixture<PracticeAreaDropdownComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
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
    fixture = TestBed.createComponent(PracticeAreaDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create PracticeAreaDropdownComponent', () => {
    expect(component).toBeTruthy();
  });
});
