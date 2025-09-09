import { BaseUrl } from '../base.url';
import { IasAccessUrl } from './ias-access-point.url';
import { IasDeviceUrl } from './ias-device.url';
import { IasEventUrl } from './ias-event.url';

export class IasUrl {
  private static basic = `${BaseUrl.ias_access}/Ias`;

  static get access() {
    return new IasAccessUrl(this.basic);
  }
  static get device() {
    return new IasDeviceUrl(this.basic);
  }
  static get event() {
    return new IasEventUrl(this.basic);
  }
}
