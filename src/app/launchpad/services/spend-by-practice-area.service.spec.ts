import { TestBed } from '@angular/core/testing';
import { SpendByPracticeAreaService } from './spend-by-practice-area.service';
import {HttpClientModule} from '@angular/common/http';
import {SERVICE_PROVIDERS} from '../../shared/unit-tests/mock-app.imports';
import {UserService} from 'bodhala-ui-common';
import * as mockServices from '../../shared/unit-tests/mock-services';

describe('SpendByPracticeAreaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [...SERVICE_PROVIDERS,
        { provide: UserService, useClass: mockServices.UserStub }]
    }).compileComponents();
  });
  it('should be created', () => {
    const service: SpendByPracticeAreaService = TestBed.get(SpendByPracticeAreaService);
    expect(service).toBeTruthy();
  });
});
