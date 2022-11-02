import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmDropdownComponent } from './firm-dropdown.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {BenchmarkOverviewComponent} from '../../benchmarks/benchmark-overview/benchmark-overview.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {ActivatedRouteMock} from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';

describe('FirmDropdownComponent', () => {
  let component: FirmDropdownComponent;
  let fixture: ComponentFixture<FirmDropdownComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(FirmDropdownComponent, {
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
    fixture = TestBed.createComponent(FirmDropdownComponent);
    component = fixture.componentInstance;
    component.firmId = '4702';
    component.currentFirmName = 'Kirkland';
    fixture.detectChanges();
  });

  it('should create FirmDropdownComponent', () => {
    expect(component.dropdownWidth.width).toBe('325px');
  });
  it('should getFirmsList with name > 45', () => {
    component.firmId = '27710';
    component.getFirmsList();
    expect(component.dropdownWidth.width).toBe('425px');
  });
  it('should getFirmsList with name > 45', () => {
    component.firmId = '8299';
    component.getFirmsList();
    expect(component.dropdownWidth.width).toBe('525px');
  });
});
