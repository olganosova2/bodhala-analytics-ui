import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxCellComponent } from './checkbox-cell.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../unit-tests/mock-app.imports';
import {SavingsCalculatorComponent} from '../../../savings-calculator/savings-calculator.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../unit-tests/mock-services';
import {ActivatedRouteMock} from '../../unit-tests/mock-services';
import {FiltersService} from '../../services/filters.service';
import {ICellRendererParams} from 'ag-grid-community';

describe('CheckboxCellComponent', () => {
  let component: CheckboxCellComponent;
  let fixture: ComponentFixture<CheckboxCellComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(CheckboxCellComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
          { provide: ActivatedRoute, useClass:mockServices.ActivatedRouteMock},
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub }
        ]
      }
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxCellComponent);
    component = fixture.componentInstance;
    component.params = { value: '1'} as ICellRendererParams;
    fixture.detectChanges();
  });

  it('should create CheckboxCellComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should refresh', () => {
    const params = { checked: false};
    const result = component.refresh(params);
    expect(result).toBe(false);
  });
});
