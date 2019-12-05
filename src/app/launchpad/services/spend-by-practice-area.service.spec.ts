import {inject, TestBed} from '@angular/core/testing';
import { SpendByPracticeAreaService } from './spend-by-practice-area.service';
import {HttpClientModule} from '@angular/common/http';
import {DECLARATIONS, IMPORTS, SCHEMAS, SERVICE_PROVIDERS} from '../../shared/unit-tests/mock-app.imports';
import {HttpService, UserService} from 'bodhala-ui-common';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {TOP_PRACTICE_AREAS} from '../../shared/unit-tests/mock-data/practice-areas';
import {IPractice} from '../../shared/models/practice';
import {FiltersService} from '../../shared/services/filters.service';

describe('SpendByPracticeAreaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: [...SERVICE_PROVIDERS,
        { provide: UserService, useClass: mockServices.UserStub },
        { provide: HttpService, useClass: mockServices.DataStub },
        { provide: FiltersService, useClass: mockServices.FiltersStub }
      ],
      schemas: SCHEMAS
    }).compileComponents();
  });
  it('should be created', () => {
    const service: SpendByPracticeAreaService = TestBed.get(SpendByPracticeAreaService);
    expect(service).toBeTruthy();
  });
  it('SpendByPracticeAreaService should fetchLeadPartners', inject([SpendByPracticeAreaService], (service: SpendByPracticeAreaService) => {
    const result = service.fetch();
    expect(result).toBeTruthy();
  }));

  it('SpendByPracticeAreaService should process partners', inject([SpendByPracticeAreaService], (service: SpendByPracticeAreaService) => {
    const pas = TOP_PRACTICE_AREAS.result as unknown as Array<IPractice>;
    const processed = service.processPracticeAreas(pas);
    expect(processed.length).toBe(3);
    expect(processed[0].name).toBe('Corporate Counsel > Transactions');
    expect(processed[0].y).toBe(107076);
  }));
});
