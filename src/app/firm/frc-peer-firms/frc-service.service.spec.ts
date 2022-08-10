import { TestBed } from '@angular/core/testing';

import { FrcServiceService } from './frc-service.service';
import {HttpClientModule} from '@angular/common/http';
import {SERVICE_PROVIDERS} from '../../shared/unit-tests/mock-app.imports';
import {CommonService} from '../../shared/services/common.service';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {HttpService, UserService} from 'bodhala-ui-common';
import {MatterAnalysisService} from '../../matters/matter-executive-summary/matter-analysis.service';

describe('FrsServiceService', () => {


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

  it('should be created', () => {
    const service: FrcServiceService = TestBed.inject(FrcServiceService);
    expect(service).toBeTruthy();
  });
});
