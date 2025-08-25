import { StationState } from '../../../../../../common/enum/station-state.enum';
import { DivisionNumberStatistic } from '../../../../../../common/network/model/garbage-station/division-number-statistic.model';
import { GarbageStation } from '../../../../../../common/network/model/garbage-station/garbage-station.model';
import { Flags } from '../../../../../../common/tools/flags';
import { GarbageManagementChartStationCountItem } from '../../garbage-management-chart-station-count-item/garbage-management-chart-station-count-item.model';

export class GarbageManagementChartStationCountConverter {
  station(source: GarbageStation[]) {
    let item = new GarbageManagementChartStationCountItem();
    item.name = '投放点';
    item.data.count = source.length;
    item.data.value = source.length;

    source.forEach((x) => {
      let flags = new Flags(x.StationState);
      if (flags.contains(StationState.Error)) {
        item.data.value--;
      }
    });
    item.color = {
      r: 0,
      g: 255,
      b: 127,
    };
    return item;
  }

  camera(source: DivisionNumberStatistic) {
    let item = new GarbageManagementChartStationCountItem();
    item.name = '监控点位';
    item.data.count = source.CameraNumber;
    item.data.value = source.CameraNumber - source.OfflineCameraNumber;

    item.color = {
      r: 255,
      g: 165,
      b: 0,
    };
    return item;
  }

  wet(source: DivisionNumberStatistic) {
    let item = new GarbageManagementChartStationCountItem();
    item.name = '湿垃圾处理站';
    item.data.count = source.WetFullStationNumber;
    item.data.value = source.WetFullStationNumber;
    item.color = {
      r: 255,
      g: 69,
      b: 0,
    };
    return item;
  }
}
