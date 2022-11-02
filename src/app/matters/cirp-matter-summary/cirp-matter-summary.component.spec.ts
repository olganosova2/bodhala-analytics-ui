import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CirpMatterSummaryComponent } from './cirp-matter-summary.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {FirmComponent} from '../../firm/firm.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {ActivatedRouteMock} from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';

describe('CirpMatterSummaryComponent', () => {
  let component: CirpMatterSummaryComponent;
  let fixture: ComponentFixture<CirpMatterSummaryComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(CirpMatterSummaryComponent, {
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
    fixture = TestBed.createComponent(CirpMatterSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create CirpMatterSummaryComponent', () => {
    expect(component).toBeTruthy();
  });
});
