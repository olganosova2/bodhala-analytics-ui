import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrcPeerFirmsComponent } from './frc-peer-firms.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {FirmComponent} from '../firm.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock} from '../../shared/unit-tests/mock-services';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';
import {CommonService} from '../../shared/services/common.service';

describe('FrcPeerFirmsComponent', () => {
  let component: FrcPeerFirmsComponent;
  let fixture: ComponentFixture<FrcPeerFirmsComponent>;

  const filtersSet = {clientId: 190, startdate: '2019-01-01', enddate: '2019-01-01', compareStartDate: '2019-01-01', compareEndDate: '2019-01-01', firms: JSON.stringify([4, 8, 724, 9353])};

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(FrcPeerFirmsComponent, {
      set: {
        providers: [
          { provide: Router, useClass: mockServices.MockRouter},
          { provide: ActivatedRoute, useClass: ActivatedRouteMock },
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub },
          { provide: CommonService, useClass: mockServices.CommonServiceStub }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrcPeerFirmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create FrcPeerFirmsComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should saveFrc', () => {
    component.firmId = 87;
    component.filterSet =  filtersSet;
    component.reportTitle = 'Title1';
    component.saveFrc();
    expect(component.filterSet.startdate).toBe('2019-01-01');
  });
});
