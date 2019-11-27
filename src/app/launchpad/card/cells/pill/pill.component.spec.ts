import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PillComponent } from './pill.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../../shared/unit-tests/mock-app.imports';
import {LaunchpadComponent} from '../../../launchpad.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {Router} from '@angular/router';
import {FiltersService} from '../../../../shared/services/filters.service';
import * as mockServices from '../../../../shared/unit-tests/mock-services';

describe('PillComponent', () => {
  let component: PillComponent;
  let fixture: ComponentFixture<PillComponent>;

  TestBed.configureTestingModule({
    imports: IMPORTS,
    declarations: DECLARATIONS,
    providers: PROVIDERS,
    schemas: SCHEMAS
  }).overrideComponent(PillComponent, {
    set: {
      providers: [
        AppStateService,
        { provide: FiltersService, useClass: mockServices.FiltersStub },
        { provide: HttpService, useClass: mockServices.DataStub },
        { provide: UserService, useClass: mockServices.UserStub }
      ]
    }
  })
    .compileComponents();

  beforeEach(() => {
    fixture = TestBed.createComponent(PillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
