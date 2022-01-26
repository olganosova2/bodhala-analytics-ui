import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterTotalPanelComponent } from './matter-total-panel.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {MatterTitleBarComponent} from '../matter-title-bar/matter-title-bar.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock} from '../../../shared/unit-tests/mock-services';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';

describe('MatterTotalPanelComponent', () => {
  let component: MatterTotalPanelComponent;
  let fixture: ComponentFixture<MatterTotalPanelComponent>;


  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(MatterTotalPanelComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useValue: mockRouter},
          { provide: ActivatedRoute, useClass: ActivatedRouteMock },
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatterTotalPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create MatterTotalPanelComponent', () => {
    expect(component).toBeTruthy();
  });
});
