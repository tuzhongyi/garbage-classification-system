import { AbstractUrl } from '../abstract.url';
import { BaseUrl } from '../base.url';

export abstract class GarbageVehicleUrl {
  static basic() {
    return `${BaseUrl.garbage.garbage_vehicles}/GarbageVehicles`;
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
  static camera(id?: string) {
    let base: string = id ? this.item(id) : this.basic();
    return new CameraUrl(base);
  }
  static route() {
    return new RouteUrl(this.basic());
  }

  static relay(id: string) {
    return new RelayUrl(this.item(id));
  }
  static nb(id: string) {
    return new NBUrl(this.item(id));
  }
}

class CameraUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Cameras`);
  }

  excles() {
    return `${this.basic()}/Excels`;
  }
}
class RouteUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Routes`);
  }
}

class RelayUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Relays`);
  }

  reset() {
    return `${this.basic()}/Reset`;
  }
}

class NBUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/NB`);
  }
  power() {
    return `${this.basic()}/PowerOn`;
  }
  status() {
    return `${this.basic()}/Status`;
  }
}
