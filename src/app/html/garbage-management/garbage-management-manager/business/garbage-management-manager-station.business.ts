import { Injectable } from '@angular/core';
import { GarbageStationNumberStatistic } from '../../../../common/network/model/garbage-station/garbage-station-number-statistic.model';
import { GarbageStation } from '../../../../common/network/model/garbage-station/garbage-station.model';
import {
  GetGarbageStationStatisticNumbersParams,
  GetGarbageStationsParams,
} from '../../../../common/network/request/garbage/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from '../../../../common/network/request/garbage/garbage-station/garbage-station-request.service';
import { GlobalStorageService } from '../../../../common/storage/global.storage';
import { ObjectTool } from '../../../../common/tools/object-tool/object.tool';
import { DivisionViewModelConverter } from '../../../../common/view-model/division.view-model';
import { GarbageStationViewModel } from '../../../../common/view-model/garbage-station.view-model';

@Injectable()
export class GarbageManagementManagerStationBusiness {
  constructor(
    private service: GarbageStationRequestService,
    private converter: DivisionViewModelConverter,
    private global: GlobalStorageService
  ) {}

  async load() {
    let division = await this.global.division.selected;
    let params = new GetGarbageStationsParams();
    params.AncestorId = division.Id;
    params.StationTypes = [...ObjectTool.model.GarbageStation.types];
    let stations = await this.service.all(params);
    this.service.cache.save(stations);
    let statistic = await this.statistic.all(stations);
    let models: GarbageStationViewModel[] = [];
    for (let i = 0; i < stations.length; i++) {
      const station = stations[i];
      let item = statistic.find((x) => x.Id === station.Id);
      if (!item) {
        item = await this.statistic.get(station.Id);
      }
      let model = this.convert(station, item);
      models.push(model);
    }

    return models;
  }

  get(id: string) {
    return this.service.cache.get(id);
  }

  pictures(stationId: string) {
    return this.service.manualCapture(stationId);
  }

  private statistic = {
    all: (datas: GarbageStation[]) => {
      let params = new GetGarbageStationStatisticNumbersParams();
      params.Ids = datas.map((x) => x.Id);
      return this.service.statistic.number.all(params);
    },
    get: (stationId: string) => {
      return this.service.statistic.number.get(stationId);
    },
  };

  private convert(
    station: GarbageStation,
    statistic: GarbageStationNumberStatistic
  ) {
    let vm = new GarbageStationViewModel();
    vm = Object.assign(vm, station);
    vm.Statistic = statistic;
    if (vm.DivisionId) {
      vm.Division = this.converter.get(vm.DivisionId);
    }
    return vm;
  }
}
