import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrcReportTitleComponent } from './frc-report-title.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock} from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';
import * as mockServices from '../../../shared/unit-tests/mock-services';

describe('FrcReportTitleComponent', () => {
  let component: FrcReportTitleComponent;
  let fixture: ComponentFixture<FrcReportTitleComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(FrcReportTitleComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
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
    fixture = TestBed.createComponent(FrcReportTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create FrcReportTitleComponent', () => {
    expect(component).toBeTruthy();
  });
});
