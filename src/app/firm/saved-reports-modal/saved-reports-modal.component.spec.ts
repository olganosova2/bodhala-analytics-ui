import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpService, UserService} from 'bodhala-ui-common';
import { SavedReportsModalComponent } from './saved-reports-modal.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {FiltersService} from '../../shared/services/filters.service';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {MOCK_SAVED_REPORT_DATA} from '../../shared/unit-tests/mock-data/firm';

describe('SavedReportsModalComponent', () => {
  let component: SavedReportsModalComponent;
  let fixture: ComponentFixture<SavedReportsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(SavedReportsModalComponent, {
      set: {
        providers: [
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedReportsModalComponent);
    component = fixture.componentInstance;
    component.data = MOCK_SAVED_REPORT_DATA;
    component.savedReportData = MOCK_SAVED_REPORT_DATA;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load savedExport data', () => {
    component.loadSavedExport(MOCK_SAVED_REPORT_DATA);
  });

  it('should delete savedExport data', () => {
    component.deleteSavedExport(MOCK_SAVED_REPORT_DATA);
  });


});
