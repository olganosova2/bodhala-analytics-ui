import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PeerFirmsModalComponent } from './peer-firms-modal.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../../shared/unit-tests/mock-services';

describe('PeerFirmsModalComponent', () => {
  let component: PeerFirmsModalComponent;
  let fixture: ComponentFixture<PeerFirmsModalComponent>;

  const mockClient = {
    bh_client_id: 167,
    org_id: 190,
    org_name: 'Oaktree'
  };

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(PeerFirmsModalComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
          {provide: ActivatedRoute, useClass: mockServices.ActivatedRouteMock},
          {provide: HttpService, useClass: mockServices.DataStub},
          {provide: UserService, useClass: mockServices.UserStub}
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeerFirmsModalComponent);
    component = fixture.componentInstance;
    component.gridOptions = component.agGridService.getDefaultGridOptions();
    component.firstLoad = true;
    component.selectedClient = mockClient;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
