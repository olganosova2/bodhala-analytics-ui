import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterDocumentsOverviewComponent } from './matter-documents-overview.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {MatterDocumentsComponent} from '../matter-documents/matter-documents.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock } from '../../../shared/unit-tests/mock-services';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';
import {MOCK_MATTER_DOCUMENTS} from '../../../shared/unit-tests/mock-data/matter-overview';

describe('MatterDocumentsOverviewComponent', () => {
  let component: MatterDocumentsOverviewComponent;
  let fixture: ComponentFixture<MatterDocumentsOverviewComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(MatterDocumentsOverviewComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useValue: mockRouter},
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
    fixture = TestBed.createComponent(MatterDocumentsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create MatterDocumentsOverviewComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should openDetails', () => {
    const doc = MOCK_MATTER_DOCUMENTS.result[0];
    component.openDetails(doc);
    expect(doc.client_matter_id).toBe('087260/834');
  });
});
