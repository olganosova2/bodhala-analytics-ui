import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTimekeepersComponent } from './top-timekeepers.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {TopMattersComponent} from '../top-matters/top-matters.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {Router} from '@angular/router';
import {FiltersService} from '../../shared/services/filters.service';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {MOCK_FIRM} from '../../shared/unit-tests/mock-data/firm';

describe('TopTimekeepersComponent', () => {
  let component: TopTimekeepersComponent;
  let fixture: ComponentFixture<TopTimekeepersComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(TopTimekeepersComponent, {
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
    fixture = TestBed.createComponent(TopTimekeepersComponent);
    component = fixture.componentInstance;
    component.firm =  MOCK_FIRM;
    component.firmId = 1;
    fixture.detectChanges();
  });

  it('should create TopTimekeepersComponent', () => {
    expect(component).toBeTruthy();
  });
  // it('should create format name', () => {
  //   const result = component.formatTkName('Elizabeth A. Vanderlinde');
  //   expect(result).toBe('Elizabeth A....');
  // });
});
