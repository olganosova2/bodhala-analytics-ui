import {inject, TestBed} from '@angular/core/testing';

import { CommonService } from './common.service';

const mockDiv = {
  offsetWidth: 600,
  offsetHeight: 50000,
  appendChild: () => {},
  removeChild: () => {},
};
const mockFooter = {
  innerHTML: '',
  style: {},
  appendChild: () => {},
  removeChild: () => {},
};
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
  it('CommonService should export PDF', inject([CommonService], (service: CommonService) => {
    // tslint:disable-next-line:only-arrow-functions
    // @ts-ignore
    spyOn(document, 'getElementById').and.callFake(() => {
      return mockDiv;
    });
    // @ts-ignore
    spyOn(document, 'createElement').and.callFake(() => {
      return mockFooter;
    });
    service.generatePDF('Executive Summary', 'div1');
    expect(service).toBeTruthy();
  }));
  it('CommonService should capitalize', inject([CommonService], (service: CommonService) => {
    const result = service.capitalize('text');
    expect(result).toBe('Text');
  }));
  it('CommonService should capitalize when null', inject([CommonService], (service: CommonService) => {
    const result = service.capitalize(null);
    expect(result).toBe('');
  }));
});

