import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreBadgeComponent } from './score-badge.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {ScoreTrendComponent} from '../score-trend.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {Router} from '@angular/router';
import {FiltersService} from '../../../shared/services/filters.service';
import * as mockServices from '../../../shared/unit-tests/mock-services';

describe('ScoreBadgeComponent', () => {
  let component: ScoreBadgeComponent;
  let fixture: ComponentFixture<ScoreBadgeComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(ScoreBadgeComponent, {
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
    fixture = TestBed.createComponent(ScoreBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ScoreBadgeComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should create format Card when > 0.7', () => {
    component.percentale = 0.8;
    component.formatCard();
    expect(component.label).toBe('Good');
  });
  it('should create format Card when > 0.7 and bpr', () => {
    component.percentale = 0.8;
    component.bpr = true;
    component.formatCard();
    expect(component.calculatedClass).toBe('score-badge-excellent-blank');
  });
  it('should create format Card when > 0.5', () => {
    component.percentale = 0.5;
    component.formatCard();
    expect(component.label).toBe('Fair');
  });
  it('should create format Card when > 0.5 and bpr', () => {
    component.percentale = 0.5;
    component.bpr = true;
    component.formatCard();
    expect(component.calculatedClass).toBe('score-badge-fair-blank');
  });
  it('should create format Card when = 0.2', () => {
    component.percentale = 0.2;
    component.formatCard();
    expect(component.calculatedClass).toBe('score-badge-poor');
  });
  it('should create format Card when = 0.2 and bpr', () => {
    component.percentale = 0.2;
    component.bpr = true;
    component.formatCard();
    expect(component.calculatedClass).toBe('score-badge-poor-blank');
  });
});
