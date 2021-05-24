import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationsComponent } from './recommendations.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../shared/unit-tests/mock-services';
import {FiltersService} from '../shared/services/filters.service';
import {MOCK_CLIENT_CONFIGS} from '../shared/unit-tests/mock-data/client-configs';
import {IRecommendation, IRecommendationReport} from '../admin/client-recommendations/client-recommendations-model';

describe('RecommendationsComponent', () => {
  let component: RecommendationsComponent;
  let fixture: ComponentFixture<RecommendationsComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(RecommendationsComponent, {
      set: {
        providers: [
          {provide: HttpService, useClass: mockServices.DataStub},
        ]
      }
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationsComponent);
    component = fixture.componentInstance;
    component.selectedClient = { org_id: 1, org_name: 'AIG', bh_client_id: 190};
    fixture.detectChanges();
  });

  it('should create RecommendationsComponent', () => {
    expect(component).toBeTruthy();
  });
});
