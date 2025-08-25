import { AbstractUrl } from '../abstract.url';
import { BaseUrl } from '../base.url';

export abstract class GarbageVehicleCollectionPointUrl {
  static basic() {
    return `${BaseUrl.garbage.garbage_vehicles}/CollectionPoints`;
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
  static trashcan(id?: string) {
    const base = id ? this.item(id) : this.basic();
    return new TrashCanUrl(base);
  }

  static get statistics() {
    return new StatisticUrl(this.basic());
  }
}
class TrashCanUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/TrashCans`);
  }
  excels() {
    return `${this.basic()}/Excels`;
  }
}

class StatisticUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Statistics`);
  }

  number() {
    return `${this.basic()}/Number`;
  }
  scoreTopList() {
    return `${this.basic()}/ScoreTopList`;
  }
  weightTopList() {
    return `${this.basic()}/WeightTopList`;
  }
}
