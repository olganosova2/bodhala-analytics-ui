import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInternalMattersComponent } from './custom-internal-matters.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {InternalMattersOverlayComponent} from '../internal-matters-overlay/internal-matters-overlay.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock} from '../../../shared/unit-tests/mock-services';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';
import {MOCK_MATTER_OVERVIEW} from '../../../shared/unit-tests/mock-data/matter-overview';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {of} from 'rxjs';

describe('CustomInternalMattersComponent', () => {
  let component: CustomInternalMattersComponent;
  let fixture: ComponentFixture<CustomInternalMattersComponent>;


  const dialogMock = {
    close: () => { }
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(CustomInternalMattersComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: ActivatedRoute, useClass: mockServices.ActivatedRouteMock},
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub },
          {provide: MatDialogRef, useValue: dialogMock},
          {provide: MAT_DIALOG_DATA, useValue: []}
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomInternalMattersComponent);
    component = fixture.componentInstance;
    component.matters = [];
    component.internalMatters = MOCK_MATTER_OVERVIEW.result.internal_matters;
    fixture.detectChanges();
  });

  it('should create CustomInternalMattersComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should loadMatters', () => {
    component.loadMatters('Lux');
    expect(component.filteredNames.length).toBe(2);
  });
  it('should loadMatters when null', () => {
    component.loadMatters(null);
    expect(component.filteredNames.length).toBe(0);
  });

  it('should addMatter', () => {
    component.matters = [];
    component.selectedMatter = { id: '1', name: 'Lux'};
    component.addMatter();
    expect(component.selectedMatter).toBe(null);
  });
  it('should reset', () => {
    component.selectedMatter = null;
    component.reset();
    expect(component.selectedMatter).toBe(null);
  });
  xit('should getOptionText', () => {
    const result = component.getOptionText({ name: 'Lux'});
    expect(result).toBe('Lux');
  });
  xit('should delete', () => {
    component.matters = [{ id: '1', name: 'Lux'}];
    const matter = { id: '1', name: 'Lux'};
    component.delete(matter);
    expect(component.matters.length).toBe(0);
  });
  xit('should save', () => {
    component.customMattersConfig = component.createEmptyConfig();
    component.save();
    expect(component.customMattersConfig).toBeTruthy();
  });
  it('should selectMatter', () => {
    const matter = { option: { value: {id: '1', name: 'Lux'}}} as MatAutocompleteSelectedEvent;
    component.selectMatter(matter);
    expect(component.selectedMatter.id).toBe('1');
  });
});
