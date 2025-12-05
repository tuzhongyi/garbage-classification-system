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
    map: MapRequestService,
    division: DivisionRequestService,
    grid: GridCellRequestService,
    private global: GlobalStorageService
  ) {
    this.service = { map, division, grid };
    this.init();
  }

  private service: {
    map: MapRequestService;
    division: DivisionRequestService;
    grid: GridCellRequestService;
  };

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

  async load() {
    let _default = await this.default.get();
    let divisions = await this.service.division.cache.all();
    let grids = await this.service.grid.array();

    let ids: IIdModel[] = [_default, ...divisions, ...grids];
    let _divisions = await this.service.map.division.array(_default.Id);
    _divisions = this.conditions(_divisions, ids, (a, b) => a.id === b.Id);

    return _divisions;
  }

  async current(datas: MapDivision[]) {
    let _default = await this.default.get();
    return datas.find((x) => x.id === _default.Id)!;
  }

  async division(datas: MapDivision[]) {
    let divisions = await this.service.division.cache.all();
    let ids = divisions.map((x) => x.Id);
    return datas.filter((x) => ids.includes(x.id));
  }
  async grid(datas: MapDivision[]) {
    let grids = await this.service.grid.array();
    let ids = grids.map((x) => x.Id);
    return datas.filter((x) => ids.includes(x.id));
  }

  // async get(id: string, datas:MapDivision[]) {
  //   return datas.find((x) => x.id === id);
  // }

  get(id: string) {
    return this.service.map.division.item(id);
  }

  async array(ids: string[]) {
    let datas = await this.load();
    return datas.filter((x) => ids.includes(x.id));
  }
}
