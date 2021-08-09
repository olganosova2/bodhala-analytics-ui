import { TestBed } from '@angular/core/testing';

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
});
