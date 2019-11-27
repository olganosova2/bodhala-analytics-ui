import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchpadComponent } from './launchpad.component';
import { LaunchPadService} from './launchpad.service';

import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';

import * as mockServices from '../shared/unit-tests/mock-services';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../shared/unit-tests/mock-app.imports';
import {Router} from '@angular/router';
import {FiltersService} from '../shared/services/filters.service';

describe('LaunchpadComponent', () => {
  let component: LaunchpadComponent;
  let fixture: ComponentFixture<LaunchpadComponent>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(LaunchpadComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useValue: mockRouter},
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub }
        ]
      }
    })
      .compileComponents();
  }));

  const mockRequests = {topMatters: Promise.resolve([])};

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchpadComponent);
    component = fixture.componentInstance;
    const launchpadService = fixture.debugElement.injector.get(LaunchPadService);
    spyOn(launchpadService, 'fetchData').and.returnValue(mockRequests);
    fixture.detectChanges();
  });

  it('should create LaunchpadComponent', () => {
    expect(component).toBeTruthy();
  });
});
