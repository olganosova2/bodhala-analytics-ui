import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressSemiCircleComponent } from './progress-semi-circle.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {SavingsWidgetComponent} from '../savings-widget/savings-widget.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {ActivatedRouteMock} from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';

describe('ProgressSemiCircleComponent', () => {
  let component: ProgressSemiCircleComponent;
  let fixture: ComponentFixture<ProgressSemiCircleComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(ProgressSemiCircleComponent, {
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
    fixture = TestBed.createComponent(ProgressSemiCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ProgressSemiCircleComponent', () => {
    expect(component).toBeTruthy();
  });
});
