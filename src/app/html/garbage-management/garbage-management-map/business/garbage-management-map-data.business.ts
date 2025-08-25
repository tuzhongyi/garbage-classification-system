import { Injectable } from '@angular/core';
import { IDivision } from '../../../../common/network/model/garbage-station/division.model';
import { DivisionRequestService } from '../../../../common/network/request/division/division-request.service';
import { MapDivision } from '../../../../common/network/request/map/map-division.model';
import { MapRequestService } from '../../../../common/network/request/map/map-request.service';
import { GlobalStorageService } from '../../../../common/storage/global.storage';
import { PromiseValue } from '../../../../common/view-models/value.promise';

@Injectable()
export class GarbageManagementMapDataBusiness {
  constructor(
    private service: MapRequestService,
    private global: GlobalStorageService,
    private division: DivisionRequestService
  ) {
    this.init();
  }

  datas = new PromiseValue<MapDivision[]>();
  default = new PromiseValue<IDivision>();

  private init() {
    this.global.division.default.then((x) => {
      this.default.set(x);
    });
  }

  conditions<T1, T2>(
    array1: T1[],
    array2: T2[],
    condition: (a: T1, b: T2) => boolean
  ): T1[] {
    const result: T1[] = [];
    for (const item1 of array1) {
      for (const item2 of array2) {
        if (condition(item1, item2)) {
          result.push(item1);
          break;
        }
      }
    }
    return result;
  }

  private load() {
    return new Promise<MapDivision[]>((resolve) => {
      if (this.datas.exists()) {
        resolve(this.datas.get());
        return;
      } else {
        this.default.get().then((x) => {
          this.division.cache.all().then((divisions) => {
            this.service.division.array(x.Id).then((y) => {
              y = this.conditions(y, divisions, (a, b) => a.id === b.Id);
              this.datas.set(y);
              resolve(y);
            });
          });
        });
      }
    });
  }

  async current() {
    let _default = await this.default.get();
    let datas = await this.load();
    return datas.find((x) => x.id === _default.Id);
  }

  async children() {
    let _default = await this.default.get();
    let datas = await this.load();
    return datas.filter((x) => x.parentId === _default.Id);
  }

  async get(id: string) {
    let datas = await this.load();
    return datas.find((x) => x.id === id);
  }
}
