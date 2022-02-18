import {inject, TestBed} from '@angular/core/testing';

import { YoyRateIncreaseService } from './yoy-rate-increase.service';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {CommonService} from '../../shared/services/common.service';

describe('YoyRateIncreaseService', () => {
  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    });
  }));

  it('YoyRateIncreaseService should be created', () => {
    const service: YoyRateIncreaseService = TestBed.inject(YoyRateIncreaseService);
    expect(service).toBeTruthy();
  });
  it('YoyRateIncreaseService should formatTkName for Junior Associate', inject([YoyRateIncreaseService], (service: YoyRateIncreaseService) => {
    const params = { value: 'JR ASS'};
    const result = service.tkNameCellRenderer(params);
    expect(result).toBe('Junior Associate');
  }));
  it('YoyRateIncreaseService should formatTkName for Mid Associate', inject([YoyRateIncreaseService], (service: YoyRateIncreaseService) => {
    const params = { value: 'MID ASS'};
    const result = service.tkNameCellRenderer(params);
    expect(result).toBe('Mid Associate');
  }));
  it('YoyRateIncreaseService should formatTkName for Senior Associate', inject([YoyRateIncreaseService], (service: YoyRateIncreaseService) => {
    const params = { value: 'SR ASS'};
    const result = service.tkNameCellRenderer(params);
    expect(result).toBe('Senior Associate');
  }));
  it('YoyRateIncreaseService should formatTkName for Junior Partner', inject([YoyRateIncreaseService], (service: YoyRateIncreaseService) => {
    const params = { value: 'JR PART'};
    const result = service.tkNameCellRenderer(params);
    expect(result).toBe('Junior Partner');
  }));
  it('YoyRateIncreaseService should formatTkName for Mid Partner', inject([YoyRateIncreaseService], (service: YoyRateIncreaseService) => {
    const params = { value: 'MID PART'};
    const result = service.tkNameCellRenderer(params);
    expect(result).toBe('Mid Partner');
  }));
  it('YoyRateIncreaseService should formatTkName for Senior Partner', inject([YoyRateIncreaseService], (service: YoyRateIncreaseService) => {
    const params = { value: 'SR PART'};
    const result = service.tkNameCellRenderer(params);
    expect(result).toBe('Senior Partner');
  }));
  it('YoyRateIncreaseService should formatTkName for UNKNOWN', inject([YoyRateIncreaseService], (service: YoyRateIncreaseService) => {
    const params = { value: 'UNKNOWN'};
    const result = service.tkNameCellRenderer(params);
    expect(result).toBe('UNKNOWN');
  }));
  it('YoyRateIncreaseService should formatTkName for Null', inject([YoyRateIncreaseService], (service: YoyRateIncreaseService) => {
    const params = { value: null};
    const result = service.tkNameCellRenderer(params);
    expect(result).toBe('--');
  }));
  it('YoyRateIncreaseService should getIncreaseClass for color-red', inject([YoyRateIncreaseService], (service: YoyRateIncreaseService) => {
    const params = { value: 100};
    const result = service.getIncreaseClass(params);
    expect(result).toBe('color-red');
  }));
  it('YoyRateIncreaseService should getIncreaseClass for font-green', inject([YoyRateIncreaseService], (service: YoyRateIncreaseService) => {
    const params = { value: -100};
    const result = service.getIncreaseClass(params);
    expect(result).toBe('font-green');
  }));
  it('YoyRateIncreaseService should firmNameCellRenderer for Null', inject([YoyRateIncreaseService], (service: YoyRateIncreaseService) => {
    const params = { value: null};
    const result = service.firmNameCellRenderer(params);
    expect(result).toBe('--');
  }));
  it('YoyRateIncreaseService should getHeaderName', inject([YoyRateIncreaseService], (service: YoyRateIncreaseService) => {
    const result = service.getHeaderName('RATES_', 2020);
    expect(result).toBe('Rates_ 2020');
  }));
  it('YoyRateIncreaseService should getHeaderGroupName', inject([YoyRateIncreaseService], (service: YoyRateIncreaseService) => {
    const result = service.getHeaderGroupName('');
    expect(result).toBe('Rates');
  }));
});
