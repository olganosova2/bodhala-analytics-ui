import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTimekeepersComponent } from './top-timekeepers.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {TopMattersComponent} from '../top-matters/top-matters.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {Router} from '@angular/router';
import {FiltersService} from '../../shared/services/filters.service';
import * as mockServices from '../../shared/unit-tests/mock-services';

describe('TopTimekeepersComponent', () => {
  let component: TopTimekeepersComponent;
  let fixture: ComponentFixture<TopTimekeepersComponent>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(TopTimekeepersComponent, {
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
  beforeEach(() => {
    fixture = TestBed.createComponent(TopTimekeepersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create TopTimekeepersComponent', () => {
    expect(component).toBeTruthy();
  });
});
