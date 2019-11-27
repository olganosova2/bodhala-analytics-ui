import { TestBed } from '@angular/core/testing';
import { DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS } from '../../shared/unit-tests/mock-app.imports';
import { TopLeadPartnersService } from './top-lead-partners.service';

describe('TopLeadPartnersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    });
  });

  it('should be created', () => {
    const service: TopLeadPartnersService = TestBed.get(TopLeadPartnersService);
    expect(service).toBeTruthy();
  });
});
