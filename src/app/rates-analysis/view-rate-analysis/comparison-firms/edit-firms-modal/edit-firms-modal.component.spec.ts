import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFirmsModalComponent } from './edit-firms-modal.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../../../shared/unit-tests/mock-services';

describe('EditFirmsModalComponent', () => {
  let component: EditFirmsModalComponent;
  let fixture: ComponentFixture<EditFirmsModalComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(EditFirmsModalComponent, {
      set: {
        providers: [
          AppStateService,
          {provide: ActivatedRoute, useClass: mockServices.ActivatedRouteMock},
          {provide: HttpService, useClass: mockServices.DataStub},
          {provide: UserService, useClass: mockServices.UserStub}
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFirmsModalComponent);
    component = fixture.componentInstance;
    component.gridOptions = component.agGridService.getDefaultGridOptions();
    component.firstLoad = true;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
