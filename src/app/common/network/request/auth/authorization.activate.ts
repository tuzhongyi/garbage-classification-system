import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LocalStorageService } from '../../../storage/local.storage';
import { SessionStorageService } from '../../../storage/session-storage.service';
import { User } from '../../model/garbage-station/user.model';
import { AuthorizationService } from './auth-request.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationActivate implements CanActivate {
  constructor(
    private local: LocalStorageService,
    private session: SessionStorageService,
    private router: Router,
    private service: AuthorizationService
  ) {}
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let challenge = this.session.challenge;
    let user = this.local.user;
    let holdCookie = localStorage.getItem('username');

    if (challenge && user && user.Id && holdCookie) {
      return true;
    }

    let url: string = state.url;
    if (url) {
      try {
        let result = await this.service.login(url);
        if (result instanceof User) {
          this.service.toroute(result);
          return true;
        }
      } catch (error) {
        return this.router.parseUrl('/login');
      }
    }
    return this.router.parseUrl('/login');
  }
}
