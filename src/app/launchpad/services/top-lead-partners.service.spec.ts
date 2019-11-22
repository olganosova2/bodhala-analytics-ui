import { TestBed } from '@angular/core/testing';

import { TopLeadPartnersService } from './top-lead-partners.service';

describe('TopLeadPartnersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TopLeadPartnersService = TestBed.get(TopLeadPartnersService);
    expect(service).toBeTruthy();
  });
});
