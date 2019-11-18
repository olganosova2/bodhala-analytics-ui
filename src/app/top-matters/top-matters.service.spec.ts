import { TestBed } from '@angular/core/testing';

import { TopMattersService } from './top-matters.service';
import * as mockServices from '../shared/unit-tests/mock-services';
import {HttpClientModule} from '@angular/common/http';
import {SERVICE_PROVIDERS} from '../shared/unit-tests/mock-app.imports';
import {UserService} from 'bodhala-ui-common';

describe('TopMattersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [...SERVICE_PROVIDERS,
        { provide: UserService, useClass: mockServices.UserStub }]
    }).compileComponents();
  });

  it('TopMattersService should be created', () => {
    const service: TopMattersService = TestBed.get(TopMattersService);
    expect(service).toBeTruthy();
  });
});
