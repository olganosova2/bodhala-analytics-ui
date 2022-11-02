import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InjectionToken } from '@angular/core';
import { LinkComponent } from './link.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS, SERVICE_PROVIDERS} from '../../../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import * as mockServices from '../../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../../shared/services/filters.service';
import {ngWindow} from '../../../../shared/unit-tests/mock-services';
import {TopMattersComponent} from '../../../../firm/top-matters/top-matters.component';
import {Router} from '@angular/router';

export const LOCATION_TOKEN = new InjectionToken<Location>('Window location object');

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(LinkComponent, {
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
    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
    component.column = {format: 'currency', avatar: 'avatar', field: 'test'};
    component.data = {test: 1};
    fixture.detectChanges();
  });

  it('should create LinkComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should call inject', () => {
    component.inject('', { key1: 'test'});
    expect(component.clicked).toBeTruthy();
   // expect(component.clicked).toHaveBeenCalledWith({column: component.column, data: null });
  });
  it('should call onClick', () => {
    spyOn(component.clicked, 'emit');
    component.onClick({ key1: 'test'});
    expect(component.clicked).toBeTruthy();
  });
  it('should navigate', () => {
    const data = {param1: 87};
    component.column = { route: '/firm', route_params: 'param1'};
    component.onClick(data);
    expect (component.router.navigate).toHaveBeenCalledWith([ '/firm', 87]);
  });
  it('should onclick action', () => {
    spyOn(component.clicked, 'emit');
    const data = {param1: 87};
    component.column = { action: (e) => {}};
    component.onClick(data);
    expect(component.clicked.emit).toHaveBeenCalledWith({column: component.column, data});
  });
  // it('should call goToView', () => {
  //   spyOn(window, 'location').and.returnValue({ location: null });
  //   component.onClick({ key1: 'test'});
  //   expect(component.clicked).toBeTruthy();
  // });
});
