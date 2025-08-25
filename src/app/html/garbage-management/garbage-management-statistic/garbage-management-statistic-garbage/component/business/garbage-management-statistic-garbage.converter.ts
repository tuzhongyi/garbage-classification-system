import { GarbageType } from '../../../../../../common/enum/garbage-type.enum';
import { DivisionNumberStatistic } from '../../../../../../common/network/model/garbage-station/division-number-statistic.model';
import { GarbageManagementStatisticGarbageItem } from '../../garbage-management-statistic-garbage-item/garbage-management-statistic-garbage-item.model';

export class GarbageManagementStatisticGarbageConverter {
  dry(source: DivisionNumberStatistic) {
    let data = new GarbageManagementStatisticGarbageItem();
    data.name = '干垃圾';
    data.class.picture = 'dry';
    data.class.icon = 'howell-icon-residual';
    if (source.GarbageWeights) {
      let garbage = source.GarbageWeights.find(
        (x) => x.GarbageType == GarbageType.Dry
      );
      if (garbage) {
        data.value = garbage.DayWeight;
      }
    }
    return data;
  }
  wet(source: DivisionNumberStatistic) {
    let data = new GarbageManagementStatisticGarbageItem();
    data.name = '湿垃圾';
    data.class.picture = 'wet';
    data.class.icon = 'howell-icon-kitchen';
    if (source.GarbageWeights) {
      let garbage = source.GarbageWeights.find(
        (x) => x.GarbageType == GarbageType.Wet
      );
      if (garbage) {
        data.value = garbage.DayWeight;
      }
    }
    return data;
  }
  recyclable(source: DivisionNumberStatistic) {
    let data = new GarbageManagementStatisticGarbageItem();
    data.name = '可回收垃圾';
    data.class.picture = 'recyclable';
    data.class.icon = 'howell-icon-recyclable';
    if (source.GarbageWeights) {
      let garbage = source.GarbageWeights.find(
        (x) => x.GarbageType == GarbageType.Recycle
      );
      if (garbage) {
        data.value = garbage.DayWeight;
      }
    }
    return data;
  }
}
