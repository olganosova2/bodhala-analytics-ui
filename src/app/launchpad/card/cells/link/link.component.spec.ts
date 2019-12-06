import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkComponent } from './link.component';
import {PROVIDERS, SERVICE_PROVIDERS} from '../../../../shared/unit-tests/mock-app.imports';
import {HttpService, UserService} from 'bodhala-ui-common';
import * as mockServices from '../../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../../shared/services/filters.service';
import {ngWindow} from '../../../../shared/unit-tests/mock-services';

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkComponent ]
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
  it('should call inject', () => {
    spyOn(component.clicked, 'emit');
    component.onClick({ key1: 'test'});
    expect(component.clicked).toBeTruthy();
  });
  // it('should call goToView', () => {
  //   spyOn(window, 'location').and.returnValue({ location: null });
  //   component.onClick({ key1: 'test'});
  //   expect(component.clicked).toBeTruthy();
  // });
});
