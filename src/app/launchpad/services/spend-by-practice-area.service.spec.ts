import { TestBed } from '@angular/core/testing';

import { SpendByPracticeAreaService } from './spend-by-practice-area.service';

describe('SpendByPracticeAreaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpendByPracticeAreaService = TestBed.get(SpendByPracticeAreaService);
    expect(service).toBeTruthy();
  });
});
