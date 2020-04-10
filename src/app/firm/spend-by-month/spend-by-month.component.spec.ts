import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendByMonthComponent } from './spend-by-month.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {TopMattersComponent} from '../top-matters/top-matters.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {Router} from '@angular/router';
import {FiltersService} from '../../shared/services/filters.service';
import * as mockServices from '../../shared/unit-tests/mock-services';

describe('SpendByMonthComponent', () => {
  let component: SpendByMonthComponent;
  let fixture: ComponentFixture<SpendByMonthComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(SpendByMonthComponent, {
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
    fixture = TestBed.createComponent(SpendByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create SpendByMonthComponent', () => {
    expect(component).toBeTruthy();
  });
});
