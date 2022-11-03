import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationLabelsComponent } from './annotation-labels.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../unit-tests/mock-app.imports';
import {AnnotaionsModalComponent} from '../annotaions-modal/annotaions-modal.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {Router} from '@angular/router';
import {FiltersService} from '../../../services/filters.service';
import * as mockServices from '../../../unit-tests/mock-services';
import {MOCK_ANNOTATIONS} from '../../../unit-tests/mock-data/annotations';
import {IUiAnnotation} from '../model';

describe('AnnotationLabelsComponent', () => {
  let component: AnnotationLabelsComponent;
  let fixture: ComponentFixture<AnnotationLabelsComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(AnnotationLabelsComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationLabelsComponent);
    component = fixture.componentInstance;
    component.note = MOCK_ANNOTATIONS.result[0] as IUiAnnotation;
    fixture.detectChanges();
  });

  it('should create AnnotationLabelsComponent', () => {
    expect(component).toBeTruthy();
  });
});
