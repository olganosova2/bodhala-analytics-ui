import { TestBed } from '@angular/core/testing';

import { FiltersService } from './filters.service';
import {HttpClientModule} from '@angular/common/http';
import {SERVICE_PROVIDERS} from '../unit-tests/mock-app.imports';
import {UserService} from 'bodhala-ui-common';
import * as mockServices from '../unit-tests/mock-services';

describe('FiltersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [...SERVICE_PROVIDERS,
        { provide: UserService, useClass: mockServices.UserStub }]
    }).compileComponents();
  });

  it('FiltersService should be created', () => {
    const service: FiltersService = TestBed.get(FiltersService);
    expect(service).toBeTruthy();
  });
});
