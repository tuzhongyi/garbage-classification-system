import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HowellBaseRequestService } from '../base-request-howell.service';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import { IasAccessPointRequestService } from './access-point/ias-access-point-request.service';
import { IasDeviceRequestService } from './device/ias-device-request.service';
import { IasEventRequestService } from './event/ias-event-request.service';

@Injectable({
  providedIn: 'root',
})
export class IasRequestService {
  constructor(http: HowellAuthHttpService, router: Router) {
    this.basic = new HowellBaseRequestService(http, router);
  }
  private basic: HowellBaseRequestService;

  private _access?: {
    point: IasAccessPointRequestService;
  };
  public get access(): {
    point: IasAccessPointRequestService;
  } {
    if (!this._access) {
      this._access = {
        point: new IasAccessPointRequestService(this.basic),
      };
    }
    return this._access;
  }

  private _event?: IasEventRequestService;
  public get event(): IasEventRequestService {
    if (!this._event) {
      this._event = new IasEventRequestService(this.basic);
    }
    return this._event;
  }
  private _device?: IasDeviceRequestService;
  public get device(): IasDeviceRequestService {
    if (!this._device) {
      this._device = new IasDeviceRequestService(this.basic);
    }
    return this._device;
  }
}
