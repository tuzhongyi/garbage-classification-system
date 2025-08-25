import { Injectable } from '@angular/core';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { StreamType } from '../enum/stream-type.enum';
import { UserResourceType } from '../enum/user-resource-type.enum';
import { User } from '../network/model/garbage-station/user.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  set user(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  get user(): User {
    let user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  public get guide(): boolean {
    let guide = localStorage.getItem('guide');
    return guide ? JSON.parse(guide) : false;
  }
  public set guide(v: boolean) {
    localStorage.setItem('guide', JSON.stringify(v));
  }

  static Get<T>(key: string, cls: ClassConstructor<T>): T | undefined {
    let plain = localStorage.getItem(key);
    if (plain) {
      return plainToInstance(cls, plain);
    }
    return;
  }

  static Set<T>(key: string, value: T) {
    // let plain = instanceToPlain(value);
    // localStorage.setItem(key, JSON.stringify(plain));
    localStorage.setItem(key, JSON.stringify(value));
  }

  video = {
    stream: StreamType.main,
    rule: false,
  };

  private _ResourceType: UserResourceType = UserResourceType.None;
  public get ResourceType() {
    if (this._ResourceType == UserResourceType.None) {
      this._ResourceType =
        this.user.Resources && this.user.Resources.length > 0
          ? this.user.Resources[0].ResourceType
          : UserResourceType.None;
    }
    return this._ResourceType;
  }

  clear(name?: string) {
    this._ResourceType = UserResourceType.None;
    if (name) {
      localStorage.removeItem(name);
    } else {
      let guide = this.guide;
      localStorage.clear();
      this.guide = guide;
    }
  }
}
