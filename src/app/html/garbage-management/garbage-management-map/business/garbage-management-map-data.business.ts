import { Injectable } from '@angular/core';
import { IDivision } from '../../../../common/network/model/garbage-station/division.model';
import { IIdModel } from '../../../../common/network/model/model.interface';
import { DivisionRequestService } from '../../../../common/network/request/garbage/division/division-request.service';
import { GridCellRequestService } from '../../../../common/network/request/grid-cell/grid-cell-request.service';
import { MapDivision } from '../../../../common/network/request/map/map-division.model';
import { MapRequestService } from '../../../../common/network/request/map/map-request.service';
import { GlobalStorageService } from '../../../../common/storage/global.storage';
import { PromiseValue } from '../../../../common/view-models/value.promise';

@Injectable()
export class GarbageManagementMapDataBusiness {
  constructor(
    private service: MapRequestService,
    private global: GlobalStorageService,
    private division: DivisionRequestService,
    private grid: GridCellRequestService
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

  private async load() {
    if (this.datas.exists()) {
      return this.datas.get();
    }

    let _default = await this.default.get();
    let divisions = await this.division.cache.all();
    let grids = await this.grid.all();
    let ids: IIdModel[] = [...divisions, ...grids];
    let _divisions = await this.service.division.array(_default.Id);
    _divisions = this.conditions(_divisions, ids, (a, b) => a.id === b.Id);
    this.datas.set(_divisions);
    return _divisions;
  }

  async current() {
    let _default = await this.default.get();
    let datas = await this.load();
    return datas.find((x) => x.id === _default.Id)!;
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

  async array(ids: string[]) {
    let datas = await this.load();
    return datas.filter((x) => ids.includes(x.id));
  }
}
