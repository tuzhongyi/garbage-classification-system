import { StationState } from '../../../../common/enum/station-state.enum';
import { GarbageStationNumberStatistic } from '../../../../common/network/model/garbage-station/garbage-station-number-statistic.model';
import { GarbageStation } from '../../../../common/network/model/garbage-station/garbage-station.model';
import { Flags } from '../../../../common/tools/flags';
import { GarbageManagementChartStationStateData } from './garbage-management-chart-station-state.model';

export class GarbageManagementChartStationStateConverter {
  convert(datas: GarbageStation[], stayeds: GarbageStationNumberStatistic[]) {
    let model = new GarbageManagementChartStationStateData();

    datas.forEach((station) => {
      let flags = new Flags(station.StationState);
      let has = false;
      if (flags.contains(StationState.Error)) {
        model.error++;
        has = true;
      }
      if (flags.contains(StationState.Full)) {
        model.full++;
        has = true;
      }
      let index = stayeds.findIndex(
        (x) => x.Id === station.Id && (x.CurrentGarbageTime ?? 0) > 0
      );
      if (index >= 0) {
        model.stayed++;
        has = true;
      }
      if (!has) {
        model.normal++;
      }
    });
    return model;
  }
}
