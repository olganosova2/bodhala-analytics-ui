import { TestBed } from '@angular/core/testing';

import { TopLeadPartnersService } from './top-lead-partners.service';
import {HttpClientModule} from '@angular/common/http';
import {SERVICE_PROVIDERS} from '../../shared/unit-tests/mock-app.imports';
import {UserService} from 'bodhala-ui-common';
import * as mockServices from '../../shared/unit-tests/mock-services';

describe('TopLeadPartnersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [...SERVICE_PROVIDERS,
        { provide: UserService, useClass: mockServices.UserStub }]
    }).compileComponents();
  });

  it('should be created', () => {
    const service: TopLeadPartnersService = TestBed.get(TopLeadPartnersService);
    expect(service).toBeTruthy();
  });
});
