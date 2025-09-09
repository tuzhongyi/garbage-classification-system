import { Injectable } from '@angular/core';
import {
  GetGarbageStationStatisticNumbersParams,
  GetGarbageStationsParams,
} from '../../../../../common/network/request/garbage/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from '../../../../../common/network/request/garbage/garbage-station/garbage-station-request.service';
import { GlobalStorageService } from '../../../../../common/storage/global.storage';
import { GarbageManagementChartStationStateConverter } from '../garbage-management-chart-station-state.converter';

@Injectable()
export class GarbageManagementChartStationStateBusiness {
  constructor(
    private global: GlobalStorageService,
    private service: GarbageStationRequestService
  ) {}

  private converter = new GarbageManagementChartStationStateConverter();

  async load() {
    let division = await this.global.division.selected;
    let datas = await this.data(division.Id);
    let stayeds = await this.statistic(division.Id);

    let model = this.converter.convert(datas, stayeds);

    return model;
  }

  private data(divisionId: string) {
    let params = new GetGarbageStationsParams();
    params.AncestorId = divisionId;
    return this.service.cache.all(params);
  }

  private statistic(divisionId: string) {
    let params = new GetGarbageStationStatisticNumbersParams();
    params.GarbageDrop = true;
    params.DivisionId = divisionId;
    return this.service.statistic.number.cache.all(params);
  }
}
