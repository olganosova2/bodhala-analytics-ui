import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoyNumberWidgetComponent } from './yoy-number-widget.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {QbrExecutiveSummaryComponent} from '../qbr-executive-summary/qbr-executive-summary.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock } from '../../shared/unit-tests/mock-services';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';
import {QbrType} from '../qbr-model';

describe('YoyNumberWidgetComponent', () => {
  let component: YoyNumberWidgetComponent;
  let fixture: ComponentFixture<YoyNumberWidgetComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(YoyNumberWidgetComponent, {
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
    fixture = TestBed.createComponent(YoyNumberWidgetComponent);
    component = fixture.componentInstance;
    component.qbrType = QbrType.YoY;
    fixture.detectChanges();
  });

  it('should create YoyNumberWidgetComponent', () => {
    expect(component).toBeTruthy();
  });
});
