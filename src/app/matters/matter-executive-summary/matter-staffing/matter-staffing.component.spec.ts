import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterStaffingComponent } from './matter-staffing.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {MatterTotalSpendComponent} from '../matter-total-spend/matter-total-spend.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock} from '../../../shared/unit-tests/mock-services';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';

describe('MatterStaffingComponent', () => {
  let component: MatterStaffingComponent;
  let fixture: ComponentFixture<MatterStaffingComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(MatterStaffingComponent, {
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
    fixture = TestBed.createComponent(MatterStaffingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create MatterStaffingComponent', () => {
    expect(component).toBeTruthy();
  });
});
