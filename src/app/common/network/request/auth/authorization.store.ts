import { Injectable } from '@angular/core';

import { Md5 } from 'ts-md5';
import { LoginModel } from '../../../../html/login/login.model';
import { GlobalStorageService } from '../../../storage/global.storage';
import { LocalStorageService } from '../../../storage/local.storage';
import { User } from '../../model/garbage-station/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationStore {
  constructor(
    private local: LocalStorageService,
    private global: GlobalStorageService
  ) {}

  private key = {
    auto: 'auto-login',
    save: 'save-password',
  };

  load() {
    let model = new LoginModel();
    let auto = localStorage.getItem(this.key.auto);
    if (auto) {
      model.auto = JSON.parse(auto);
    }
    let save = localStorage.getItem(this.key.save);
    if (save) {
      model.save = JSON.parse(save);
    }

    // console.log(autoLogin, savePassWord);

    if (model.save) {
      let username = localStorage.getItem('username')!;
      // console.log(username);
      username = atob(username);
      // console.log(username);
      let res = username.match(
        /[a-zA-Z0-9+/=]{32}(?<username>[\w.]+)[a-zA-Z0-9+/=]{32}/
      )!;
      // console.log(res);
      username = res.groups!['username'];

      let password = localStorage.getItem('password')!;
      password = atob(password);
      let res2 = password.match(
        /[a-zA-Z0-9+/=]{32}(?<password>[\w.]+)[a-zA-Z0-9+/=]{32}/
      )!;

      password = res2.groups!['password'];
      model.username = username;
      model.password = password;
    }
    return model;
  }

  save = {
    info: (user: User, username: string, password: string) => {
      // username
      let prefix = Md5.hashStr(
        ((Math.random() * 1e9) | 0).toString(16).padStart(8, '0')
      );

      let suffix = Md5.hashStr(
        ((Math.random() * 1e9) | 0).toString(16).padStart(8, '0')
      );

      let _username = btoa(`${prefix}${username}${suffix}`);
      localStorage.setItem('username', _username);

      //password
      prefix = Md5.hashStr(
        ((Math.random() * 1e9) | 0).toString(16).padStart(8, '0')
      );
      suffix = Md5.hashStr(
        ((Math.random() * 1e9) | 0).toString(16).padStart(8, '0')
      );
      let _password = btoa(`${prefix}${password}${suffix}`);
      localStorage.setItem('password', _password);

      this.local.user = user;
      this.global.password = password;
    },
    config: (save: boolean, auto: boolean) => {
      localStorage.setItem(this.key.save, JSON.stringify(save));
      localStorage.setItem(this.key.auto, JSON.stringify(auto));
    },
  };
}
