import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDropDownComponent } from './client-drop-down.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../unit-tests/mock-app.imports';
import {AdminBenchmarksComponent} from '../../../admin/admin-benchmarks/admin-benchmarks.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../unit-tests/mock-services';
import {ActivatedRouteMock} from '../../unit-tests/mock-services';
import {FiltersService} from '../../services/filters.service';

describe('ClientDropDownComponent', () => {
  let component: ClientDropDownComponent;
  let fixture: ComponentFixture<ClientDropDownComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(ClientDropDownComponent, {
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
    fixture = TestBed.createComponent(ClientDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ClientDropDownComponent', () => {
    expect(component).toBeTruthy();
  });
});
