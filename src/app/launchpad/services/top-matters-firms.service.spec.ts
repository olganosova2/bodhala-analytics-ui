import { TestBed } from '@angular/core/testing';

import { TopMattersFirmsService } from './top-matters-firms.service';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {HttpClientModule} from '@angular/common/http';
import {SERVICE_PROVIDERS} from '../../shared/unit-tests/mock-app.imports';
import {UserService} from 'bodhala-ui-common';

describe('TopMattersFirmsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [...SERVICE_PROVIDERS,
        { provide: UserService, useClass: mockServices.UserStub }]
    }).compileComponents();
  });

  it('TopMattersFirmsService should be created', () => {
    const service: TopMattersFirmsService = TestBed.get(TopMattersFirmsService);
    expect(service).toBeTruthy();
  });
});
