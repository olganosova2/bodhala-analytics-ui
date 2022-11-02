import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterDocumentModalComponent } from './matter-document-modal.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../../shared/unit-tests/mock-app.imports';
import {MatterDocumentsOverviewComponent} from '../matter-documents-overview.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock} from '../../../../shared/unit-tests/mock-services';
import * as mockServices from '../../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../../shared/services/filters.service';

describe('MatterDocumentModalComponent', () => {
  let component: MatterDocumentModalComponent;
  let fixture: ComponentFixture<MatterDocumentModalComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(MatterDocumentModalComponent, {
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
    fixture = TestBed.createComponent(MatterDocumentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create MatterDocumentModalComponent', () => {
    expect(component).toBeTruthy();
  });
});
