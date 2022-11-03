import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendOverviewComponent } from './spend-overview.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {EsTotalItemComponent} from './es-total-item/es-total-item.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {ActivatedRouteMock} from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';

describe('SpendOverviewComponent', () => {
  let component: SpendOverviewComponent;
  let fixture: ComponentFixture<SpendOverviewComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(SpendOverviewComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
          {provide: ActivatedRoute, useClass: ActivatedRouteMock},
          {provide: FiltersService, useClass: mockServices.FiltersStub},
          {provide: HttpService, useClass: mockServices.DataStub},
          {provide: UserService, useClass: mockServices.UserStub}
        ]
      }
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SpendOverviewComponent);
    component = fixture.componentInstance;
    component.maxDate = '2019-06-24';
    fixture.detectChanges();
  });

  it('should create SpendOverviewComponent', () => {
    expect(component).toBeTruthy();
  });
});
