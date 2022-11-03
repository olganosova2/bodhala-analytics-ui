import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterTitleBarComponent } from './matter-title-bar.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {MatterExecutiveSummaryComponent} from '../matter-executive-summary.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock} from '../../../shared/unit-tests/mock-services';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';

describe('MatterTitleBarComponent', () => {
  let component: MatterTitleBarComponent;
  let fixture: ComponentFixture<MatterTitleBarComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(MatterTitleBarComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
          { provide: ActivatedRoute, useClass: mockServices.ActivatedRouteMock},
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatterTitleBarComponent);
    component = fixture.componentInstance;
    component.matterId = '087260/818';
    component.title = 'Matter Overview';
    fixture.detectChanges();
  });

  it('should create MatterTitleBarComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should filterByFirm', () => {
    const val = { value: { id: 47}};
    component.filterByFirm(val);
    expect(component.firmId).toBe(4);
  });
  xit('should export', () => {
    component.export();
    expect(component.firmId).toBe(4);
  });
});
