import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RerunUploadComponent } from './rerun-upload.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';
import {ILedesImport} from '../ledes-imports-model';
import {ImportDetailComponent} from '../import-detail/import-detail.component';
import {MOCK_UPLOAD_DATA} from '../../../shared/unit-tests/mock-data/ledes-imports';
import { LedesImportsService } from '../ledes-imports.service';

describe('RerunUploadComponent', () => {
  let component: RerunUploadComponent;
  let fixture: ComponentFixture<RerunUploadComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(RerunUploadComponent, {
      set: {
        providers: [
          AppStateService,
          {provide: Router, useValue: mockRouter},
          {provide: ActivatedRoute, useClass: mockServices.ActivatedRouteMock},
          {provide: FiltersService, useClass: mockServices.FiltersStub},
          {provide: HttpService, useClass: mockServices.DataStub},
          {provide: UserService, useClass: mockServices.UserStub},
          {provide: LedesImportsService, useClass: mockServices.LedesImportServiceStub}
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RerunUploadComponent);
    component = fixture.componentInstance;
    component.data = MOCK_UPLOAD_DATA;
    fixture.detectChanges();
  });

  it('should create RerunUploadComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should createFirm RerunUploadComponent', () => {
    component.firmName = 'Lorium Law';
    component.createFirm();
    expect(component).toBeTruthy();
  });

  it('should findFirm RerunUploadComponent', () => {
    component.firmNameSearch = 'Lorium';
    component.findFirm();
    expect(component.matchType).toEqual('SIMILAR');
  });

  it('should reRunUpload RerunUploadComponent', () => {
    component.reRunUpload(30224);
    expect(component.fileReUploaded).toBeTruthy();
  });
});
