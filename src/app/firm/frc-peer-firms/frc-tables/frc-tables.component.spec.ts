import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrcTablesComponent } from './frc-tables.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {FrcNotesComponent} from '../frc-notes/frc-notes.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock} from '../../../shared/unit-tests/mock-services';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';

describe('FrcTimekeepersComponent', () => {
  let component: FrcTablesComponent;
  let fixture: ComponentFixture<FrcTablesComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(FrcTablesComponent, {
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
    fixture = TestBed.createComponent(FrcTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create FrcTimekeepersComponent', () => {
    expect(component).toBeTruthy();
  });
});
