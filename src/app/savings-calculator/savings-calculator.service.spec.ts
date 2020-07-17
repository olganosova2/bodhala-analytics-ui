import { TestBed } from '@angular/core/testing';

import { SavingsCalculatorService } from './savings-calculator.service';

describe('SavingsCalculatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SavingsCalculatorService = TestBed.get(SavingsCalculatorService);
    expect(service).toBeTruthy();
  });
});
