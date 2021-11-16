import { TestBed } from '@angular/core/testing';

import { QbrService } from './qbr.service';
import {HttpClientModule} from '@angular/common/http';
import {SERVICE_PROVIDERS} from '../shared/unit-tests/mock-app.imports';
import {HttpService, UserService} from 'bodhala-ui-common';
import * as mockServices from '../shared/unit-tests/mock-services';
import {BenchmarkService} from '../benchmarks/benchmark.service';

xdescribe('QbrService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [...SERVICE_PROVIDERS,
        { provide: UserService, useClass: mockServices.UserStub },
        { provide: HttpService, useClass: mockServices.DataStub }
      ]
    }).compileComponents();
  });
  it('QbrService should be created', () => {
    const service: QbrService = TestBed.inject(QbrService);
    expect(service).toBeTruthy();
  });
});
