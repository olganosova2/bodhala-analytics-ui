import {inject, TestBed} from '@angular/core/testing';

import { CommonService } from './common.service';

describe('CommonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('CommonService should be created', () => {
    const service: CommonService = TestBed.get(CommonService);
    expect(service).toBeTruthy();
  });
  it('CommonService should formatTkName', inject([CommonService], (service: CommonService) => {
    const result = service.formatTkName('1234567890123');
    expect(result).toBe('123456789012...');
  }));
  it('CommonService should formatFirmName', inject([CommonService], (service: CommonService) => {
    const result = service.formatFirmName('1234567890123456');
    expect(result).toBe('123456789012345...');
  }));
  it('CommonService should formatLeadPartnerName', inject([CommonService], (service: CommonService) => {
    const result = service.formatLeadPartnerName('Lead partner Lead partner1');
    expect(result).toBe('Lead partner Lead partner...');
  }));
});

