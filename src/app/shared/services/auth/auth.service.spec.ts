import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserService, UserType} from 'bodhala-ui-common';
import * as mockServices from '../../unit-tests/mock-service';

describe('AuthService', () => {
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  const routeMock: any = {
    snapshot: {},
    params: {
      idOrCreationKeyWord: 'create'
    },
    data: { expectedRoles: ['LAWYER']}
  };
  const routerStateMock: any = {
    snapshot: {},
    url: '/forbidden'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: Router, useValue: mockRouter},
        { provide: UserService, useClass: mockServices.UserStub }
      ]
    });
  });
  it('should be created AuthService', () => {
    const service: AuthService = TestBed.inject(AuthService);
    service.user.userType = UserType.LAWYER;
    expect(service.canActivate(routeMock)).toEqual(true);
  });
});
