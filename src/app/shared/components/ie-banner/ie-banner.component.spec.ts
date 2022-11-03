import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IeBannerComponent } from './ie-banner.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../unit-tests/mock-app.imports';
import {BodhalaChartLegendComponent} from '../bodhala-chart-legend/bodhala-chart-legend.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {Router} from '@angular/router';
import {FiltersService} from '../../services/filters.service';
import * as mockServices from '../../unit-tests/mock-services';

describe('IeBannerComponent', () => {
  let component: IeBannerComponent;
  let fixture: ComponentFixture<IeBannerComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(IeBannerComponent, {
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
    fixture = TestBed.createComponent(IeBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create IeBannerComponent', () => {
    expect(component).toBeTruthy();
  });
});
