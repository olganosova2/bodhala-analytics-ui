import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotaionsModalComponent } from './annotaions-modal.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../unit-tests/mock-app.imports';
import {BodhalaChartLegendComponent} from '../../bodhala-chart-legend/bodhala-chart-legend.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {Router} from '@angular/router';
import {FiltersService} from '../../../services/filters.service';
import * as mockServices from '../../../unit-tests/mock-services';
import {MOCK_ANNOTATIONS} from '../../../unit-tests/mock-data/annotations';
import {IUiAnnotation} from '../model';
import {MatDialog} from '@angular/material/dialog';

describe('AnnotaionsModalComponent', () => {
  let component: AnnotaionsModalComponent;
  let fixture: ComponentFixture<AnnotaionsModalComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(AnnotaionsModalComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub },
          { provide: MatDialog, useClass: mockServices.MatDialogMock }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotaionsModalComponent);
    component = fixture.componentInstance;
    component.notes = Object.assign([], MOCK_ANNOTATIONS.result);
    component.masterList = Object.assign([], MOCK_ANNOTATIONS.result);
    component.dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create AnnotaionsModalComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should setEditMode', () => {
    const note = MOCK_ANNOTATIONS.result[0] as IUiAnnotation;
    component.setEditMode(note);
    expect(note.editMode).toBeTruthy();
  });
  it('should cancelEdit', () => {
    component.masterList = Object.assign([], MOCK_ANNOTATIONS.result);
    const note = MOCK_ANNOTATIONS.result[0] as IUiAnnotation;
    component.cancelEdit(note);
    expect(note.dropDownOpened).toBe(false);
  });
  it('should setPublic', () => {
    const note = MOCK_ANNOTATIONS.result[0] as IUiAnnotation;
    component.setPublic(note);
    expect(note.is_public).toBe(true);
  });
  it('should addNote', () => {
    const note = MOCK_ANNOTATIONS.result[0] as IUiAnnotation;
    component.addNote();
    expect(note.editMode).toBe(false);
  });
  it('should editNote', () => {
    const note = MOCK_ANNOTATIONS.result[0] as IUiAnnotation;
    component.editNote(note);
    expect(note.editMode).toBe(false);
  });
  it('should deleteNote', () => {
    const note = MOCK_ANNOTATIONS.result[0] as IUiAnnotation;
    component.deleteNote(note);
    expect(component.notes.length).toBe(0);
  });
  it('should onClickedOutside', () => {
    const note = MOCK_ANNOTATIONS.result[0] as IUiAnnotation;
    component.onClickedOutside({}, note);
    expect(note.dropDownOpened).toBe(false);
  });
  it('should openDialog', () => {
    spyOn(component.dialog, 'open').and.callThrough();
    const note = MOCK_ANNOTATIONS.result[0] as IUiAnnotation;
    component.openDialog(note);
    expect(component.dialog.open).toHaveBeenCalled();
  });
});
