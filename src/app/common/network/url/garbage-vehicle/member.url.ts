import { BaseUrl } from '../base.url';

export abstract class GarbageVehicleMemberUrl {
  static basic() {
    return `${BaseUrl.garbage.garbage_vehicles}/Members`;
  }
  static item(id: string) {
    return `${this.basic()}/${id}`;
  }
  static list() {
    return `${this.basic()}/List`;
  }
  static excels() {
    return `${this.basic()}/Excels`;
  }
}
