import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {IMPORTS, DECLARATIONS, SCHEMAS, PROVIDERS} from './shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import * as mockServices from './shared/unit-tests/mock-services';
import {LaunchpadComponent} from './launchpad/launchpad.component';
import {Router} from '@angular/router';
import {FiltersService} from './shared/services/filters.service';

describe('AppComponent', () => {
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    })
      .compileComponents();
  }));

  it('should create the AppComponent', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
