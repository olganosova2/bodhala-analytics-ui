import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterLinkRendererComponent } from './router-link-renderer.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../unit-tests/mock-app.imports';
import {IeBannerComponent} from '../ie-banner/ie-banner.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {Router} from '@angular/router';
import {FiltersService} from '../../services/filters.service';
import * as mockServices from '../../unit-tests/mock-services';
import {NgZone} from '@angular/core';

xdescribe('RouterLinkRendererComponent', () => {
  let component: RouterLinkRendererComponent;
  let fixture: ComponentFixture<RouterLinkRendererComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(RouterLinkRendererComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub },
          { provide: NgZone, useValue: mockServices.MockNgZone }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterLinkRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create RouterLinkRendererComponent', () => {
    expect(component).toBeTruthy();
  });
});
