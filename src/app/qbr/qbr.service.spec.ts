import {TestBed} from '@angular/core/testing';

import {QbrService} from './qbr.service';
import {HttpClientModule} from '@angular/common/http';
import {SERVICE_PROVIDERS} from '../shared/unit-tests/mock-app.imports';
import {HttpService, UserService} from 'bodhala-ui-common';
import * as mockServices from '../shared/unit-tests/mock-services';
import {CommonService} from '../shared/services/common.service';
import {QbrType} from './qbr-model';

describe('QbrService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [...SERVICE_PROVIDERS,
        { provide: UserService, useClass: mockServices.UserStub },
        { provide: HttpService, useClass: mockServices.DataStub },
        { provide: CommonService, useClass: mockServices.CommonServiceStub }
      ]
    }).compileComponents();
  });
  it('QbrService should be created', () => {
    const service: QbrService = TestBed.inject(QbrService);
    expect(service).toBeTruthy();
  });
  it('QbrService should formatPayloadDates', () => {
    const service: QbrService = TestBed.inject(QbrService);
    const result = service.formatPayloadDates('2019-03-01', QbrType.YoY);
    expect(result.comparisonStartDate).toBe('2018-03-01T00:00:00-05:00');
  });
});
