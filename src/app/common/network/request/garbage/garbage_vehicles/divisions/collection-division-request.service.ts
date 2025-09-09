import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { instanceToPlain } from 'class-transformer';
import { CollectionDivisionStatisticNumber } from '../../../../model/garbage-station/collection-division-statistic-number.model';
import { DivisionGarbageScore } from '../../../../model/garbage-station/division-garbage-score.model';
import { DivisionGarbageWeight } from '../../../../model/garbage-station/division-garbage-weight.model';
import { DivisionTree } from '../../../../model/garbage-station/division-tree.model';
import { Division } from '../../../../model/garbage-station/division.model';
import { PagedList } from '../../../../model/page_list.model';
import { GarbageVehicleDivisionUrl } from '../../../../url/garbage-vehicle/division.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../../base-request-howell.service';
import { Cache } from '../../../cache/cache';
import { AbstractService } from '../../../cache/cache.interface';
import { ExcelService } from '../../../excel.service';
import { HowellAuthHttpService } from '../../../howell-auth-http.service';
import { GetDivisionTreeParams } from '../../division/division-request.params';
import {
  GetDivisionGarbageScoresParams,
  GetDivisionGarbageWeightsParams,
  GetDivisionsParams,
} from './collection-division-request.params';

@Cache(GarbageVehicleDivisionUrl.basic(), Division)
@Injectable({
  providedIn: 'root',
})
export class CollectionDivisionRequestService extends AbstractService<Division> {
  private basic: HowellBaseRequestService;
  private type: HowellBaseTypeRequestService<Division>;

  constructor(private http: HowellAuthHttpService, router: Router) {
    super();
    this.basic = new HowellBaseRequestService(http, router);
    this.type = this.basic.type(Division);
  }

  create(data: Division): Promise<Division> {
    let url = GarbageVehicleDivisionUrl.basic();
    return this.type.post(url, data);
  }
  get(divisionId: string): Promise<Division> {
    let url = GarbageVehicleDivisionUrl.item(divisionId);
    return this.type.get(url);
  }
  update(data: Division): Promise<Division> {
    let url = GarbageVehicleDivisionUrl.item(data.Id);
    return this.type.put(url, data);
  }
  delete(divisionId: string): Promise<Division> {
    let url = GarbageVehicleDivisionUrl.item(divisionId);
    return this.type.delete(url);
  }
  list(
    params: GetDivisionsParams = new GetDivisionsParams()
  ): Promise<PagedList<Division>> {
    let url = GarbageVehicleDivisionUrl.list();
    let data = instanceToPlain(params);
    return this.type.paged(url, data);
  }

  get excel() {
    return new ExcelService(this.http, GarbageVehicleDivisionUrl.excels());
  }

  private _garbage?: DivisionGarbage;
  get garbage() {
    if (!this._garbage) {
      this._garbage = new DivisionGarbage(this.basic);
    }
    return this._garbage;
  }

  private _statistic?: CollectionDivisionStatisticSerivce;
  public get statistic(): CollectionDivisionStatisticSerivce {
    if (!this._statistic) {
      this._statistic = new CollectionDivisionStatisticSerivce(this.basic);
    }
    return this._statistic;
  }

  tree(params?: GetDivisionTreeParams): Promise<DivisionTree> {
    let url = GarbageVehicleDivisionUrl.tree();
    if (params) {
      let data = instanceToPlain(params);
      return this.basic.post(url, DivisionTree, data);
    } else {
      return this.basic.get(url, DivisionTree);
    }
  }
}

class DivisionGarbage {
  get weight() {
    return new GarbageVehicleWeightService(this.basic);
  }
  get score() {
    return new GarbageVehiclScoreService(this.basic);
  }

  constructor(private basic: HowellBaseRequestService) {}
}

class GarbageVehicleWeightService {
  constructor(private basic: HowellBaseRequestService) {}

  get(divisionId: string) {
    let url = GarbageVehicleDivisionUrl.garbage(divisionId).weight.basic();
    return this.basic.get(url, DivisionGarbageWeight);
  }
  list(params: GetDivisionGarbageWeightsParams) {
    let url = GarbageVehicleDivisionUrl.garbage().weight.basic();
    return this.basic.postArray(url, DivisionGarbageWeight, params);
  }
}

class GarbageVehiclScoreService {
  constructor(private basic: HowellBaseRequestService) {}

  get(divisionId: string) {
    let url = GarbageVehicleDivisionUrl.garbage(divisionId).score.basic();
    return this.basic.get(url, DivisionGarbageScore);
  }
  list(params: GetDivisionGarbageScoresParams) {
    let url = GarbageVehicleDivisionUrl.garbage().score.basic();
    return this.basic.postArray(url, DivisionGarbageScore, params);
  }
}

class CollectionDivisionStatisticSerivce {
  constructor(private basic: HowellBaseRequestService) {}

  number(divisionId: string) {
    let url = GarbageVehicleDivisionUrl.statistic(divisionId).number();
    return this.basic.get(url, CollectionDivisionStatisticNumber);
  }
}
