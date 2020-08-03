import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EsTotalItemComponent} from './es-total-item.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../../shared/unit-tests/mock-app.imports';
import {ExecutiveSummaryComponent} from '../../executive-summary.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../../../shared/unit-tests/mock-services';
import {ActivatedRouteMock} from '../../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../../shared/services/filters.service';

describe('EsTotalItemComponent', () => {
  let component: EsTotalItemComponent;
  let fixture: ComponentFixture<EsTotalItemComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  const MOCK_ES_ITEM = {
    total: 100,
    name: 'Item 1',
    format: null,
    lastCell: false
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(EsTotalItemComponent, {
      set: {
        providers: [
          AppStateService,
          {provide: Router, useValue: mockRouter},
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
    fixture = TestBed.createComponent(EsTotalItemComponent);
    component = fixture.componentInstance;
    component.item = MOCK_ES_ITEM;
    fixture.detectChanges();
  });

  it('should create EsTotalItemComponent', () => {
    expect(component).toBeTruthy();
  });
});
