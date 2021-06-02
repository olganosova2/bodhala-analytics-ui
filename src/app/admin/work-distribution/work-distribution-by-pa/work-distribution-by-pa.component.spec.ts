import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkDistributionByPaComponent } from './work-distribution-by-pa.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {WorkDistributionComponent} from '../work-distribution.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';

describe('WorkDistributionByPaComponent', () => {
  let component: WorkDistributionByPaComponent;
  let fixture: ComponentFixture<WorkDistributionByPaComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(WorkDistributionByPaComponent, {
      set: {
        providers: [
          AppStateService,
          {provide: Router, useValue: mockRouter},
          {provide: ActivatedRoute, useClass: mockServices.ActivatedRouteMock},
          {provide: FiltersService, useClass: mockServices.FiltersStub},
          {provide: HttpService, useClass: mockServices.DataStub},
          {provide: UserService, useClass: mockServices.UserStub}
        ]
      }
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(WorkDistributionByPaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create WorkDistributionByPaComponent', () => {
    expect(component).toBeTruthy();
  });
});
