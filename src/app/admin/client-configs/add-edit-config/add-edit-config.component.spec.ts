import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditConfigComponent } from './add-edit-config.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {ClientConfigsComponent} from '../client-configs.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';

describe('AddEditConfigComponent', () => {
  let component: AddEditConfigComponent;
  let fixture: ComponentFixture<AddEditConfigComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(AddEditConfigComponent, {
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
    fixture = TestBed.createComponent(AddEditConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create AddEditConfigComponent', () => {
    expect(component).toBeTruthy();
  });
});
