import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHeaderSortComponent } from './table-header-sort.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {Router} from '@angular/router';
import {FiltersService} from '../../services/filters.service';
import * as mockServices from '../../unit-tests/mock-services';

describe('TableHeaderSortComponent', () => {
  let component: TableHeaderSortComponent;
  let fixture: ComponentFixture<TableHeaderSortComponent>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(TableHeaderSortComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useValue: mockRouter},
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableHeaderSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create TableHeaderSortComponent', () => {
    expect(component).toBeTruthy();
  });
});
