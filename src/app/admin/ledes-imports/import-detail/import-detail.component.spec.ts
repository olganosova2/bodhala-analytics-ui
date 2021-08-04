import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportDetailComponent } from './import-detail.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';
import {ILedesImport} from '../ledes-imports-model';
import {MOCK_IMPORT} from '../../../shared/unit-tests/mock-data/ledes-imports';

describe('ImportDetailComponent', () => {
  let component: ImportDetailComponent;
  let fixture: ComponentFixture<ImportDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(ImportDetailComponent, {
      set: {
        providers: [
          AppStateService,
          {provide: HttpService, useClass: mockServices.DataStub}
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportDetailComponent);
    component = fixture.componentInstance;
    component.data.data = MOCK_IMPORT;
    fixture.detectChanges();
  });

  it('should create ImportDetailComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should downloadAttachment ImportDetailComponent', () => {
    component.downloadAttachment();
    expect(component).toBeTruthy();
  });
});
