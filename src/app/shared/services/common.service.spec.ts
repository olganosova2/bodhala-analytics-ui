import {inject, TestBed} from '@angular/core/testing';

import { CommonService } from './common.service';
import {HttpService, UserService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {MOCK_ANNOTATIONS} from '../unit-tests/mock-data/annotations';
import {IUiAnnotation} from '../components/annotations/model';

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
  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    });
  }));

  it('CommonService should be created', () => {
    const service: CommonService = TestBed.inject(CommonService);
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
    service.generatePDF('Executive Summary', 'div1', null);
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
  // it('CommonService generate PDF Outer', inject([CommonService], (service: CommonService) => {
  //   const text = '87';
  //   service.generatePdfOuter('Executive Summary', 'ExecutiveSummary', null);
  //   expect(service).toBeTruthy();
  // }));
  it('CommonService should format Path with no ?', inject([CommonService], (service: CommonService) => {
    const text = 'Hello';
    const result = service.formatPath(text);
    expect(result).toBe('Hello');
  }));
  it('CommonService should format Path with  ?', inject([CommonService], (service: CommonService) => {
    const text = 'Hello?there';
    const result = service.formatPath(text);
    expect(result).toBe('Hello');
  }));
  it('CommonService should format Html', inject([CommonService], (service: CommonService) => {
    const text = 'Hello';
    const result = service.formatHtml(text);
    expect(result).toBe('Hello');
  }));
  it('CommonService should format Initials', inject([CommonService], (service: CommonService) => {
    const note = MOCK_ANNOTATIONS.result[0] as IUiAnnotation;
    const result = service.formatInitials(note);
    expect(result).toBe('JH');
  }));
});

