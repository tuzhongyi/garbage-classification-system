import { BaseUrl } from '../base.url';

export abstract class GarbageVehicleSRServerUrl {
  static basic() {
    return `${BaseUrl.garbage.garbage_vehicles}/SRServers`;
  }

  static preview() {
    return `${this.basic()}/PreviewUrls`;
  }
  static vod() {
    return `${this.basic()}/VodUrls`;
  }
}
