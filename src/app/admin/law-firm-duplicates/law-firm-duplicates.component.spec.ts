import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawFirmDuplicatesComponent } from './law-firm-duplicates.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {WorkDistributionComponent} from '../work-distribution/work-distribution.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';

describe('LawFirmDuplicatesComponent', () => {
  let component: LawFirmDuplicatesComponent;
  let fixture: ComponentFixture<LawFirmDuplicatesComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(LawFirmDuplicatesComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
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
    fixture = TestBed.createComponent(LawFirmDuplicatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create LawFirmDuplicatesComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should checkInvalid when valid', () => {
    component.firmIdsText = '1,2';
    const result = component.checkInvalid();
    expect(result).toBe(true);
  });
  it('should cleanUpDuplicates', () => {
    component.primaryId = 1;
    component.firmIdsText = '1,2';
    component.firmIds = [1, 2];
    component.cleanUpDuplicates();
    expect(component.primaryId).toBeTruthy();
  });
  it('should checkInvalid when false', () => {
    component.primaryId = 10;
    component.firmIdsText = '1, 2';
    const result = component.checkInvalid();
    expect(result).toBe(false);
  });
  it('should checkInvalid when true', () => {
    component.primaryId = 10;
    component.firmIdsText = 'a, 2';
    const result = component.checkInvalid();
    expect(result).toBe(true);
  });
});
