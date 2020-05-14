import { TestBed } from '@angular/core/testing';

import { BenchmarkService } from './benchmark.service';
import {HttpClientModule} from '@angular/common/http';
import {SERVICE_PROVIDERS} from '../shared/unit-tests/mock-app.imports';
import {HttpService, UserService} from 'bodhala-ui-common';
import * as mockServices from '../shared/unit-tests/mock-services';

describe('BenchmarkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [...SERVICE_PROVIDERS,
        { provide: UserService, useClass: mockServices.UserStub },
        { provide: HttpService, useClass: mockServices.DataStub }
      ]
    }).compileComponents();
  });
  it('should be created', () => {
    const service: BenchmarkService = TestBed.get(BenchmarkService);
    expect(service).toBeTruthy();
  });
});
