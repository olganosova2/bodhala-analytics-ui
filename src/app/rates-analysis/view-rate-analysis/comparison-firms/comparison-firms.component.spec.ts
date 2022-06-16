import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonFirmsComponent } from './comparison-firms.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../../shared/unit-tests/mock-services';

describe('ComparisonFirmsComponent', () => {
  let component: ComparisonFirmsComponent;
  let fixture: ComponentFixture<ComparisonFirmsComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(ComparisonFirmsComponent, {
      set: {
        providers: [
          AppStateService,
          {provide: ActivatedRoute, useClass: mockServices.ActivatedRouteMock},
          {provide: HttpService, useClass: mockServices.DataStub},
          {provide: UserService, useClass: mockServices.UserStub}
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonFirmsComponent);
    component = fixture.componentInstance;
    component.panelFirms = [
      {id: 4, name: 'Skadden, Arps, Slate, Meagher & Flom'},
      {id: 32, name: 'Akin Gump Strauss Hauer & Feld'},
      {id: 8, name: 'Sidley Austin'}
    ];
    component.marketFirms = [
      {id: 4, name: 'Skadden, Arps, Slate, Meagher & Flom'},
      {id: 32, name: 'Akin Gump Strauss Hauer & Feld'},
      {id: 8, name: 'Sidley Austin'}
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
