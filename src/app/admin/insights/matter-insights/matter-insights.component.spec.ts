import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterInsightsComponent } from './matter-insights.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';
import {CommonService} from '../../../shared/services/common.service';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatSelectChange} from '@angular/material/select';

describe('MatterInsightsComponent', () => {
  let component: MatterInsightsComponent;
  let fixture: ComponentFixture<MatterInsightsComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(MatterInsightsComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
          {provide: ActivatedRoute, useClass: mockServices.ActivatedRouteMock},
          {provide: FiltersService, useClass: mockServices.FiltersStub},
          {provide: HttpService, useClass: mockServices.DataStub},
          {provide: UserService, useClass: mockServices.UserStub},
          { provide: CommonService, useClass: mockServices.CommonServiceStub }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatterInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create MatterInsightsComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should reset', () => {
    component.reset();
    expect(component.summaryData).toBe(null);
  });
  it('should getFirmId', () => {
    component.firm = { id: '47', name: 'Kirkland'};
    const result = component.getFirmId();
    expect(result).toBe(47);
  });
  it('should getMatterInsight', () => {
    component.firm = { id: '47', name: 'Kirkland'};
    component.selectedClientId = 110;
    component.matterId = '777';
    component.getMatterInsight();
    expect(component.matterSelected).toBeTruthy();
  });
  it('should loadMatters when valid input', () => {
    component.selectedClientId = 110;
    component.loadMatters('777');
    expect(component.filteredNames.length).toBe(2);
  });
  it('should loadMatters when invalid input', () => {
    component.selectedClientId = 110;
    component.loadMatters('77');
    expect(component.filteredNames.length).toBe(0);
  });
  it('should loadFirms', () => {
    spyOn(component, 'getMatterInsight').and.callThrough();
    component.selectedClientId = 110;
    const params = { option: { value: { id: 100 }} } as MatAutocompleteSelectedEvent;
    component.loadFirms(params);
    expect(component.getMatterInsight).toHaveBeenCalled();
  });
  it('should getMatterId', () => {
    component.matterId = '777';
    const result = component.getMatterId();
    expect(result).toBe('777');
  });
  xit('should getDataByMatterAndFirm', () => {
    spyOn(component, 'getMatterInsight').and.callThrough();
    const params = {  value: { id: 100 }}  as MatSelectChange;
    component.matterId = '777';
    component.getDataByMatterAndFirm(params);
    expect(component.getMatterInsight).toHaveBeenCalled();
  });
});
