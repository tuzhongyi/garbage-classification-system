import { AbstractUrl } from '../abstract.url';
import { BaseUrl } from '../base.url';

export class GarbageVehicleDivisionUrl extends AbstractUrl {
  private static url = new GarbageVehicleDivisionUrl(
    `${BaseUrl.garbage.garbage_vehicles}/Divisions`
  );
  static basic() {
    return this.url.basic();
  }

  static item(id: string) {
    return this.url.item(id);
  }
  static list() {
    return this.url.list();
  }
  static excels() {
    return `${this.basic()}/Excels`;
  }
  static tree() {
    return `${this.basic()}/Tree`;
  }
  static garbage(id?: string) {
    let base: string = id ? this.item(id) : `${this.basic()}/Divisions`;
    return new GarbageUrl(base);
  }

  static statistic(divisionId: string) {
    let base = this.item(divisionId);
    return new GarbageVehicleDivisionStatisticUrl(base);
  }
}

class GarbageVehicleDivisionStatisticUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Statistic`);
  }

  number() {
    return `${this.basic()}/Number`;
  }
}

class GarbageUrl extends AbstractUrl {
  weight = new WeightUrl(this.basic());
  score = new ScoreUrl(this.basic());

  constructor(base: string) {
    super(`${base}/Garbages`);
  }
}

class WeightUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Weight`);
  }
}

class ScoreUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Score`);
  }
}
