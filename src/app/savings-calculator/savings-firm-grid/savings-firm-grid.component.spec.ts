import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsFirmGridComponent } from './savings-firm-grid.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {OverstaffingGridComponent} from '../overstaffing-grid/overstaffing-grid.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {ActivatedRouteMock} from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';

describe('SavingsFirmGridComponent', () => {
  let component: SavingsFirmGridComponent;
  let fixture: ComponentFixture<SavingsFirmGridComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(SavingsFirmGridComponent, {
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
    fixture = TestBed.createComponent(SavingsFirmGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create SavingsFirmGridComponent', () => {
    expect(component).toBeTruthy();
  });
});
