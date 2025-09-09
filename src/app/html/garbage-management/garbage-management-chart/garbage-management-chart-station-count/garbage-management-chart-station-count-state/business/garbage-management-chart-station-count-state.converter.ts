import { EventType } from '../../../../../../common/enum/event-type.enum';
import { Language } from '../../../../../../common/tools/language';
import { GarbageManagementChartStationCountItem } from '../../garbage-management-chart-station-count-item/garbage-management-chart-station-count-item.model';

export class GarbageManagementChartStationCountStateConverter {
  garbagefull(data: { count: number; value: number }) {
    let item = new GarbageManagementChartStationCountItem();
    item.name = Language.EventType(EventType.GarbageFull);

    item.data.count = data.count;
    item.data.value = data.value;

    item.color = {
      r: 255,
      g: 0,
      b: 240,
    };
    return item;
  }
  garbagedrop(data: { count: number; value: number }) {
    let item = new GarbageManagementChartStationCountItem();
    item.name = Language.EventType(EventType.GarbageDrop);

    item.data.count = data.count;
    item.data.value = data.value;

    item.color = {
      r: 255,
      g: 255,
      b: 0,
    };
    return item;
  }
  mixedinto(data: { count: number; value: number }) {
    let item = new GarbageManagementChartStationCountItem();
    item.name = Language.EventType(EventType.MixedInto);

    item.data.count = data.count;
    item.data.value = data.value;

    item.color = {
      r: 0,
      g: 246,
      b: 255,
    };
    return item;
  }
}
