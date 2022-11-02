import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRecommendationsComponent } from './client-recommendations.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';
import {MOCK_CLIENT_CONFIGS} from '../../shared/unit-tests/mock-data/client-configs';
import {IRecommendation, IRecommendationReport} from './client-recommendations-model';

describe('ClientRecommendationsComponent', () => {
  let component: ClientRecommendationsComponent;
  let fixture: ComponentFixture<ClientRecommendationsComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(ClientRecommendationsComponent, {
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
    fixture = TestBed.createComponent(ClientRecommendationsComponent);
    component = fixture.componentInstance;
    component.selectedClient = { org_id: 1, org_name: 'AIG', bh_client_id: 190};
    fixture.detectChanges();
  });

  it('should create ClientRecommendationsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should loadRecommendationReports', () => {
    component.loadRecommendationReports(component.selectedClient);
    expect(component.clientRecommendationReports.length).toBe(5);
  });
  // it('should loadGrid recommendations!!', () => {
  //   component.selectedClient = { org_id: 1, org_name: 'AIG', bh_client_id: 190};
  //   const result = component.loadGrid();
  //   expect(component.selectedClient.org_id).toBe(1);
  // });
  it('should editCellRenderer recommendations', () => {
    const result = component.viewCellRenderer();
    expect(result).toBeTruthy();
  });
  it('should editCellRenderer recommendations', () => {
    const result = component.editCellRenderer();
    expect(result).toBeTruthy();
  });
  it('should deleteCellRenderer recommendations', () => {
    const result = component.deleteCellRenderer();
    expect(result).toBeTruthy();
  });

  it('should deleteReport recommendations', () => {
    component.deleteReport({id: 60});
    expect(component.clientRecommendationReports.length).toBe(5);
  });

  it('should addNew recommendations', () => {
    component.addNew();
    expect(component).toBeTruthy();
  });

  it('should view recommendations', () => {
    component.view({data: {id: null}});
    expect(component).toBeTruthy();
  });

  it('should edit recommendations', () => {
    component.edit({data: {id: null}});
    expect(component).toBeTruthy();
  });

  it('should openDeleteDialog', () => {
    spyOn(component.dialog, 'open').and.callThrough();
    const bm = {data: {id: null}};
    component.openDeleteDialog(bm);
    expect(component.dialog.open).toHaveBeenCalled();
  });
});
