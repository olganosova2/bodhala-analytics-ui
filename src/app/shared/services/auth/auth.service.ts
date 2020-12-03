import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import { UserService } from 'bodhala-ui-common';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(public router: Router, public userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data.expectedRoles;

    if ( this.userService.currentUser.isAdmin && expectedRoles.indexOf('ADMIN') === -1) {
      window.location.href = environment.host + '#/app';
      return false;
    }
    if (!this.userService.currentUser.isAdmin && expectedRoles.indexOf('CLIENT') === -1) {
      window.location.href = environment.host + '#/app';
      return false;
    }
    return true;

  }
}
