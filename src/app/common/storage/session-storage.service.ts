import { Injectable } from '@angular/core';
import { DigestResponse } from '../network/request/auth/digest-response.model';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  set challenge(challenge: DigestResponse) {
    sessionStorage.setItem('howell_challenge', JSON.stringify(challenge));
  }
  get challenge() {
    let challenge_str = sessionStorage.getItem('howell_challenge');

    return challenge_str == null ? null : JSON.parse(challenge_str);
  }

  private _nc = 0;
  get nc() {
    return ++this._nc;
  }

  username = '';
  password = '';

  clear(name?: string) {
    if (name) {
      sessionStorage.removeItem(name);
    } else {
      sessionStorage.clear();
    }

    this.username = '';
    this.password = '';
    this._nc = 0;
  }
}
