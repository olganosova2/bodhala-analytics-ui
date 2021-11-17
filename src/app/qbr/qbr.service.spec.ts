import { inject, TestBed } from '@angular/core/testing';

import { QbrService } from './qbr.service';
import {HttpClientModule} from '@angular/common/http';
import {CommonService} from '../shared/services/common.service';
import {SERVICE_PROVIDERS} from '../shared/unit-tests/mock-app.imports';
import {HttpService, UserService} from 'bodhala-ui-common';
import * as mockServices from '../shared/unit-tests/mock-services';
import {BenchmarkService} from '../benchmarks/benchmark.service';
import {MOCK_QUARTER_DATES, MOCK_GENERIC_QBR_RECOMMENDATIONS, MOCK_SAVED_QBR_RECOMMENDATIONS, MOCK_QBR} from '../shared/unit-tests/mock-data/qbr';

describe('QbrService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [...SERVICE_PROVIDERS,
        { provide: CommonService, useClass: mockServices.CommonServiceStub },
        { provide: UserService, useClass: mockServices.UserStub },
        { provide: HttpService, useClass: mockServices.DataStub }
      ]
    }).compileComponents();
  });
  it('QbrService should be created', () => {
    const service: QbrService = TestBed.inject(QbrService);
    expect(service).toBeTruthy();
  });

  it('QbrService should constructSelectableQuarterDates', inject([QbrService], (service: QbrService) => {
    const qbrService: QbrService = TestBed.inject(QbrService);
    const startDate = '2019-03-01';
    const result = qbrService.constructSelectableQuarterDates(startDate);
    console.log("REZZY: ", result);
    expect(result).toEqual(MOCK_QUARTER_DATES);
  }));

  it('QbrService should formatShortTKLabel', inject([QbrService], (service: QbrService) => {
    const qbrService: QbrService = TestBed.inject(QbrService);
    let tk = 'Partner';
    let result = qbrService.formatShortTKLabel(tk);
    expect(result).toEqual('PA');
    tk = 'Associate';
    result = qbrService.formatShortTKLabel(tk);
    expect(result).toEqual('AS');
    tk = 'Paralegal';
    result = qbrService.formatShortTKLabel(tk);
    expect(result).toEqual('PL');
    tk = 'Other';
    result = qbrService.formatShortTKLabel(tk);
    expect(result).toEqual('Other');
  }));

  it('QbrService should formatQbrType', inject([QbrService], (service: QbrService) => {
    const qbrService: QbrService = TestBed.inject(QbrService);
    let reportType = 'YoY';
    let result = qbrService.formatQbrType(reportType);
    expect(result).toEqual('Annual QBR');
    reportType = 'blahblah';
    result = qbrService.formatQbrType(reportType);
    expect(result).toEqual('Annual QBR');
    reportType = 'QoQAnnual';
    result = qbrService.formatQbrType(reportType);
    expect(result).toEqual('Quarterly Annual QBR');
  }));

  it('QbrService should processGenericRecommendations', inject([QbrService], (service: QbrService) => {
    let result = service.processGenericRecommendations(MOCK_GENERIC_QBR_RECOMMENDATIONS);
    expect(result.length).toEqual(6);
  }));

  it('QbrService should processSavedRecommendations', inject([QbrService], (service: QbrService) => {
    let result = service.processSavedRecommendations(MOCK_SAVED_QBR_RECOMMENDATIONS);
    expect(result.length).toEqual(6);
  }));

  it('QbrService should saveRecommendation', inject([QbrService], (service: QbrService) => {
    let result = service.saveRecommendation(MOCK_GENERIC_QBR_RECOMMENDATIONS[0]);
    expect(result).toBeTruthy();
  }));

  it('QbrService should saveNextStep', inject([QbrService], (service: QbrService) => {
    let result = service.saveNextStep(MOCK_SAVED_QBR_RECOMMENDATIONS[4]);
    expect(result).toBeTruthy();
  }));

  it('QbrService should getClientQBRs', inject([QbrService], (service: QbrService) => {
    let result = service.getClientQBRs();
    expect(result).toBeTruthy();
  }));

  xit('QbrService should getClientQBR', inject([QbrService], (service: QbrService) => {
    let result = service.getClientQBR(276);
    expect(result).toBeTruthy();
  }));

  xit('QbrService should saveMetrics', inject([QbrService], (service: QbrService) => {
    const form = {
      controls: {
        associate_hourly_cost: {
          value: true
        },
        associate_hours_percent: {
          value: true
        },
        blended_rate: {
          value: false
        },
        block_billing_percent: {
          value: true
        },
        bodhala_price_index: {
          value: false
        },
        partner_hourly_cost: {
          value: true
        },
        partner_hours_percent: {
          value: true
        },
        total_spend: {
          value: true
        },
      }
    }
    let result = service.saveMetrics(MOCK_QBR, form);
    expect(result).toBeTruthy();
  }));

});
