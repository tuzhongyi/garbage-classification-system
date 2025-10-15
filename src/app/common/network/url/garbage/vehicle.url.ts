import { BaseUrl } from '../base.url';

export class VehicleUrl {
  static basic() {
    return `${BaseUrl.garbage.garbage_management}/Vehicles`;
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
