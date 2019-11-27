import { TestBed } from '@angular/core/testing';
import { DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS } from '../../shared/unit-tests/mock-app.imports';
import { SpendByPracticeAreaService } from './spend-by-practice-area.service';

describe('SpendByPracticeAreaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    });
  });

  it('should be created', () => {
    const service: SpendByPracticeAreaService = TestBed.get(SpendByPracticeAreaService);
    expect(service).toBeTruthy();
  });
});
