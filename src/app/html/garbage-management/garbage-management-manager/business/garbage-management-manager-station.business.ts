import { Injectable } from '@angular/core';
import { GarbageStationNumberStatistic } from '../../../../common/network/model/garbage-station/garbage-station-number-statistic.model';
import { GarbageStation } from '../../../../common/network/model/garbage-station/garbage-station.model';
import {
  GetGarbageStationStatisticNumbersParams,
  GetGarbageStationsParams,
} from '../../../../common/network/request/garbage/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from '../../../../common/network/request/garbage/garbage-station/garbage-station-request.service';
import { GlobalStorageService } from '../../../../common/storage/global.storage';
import { GarbageStationViewModel } from '../../../../common/view-model/garbage-station.view-model';

@Injectable()
export class GarbageManagementManagerStationBusiness {
  constructor(
    private service: GarbageStationRequestService,

    private global: GlobalStorageService
  ) {}
  async load() {
    let division = await this.global.division.selected;
    let params = new GetGarbageStationsParams();
    params.AncestorId = division.Id;
    let stations = await this.service.all(params);
    let statistic = await this.statistic(stations);

    let models = stations.map((station) => {
      let item = statistic.find((x) => x.Id === station.Id);
      return this.convert(station, item);
    });
    return models;
  }

  private statistic(datas: GarbageStation[]) {
    let params = new GetGarbageStationStatisticNumbersParams();
    params.Ids = datas.map((x) => x.Id);
    params.GarbageDrop = true;
    return this.service.statistic.number.all(params);
  }

  private convert(
    station: GarbageStation,
    statistic?: GarbageStationNumberStatistic
  ) {
    let vm = new GarbageStationViewModel();
    vm = Object.assign(vm, station);
    vm.Statistic = statistic;
    return vm;
  }
}
