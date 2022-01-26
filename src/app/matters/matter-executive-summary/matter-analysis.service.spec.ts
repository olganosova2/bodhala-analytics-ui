import { TestBed } from '@angular/core/testing';

import { MatterAnalysisService } from './matter-analysis.service';
import {HttpClientModule} from '@angular/common/http';
import {SERVICE_PROVIDERS} from '../../shared/unit-tests/mock-app.imports';
import {CommonService} from '../../shared/services/common.service';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {HttpService, UserService} from 'bodhala-ui-common';
import {QbrService} from '../../qbr/qbr.service';

describe('MatterAnalysisService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [...SERVICE_PROVIDERS,
        { provide: CommonService, useClass: mockServices.CommonServiceStub },
        { provide: UserService, useClass: mockServices.UserStub },
        { provide: HttpService, useClass: mockServices.DataStub },
        { provide: CommonService, useClass: mockServices.CommonServiceStub }
      ]
    }).compileComponents();
  });

  it('MatterAnalysisService should be created', () => {
    const service: MatterAnalysisService = TestBed.inject(MatterAnalysisService);
    expect(service).toBeTruthy();
  });
});
